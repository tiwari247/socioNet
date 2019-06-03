import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from "../post.model"
import { PostService } from '../post.service';
import { NgForm, FormControlName, FormGroup, FormControl, Validators } from '@angular/forms';
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
    imagePreview;
    form: FormGroup;
    
    constructor(private postService: PostService, 
        private activatedRoute: ActivatedRoute,
        private router: Router){}

    ngOnInit(){
        this.form = new FormGroup({
            title: new FormControl(null, {validators: [Validators.required]}),
            description: new FormControl(null, {validators: [Validators.required]}),
            image: new FormControl(null, {validators: [Validators.required]}),
        });
        this.activatedRoute.paramMap.subscribe((paramsMap: ParamMap)=>{
            if(paramsMap.has("id")){
                this.mode = "edit";
                this.postId = paramsMap.get("id");
                console.log(this.mode + "-" + this.postId);
                this.post = this.postService.getPost(+this.postId);
                this.form.setValue({
                    title: this.post.title,
                    description: this.post.description,
                    image: this.post.imgPath
                });
                this.isLoading = false;
            }else{
                this.post = new Post("","","", "", "");
                this.mode = "create";
                console.log(this.mode);
                this.isLoading = false;
            }
        });
    }

    onCreate(){
        if(this.form.invalid){
            return;
        }

        this.isLoading = true;
        let post:Post = {
            id: null,
            title: this.form.value.title,
            description: this.form.value.description,
            imgPath: null,
            creater: null
        };
        if(this.mode === "create"){    
            console.log(post);
            this.postService.addPosts(post, this.form.value.image);
            this.isLoading = false;
        }else{
            this.postService.updatePost(this.postId, post, this.form.value.image);
            this.isLoading = false;
        }
        this.form.reset();
    }

    onImagePicked(event: Event){
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({
            image: file
        });
        
        const reader = new FileReader();

        reader.onload = ()=>{
            this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
    }
}