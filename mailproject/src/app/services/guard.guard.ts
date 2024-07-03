import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard  {
  constructor(private authService:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.authService.isUserLoggedIn()) {
        alert("You are not allowed to view this page.\nYou are redirected to login Page");  
        this.router.navigate(["login"],{ queryParams: { retUrl: route.url} });  
        return false;
      } 
      else{
        return true;
      }
  }
 
}


