import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostsCreateComponent } from './posts/posts-create/posts-create.component';

const routes:Routes = [
    {path: "", component: PostsListComponent},
    // {path: "create", component: PostsCreateComponent},
    // {path: "edit/:id", component: PostsCreateComponent},
    {path: "post", loadChildren: "./posts/posts-create/posts-create.module#PostsCreateModule"},
    {path: "auth", loadChildren: "./auth/auth.module#AuthModule"}
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