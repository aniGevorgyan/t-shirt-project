import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IGap} from "../../app.variables";
import {ColorsComponent} from "../components/colors/colors.component";
import {SideComponent} from "../components/side/side.component";
import {UploadComponent} from "../components/upload/upload.component";
import {GapComponent} from "../components/gap/gap.component";
import {CommonModule} from "@angular/common";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";

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
    public color: any;
    public side: any;
    public textAdded: boolean;
    public imgArrays: any[] = [];
    public dragOption: number | null;
    public product: any;
    public currentImageUrl: string;
    public loaded: boolean;
    public gaps: IGap[] = [];

    constructor(
        public productService: ProductService,
        public activateRoute: ActivatedRoute,
        public cdr: ChangeDetectorRef,
    ) {
    }

    ngOnInit() {
        this.activateRoute.queryParams
            .pipe(switchMap((data: any) => this.productService.getById(data.product_id)))
            .subscribe(res => {
                if (res.success) {
                    this.loaded = true;
                    this.product = res;
                    this.side = this.product.print_side[0];
                    this.color = this.product.colors[0];
                    this.setCurrentImage(res);
                    this.gaps = this.gapsArrays();
                }
                else {
                    console.log("Product not found");
                }
            })
    }

    public setCurrentImage(product: any) {
        this.currentImageUrl = this.transformToArray(product?.colors[0].images).find((el: any) => el.id == product?.print_side[0].uploaded_file_type_id)?.image;
    }

    public transformToArray(massiveObject: any): any {
        return Object.values(massiveObject);
    }

    public gapsArrays(): IGap[] {
        if (this.color?.images) {
            let gaps = this.transformToArray(this.color?.images).map((el: any) => {
                return {
                    code: this.product?.print_side.find((el2: any) => el2.uploaded_file_type_id == el.id)?.id,
                    url: null,
                    height: +el.height,
                    width: +el.width,
                    top: +el.top,
                    left: +el.left,
                }
            })
            return gaps;
        }
        return [];
    }

    public onColorChange(e: any) {
        this.color = e;
        // this.gaps = this.gapsArrays();
        this.currentImageUrl = this.transformToArray(e.images).find((el: any) => el.id == this.side.uploaded_file_type_id)?.image;
    }

    public addText() {
        this.textAdded = true;
        setTimeout(() => {
            this.textAdded = false;
            this.cdr.detectChanges();
        }, 100);
    }

    public onSideChange(e: any) {
        this.side = e;
        // this.gaps = this.gapsArrays();
        this.currentImageUrl = this.transformToArray(this.color.images).find((el: any) => el.id == e.uploaded_file_type_id)?.image
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

    public trackByFn(index: any) {
        return index.id;
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

        this.productService.uploadFile(files[0]).subscribe(res => {
            if (res.success) {
                this.imgArrays.push(res.url);
            }
        })
    }

    public deleteImage(index: number) {
        this.imgArrays = this.imgArrays.filter((el, key) => key !== index);
    }
}
