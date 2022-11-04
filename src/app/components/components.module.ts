import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheduleComponent } from './shedule/shedule.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TasksComponent } from './tasks/tasks.component';
import { NewTaskFormComponent } from './new-task-form/new-task-form.component';
import { ScheduleRowComponent } from './schedule-row/schedule-row.component';
import { SideBarComponent } from './side-bar/side-bar.component';


const components = [
  SheduleComponent,
  TasksComponent,
  NewTaskFormComponent,
  ScheduleRowComponent,
  SideBarComponent,
]

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [
    CommonModule,
    FormsModule,

    IonicModule
  ]
})
export class ComponentsModule { }
