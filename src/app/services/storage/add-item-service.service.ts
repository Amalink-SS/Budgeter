import { Injectable } from '@angular/core';
import { ShoppinglistInterface } from 'src/app/interfaces/shoppinglistinterface';
import { DataService } from '../data/data.service';
import { DateService } from '../date/date.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AddItemServiceService {

  constructor(
    private datetimeService: DateService,
    private storageService: StorageService,
    private dataService: DataService
  ) { }


  async createItem(expense: ShoppinglistInterface): Promise<void> {
    const key =  this.dataService.randomKeys().toString();
    let ItemList: ShoppinglistInterface[] = [];
    this.storageService.getObject(key)
        .then((storedItems) => {
            if (storedItems == null) {
              ItemList.push(expense);
            } else {
                ItemList = storedItems;
                ItemList.push(expense);
            }
            return ItemList;
        })
        .then(() => {
            this.storageService.setObject(key, ItemList);
        })
        .then(() => {
          this.dataService.setItems(ItemList);
      })
      .catch((err) => console.log(err));

  }

  async saveItemToLocal(item : ShoppinglistInterface) : Promise<void>{
    const key  =  this.dataService.randomKeys()
    let todaysItems : ShoppinglistInterface[] = [];
   return await this.storageService.getObject(key).then((items : ShoppinglistInterface[]) => {
      //debugger;
      if(items == null){
        todaysItems.push(item);
      }
      else{
      todaysItems = items;
      todaysItems.push(item);
    }
   }).then(() => {
             this.storageService.setObject(key,todaysItems).then(() => {
              this.dataService.setItems(todaysItems); 
              });
            
    }).catch((err) => {
      console.log(err)
    })
  }

  async getItemFromStorage(val ?: string) : Promise<ShoppinglistInterface[]> {
    const key = this.dataService.randomKeys()
    return await this.storageService.getObject(key).then((items : ShoppinglistInterface[]) => {
      return items;
    });
  }
       
}


