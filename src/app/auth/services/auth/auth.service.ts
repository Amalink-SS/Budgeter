import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LodashService } from 'src/app/services/lodash/lodash.service';
import UserCredential = firebase.auth.UserCredential;
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserStatus: boolean;

  constructor(
      private fireAuth : AngularFireAuth,
      private _: LodashService,
  ) {
      // this.fireAuth.auth.onAuthStateChanged((result) => {
      //     result !== null ? this.currentUserStatus = true : this.currentUserStatus = false;
      // });
  }


  async getCurrentUserStatus(): Promise<boolean> {
      return this.currentUserStatus;
  }

  async setCurrentUserStatus(status: boolean): Promise<void> {
      this.currentUserStatus = status;
  }

  async loginWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
      if (!this._.isNull(email) && !this._.isNull(password)) {
          return this.fireAuth.signInWithEmailAndPassword(email, password);
      }
  }


  // RegisterWithEmailAndPassword
  async registerWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
      if (!this._.isNull(email) && !this._.isNull(password)) {
          return await this.fireAuth.createUserWithEmailAndPassword(email, password);
      }
  }

  // Logout
  async logout(): Promise<void> {
      return await this.fireAuth.signOut();
  }

  async ngOnInit(): Promise<void> {
      (await this.fireAuth.currentUser).getIdTokenResult().then((token) => {
          console.log(token);
          // if(token !== null) {
          //     this.activeUserStatus.next(true)
          // }
      });
  }

}
