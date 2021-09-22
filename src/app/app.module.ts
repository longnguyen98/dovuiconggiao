import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {LayoutComponent} from './dovuiconggiao/layout/layout.component';
import {RouterModule} from "@angular/router";
import {LandingComponent} from './dovuiconggiao/pages/landing/landing.component';
import {AppRoutingModule} from "./app.routing";
import {UpsertQuestionComponent} from './dovuiconggiao/pages/upsert-question/upsert-question.component';
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";


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
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
