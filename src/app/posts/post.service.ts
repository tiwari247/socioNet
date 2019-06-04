import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";

@Injectable()
export class PostService{
    posts: Post[] = [
        // {title: "Title1", description: "Description Description", id, imgPath, creater},
        // {title: "Title2", description: "Description Description"}
    ];

    postsChanged = new Subject<{posts: Post[], postsLength:number}>();

    constructor(private http: HttpClient, private router:Router){}

    getPost(index:number){
        return this.posts[index];
    }

    getPosts(postsPerPage, currentPage){
        let queryParams = `?resultsPerPage=${postsPerPage}&page=${currentPage}`;
        // console.log("Inside getPosts()");
        this.http.get<{message: string, posts: any, maxPosts: number}>("http://localhost:3000/api/posts"+queryParams)
            .pipe(map((postsData)=>{
                return {
                    posts: postsData.posts.map((post)=>{
                        return {
                            title: post.title,
                            description: post.description,
                            id: post._id,
                            imgPath: post.imgPath,
                            creater: post.creater
                        };
                    }),
                    maxPosts: postsData.maxPosts
                };
            }))
            .subscribe((tranformedPostData)=>{
                // console.log("Inside getPosts() http");
                this.posts = tranformedPostData.posts;
                this.postsChanged.next({posts: this.posts.slice(), postsLength: +tranformedPostData.maxPosts});
                // console.dir(this.posts);
            });
        // return this.posts.slice();
    }

    addPosts(post: Post, file){
        let formData = new FormData();
        formData.append("title", post.title);
        formData.append("description", post.description);
        formData.append("image", file, post.title);
        formData.append("creater", localStorage.getItem("userId"))
        this.http.post<{message:string, post: Post}>("http://localhost:3000/api/posts", formData)
            .subscribe((response)=>{
                // this.posts.push(post);
                // this.postsChanged.next(this.posts.slice());
                // console.log("Response: "+response);
                this.router.navigate(["/"]);
            }, (err)=>{console.log(err)});
    }

    removePost(index: number){
        let id = this.posts[index].id;
        return this.http.delete<{message:string, post:Post}>("http://localhost:3000/api/posts/"+id);
            // .subscribe(()=>{
            //     this.posts.splice(index,1);
            //     this.postsChanged.next({posts: this.posts.slice(), postsLength: 1});
            // });
    }

    updatePost(index:number, post:Post, file: string|File){
        let newPost:Post|FormData;
        if(typeof(file) === "object"){
            newPost = new FormData();
            newPost.append("id", post.id);
            newPost.append("title", post.title);
            newPost.append("description", post.description);
            newPost.append("image", file, post.title);
        }else{
            newPost = {
                id: post.id,
                title: post.title,
                description: post.description,
                imgPath: file,
                creater: localStorage.getItem("userId")//
            }
        }
        let id = this.posts[index].id;
        this.http.put<{message:string, post: Post}>("http://localhost:3000/api/posts/"+id, newPost)
            .subscribe((response)=>{
                // this.posts[index] = {
                //     id: response.post.id,
                //     title: response.post.title,
                //     description: response.post.description,
                //     imgPath: response.post.imgPath
                // };
                // console.log(response);
                // this.postsChanged.next(this.posts.slice());
                this.router.navigate(["/"]);
            }, (err)=>{
                console.log(err);
            });
    }

}