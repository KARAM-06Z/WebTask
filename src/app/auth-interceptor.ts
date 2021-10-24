import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserRepository } from "./users.repository";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private UserRepo : UserRepository){}

  intercept(request:HttpRequest<any> , next:HttpHandler){
    const token = this.UserRepo.getToken();

    const AuthRequest = request.clone({
      headers: request.headers.set("authorization" , ""+token)
    });

    return next.handle(AuthRequest);
  };
}
