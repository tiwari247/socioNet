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

    constructor(private postService: PostService, 
        private activatedRoute: ActivatedRoute,
        private router: Router){}
        private form: FormGroup;

    ngOnInit(){
        this.form = new FormGroup({
            title: new FormControl(null, {validators: [Validators.required]}),
            description: new FormControl(null, {validators: [Validators.required]})
        });
        this.activatedRoute.paramMap.subscribe((paramsMap: ParamMap)=>{
            if(paramsMap.has("id")){
                this.mode = "edit";
                this.postId = paramsMap.get("id");
                console.log(this.mode + "-" + this.postId);
                this.post = this.postService.getPost(+this.postId);
                this.form.setValue({
                    title: this.form.get('title').value,
                    description: this.form.get('description').value
                });
                this.isLoading = false;
            }else{
                this.post = new Post("","","");
                this.mode = "create";
                console.log(this.mode);
                this.isLoading = false;
            }
        });
    }

    onCreate(){
        this.isLoading = true;
        if(this.mode === "create"){    
            this.post = new Post(null, this.form.value.title, this.form.value.description); 
            console.log(this.post);
            this.postService.addPosts(this.post);
            this.isLoading = false;
        }else{
            this.post = new Post(null, this.form.value.title, this.form.value.description); 
            this.postService.updatePost(this.postId, this.post);
            this.isLoading = false;
        }
        this.form.reset();
    }

    onImagePicked(event: Event){
        const file = (event.target as HTMLInputElement).files[0];
        console.log(file);

        const reader = new FileReader();

        reader.onload = ()=>{
            this.imagePreview = reader.result;
            console.log(this.imagePreview);
        };

        reader.readAsDataURL(file);

        
    }
}