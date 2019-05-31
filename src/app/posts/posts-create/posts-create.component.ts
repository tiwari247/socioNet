import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from "../post.model"
import { PostService } from '../post.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
    selector: "app-posts-create",
    templateUrl: "./posts-create.component.html",
    styleUrls: ["./posts-create.component.css"]
})
export class PostsCreateComponent implements OnInit{
    post:Post;
    mode = "create";
    postId;
    isLoading = true;
    @ViewChild('f') form: NgForm;

    constructor(private postService: PostService, 
        private activatedRoute: ActivatedRoute,
        private router: Router){}

    ngOnInit(){
        this.activatedRoute.paramMap.subscribe((paramsMap: ParamMap)=>{
            // this.isLoading = true;
            if(paramsMap.has("id")){
                this.mode = "edit";
                this.postId = paramsMap.get("id");
                console.log(this.mode + "-" + this.postId);
                this.post = this.postService.getPost(+this.postId);
                // setTimeout(()=>{}, 3000);
                // setTimeout(()=>{
                //     this.form.setValue({
                //         title: post.title,
                //         description: post.description
                //     });    
                // }, 0);
                this.isLoading = false;
            }else{
                this.post = new Post("","","");
                
                this.mode = "create";
                console.log(this.mode);
                this.isLoading = false;
            }
        });
    }

    onCreate(form: NgForm){
        if(form.invalid){
            return;
        }
        this.isLoading = true;
        if(this.mode === "create"){    
            this.post = new Post(null, form.value.title, form.value.description); 
            console.log(this.post);
            this.postService.addPosts(this.post);
            this.isLoading = false;
        }else{
            this.post = new Post(null, form.value.title, form.value.description); 
            this.postService.updatePost(this.postId, this.post);
            this.isLoading = false;
        }
        form.reset();
    }
}