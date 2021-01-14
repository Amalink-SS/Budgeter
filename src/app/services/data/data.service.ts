import { Injectable } from '@angular/core';
import { random } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Budget } from 'src/app/interfaces/budgetinterface';
import { ExpenseInterface } from 'src/app/interfaces/expenseInterface';
import { ShoppinglistInterface } from 'src/app/interfaces/shoppinglistinterface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly _expenses : BehaviorSubject<ExpenseInterface[]>;
  private readonly _budget : BehaviorSubject<Budget[]>;
  private readonly _additem : BehaviorSubject<ShoppinglistInterface[]>;
  private readonly _todayTotalExpense : BehaviorSubject<number>;
  private readonly _todayTotalItems : BehaviorSubject<number>;
  private readonly _todayTotalBudget : BehaviorSubject<number>;

  constructor() {
    this._expenses = new BehaviorSubject<ExpenseInterface[]>(null);
    this._todayTotalExpense = new BehaviorSubject<number>(0);
    this._additem = new BehaviorSubject<ShoppinglistInterface[]>(null)
    this._todayTotalItems = new BehaviorSubject<number>(0)
    this._budget = new BehaviorSubject<Budget[]>(null);
    this._todayTotalBudget = new BehaviorSubject<number>(0)
   }

   getTodayTotalExpense(): BehaviorSubject<number>{
     return this._todayTotalExpense;
   }

   async setTodayTotalExpense(total : number): Promise<void>{
       return this._todayTotalExpense.next(total);
   }

   getTodayTotalItems(): BehaviorSubject<number>{
    return this._todayTotalItems;
  }

  async setTodayTotalItems(total : number): Promise<void>{
      return this._todayTotalItems.next(total);
  }

  async setTodayTotalBudget(total : number): Promise<void>{
    return this._todayTotalBudget.next(total);
}

getTodayTotalBudget(): BehaviorSubject<number>{
  return this._todayTotalBudget;
}

  async getExpenses(): Promise< ExpenseInterface[]> {
    return this._expenses.getValue();
  }

  async setExpenses(expenses : ExpenseInterface[]): Promise<void> {
    if(expenses)
      this.setTodayTotalExpense(this.calculateTotalExpense(expenses))
   return this._expenses.next(expenses);
  }
  

  async getBudget(): Promise<Budget[]> {
    return this._budget.getValue();
  }
  
  async setBudget(total : Budget[]): Promise<void>{
    if(total)
    this.setTodayTotalBudget(this.calculateBudget(total))
    this._budget.next(total);
}
  

  async getItems(): Promise< ShoppinglistInterface[]> {
    return this._additem.getValue();
  }

  async setItems(items : ShoppinglistInterface[]): Promise<void> {
    if(items)
      this.setTodayTotalItems(this.calculateTotalItems(items))
   return this._additem.next(items);
  }
  getExpenseSubscription() : BehaviorSubject<ExpenseInterface[]>{
    return this._expenses;
  }

  getItemSubscription() : BehaviorSubject<ShoppinglistInterface[]>{
    return this._additem;
  }

  calculateTotalExpense(expenses : ExpenseInterface[]): number {
    let total = 0;
    for(const expense of expenses){
      total += expense.Amount;
    }
    return total
 }

 calculateBudget(budget : Budget[]): number {
  let total = 0;
  for(const bud of budget){
    total += bud.AllocatedAmount;
  }
  return total
}

 calculateTotalItems(items : ShoppinglistInterface[]): number {
  //let total = 0;
  let count = 0;
  for(const item of items){
    count += item.quantity; 
  }
  return count
}

 randomKeys() : string {
   return 'tea' 
 }

 randomKey() : string {
  return 'coffee' 
}
  
}
