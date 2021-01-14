import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, from } from 'rxjs';
import { StorageKeys } from 'src/app/constants/constants';
//import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private _installDate : Date;
  //private _todayDate : Date;
  private _selectedDate : BehaviorSubject<Date>;
  

  constructor() {
    this._selectedDate = new BehaviorSubject<Date>(this.getCurrentDate());
   }

   getSelectedDateSubs():BehaviorSubject<Date>{
     return this._selectedDate;
   }

  getCurrentDate(): Date {
    return moment().toDate();
  }

  createDateFromString(date: string) : Date{
    return moment(date).toDate();
  }

  StringDate(date ? : Date) : string {
     return date ? moment(date).format('L') : moment().format('L');
  }

  get installDate(): Date{
    return this._installDate;
  }

  set installDate(value : Date) {
    this._installDate = value;
 }

 async getselectedDate():Promise<Date> {
  return  this._selectedDate.getValue();
}

async setSelectedDate(date : Date | string): Promise<void> {
  this._selectedDate.next(typeof(date) == "string" ? this.createDateFromString(date) : date)
  console.log(typeof(date) == "string" ? this.createDateFromString(date) : date)
}
}
