import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {IGap} from "../../app/app.variables";
import * as fabric from "fabric";
import {FabricCanvasHandlers} from "../../app/fabric-canvas-handlers";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-gap',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gap.component.html',
  styleUrl: './gap.component.scss'
})
export class GapComponent implements AfterViewInit {
  @Input() item: IGap;
  @Output() showAreaBorders = new EventEmitter<void>();
  @Output() hideAreaBorders = new EventEmitter<void>();
  protected canvas: fabric.Canvas;
  protected handlers: FabricCanvasHandlers;

  ngAfterViewInit() {
    this.canvas = new fabric.Canvas('myCanvas_' + this.item.code);
    this.handlers = new FabricCanvasHandlers(this.canvas);

    this.canvas.on('object:moving', (e: any) => {
      this.handlers.onObjectMoving(e);
    });

    this.canvas.on('object:scaling', (e: any) => {
      this.handlers.onObjectScaling(e);
    });

    this.canvas.on('mouse:out', (e: any) => {
      this.hideAreaBorders.emit();
    });
    this.canvas.on('mouse:over', (e: any) => {
      this.showAreaBorders.emit();
    });
  }

  public onDragOver(event: any) {
    event.preventDefault();
  }

  public onDropSuccess(event: any) {
    event.preventDefault();
    // this.item.url = event.dataTransfer.getData('url');
    this.canvas.clear();
    this.handlers.createImageFromCenter(event.dataTransfer.getData('url'));
  }

}
