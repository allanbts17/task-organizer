import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../interfaces/task';
import { Hour } from '../interfaces/hour';
import { HTTP_OPTIONS } from './header.config'

@Injectable({
  providedIn: 'root'
})
export class apiService {
 // private api = 'https://jsonplaceholder.typicode.com';
 // private category = 'todos';

 private api = 'https://blooming-stream-92170.herokuapp.com/api';
 private category = 'horarios';
 private task = 'tasks';
 private schedule = 'horarios';

  constructor(private http: HttpClient) { }

  getAllTasks() {
    const path = `${this.api}/${this.task}/`;
    /*var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im45N2VRbl81MTdTalEyeWdBdkpOYyJ9.eyJpc3MiOiJodHRwczovL2Rldi1meDZwcXJocy51cy5hdXRoMC5jb20vIiwic3ViIjoiMjA3SXg1em1yTDBkQkdlQ2pjRGlXZHBubUFWWG41cHlAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vbGFyYXZlbC1zaGVkdWxlLWFwaSIsImlhdCI6MTYzNjYwNDQ4NiwiZXhwIjoxNjM2NjkwODg2LCJhenAiOiIyMDdJeDV6bXJMMGRCR2VDamNEaVdkcG5tQVZYbjVweSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.YM2zNmyviRiFJm1mNmtm7FdB4z9UlMPnG8Hvy5q3sgtVeVBLm1alOw0GOMSdIyOb8wFuQwiTekifeMAteLGtqlBv5_VulRdZUYDMgClzW1kAEE6AQislFvEF8P_IAf_xxTFC4TWVpqbSpJVR86SBjQHhIE9vAPRAT8thBU42gWdEJNcrU42vxJkzqcf7I70DdZ2MyNgnDIEAnZBddTkMqMnJyOsbeSU4DyXv03ejepW6_jS_MY-opFikcRv9ON7lJVv6y1ok4k8dIAvyEUwVDN0zK7rXQAnw4x6Fei_YPgrivYyuz36Rh0-YfdnySNwdkBV4uQxuhNz0uTfpv0V66g'
   });*/
  return this.http.get<Task[]>(path);
  }

  getSchedule(){
    const path = `${this.api}/${this.schedule}/`;
    return this.http.get<Hour[]>(path);
  }

  getHour(id: string){
    const path = `${this.api}/${this.schedule}/${id}`;
    return this.http.get<Hour>(path);
  }

  getTask(id: string) {
    const path = `${this.api}/${this.task}/${id}`;
    return this.http.get<Task>(path);
  }

  createHour(hour: Hour) {
    const path = `${this.api}/${this.schedule}`;
    return this.http.post(path, hour);
  }

  createTask(task: Task) {
    const path = `${this.api}/${this.task}`;
    return this.http.post(path, task);
  }

  updateHour(hour: Hour) {
    const path = `${this.api}/${this.schedule}/${hour.id}`;
    return this.http.put<Hour>(path, hour);
  }

  updateTask(task: Task) {
    const path = `${this.api}/${this.task}/${task.id}`;
    return this.http.put<Task>(path, task);
  }

  deleteHour(id: string) {
    const path = `${this.api}/${this.schedule}/${id}`;
    return this.http.delete(path);
  }

  deleteTask(id: string) {
    const path = `${this.api}/${this.task}/${id}`;
    return this.http.delete(path);
  }
}
