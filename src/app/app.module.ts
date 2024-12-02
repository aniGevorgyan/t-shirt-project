import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ColorsComponent} from "../components/colors/colors.component";
import {SideComponent} from "../components/side/side.component";
import {UploadComponent} from "../components/upload/upload.component";
import {GapComponent} from "../components/gap/gap.component";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ColorsComponent,
        SideComponent,
        UploadComponent,
        GapComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
