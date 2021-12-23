import { Component, OnInit } from '@angular/core';
import { apiService } from 'src/app/services/api.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.scss'],
})
export class NewTaskFormComponent implements OnInit {
  newTask = {
    tarea: '',
    domingo: 0,
    lunes: 0,
    martes: 0,
    miercoles: 0,
    jueves: 0,
    viernes: 0,
    sabado: 0
  }
  constructor(private apiService: apiService,
    private alert: AlertController,
    public modalCtrl: ModalController) { }

  ngOnInit() {}

  saveNewTask(){
    this.apiService.createTask(this.newTask)
    .subscribe((newTask) => {
      this.modalCtrl.dismiss({newTask: true})
      console.log(newTask);
    });
  }

  closeModal(){
    this.modalCtrl.dismiss()
  }

}
