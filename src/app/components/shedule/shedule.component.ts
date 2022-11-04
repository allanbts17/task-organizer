import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { addMinutes } from 'date-fns'
import { Hour } from 'src/app/interfaces/hour';
import { format } from 'date-fns'

const hoursQuantity = 37
const startingHour = new Date(0, 0, 0, 6, 0, 0)
@Component({
  selector: 'app-shedule',
  templateUrl: './shedule.component.html',
  styleUrls: ['./shedule.component.scss'],
})
export class SheduleComponent implements OnInit {
  hours = []
  // test = {hora: new Date(),domingo:'Juego',lunes:'Salsa',martes:'',miercoles:'Piano',jueves:'Table',viernes:'Mono',sabado:'bebe'}
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getSchedule()
  }

  addData(){
    //this.createTask()
  }

  getSchedule() {
    this.apiService.getSchedule()
    .then((hours) => {
      let date
      let difference = hoursQuantity - hours.length
      console.log(difference,hours)
      if(hours.length > 0){
        date = new Date(hours[-1].hora)
      } else {
        date = startingHour
      }
      let nextHours: Hour[] = this.fillNextHours(date,difference)
      this.hours = <Hour[]>hours.concat(nextHours)
      console.log(this.hours);
    });
  }

  fillNextHours(startHour: Date, quantity: number): Hour[]{
    let arr = [this.getEmptyHour(startHour)]
    let dateArr = [startHour]
    for(let i=1;i<quantity;i++){
      let add = addMinutes(dateArr[i-1], 30)
      arr.push(this.getEmptyHour(add))
      dateArr.push(add)
    }
    return arr
  }

  getEmptyHour(date: Date): Hour{
    return {
      hora: date.toISOString(),
      domingo: '',
      lunes: '',
      martes: '',
      miercoles: '',
      jueves: '',
      viernes: '',
      sabado: ''
    }
  }

  format(date,pattern){
    return format(new Date(date),pattern)
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
