import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./features/components/register/register.component";
import {LoginComponent} from "./features/components/login/login.component";
import {FeedComponent} from "./features/components/feed/feed.component";

const routes: Routes = [

  { path: '', redirectTo: 'register', pathMatch: 'full' }, //default route
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'feed', component: FeedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
