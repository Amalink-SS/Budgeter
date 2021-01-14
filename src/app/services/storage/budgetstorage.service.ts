import { Injectable } from '@angular/core';
import { Budget } from 'src/app/interfaces/budgetinterface';
import { ShoppinglistInterface } from 'src/app/interfaces/shoppinglistinterface';
import { DataService } from '../data/data.service';
import { DateService } from '../date/date.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetstorageService {

  constructor(
    private dateservice: DateService,
    private storageService: StorageService,
    private dataService: DataService
  ) { }


  async createBudget(budget: Budget[]): Promise<void> {
    const key =  this.dataService.randomKey().toString();
    let BudgetList: Budget[];
    this.storageService.getObject(key)
        .then((storedBudget) => {
            if (storedBudget == null) {
              BudgetList= budget;
            } else {
                BudgetList = storedBudget;
                BudgetList= budget;
            }
            return BudgetList;
        })
        .then(() => {
            this.storageService.setObject(key, BudgetList);
        })
        .then(() => {
           this.dataService.setBudget(BudgetList);
      })
      .catch((err) => console.log(err));

  }

  async saveToLocal(item : Budget) : Promise<void>{
    const key  =  this.dataService.randomKey()
    let todayBudget : Budget[] = [] 
   return await this.storageService.getObject(key).then((items : Budget[]) => {
      //debugger;
      if(items == null){
      todayBudget.push(item);
      }
      else{
        todayBudget = items;
        todayBudget.pop()
        todayBudget.push(item);
    }
   }).then(() => {
             this.storageService.setObject(key,todayBudget).then(() => {
              this.dataService.setBudget(todayBudget); 
              });
            
    }).catch((err) => {
      console.log(err)
    })
  }
 
  async getBudgetFromStorage(val ?: string) : Promise<Budget[]> {
    const key = this.dataService.randomKey()
    return await this.storageService.getObject(key).then((items : Budget[]) => {
      return items;
    });
  }

}
