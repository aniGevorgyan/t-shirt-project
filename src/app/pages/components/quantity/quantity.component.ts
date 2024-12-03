import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-quantity',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './quantity.component.html',
    styleUrl: './quantity.component.scss'
})
export class QuantityComponent {
    public sizes = [
        {label: 's',},
        {label: 'm',},
        {label: 'l',},
        {label: 'xl',},
        {label: '2xl', additional: '3'},
        {label: '3xl', additional: '5'},
        {label: '4xl', additional: '5'},
        {label: '5xl', additional: '5'}]
}
