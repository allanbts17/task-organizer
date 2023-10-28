import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ComponentsModule } from '../components/components.module';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    ComponentsModule,
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideFirestore(() => getFirestore())
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
