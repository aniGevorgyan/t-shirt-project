import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatOption, MatSelect} from "@angular/material/select";
import {gapsCoordinatesTShirt, IGap} from "./app.variables";
import * as fabric from "fabric";
import {FabricCanvasHandlers} from "./fabric-canvas-handlers";
import {ColorsComponent} from "../components/colors/colors.component";
import {SideComponent} from "../components/side/side.component";
import {UploadComponent} from "../components/upload/upload.component";
import {QuantityComponent} from "../components/quantity/quantity.component";
import {GapComponent} from "../components/gap/gap.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, FormsModule, MatSelect, MatFormField, MatOption, ReactiveFormsModule, ColorsComponent, SideComponent, UploadComponent, QuantityComponent, GapComponent,],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
    @ViewChild('vc', {static: true}) vc: ElementRef;
    public message: string;
    public imagePath: string;
    public color: string = 'black';
    public side: string = 'front';
    protected canvas: any;
    public url: any;
    public imgArrays: any[] = [];
    public dragOption: number | null;
    protected handlers: FabricCanvasHandlers;

    ngAfterViewInit() {
        // this.canvas = new fabric.Canvas('myCanvas_0');
        // this.handlers = new FabricCanvasHandlers(this.canvas);
        //
        // this.canvas.on('object:moving', (e: any) => {
        //     this.handlers.onObjectMoving(e);
        // });
        //
        // this.canvas.on('object:scaling', (e: any) => {
        //     this.handlers.onObjectScaling(e);
        // });
        //
        // this.canvas.on('mouse:out', (e: any) => {
        //     this.hidePossibleGaps();
        // });
        // this.canvas.on('mouse:over', (e: any) => {
        //     this.showPossibleGaps();
        // });

    }

    constructor(public cdr: ChangeDetectorRef) {

    }

    public onColorChange(e: string) {
        this.color = e;
    }

    public onSideChange(e: string) {
        this.side = e;
    }

    public get gapsArrays(): IGap[] {
        return gapsCoordinatesTShirt;
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

    public removeGap(index: number) {
        this.gapsArrays[index].url = null;
        this.canvas.clear();
    }

}
