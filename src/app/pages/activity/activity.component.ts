import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { SubscriptionLike } from 'rxjs';
import { ShoppinglistInterface } from 'src/app/interfaces/shoppinglistinterface';
import { ActionService } from 'src/app/services/action/action.service';
import { DataService } from 'src/app/services/data/data.service';
import { DateService } from 'src/app/services/date/date.service';
import { AddactivityComponent } from 'src/app/shared/components/addactivity/addactivity.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  totalItemSubscription: SubscriptionLike;
  value: number;
  items: ShoppinglistInterface[];
  date : Date;

  constructor(private modalController: ModalController,
    private dataservice : DataService,
    private dateservice: DateService) {
      this.value;
     }

  ngOnInit() {
    this.totalItemSubscription = this.dataservice.getTodayTotalItems()
        .subscribe({
          next: (count: number) => {
            this.value = count;
          },   
          error : (err) => {
            console.log(err)
          },
          complete: () => {}
        })
    
    this.dataservice.getItemSubscription()
    .subscribe({ next : (item : ShoppinglistInterface[]) => {
      if(item != null){
       this.items = item;
      }else{
        this.items = [];
      }
      console.log(this.items)
    },
    error : (err) => {},
    complete: () => {}
   });

   this.date=this.dateservice.getCurrentDate()
  }

  async presentModal() {
    const modal = await this.modalController.create({
        component: AddactivityComponent
    });
    return await modal.present();
}

 

}
