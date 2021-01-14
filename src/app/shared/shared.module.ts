import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AddactivityComponent } from './components/addactivity/addactivity.component';
import { AddbudgetComponent } from './components/addbudget/addbudget.component';



@NgModule({
  declarations: [AddExpenseComponent,AddactivityComponent,AddbudgetComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
 entryComponents : [
   AddExpenseComponent,
   AddactivityComponent,
   AddbudgetComponent
 ]
})
export class SharedModule { }
