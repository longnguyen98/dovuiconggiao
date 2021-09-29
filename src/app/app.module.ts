import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {LayoutComponent} from './dovuiconggiao/layout/layout.component';
import {RouterModule} from "@angular/router";
import {LandingComponent} from './dovuiconggiao/pages/landing/landing.component';
import {AppRoutingModule} from "./app.routing";
import {UpsertQuestionComponent} from './dovuiconggiao/pages/upsert-question/upsert-question.component';
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
import {AdminComponent} from './dovuiconggiao/pages/admin/admin.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {FirebaseUIModule} from "firebaseui-angular";
import {firebaseConfig, firebaseUiAuthConfig} from "./dovuiconggiao/constants/config";
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/auth";
import { AuthenticationComponent } from './dovuiconggiao/components/authentication/authentication.component';
import {MatMenuModule} from '@angular/material/menu';
import { ProfileComponent } from './dovuiconggiao/pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LandingComponent,
    UpsertQuestionComponent,
    TopicSelectComponent,
    QuestionComponent,
    PlayComponent,
    AdminComponent,
    AuthenticationComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
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
    MatIconModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    AngularFireAuthModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
