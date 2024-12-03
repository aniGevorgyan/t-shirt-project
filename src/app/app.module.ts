import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ProductService} from "./services/product.service";
import {HttpClientModule} from "@angular/common/http";
import {httpInterceptorProviders} from "./interceptors";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [ProductService, httpInterceptorProviders],
    bootstrap: [AppComponent]
})
export class AppModule { }
