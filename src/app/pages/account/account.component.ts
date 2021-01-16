import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { AppRoutes } from 'src/app/constants/constants';
import { DataService } from 'src/app/services/data/data.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {

  constructor(
    private storageservice: StorageService,
    private dataservice : DataService,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
) {
}

ngOnInit() {
}

resetData(): void {
    this.storageservice.clear(true).then(() => {
        this.presentResetAlert(this.doLogout);
    });
}


async presentResetAlert(handler?: any) {
    const alert = await this.alertController.create({
        id: 'appResetAlert',
        header: 'App Reset Successful!',
        buttons: [{
            text: 'Dashboard',
            handler 
        }],
    });
    await alert.present();
}

doLogout(): void {
    this.authService.logout().then(() => {
        this.router.navigateByUrl(AppRoutes.LOGIN);
        console.log('Reset Done Moving to Login Page');
    }, error => console.log(error));
}
}
