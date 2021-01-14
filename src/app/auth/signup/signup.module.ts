import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { IonicModule } from '@ionic/angular';
import { AppformsModule } from 'src/app/core/modules/appforms.module';
import { SignupComponent } from './signup.component';


@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    AppformsModule,
    IonicModule 
  ]
})
export class SignupModule { }
