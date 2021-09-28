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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {TopicSelectComponent} from './dovuiconggiao/components/topic-select/topic-select.component';
import {MatStepperModule} from '@angular/material/stepper';
import {QuestionComponent} from './dovuiconggiao/components/question/question.component';
import {PlayComponent} from './dovuiconggiao/pages/play/play.component';
import {CKEditorModule} from 'ckeditor4-angular';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AdminComponent } from './dovuiconggiao/pages/admin/admin.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LandingComponent,
    UpsertQuestionComponent,
    TopicSelectComponent,
    QuestionComponent,
    PlayComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    MatInputModule,
    MatStepperModule,
    CKEditorModule,
    MatExpansionModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
