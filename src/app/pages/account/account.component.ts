import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {

  constructor(private storageservice : StorageService) { }

  ngOnInit() {}

  resetData() : void {
    this.storageservice.clear(true);
  }

}
