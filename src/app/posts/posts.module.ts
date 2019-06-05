import { NgModule } from '@angular/core';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostItemComponent } from './posts-list/post-item/post-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        PostsListComponent,
        PostItemComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class PostsModule{}