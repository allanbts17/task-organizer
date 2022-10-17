import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { Hour } from '../interfaces/hour';
import { Observable } from 'rxjs';
import { collection, doc, getDocs, setDoc, getFirestore, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
const TASKS = 'Tasks';
const SCHEDULE = 'Schedule';

@Injectable({
  providedIn: 'root'
})

export class apiService {
  private tasksCollection: AngularFirestoreCollection<Task>;
  private scheduleCollection: AngularFirestoreCollection<Hour>;
  tasks: Observable<Task[]>;
  hours: Observable<Hour[]>;

  constructor(private afs: AngularFirestore) {
    this.tasksCollection = afs.collection<Task>(TASKS);
    this.scheduleCollection = afs.collection<Hour>(SCHEDULE);
    //this.tasks = this.tasksCollection.valueChanges();
    //this.hours = this.scheduleCollection.valueChanges();
  }

  async getAllTasks() {
    let taskArr = [];
   // return this.afs.collection(TASKS).get().toPromise()
    const querySnapshot = await this.afs.collection(TASKS).get().toPromise()
    querySnapshot.forEach((doc: any) => {
      taskArr.push({id:doc.id, ...doc.data()})
      //console.log(doc.id, " => ", doc.data());
    });
    return taskArr;
  }

  async getTask(id: string) {
    const querySnapshot = await this.afs.collection(TASKS).doc(id).get().toPromise()
    return querySnapshot.data();
  }

  async createTask(task: Task) {
    return await this.tasksCollection.add(task);
  }

  async updateTask(data: any, id: string) {
    const docRef = await this.tasksCollection.doc(id).update(data)// doc(collection(getFirestore(), TASKS));
    return docRef//updateDoc(docRef,data);
  }

  async deleteTask(id: string) {
    const docRef = await this.tasksCollection.doc(id).delete()
    return docRef
  }

  async getSchedule(){
    let sheduleArr = [];
    const docSnapshot = await this.afs.collection(SCHEDULE).get().toPromise()
    console.log('snap',docSnapshot)
    docSnapshot.forEach((doc: any) => {
      sheduleArr.push({id:doc.id, ...doc.data() })
    });
    return sheduleArr;
  }

  async getHour(id: string){
    const querySnapshot = await this.afs.collection(SCHEDULE).doc(id).get().toPromise()
    return querySnapshot.data();
  }

  async createHour(hour: Hour) {
    return await this.scheduleCollection.add(hour);
  }

  async updateHour(data: any,id: string) {
    const docRef = await this.scheduleCollection.doc(id).update(data)
    return docRef//await updateDoc(docRef,data);
  }

  async deleteHour(id: string) {
    const docRef = await this.scheduleCollection.doc(id).delete()
    return docRef//await deleteDoc(doc(getFirestore(), SCHEDULE, id));
  }


}
