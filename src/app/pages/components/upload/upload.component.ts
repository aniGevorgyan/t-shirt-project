import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Loader} from "../loader/loader";

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    CommonModule,
    Loader
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  @Output() onUpload = new EventEmitter<any>();
  @Input() loading: boolean;

  public afterUpload(e: any) {
    this.onUpload.emit(e);
    this.loading = true;
  }
}
