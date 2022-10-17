import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Task } from 'src/app/interfaces/task';

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.scss'],
})
export class NewTaskFormComponent implements OnInit {
  newTask: Task = {
    tarea: '',
    domingo: 0,
    lunes: 0,
    martes: 0,
    miercoles: 0,
    jueves: 0,
    viernes: 0,
    sabado: 0,
    total: 0
  }
  //nsewTask: Task
  constructor(private apiService: apiService,
    private alert: AlertController,
    public modalCtrl: ModalController) { }

  ngOnInit() {}

  saveNewTask(){
    this.completeTask()
    this.apiService.createTask(this.newTask)
    .then((newTask) => {
      this.modalCtrl.dismiss({newTask: true})
      console.log(newTask);
    });
  }

  closeModal(){
    this.modalCtrl.dismiss()
  }

  completeTask(){
    let values = Object.values(this.newTask)
    let sum = 0;
    values.forEach(value => {
      if(typeof value == 'number')
        sum += value
    })
    this.newTask.total = sum;
  }

}
