import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DateService } from './services/date/date.service';
import { DataService } from './services/data/data.service';
import { StorageService } from './services/storage/storage.service';
import { StorageKeys } from './constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dateservice : DateService,
    private storageservice : StorageService   
  ) {
    this.initializeApp().then(() => {
      this.initializeInstallDate();
    })

  }

 async initializeApp() : Promise<void> {
    return await this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initializeInstallDate() : void {
      this.storageservice.getObject(StorageKeys.INSTALL_DATE).then((val) =>{
        if(val){
          this.dateservice.installDate = val;
        }else{
          this.storageservice.setObject(StorageKeys.INSTALL_DATE, this.dateservice.getCurrentDate());
        }
      })
  }
}