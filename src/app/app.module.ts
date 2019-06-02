import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms"

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostsCreateComponent } from './posts/posts-create/posts-create.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostService } from './posts/post.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HeaderDropdownComponent } from './header-dropdown/header-dropdown.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatMenuModule, MatIconModule } from "@angular/material";
import { MatMenuItemBase } from '@angular/material/menu/typings/menu-item';
import { DataService } from './header-dropdown/data.service';
import { MainmenuComponent } from './header-dropdown/mainmenu/mainmenu.component';
import { SubmenuComponent } from './header-dropdown/mainmenu/submenu/submenu.component';
import { PostItemComponent } from './posts/posts-list/post-item/post-item.component';
import { PaginatorComponent } from './shared/paginator/paginator.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsCreateComponent,
    PostsListComponent,
    HeaderDropdownComponent,
    MainmenuComponent,
    SubmenuComponent,
    PostItemComponent,
    PaginatorComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [PostService, DataService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
