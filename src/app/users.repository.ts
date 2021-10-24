import { Injectable } from "@angular/core";
import { user } from "./user.model";
import { HttpClient } from "@angular/common/http";
import { Router, RouterModule } from "@angular/router";

@Injectable({providedIn : "root"})
export class UserRepository{
  private token:string | undefined;

  constructor(private http: HttpClient , private router: Router ){}

  CreateUser(email : string , password : string){
    const user: user = {
      email : email,
      password : password
    };

    return this.http.post<{message : string}>("http://localhost:3000/api/user/signup" , user);
  }

  Login(email : string , password : string){
    const user: user = {
      email : email,
      password : password
    };

    return this.http.post<{message : string , token : string}>("http://localhost:3000/api/user/login" , user);
  }

  setToken(token:string){
    this.token = token;
    this.saveAuth(token);
  }

  getToken(){
    return this.token;
  }

  isAuth(){
    if(this.token){
      return true;
    }

    return false;
  }

  private saveAuth(token:string){
    localStorage.setItem("token" ,token);
  }

  private clearAuth(){
    localStorage.removeItem("token");
  }

  private getAuth(){
    const token = localStorage.getItem("token");

    if(!token){
      return
    }

    return token;
  }

  autoAuth(){
    this.token = this.getAuth();
  }

  logout(){
    this.token = "";
    this.clearAuth();
    this.router.navigate(["/"]);
  }
}
