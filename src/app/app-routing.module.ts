import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./core/components/layout/layout.component";
import {RegisterComponent} from "./features/components/register/register.component";

const routes: Routes = [

  { path: '', redirectTo: 'register', pathMatch: 'full' }, //default route
  { path: 'register', component: RegisterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
