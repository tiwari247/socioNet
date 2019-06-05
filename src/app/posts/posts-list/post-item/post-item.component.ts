import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../../post.model';
import { Router } from '@angular/router';
import { PostService } from '../../post.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit, OnDestroy {
  @Input() post:Post;
  @Input() index:number;
  @Input() resultsPerPage:number;
  @Input() currentPage:number;
  userId;
  collapse = true;
  isAuthenticated = false;
  subscription:Subscription;

  constructor(private router:Router, 
    private postService:PostService,
    private authService:AuthService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    // console.log("PostItem-isAuth: "+this.authService.isAuthenticated())
    // console.log("PostItem-userId: "+this.authService.getUserId())
    this.isAuthenticated =  this.authService.isAuthenticated();
    this.subscription = this.authService.getAuthStatusChanged()
      .subscribe((isAuth)=>{
        this.isAuthenticated = isAuth;
        // this.userId = this.authService.getUserId();
      });
      this.postService.postsChanged.subscribe((postData)=>{
        // console.log(postData.posts);
        // this.posts = postData.posts;
        // this.postLength = postData.postsLength
      });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onEdit(index:number){
    // console.log(index);
    this.router.navigate(["/post","/edit", index]);
  }

  onDelete(index:number){
    console.log(index);
    this.postService.removePost(+index).subscribe((response)=>{ 
      this.postService.getPosts(this.resultsPerPage,this.currentPage);   
    }, (err)=>{
      console.log(err);
    });
  }

  onClickList(){
    this.collapse = !this.collapse;
  }

  

}
