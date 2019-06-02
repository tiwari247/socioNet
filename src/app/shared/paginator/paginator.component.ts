import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/posts/post.model';
import { PostService } from 'src/app/posts/post.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() posts:Post[];
  @Input() postLength;
  @Input() resultsPerPage;
  page = 1;
  numOfPages;
  pagesArr:[] = [];
  currentPage = 1;
  
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.numOfPages = Math.ceil(this.postLength/this.resultsPerPage);
    console.log(this.numOfPages);
    this.pagesArr.length = this.numOfPages;
  }

  onClick(currentPage:number){
    this.currentPage = currentPage;
    this.postService.getPosts(this.resultsPerPage, currentPage);
  }

}
