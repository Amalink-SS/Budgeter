import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { from } from 'rxjs';
import {FormGroup , FormControl, Validators} from '@angular/forms'
import { ActionService } from 'src/app/services/action/action.service';
import { DateService } from 'src/app/services/date/date.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {

  addExpenseForms = new FormGroup({
    Amount : new FormControl('', Validators.required),
    Description : new FormControl(''),
    Type : new FormControl('', Validators.required)
 });

  constructor(private modalcontroller:ModalController ,
     private actionservice : ActionService , 
     private date : DateService) { 
   // actionservice.testFunc();
  }

  ngOnInit() {
    console.log(this.addExpenseForms.value);
  }

  initCreateExpense() : void {
    const expense = this.addExpenseForms.value;
    this.date.getselectedDate().then((date: Date) =>{
      if(!expense.CreatedOn){
        expense.CreatedOn = date;
      }
    }).then(() =>{
         
    this.actionservice.createExpense(expense).then(() => {
      console.log('expense was created');
      this.dismissModal();
    }).catch((err) => {console.log(err)})

    })
     
  }

  dismissModal(){
    this.modalcontroller.dismiss().then().catch();
  }

}
