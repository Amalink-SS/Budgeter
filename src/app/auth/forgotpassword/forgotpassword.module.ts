import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotpasswordRoutingModule } from './forgotpassword-routing.module';
import { ForgotpasswordComponent } from './forgotpassword.component';
import { AppformsModule } from 'src/app/core/modules/appforms.module';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [ForgotpasswordComponent],
  imports: [
    CommonModule,
    ForgotpasswordRoutingModule,
    AppformsModule,
    IonicModule
  ]
})
export class ForgotpasswordModule { }
