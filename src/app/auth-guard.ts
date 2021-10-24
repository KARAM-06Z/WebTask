import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserRepository } from "./users.repository";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private UserRepository:UserRepository , private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuth = this.UserRepository.isAuth();

    if(!isAuth){
      this.router.navigate(["/"]);
    }

    return true
  }
}
