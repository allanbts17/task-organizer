import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { ApiService } from 'src/app/services/api.service';
import { ObservablesService } from 'src/app/services/observables.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  @Output() taskSelected = new EventEmitter<Task>()
  colorList = [
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose'
  ]
  constructor(public apiService: ApiService, public obs: ObservablesService) { }

  ngOnInit() {
    this.colorList = this.getShuffledArr(this.colorList)
    this.subscribeToTasks()
  }

  getShuffledArr (arr){
    return [...arr].map( (_, i, arrCopy) => {
        var rand = i + ( Math.floor( Math.random() * (arrCopy.length - i) ) );
        [arrCopy[rand], arrCopy[i]] = [arrCopy[i], arrCopy[rand]]
        return arrCopy[i]
    })
}

  fillColors(){
    let aux = Object.assign([],this.colorList)
    for(const ind in this.apiService.allTasks){
      let color = aux.pop()
      if(color === undefined){
        aux = Object.assign({},this.colorList)
        color = aux.pop()
      }
      this.apiService.allTasks[ind].color = `bg-${color}-500`
    }
  }

  subscribeToTasks() {
    const incomingTasks = (data) => {
      if(data === undefined) return;
      this.fillColors()
    }
    incomingTasks(this.apiService.initTasks())
    this.apiService.tasksObs.subscribe(data => {
      incomingTasks(data)
    })
  }

}
