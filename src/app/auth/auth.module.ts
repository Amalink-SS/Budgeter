import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthComponent } from './auth.component';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';


@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        IonicModule,
        AngularFireAuthModule
  ],
  providers: [
    AngularFireAuth,
],
})
export class AuthModule { }
