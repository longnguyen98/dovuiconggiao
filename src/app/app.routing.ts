import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from "./dovuiconggiao/pages/landing/landing.component";
import {UpsertQuestionComponent} from "./dovuiconggiao/pages/upsert-question/upsert-question.component";
import {PlayComponent} from "./dovuiconggiao/pages/play/play.component";
import {AdminComponent} from './dovuiconggiao/pages/admin/admin.component';
import {ProfileComponent} from './dovuiconggiao/pages/profile/profile.component';


const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'question', component: UpsertQuestionComponent},
  {path: 'question/:id', component: UpsertQuestionComponent},
  {path: 'play', component: PlayComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile/:id', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
