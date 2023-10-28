import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { addMinutes } from 'date-fns'
import { Hour } from 'src/app/interfaces/hour';
import { format } from 'date-fns'
import { ObservablesService } from 'src/app/services/observables.service';

const hoursQuantity = 37
const startingHour = new Date(0, 0, 0, 6, 0, 0)
@Component({
  selector: 'app-shedule',
  templateUrl: './shedule.component.html',
  styleUrls: ['./shedule.component.scss'],
})
export class SheduleComponent implements OnInit {
  hours: Hour[] = []
  canFill = true
  // test = {hora: new Date(),domingo:'Juego',lunes:'Salsa',martes:'',miercoles:'Piano',jueves:'Table',viernes:'Mono',sabado:'bebe'}
  constructor(private apiService: ApiService,
    public obs: ObservablesService) { }

  ngOnInit() {
    this.subscribeToSchedule()
  }

  addData(){
    //this.createTask()
  }

  taskSelected(ev: any){
    if(ev !== undefined){

    }
  }

  subscribeToSchedule(){
    this.apiService.initSchedule()
    this.apiService.hoursObs.subscribe(hours => {
      let date
      let difference = hoursQuantity - hours.length
      if(hours.length > 0){
        date = new Date(hours[hours.length-1].hora)
      } else {
        date = startingHour
      }
      let nextHours: Hour[] = this.fillNextHours(date,difference)

      if(difference > 0){
        for(let hour of nextHours){
          this.apiService.hoursObs.unsubscribe()
          this.apiService.createHour(hour)
        }
        this.subscribeToSchedule()
      }
      this.hours = <Hour[]>hours.concat(nextHours)
      this.hours.sort((hrA:Hour,hrB:Hour) => {
        return new Date(hrA.hora).getTime() - new Date(hrB.hora).getTime()
      })
      // console.log('from observer',this.hours);
    })
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

  format(date: string,pattern: string){
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
