import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";

@Injectable()
export class PostService{
    posts: Post[] = [
        // {title: "Title1", description: "Description Description"},
        // {title: "Title2", description: "Description Description"}
    ];

    postsChanged = new Subject<Post[]>();

    constructor(private http: HttpClient, private router:Router){}

    getPost(index:number){
        return this.posts[index];
    }

    getPosts(){
        console.log("Inside getPosts()");
        this.http.get<{message: string, posts: any}>("http://localhost:3000/api/posts")
            .pipe(map((postsData)=>{
                return postsData.posts.map((post)=>{
                    return {
                        title: post.title,
                        description: post.description,
                        id: post._id
                    };
                });
            }))
            .subscribe((posts)=>{
                console.log("Inside getPosts() http");
                this.posts = posts;
                this.postsChanged.next(this.posts.slice());
                console.dir(this.posts);
            });
        // return this.posts.slice();
    }

    addPosts(post: Post){
        this.http.post<{message:string, post: Post}>("http://localhost:3000/api/posts", post)
            .subscribe((response)=>{
                this.posts.push(post);
                this.postsChanged.next(this.posts.slice());
                this.router.navigate(["/"]);
            });
    }

    removePost(index: number){
        let id = this.posts[index].id;
        this.http.delete<{message:string, post:Post}>("http://localhost:3000/api/posts/"+id)
            .subscribe(()=>{
                this.posts.splice(index,1);
                this.postsChanged.next(this.posts.slice());
            });
    }

    updatePost(index:number, post:Post){
        let id = this.posts[index].id;
        this.http.put<{message:string, post: Post}>("http://localhost:3000/api/posts/"+id, post)
            .subscribe((response)=>{
                this.posts[index] = {
                    id: response.post.id,
                    title: response.post.title,
                    description: response.post.description
                };
                this.postsChanged.next(this.posts.slice());
                this.router.navigate(["/"]);
            });
    }

}