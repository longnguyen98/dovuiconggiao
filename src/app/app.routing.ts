import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./dovuiconggiao/pages/landing/landing.component";
import {UpsertQuestionComponent} from "./dovuiconggiao/pages/upsert-question/upsert-question.component";


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'question', component: UpsertQuestionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
