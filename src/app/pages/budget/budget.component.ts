import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Console } from 'console';
import { SubscriptionLike } from 'rxjs';
import { ExpenseInterface } from 'src/app/interfaces/expenseInterface';
import { DataService } from 'src/app/services/data/data.service';
import { DateService } from 'src/app/services/date/date.service';
import { AddbudgetComponent } from 'src/app/shared/components/addbudget/addbudget.component';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
})
export class BudgetComponent implements OnInit {
   value: number
  allocated : number
  difference : number
  identifier : string
  updatedBudget : number
  date:Date;
  totalBudgetSubscription: SubscriptionLike;
  usedFundsSubs : SubscriptionLike
  constructor(private dateservice : DateService,private modalController: ModalController,
    private dataservice : DataService) { 
     this.date = dateservice.getCurrentDate();
    // this.value = dataservice.calculateTotalExpense(this.expense)
    //this.allocated = 
	this.value ;
	this.allocated;
	this.difference;
  this.identifier;
  this.updatedBudget;
  }

  ngOnInit() {

    this.totalBudgetSubscription = this.dataservice.getTodayTotalBudget()
        .subscribe({
          next: (count: number) => {
            this.value = count;
           // console.log(this.value)
            //console.log(typeof(this.value))
          },   
          error : (err) => {
            console.log(err)
          },
          complete: () => {}
        })

    this.usedFundsSubs = this.dataservice.getTodayTotalExpense()
        .subscribe({
          next: (count: number) => {
           // console.log(count)
		   	this.allocated = count;
        this.difference = this.value - this.allocated;
        this.updatedBudget = Math.abs(this.difference);
        if(this.difference < 0){
          console.log(this.difference)
          return this.identifier = "You are beyond your budget"
        }else
          return this.identifier = "You maintained your budget"
        

          },   
          error : (err) => {
            console.log(err)
          },
          complete: () => {}
        })


      
     
    // console.log("the balance",this.difference) 
  }

  async presentModal(){
    const modal = await this.modalController.create({
      component : AddbudgetComponent
    });
    return await modal.present();
  }

}
