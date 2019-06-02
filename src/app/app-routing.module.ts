import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostsCreateComponent } from './posts/posts-create/posts-create.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';

const routes:Routes = [
    {path: "", component: PostsListComponent},
    {path: "create", component: PostsCreateComponent},
    {path: "edit/:id", component: PostsCreateComponent},
    {path: "signup", component: SignupComponent},
    {path: "signin", component: SigninComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{

}