import { Component } from '@angular/core';
import { ObservablesService } from '../services/observables.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  toogleUnSelect = true
  toogleSave = true
  constructor(private obs: ObservablesService) {}

  clearSel(){
    this.obs.doClearScheduleSelection()
  }

  save(){
    this.obs.doSaveScheduleChanges()
  }

}
