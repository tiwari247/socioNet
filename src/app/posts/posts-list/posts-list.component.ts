import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  isLoading = true;
  posts:Post[];
  constructor(private postService:PostService, private router:Router) { }

  ngOnInit() {
    // this.posts = 
    // console.log("post list initialized");
    this.postService.getPosts();

    this.postService.postsChanged.subscribe((posts)=>{
      this.posts = posts;
      this.isLoading = false;
    });

  }

  onEdit(index:number){
    // console.log(index);
    this.router.navigate(["/edit", index]);
  }

  onDelete(index:number){
    console.log(index);
    this.postService.removePost(+index);
  }

}
