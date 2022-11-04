import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';

@Component({
  selector: 'app-schedule-row',
  templateUrl: './schedule-row.component.html',
  styleUrls: ['./schedule-row.component.scss'],
})
export class ScheduleRowComponent implements OnInit {
  @Input() hour
  selectArray = {
    hour: false,
    dom: false,
    lun: false,
    mar: false,
    mie: false,
    jue: false,
    vie: false,
    sab: false
  }
  constructor() { }

  ngOnInit() {}

  format(date,pattern){
    return format(new Date(date),pattern)
  }

  changeSel(day: string){
    this.selectArray[day] = !this.selectArray[day]
    this.selectArray.hour = false
    // console.log(this.selectArray[day])
  }

  changeAllSel(){
    this.selectArray.hour = !this.selectArray.hour
    for(let day in this.selectArray)
      this.selectArray[day] = this.selectArray.hour
  }



}
