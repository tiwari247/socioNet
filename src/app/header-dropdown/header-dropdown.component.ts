import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-header-dropdown',
  templateUrl: './header-dropdown.component.html',
  styleUrls: ['./header-dropdown.component.css']
})
export class HeaderDropdownComponent implements OnInit {
  
  constructor(private dataService:DataService) { }

  ngOnInit() {
    
  }

}
