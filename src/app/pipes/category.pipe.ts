import { Pipe, PipeTransform } from '@angular/core';
import { ExpenseInterface } from '../interfaces/expenseInterface';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: ExpenseInterface[], type: string): any {
    if(type === "all" || type === undefined){
      return value;
    }else{
      return value.filter(val => val.Type === type)
    }  
  }

}
