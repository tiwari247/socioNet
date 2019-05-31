import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit {
  arrData;
  locations;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    
    this.dataService.getData().subscribe((response)=>{
      this.arrData = response as string[];
      this.locations = this.arrData.data.locations;
      console.log(this.locations);
    });
  }

}
