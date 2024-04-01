import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./features/components/register/register.component";
import {LoginComponent} from "./features/components/login/login.component";
import {FeedComponent} from "./features/components/feed/feed.component";
import {ArticleComponent} from "./features/components/article/article.component";
import {SupportGroupsTableComponent} from "./features/components/support-groups-table/support-groups-table.component";

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' }, //default route
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'article/:title', component: ArticleComponent},
  { path: 'support-groups', component: SupportGroupsTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
