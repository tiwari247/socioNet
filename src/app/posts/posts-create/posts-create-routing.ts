import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsCreateComponent } from './posts-create.component';

const routes: Routes = [
    {path: "create", component: PostsCreateComponent},
    {path: "edit/:id", component: PostsCreateComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostsCreateRoutingModule{

}