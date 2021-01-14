import { Injectable } from '@angular/core';
import {Plugins} from '@capacitor/core';
import { ExpenseInterface } from 'src/app/interfaces/expenseInterface';
import { DataService } from '../data/data.service';
import { DateService } from '../date/date.service';
import { StorageService } from './storage.service';

 

@Injectable({
  providedIn: 'root'
})
export class ExpenseStorageService {

  constructor(private dateservice :DateService, private dataservice : DataService, 
    private storageservice : StorageService) { }

  async saveExpenseToLocal(expense : ExpenseInterface) : Promise<void>{
    const key  = this.dateservice.StringDate(expense.CreatedOn);
    let todaysExpense : ExpenseInterface[] = [];
   return await this.storageservice.getObject(key).then((expenses : ExpenseInterface[]) => {
      //debugger;
      if(expenses == null){
        todaysExpense.push(expense);
      }
      else{
      todaysExpense = expenses;
      todaysExpense.push(expense);
    }

    }).then(() => {
             this.storageservice.setObject(key,todaysExpense).then(() => {
              this.dataservice.setExpenses(todaysExpense); 
              });
            
    }).catch((err) => {
      console.log(err)
    })
  }

  async getExpenseFromStorage(date ?) : Promise<ExpenseInterface[]> {
    const key = date ? this.dateservice.StringDate(date) : this.dateservice.StringDate();
    return await this.storageservice.getObject(key).then((expenses : ExpenseInterface[]) => {
      return expenses;
    });
  }

async keys() {
  const { keys } = await Plugins.Storage.keys();
  console.log('Got keys: ', keys);
}


}
