import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-shedule',
  templateUrl: './shedule.component.html',
  styleUrls: ['./shedule.component.scss'],
})
export class SheduleComponent implements OnInit {
  hours = []

  constructor(private apiService: apiService) { }

  ngOnInit() {
    //this.createTask()
   //this.deleteTask('6')
   //this.updateTask()
    this.getSchedule()
  }

  addData(){
    //this.createTask()
  }

  getSchedule() {
    this.apiService.getSchedule()
    .then((hours) => {
      this.hours = <any>hours
      console.log(this.hours);
    });
  }

  getHour() {
    this.apiService.getHour('2')
    .then(hour => {
      console.log(hour);
    });
  }
 /* fill(){
    const task = {
      hora: '8:00 AM',
      domingo: 'Tareas casa',
      lunes: 'Ejercicio',
      martes: 'Tesis',
      miercoles: 'Ejercicio',
      jueves: 'Ejercicio',
      viernes: 'Tesis',
      sabado: 'Lectura cristiana'
    };
    this.apiService.createTask(task)
    .subscribe((newTask) => {
      console.log(newTask);
    });
  }*/
 /* createTask() {
    const task = {
      hora: '9:30 AM',
      domingo: 'Tareas casa',
      lunes: 'Tesis',
      martes: 'Tesis',
      miercoles: 'Tesis',
      jueves: 'Tesis',
      viernes: 'Tesis',
      sabado: 'Práctica piano'

    };
    this.apiService.createTask(task)
    .subscribe((newTask) => {
      console.log(newTask);
    });
  }

  updateTask() {
    const task = {
      id: 5,
      hora: '8:00 AM',
      domingo: 'Tareas casa',
      lunes: 'Ejercicio',
      martes: 'Tesis',
      miercoles: 'Ejercicio',
      jueves: 'Ejercicio',
      viernes: 'Tesis',
      sabado: 'Lectura cristiana'
    };
    this.apiService.updateTask(task)
    .subscribe(todo => {
      console.log(todo);
    });
  }

  deleteTask(id: string) {
    this.apiService.deleteTask(id)
    .subscribe((data) => {
      console.log(data);
    });
  }*/

}
