import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatOption, MatSelect} from "@angular/material/select";
import {gapsCoordinatesTCap, gapsCoordinatesTShirt, IGap, types} from "./app.variables";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, FormsModule, MatSelect, MatFormField, MatOption, ReactiveFormsModule,],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    @ViewChild('vc', {static: true}) vc: ElementRef;
    public message: string;
    public imagePath: string;
    public url: any;
    public type = 't-shirt';
    public imgArrays: any[] = [];
    public types = types;
    public dragOption: number | null;

    constructor(public cdr: ChangeDetectorRef) {
    }

    public get gapsArrays(): IGap[] {
        return this.type === 't-shirt' ? gapsCoordinatesTShirt : gapsCoordinatesTCap;
    }

    public onDragOver(event: any) {
        event.preventDefault();
    }

    public onDropSuccess(event: any, index: number) {
        event.preventDefault();
        this.gapsArrays[index].url = event.dataTransfer.getData('url');
    }

    public onOptionDragStart(event: any, option: any, index: number) {
        event.dataTransfer.dropEffect = 'move';
        event.target.style.cursor = 'move';
        event.dataTransfer.setData('url', option);
        this.dragOption = index;
        this.showPossibleGaps();
    }

    public showPossibleGaps() {
        const gaps = this.vc.nativeElement.getElementsByClassName('gap');
        Array.from(gaps).forEach((gap: any) => {
            if (!gap.classList.contains('gap--drag-end')) {
                gap.classList.add('gap--drag-wait');
            }
        });
    }

    public hidePossibleGaps() {
        const gaps = this.vc.nativeElement.getElementsByClassName('gap');
        Array.from(gaps).forEach((gap: any) => {
            if (gap.classList.contains('gap--drag-wait')) {
                gap.classList.remove('gap--drag-wait');
            }
        });
    }

    public onOptionDragEnd() {
        this.dragOption = null;
        this.hidePossibleGaps();
    }

    public onFileChange(event: any) {
        this.message = '';
        const files = event.target.files;
        if (files.length === 0)
            return;

        const mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = "Only images are supported.";
            return;
        }

        const reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgArrays.push(reader.result);
        }
    }

    public deleteImage(index: number) {
        this.imgArrays = this.imgArrays.filter((el, key) => key !== index);
    }

    public removeGap(index: number) {
        this.gapsArrays[index].url = null;
    }

}
