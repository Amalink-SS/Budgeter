import { Component, OnDestroy, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular'
import { BehaviorSubject, SubscriptionLike } from 'rxjs';
import { ExpenseInterface } from 'src/app/interfaces/expenseInterface';
import { ActionService } from 'src/app/services/action/action.service';
import { DataService } from 'src/app/services/data/data.service';
import { DateService } from 'src/app/services/date/date.service';
import { AddExpenseComponent } from 'src/app/shared/components/add-expense/add-expense.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit , OnDestroy {
    
   expenses : ExpenseInterface[];
   installDate : Date;
  selectedDate: Date;
  dateSubscription : SubscriptionLike;
  maxdate : Date;

  constructor(private modalcontroller : ModalController,
    private dataservice : DataService,
    private actionservice : ActionService,
    private dateservice : DateService) {
      actionservice.getCurrentExpensesFromLocal().then((expense) => 
        this.expenses = expense
      )
      this.installDate =dateservice.installDate;
      this.maxdate = dateservice.getCurrentDate();
      
    
     }

  ngOnInit() {
    this.dateSubscription = this.dateservice.getSelectedDateSubs()
        .subscribe({
          next: (date:Date) => {
            this.selectedDate = date;
          },   
          error : (err) => {
            console.log(err)
          },
          complete: () => {}
        })
    this.dataservice.getExpenseSubscription()
    .subscribe({ next : (expense : ExpenseInterface[]) => {
      if(expense != null){
       this.expenses = expense;
      }else{
        this.expenses = [];
      }
      console.log(this.expenses)
    },
    error : (err) => {},
    complete: () => {}
  });
  }

  async presentModal(){
    const modal = await this.modalcontroller.create({
      component : AddExpenseComponent
    });
    return await modal.present();
  }

  ngOnDestroy() : void {

  }
  changeSelectedDate(value):  void {
    this.selectedDate = this.dateservice.createDateFromString(value);
    this.dateservice.setSelectedDate(value).then(() => {
      this.actionservice.getExpensesByDateFromLocal(this.selectedDate);
    })

  }

  setCurrentTotodayDate(): void{
    this.dateservice.setSelectedDate(this.dateservice.getCurrentDate()).then(() => {
      this.actionservice.getExpensesByDateFromLocal(this.dateservice.getCurrentDate());
    })
  }

}
