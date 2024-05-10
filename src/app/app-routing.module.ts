import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./features/auth/register/register.component";
import {LoginComponent} from "./features/auth/login/login.component";
import {SupportGroupsTableComponent} from "./features/support groups/support-groups-table/support-groups-table.component";
import {SupportGroupComponent} from "./features/support groups/support-group/support-group.component";
import {FeedComponent} from "./features/feed & articles/feed/feed.component";
import {ArticleComponent} from "./features/feed & articles/article/article.component";
import {ProfileComponent} from "./features/user profile/profile/profile.component";

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' }, //default route
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'article/:title', component: ArticleComponent},
  { path: 'support-groups', component: SupportGroupsTableComponent},
  { path: 'support-group/:groupName', component: SupportGroupComponent},
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
