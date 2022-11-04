import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { ObservablesService } from 'src/app/services/observables.service';

@Component({
  selector: 'app-schedule-row',
  templateUrl: './schedule-row.component.html',
  styleUrls: ['./schedule-row.component.scss'],
})
export class ScheduleRowComponent implements OnInit {
  @Input() hour
  selectArray = {
    domingo: false,
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false
  }
  allSelect = false

  colorArray = {
    domingo: '',
    lunes: '',
    martes: '',
    miercoles: '',
    jueves: '',
    viernes: '',
    sabado: ''
  }
  constructor(private obs: ObservablesService) {
    obs.newTask.subscribe(task => {
      if (task !== undefined) {
        // entry => [key,value] => [day,selected]
        let entries = Object.entries(this.selectArray)
        entries.forEach(entry => {
          if (entry[1]) {
            this.hour[entry[0]] = task.tarea
            this.colorArray[entry[0]] = task.color
          }
        })
      } else {
        let entries = Object.entries(this.selectArray)
        entries.forEach(entry => {
          if (entry[1]) {
            this.hour[entry[0]] = ''
            this.colorArray[entry[0]] = ''
          }
        })
      }
      this.unSelectAll();
    })
  }

  ngOnInit() { }

  format(date, pattern) {
    return format(new Date(date), pattern)
  }

  changeSel(day: string) {
    this.selectArray[day] = !this.selectArray[day]
    this.allSelect = false
    // console.log(this.selectArray[day])
  }

  changeAllSel() {
    this.allSelect = !this.allSelect
    for (let day in this.selectArray)
      this.selectArray[day] = this.allSelect
  }

  unSelectAll() {
    this.allSelect = false
    for (let day in this.selectArray)
      this.selectArray[day] = this.allSelect
  }



}
