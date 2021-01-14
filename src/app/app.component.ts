import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DateService } from './services/date/date.service';
import { DataService } from './services/data/data.service';
import { StorageService } from './services/storage/storage.service';
import { AppRoutes, StorageKeys } from './constants/constants';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private storageservice: StorageService,
    private dateservice: DateService,
    private fireAuth: AngularFireAuth,
    private router: Router,
    
) {
    this.initializeApp().then(() => {
        this.initializeInstallDate();
    });
}

async initializeApp(): Promise<void> {
    return await this.platform.ready().then(() => {
        this.fireAuth.onAuthStateChanged((user) => {
            user !== null
                ? this.storageservice.setObject(StorageKeys.ACTIVE_USER, true)
                : this.storageservice.setObject(StorageKeys.ACTIVE_USER, false);
            this.router.navigateByUrl(AppRoutes.TABS)
                .then((bool) => {
                    return Plugins.Device.getInfo();
                })
                .then((deviceInfo) => {
                    deviceInfo.platform !== 'web'
                        ? Plugins.SplashScreen.hide()
                        : Plugins.StatusBar.show();
                });
        });
    });
}

initializeInstallDate(): void {
  this.storageservice.getObject(StorageKeys.INSTALL_DATE)
      .then(
          (val) => {
              val ? this.dateservice.installDate = val
                  : this.storageservice.setObject(StorageKeys.INSTALL_DATE, this.dateservice.getCurrentDate());
          });
}
}
