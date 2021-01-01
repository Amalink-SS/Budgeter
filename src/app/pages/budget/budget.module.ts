import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetComponent } from './budget.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [BudgetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:'', component:BudgetComponent}])
  ]
})
export class BudgetModule { }
