import { Injectable } from '@angular/core';
import { ExpenseInterface } from 'src/app/interfaces/expenseInterface';
import { DataService } from '../data/data.service';
import { DateService } from '../date/date.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

 // demoExpense : ExpenseInterface;

  constructor(private dataservice : DataService ,
     private storageservice : StorageService , private dateservice : DateService ) {
   
   }

   async createExpense(expense : ExpenseInterface) : Promise<void> {
    return await this.storageservice.saveExpenseToLocal(expense).then().catch();
     
   }
   async getCurrentExpensesFromLocal() : Promise<ExpenseInterface[]> {
     return await this.storageservice.getExpenseFromStorage().then((expenses : ExpenseInterface[]) => {
       return expenses;
     })
   }

   async getExpensesByDateFromLocal(date:Date): Promise<void> {
     return this.storageservice.getExpenseFromStorage(date).then((expenses : ExpenseInterface[]) => {
          this.dataservice.setExpenses(expenses);
     })
   }
   
}
