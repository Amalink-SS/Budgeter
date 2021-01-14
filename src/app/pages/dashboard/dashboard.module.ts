import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryPipe } from 'src/app/pipes/category.pipe';
import { pipe } from 'rxjs';


@NgModule({
  declarations: [DashboardComponent,CategoryPipe],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:'', component:DashboardComponent}]),
    IonicModule,
    SharedModule,
  ],
})

export class DashboardModule { }
