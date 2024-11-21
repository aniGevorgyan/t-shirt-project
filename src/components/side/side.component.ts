import {Component, EventEmitter, Output} from '@angular/core';
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
  @Output() change = new EventEmitter<string>;
  public activeIndex: number = 0;
  public sides = [
    {code: "front", label: "Front"},
    {code: "back", label: "Back"},
    {code: "right", label: "Right side"},
    {code: "left", label: "Left side"},
  ]

  public setActive(i: number, code: string) {
    this.activeIndex = i;
    this.change.emit(code);
  }
}
