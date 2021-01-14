import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Budget } from 'src/app/interfaces/budgetinterface';
import { ActionService } from 'src/app/services/action/action.service';
import { DateService } from 'src/app/services/date/date.service';
import { BudgetstorageService } from 'src/app/services/storage/budgetstorage.service';

@Component({
  selector: 'app-addbudget',
  templateUrl: './addbudget.component.html',
  styleUrls: ['./addbudget.component.scss'],
})
export class AddbudgetComponent implements OnInit {

  budgetForm: Budget;
//	expenseTypes: any;


	addBudgetForm = new FormGroup({
		//id : new FormControl(''),
		AllocatedAmount: new FormControl('', Validators.required),	
	});
	//budget: number;

  constructor(private modalController: ModalController,
    private dateservice: DateService,
	private addbdgetservice: BudgetstorageService,
  private actionservice : ActionService) { }
  

  ngOnInit() {}

  initCreateBudget(): void {
		const budget: Budget = this.addBudgetForm.value;
		console.log(budget.AllocatedAmount)
       budget.AllocatedAmount = Number(budget.AllocatedAmount)
		this.actionservice.createBudget(budget).then(() => {
			console.log('Item Was Created');
			//console.log(typeof(budget))
			this.dismissModal();
		}).catch((err) => console.log(err));
  }
  
  dismissModal(): void {
		this.modalController.dismiss().then().catch();
	}

}
