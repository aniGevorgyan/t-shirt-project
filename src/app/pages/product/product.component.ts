import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {gapsCoordinatesTShirt, IGap} from "../../app.variables";
import {ColorsComponent} from "../components/colors/colors.component";
import {SideComponent} from "../components/side/side.component";
import {UploadComponent} from "../components/upload/upload.component";
import {GapComponent} from "../components/gap/gap.component";
import {CommonModule} from "@angular/common";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
      CommonModule,
    ColorsComponent,
    SideComponent,
    UploadComponent,
    GapComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  @ViewChild('vc', {static: true}) vc: ElementRef;
  public message: string;
  public imagePath: string;
  public color: string;
  public side: string;
  public textAdded: boolean;
  public imgArrays: any[] = [];
  public dragOption: number | null;
  public product: any;
  public currentImageUrl: string;

  constructor(
      public productService: ProductService,
      public cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.productService.getById('198').subscribe(res => {
      if(res.success) {
        this.product = res;
        this.setCurrentImage(res);
      }
    })
  }

  public setCurrentImage(product: any) {
    this.currentImageUrl = this.transformToArray(product?.colors[0].images).find((el: any) => el.id == product?.print_side[0].uploaded_file_type_id);
  }

  public transformToArray(massiveObject: any): any {
    return Object.values(massiveObject);
  }

  public get gapsArrays(): IGap[] {
    return gapsCoordinatesTShirt;
  }

  public onColorChange(e: any) {
    this.color = e;
    let side = this.side || this.product.print_side[0];
    this.currentImageUrl = this.transformToArray(e.images).find((el: any) => el.id == side.uploaded_file_type_id)?.image;
  }

  public addText() {
    this.textAdded = true;
  }

  public onSideChange(e: any) {
    this.side = e;
    let color = this.color || this.product.colors[0];
    this.currentImageUrl = this.transformToArray(color.images).find((el: any) => el.id == e.uploaded_file_type_id)?.image
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
