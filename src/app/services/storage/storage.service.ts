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


async keys() {
  const { keys } = await Plugins.Storage.keys();
  console.log('Got keys: ', keys);
}

async clear(isReset ? : boolean) : Promise<void> {
 if(isReset){
   this.dataservice.setExpenses([]);
   this.dataservice.setItems([]);
   this.dataservice.setBudget([]);
 }
  return await Plugins.Storage.clear();
}
}
