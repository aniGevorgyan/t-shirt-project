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
  @Output() change = new EventEmitter<string>;
  public activeIndex: number = 0;
  public colors = [
    {label: 'black', code: '#000'},
    {label: 'green', code: '#a1e173'},
  ]

  public setActive(i: number, label: string) {
    this.activeIndex = i;
    this.change.emit(label);
  }
}
