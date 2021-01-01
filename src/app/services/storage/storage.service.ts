import { Injectable } from '@angular/core';
import {Plugins} from '@capacitor/core';
import { ExpenseInterface } from 'src/app/interfaces/expenseInterface';
import { DataService } from '../data/data.service';
import { DateService } from '../date/date.service';

 

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private dateservice :DateService, private dataservice : DataService) { }

  async saveExpenseToLocal(expense : ExpenseInterface) : Promise<void>{
    const key  = this.dateservice.StringDate(expense.CreatedOn);
    let todaysExpense : ExpenseInterface[] = [];
   return await this.getObject(key).then((expenses : ExpenseInterface[]) => {
      //debugger;
      if(expenses == null){
        todaysExpense.push(expense);
      }
      else{
      todaysExpense = expenses;
      todaysExpense.push(expense);
    }

    }).then(() => {
             this.setObject(key,todaysExpense).then(() => {
              this.dataservice.setExpenses(todaysExpense); 
              });
            
    }).catch((err) => {
      console.log(err)
    })
  }

  async getExpenseFromStorage(date ?) : Promise<ExpenseInterface[]> {
    const key = date ? this.dateservice.StringDate(date) : this.dateservice.StringDate();
    return await this.getObject(key).then((expenses : ExpenseInterface[]) => {
      return expenses;
    });
  }

// JSON "set" example
async setObject(key : string, value : any) {
 return await Plugins.Storage.set({
      key,
      value: JSON.stringify(value)
  });
}

// JSON "get" example
async getObject(key : string ) : Promise< any> {
  const ret = await Plugins.Storage.get({key});
  return JSON.parse(ret.value);
}

async setItem() {
  await Plugins.Storage.set({
    key: 'name',
    value: 'Max'
  });
}

async getItem() {
  const { value } = await Plugins.Storage.get({ key: 'name' });
  console.log('Got item: ', value);
}

async removeItem(key : string) : Promise<any> {
  return await Plugins.Storage.remove({ key });
}

async keys() {
  const { keys } = await Plugins.Storage.keys();
  console.log('Got keys: ', keys);
}

async clear(isReset ? : boolean) : Promise<void> {
 if(isReset){
   this.dataservice.setExpenses([]);
 }
  return await Plugins.Storage.clear();
}
}
