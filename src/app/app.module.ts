import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {RegisterComponent} from "./features/components/register/register.component";
import {SnackBarComponent} from "./features/components/snack-bar/snack-bar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {LayoutComponent} from "./core/components/layout/layout.component";
import {LoginComponent} from "./features/components/login/login.component";
import { JwtModule } from "@auth0/angular-jwt";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {FeedComponent} from "./features/components/feed/feed.component";
import { FeedArticleComponent } from './features/components/feed-article/feed-article.component';
import { CreateArticleComponent } from './features/components/create-article/create-article.component';
import { QuillModule} from "ngx-quill";
import {JwtInterceptor} from "./core/interceptor/token.interceptor";
import {ArticleComponent} from "./features/components/article/article.component";
import { ArticlePreviewComponent } from './features/components/article-preview/article-preview.component';
import { SupportGroupsTableComponent } from './features/components/support-groups-table/support-groups-table.component';
import { ManageMembersComponent } from './features/components/manage-members/manage-members.component';
import {MatList, MatListItem} from "@angular/material/list";
import { CreateSupportGroupComponent } from './features/components/create-support-group/create-support-group.component';
import {MatCheckbox} from "@angular/material/checkbox";
import { ConfirmationDialogComponent } from './features/components/confirmation-dialog/confirmation-dialog.component';
import { SupportGroupComponent } from './features/components/support-group/support-group.component';
import { SupportGroupPostComponent } from './features/components/support-group-post/support-group-post.component';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription, MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {CommentsModule} from "./features/comments/comments.module";
import { CreatePostComponent } from './features/components/create-post/create-post.component';
import { PostPreviewComponent } from './features/components/post-preview/post-preview.component';


export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SnackBarComponent,
    LayoutComponent,
    LoginComponent,
    FeedComponent,
    FeedArticleComponent,
    CreateArticleComponent,
    ArticleComponent,
    ArticlePreviewComponent,
    SupportGroupsTableComponent,
    ManageMembersComponent,
    CreateSupportGroupComponent,
    ConfirmationDialogComponent,
    SupportGroupComponent,
    SupportGroupPostComponent,
    CreatePostComponent,
    PostPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatDatepickerModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4200"],
      },
    }),
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    QuillModule.forRoot(),
    MatList,
    MatListItem,
    MatCheckbox,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    CommentsModule,
    MatAccordion,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
