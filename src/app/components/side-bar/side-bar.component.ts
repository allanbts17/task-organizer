import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {

  constructor(public api: ApiService) { }

  ngOnInit() {
    if(this.api.allTasks === undefined){
      this.api.initTasks()
    }
  }

}
