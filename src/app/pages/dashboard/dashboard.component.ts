import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActionSheetController, ModalController} from '@ionic/angular'
import { BehaviorSubject, SubscriptionLike } from 'rxjs';
import { ExpenseTypes } from 'src/app/constants/constants';
import { ExpenseInterface } from 'src/app/interfaces/expenseInterface';
import { ActionService } from 'src/app/services/action/action.service';
import { DataService } from 'src/app/services/data/data.service';
import { DateService } from 'src/app/services/date/date.service';
import { AddExpenseComponent } from 'src/app/shared/components/add-expense/add-expense.component';
import UserCredential = firebase.auth.UserCredential;
import {AuthService} from '../../auth/services/auth/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';

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
  expensetypes : any;

  totalSubscription: SubscriptionLike
  todayTotal : number
  filterbyPrice : boolean
  filterbyPriceUp : boolean

  userCreds: UserCredential;
  userCredsSubscription: SubscriptionLike;

  constructor(private modalcontroller : ModalController,
    private dataservice : DataService,
    private actionservice : ActionService,
    private dateservice : DateService,
    private actionsheetcontroler : ActionSheetController,
    private authService: AuthService,
    private fireAuth: AngularFireAuth,) {
      
      this.installDate =dateservice.installDate;
      this.maxdate = dateservice.getCurrentDate();
      this.expensetypes = ExpenseTypes;
        this.todayTotal = null

       // console.log(this.installDate)
     }

     

  ngOnInit() {
    this.totalSubscription = this.dataservice.getTodayTotalExpense()
        .subscribe({
          next: (total: number) => {
            this.todayTotal = total;
          },   
          error : (err) => {
            console.log(err)
          },
          complete: () => {}
        })
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

   priceFilter() : void {
     this.expenses = this.expenses.sort((a,b) => { 
      if(a.Amount > b.Amount) return this.filterbyPriceUp? 1:-1;
      
      if(b.Amount > a.Amount) return this.filterbyPriceUp? -1:1

      return 0;
      })
      this.filterbyPrice = true
      this.filterbyPriceUp = !this.filterbyPriceUp;
   }

 async presentfilterActionsheet(){
   const actionsheet = await this.actionsheetcontroler.create({
     header: 'filter' ,
     buttons : [
       {
        text: "Price",
        icon: "logo-usd",
        handler: () => {
         console.log('its that')
       }
      },
      { text: "Recent",
        icon: "",
        handler: () => {
         console.log('its that')
        }
      },
        { text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
           console.log('its that')
          }
        
        }
    ]
   });
   await actionsheet.present();
 }
 ngAfterViewInit(): void {
  this.fireAuth.authState.subscribe((res) => {
      console.log(res);
  });
 }

}
