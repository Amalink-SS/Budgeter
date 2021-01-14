import { Injectable } from '@angular/core';
import { Budget } from 'src/app/interfaces/budgetinterface';
import { ExpenseInterface } from 'src/app/interfaces/expenseInterface';
import { ShoppinglistInterface } from 'src/app/interfaces/shoppinglistinterface';
import { DataService } from '../data/data.service';
import { DateService } from '../date/date.service';
import { AddItemServiceService } from '../storage/add-item-service.service';
import { BudgetstorageService } from '../storage/budgetstorage.service';
import { ExpenseStorageService } from '../storage/expense-storage.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

 // demoExpense : ExpenseInterface;

  constructor(private dataservice : DataService ,
     private expensestorageservice : ExpenseStorageService  , private dateservice : DateService ,
     private additemservice : AddItemServiceService,private budgetstorage: BudgetstorageService) {
       this.getCurrentExpensesFromLocal();
       this.getCurrentItemFromLocal();
       this.getCurrentBudgetFromLocal()
   
   }

   async createExpense(expense : ExpenseInterface) : Promise<void> {
    return await this.expensestorageservice.saveExpenseToLocal(expense).then().catch();
     
   }

   async createBudget(budget : Budget) : Promise<void> {
    return await this.budgetstorage.saveToLocal(budget).then().catch();
     
   }

   async createitem(item : ShoppinglistInterface) : Promise<void> {
    return await this.additemservice.saveItemToLocal(item).then().catch();
     
   }
   async getCurrentExpensesFromLocal() : Promise<void> {
     return await this.expensestorageservice.getExpenseFromStorage().then((expenses : ExpenseInterface[]) => {
       this.dataservice.setExpenses(expenses);
     })
   }

   async getCurrentItemFromLocal() : Promise<void> {
    return await this.additemservice.getItemFromStorage().then((items : ShoppinglistInterface[]) => {
      this.dataservice.setItems(items);
    })
  }

  async getCurrentBudgetFromLocal() : Promise<void> {
    return await this.budgetstorage.getBudgetFromStorage().then((items : Budget[]) => {
      this.dataservice.setBudget(items);
    })
  }
  

   async getExpensesByDateFromLocal(date:Date): Promise<void> {
     return this.expensestorageservice.getExpenseFromStorage(date).then((expenses : ExpenseInterface[]) => {
          this.dataservice.setExpenses(expenses);
     })
   }
   
}
