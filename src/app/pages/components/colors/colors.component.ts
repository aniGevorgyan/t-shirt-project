import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage
  ],
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.scss'
})
export class ColorsComponent {
  @Input() colors: any[] = [];
  @Output() change = new EventEmitter<string>;
  public activeIndex: number = 0;

  public setActive(i: number, color: any) {
    this.activeIndex = i;
    this.change.emit(color);
  }
}
