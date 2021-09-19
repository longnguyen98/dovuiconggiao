import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LayoutComponent } from './dovuiconggiao/layout/layout.component';
import {RouterModule} from "@angular/router";
import { LandingComponent } from './dovuiconggiao/pages/landing/landing.component';
import {AppRoutingModule} from "./app.routing";
import { UpsertQuestionComponent } from './dovuiconggiao/pages/upsert-question/upsert-question.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LandingComponent,
    UpsertQuestionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
