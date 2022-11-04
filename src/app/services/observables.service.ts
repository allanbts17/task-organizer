import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class ObservablesService {
  newTask: Subject<Task> = new Subject<Task>();

  constructor() { }

  selectNewTask(task?: Task){
    this.newTask.next(task);
  }

}
