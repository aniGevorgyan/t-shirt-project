import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {gapsCoordinatesTShirt, IGap} from "./app.variables";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    @ViewChild('vc', {static: true}) vc: ElementRef;
    public message: string;
    public imagePath: string;
    public color: string = 'black';
    public side: string = 'front';
    public textAdded: boolean;
    public imgArrays: any[] = [];
    public dragOption: number | null;

    constructor(public cdr: ChangeDetectorRef) {

    }

    public get gapsArrays(): IGap[] {
        return gapsCoordinatesTShirt;
    }

    public onColorChange(e: string) {
        this.color = e;
    }

    public addText() {
        this.textAdded = true;
    }

    public onSideChange(e: string) {
        this.side = e;
        this.textAdded = false;
    }

    public onOptionDragStart(event: any, option: any, index: number) {
        event.dataTransfer.dropEffect = 'move';
        event.target.style.cursor = 'move';
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
}
