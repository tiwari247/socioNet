import { NgModule } from '@angular/core';
import { PostsCreateComponent } from './posts-create.component';
import { PostsCreateRoutingModule } from './posts-create-routing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        PostsCreateComponent
    ],
    imports: [PostsCreateRoutingModule, ReactiveFormsModule, CommonModule]
})
export class PostsCreateModule{}