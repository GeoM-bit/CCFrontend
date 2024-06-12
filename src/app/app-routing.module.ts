import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./features/auth/components/register/register.component";
import {LoginComponent} from "./features/auth/components/login/login.component";
import {ProfileComponent} from "./features/user profile/components/profile/profile.component";
import {FeedComponent} from "./features/feed & articles/components/feed/feed.component";
import {ArticleComponent} from "./features/feed & articles/components/article/article.component";
import {
  SupportGroupsTableComponent
} from "./features/support groups/components/support-groups-table/support-groups-table.component";
import {SupportGroupComponent} from "./features/support groups/components/support-group/support-group.component";
import {ExtendedCalendarComponent} from "./features/calendar/components/extended-calendar/extended-calendar.component";
import {
  CounselingRequestFormComponent
} from "./features/counseling/components/counseling-request-form/counseling-request-form.component";
import {
  CounselingRequestsTableComponent
} from "./features/counseling/components/counseling-requests-table/counseling-requests-table.component";

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' }, //default route
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'article/:id', component: ArticleComponent},
  { path: 'support-groups', component: SupportGroupsTableComponent},
  { path: 'support-group/:groupName', component: SupportGroupComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'calendar', component: ExtendedCalendarComponent },
  { path: 'counseling-request', component: CounselingRequestFormComponent },
  { path: 'counseling-requests', component: CounselingRequestsTableComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
