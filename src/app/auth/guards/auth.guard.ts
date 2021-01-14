import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppRoutes, StorageKeys } from 'src/app/constants/constants';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
constructor(
  private router: Router,
  private storageService: StorageService
) {
}

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  return this.storageService.getObject
  (StorageKeys.ACTIVE_USER).then((response) => {
      if (response !== null && response === true) {
          return true;
      } else {
          this.router.navigateByUrl(AppRoutes.AUTH);
      }
  });

}

canActivateChild(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  return true;
}

canLoad(
  route: Route,
  segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
  return true;
}
}
