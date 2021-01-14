import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ShoppinglistInterface } from 'src/app/interfaces/shoppinglistinterface';
import { ActionService } from 'src/app/services/action/action.service';
import { DateService } from 'src/app/services/date/date.service';
import { AddItemServiceService } from 'src/app/services/storage/add-item-service.service';
import { ExpenseStorageService } from 'src/app/services/storage/expense-storage.service';
import { AddExpenseComponent } from '../add-expense/add-expense.component';

@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.scss'],
})
export class AddactivityComponent implements OnInit {

  expenseForm: ShoppinglistInterface;
//	expenseTypes: any;


	addItemForm = new FormGroup({
		quantity: new FormControl('', Validators.required),
		ItemName: new FormControl(''),
	});

  constructor(private modalController: ModalController,
    private dateservice: DateService,
	private additemservice: AddItemServiceService,
	private actionservice : ActionService) { }

  ngOnInit() {}

  initCreateItem(): void {
		const item: ShoppinglistInterface = this.addItemForm.value;
		item.quantity = Number(item.quantity.toFixed(0));
		//console.log(typeof(item))
			this.actionservice.createitem(item).then(() => {
				console.log('Item Was Created');
				this.dismissModal();
			}).catch((err) => console.log(err));
  }
  
  dismissModal(): void {
		this.modalController.dismiss().then().catch();
	}

}
