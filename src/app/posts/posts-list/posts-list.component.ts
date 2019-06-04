import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  // isLoading = true;
  posts:Post[];
  // collapse = true;
  postLength:number;
  resultsPerPage=4;
  currentPage = 1;
  constructor(private postService:PostService, private router:Router,
    private authService:AuthService) { }

  ngOnInit() {
    // this.posts = 
    // console.log("post list initialized");
    // this.authService.autoAuthUser();
    this.postService.getPosts(this.resultsPerPage,this.currentPage);

    this.postService.postsChanged.subscribe((postData)=>{
      // console.log("postslist:postData"+postData);
      this.posts = postData.posts;
      this.postLength = postData.postsLength
    });

  }

  

}
