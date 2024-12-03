import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-side',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './side.component.html',
  styleUrl: './side.component.scss'
})
export class SideComponent {
  @Input() sides: any[] = [];
  @Output() change = new EventEmitter<string>;
  public activeIndex: number = 0;

  public setActive(i: number, side: any) {
    this.activeIndex = i;
    this.change.emit(side);
  }
}
