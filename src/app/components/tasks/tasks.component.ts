import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { AlertController } from '@ionic/angular';
import { ThrowStmt } from '@angular/compiler';
//import  map   from 'underscore/modules/map.js'
import { map, omit } from 'underscore';
import { ModalController } from '@ionic/angular';
import { NewTaskFormComponent } from '../new-task-form/new-task-form.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks = []
  auxTasks = []
  toogleEdit = false
  canErase = false
  activeHours = 16
  hoursLeft = {
    domingo:this.activeHours,
    lunes:this.activeHours,
    martes:this.activeHours,
    miercoles:this.activeHours,
    jueves:this.activeHours,
    viernes:this.activeHours,
    sabado:this.activeHours,
  }
  taskCount = 0

  constructor(private apiService: apiService,
    private alert: AlertController,
    public modalCtrl: ModalController) { }

  ngOnInit() {
    this.getAllTasks()
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: NewTaskFormComponent,
      cssClass: 'my-custom-class'
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data?.newTask == true){
      this.getAllTasks()
    }
  }

  async deleteTaskAlert(id) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar tarea',
      message: '¿Seguro que quieres eliminar esta tarea?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.deleteTask(id)
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  eraseTask(){

  }

  enableErase(){
    this.toogleEdit = false
    this.canErase = !this.canErase
    if(!this.canErase)
      this.tasks.forEach(task => task.selected=false)
  }

  updateTotal(id){
    this.tasks[id]
    let sum = 0
    const times = Object.values(this.tasks[id]).slice(2,8);
    times.forEach(time => {
      sum += Number(time)
    })
    this.tasks[id].total = sum.toString()
    setTimeout(()=>this.updateHoursLeft(),200)
  }

  setHoursSum(day){
    let sum = 0
    this.tasks.forEach(task=>{
      sum += task[day]
    })
    return sum
  }

  updateHoursLeft(){
    this.hoursLeft = {
      domingo:this.activeHours-this.setHoursSum('domingo'),
      lunes:this.activeHours-this.setHoursSum('lunes'),
      martes:this.activeHours-this.setHoursSum('martes'),
      miercoles:this.activeHours-this.setHoursSum('miercoles'),
      jueves:this.activeHours-this.setHoursSum('jueves'),
      viernes:this.activeHours-this.setHoursSum('viernes'),
      sabado:this.activeHours-this.setHoursSum('sabado'),
    }
  }

  selectTask(i){
    let selected = this.tasks[i].selected
    this.tasks.forEach(task => task.selected=false)
    this.tasks[i].selected = true
    if(selected)
      this.deleteTaskAlert(this.tasks[i].id)
  }

  unselectAll(){
    this.tasks.forEach(task => task.selected=false)
  }

  unselectTask(i){
    console.log('blured')
    this.tasks[i].selected = false
  }

  getAllTasks() {
    this.apiService.getAllTasks().subscribe((tasks) => {
      this.auxTasks = tasks
      this.auxTasks.forEach((task)=>{
        console.log(task.lunes,typeof task.lunes)
        let sum = 0
        const times = Object.values(task).slice(2,9);
        times.forEach(time => {
          sum += Number(time)
        })
        task.total = sum.toString()
        task.selected = false
      })
      this.tasks = this.deepCopy(this.auxTasks)
      this.updateHoursLeft()
      console.log(this.tasks);
    });
  }

  cancelEdit(){
    this.tasks = this.deepCopy(this.auxTasks)
    this.updateHoursLeft()
    this.toogleEdit = false
  }

  deepCopy(array){
    return JSON.parse(JSON.stringify(array))
  }

  updateTask(task) {
    let newTask = omit(task,['selected','total'])
    console.log('new',newTask)
    this.apiService.updateTask(task)
    .subscribe(data => {
      this.taskCount++
      if(this.taskCount == this.tasks.length)
        this.toogleEdit = false
      //console.log(data);
    });
  }

  updateAllTasks(){
    this.tasks.forEach(task => this.updateTask(task))
  }

  deleteTask(id: number) {
    console.log(id,typeof id)
    this.tasks = this.deepCopy(this.tasks.filter(task=>task.id != id))
  /*  this.apiService.deleteTask(id)
    .subscribe((data) => {
      console.log(data);
    });*/
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
  }

  }*/

}
