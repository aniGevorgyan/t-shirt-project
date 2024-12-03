import {Component, EventEmitter, Output} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  @Output() onUpload = new EventEmitter<any>();

  public afterUpload(e: any) {
    this.onUpload.emit(e);
  }
}
