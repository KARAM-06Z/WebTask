import { HttpInterceptor , HttpRequest , HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";


@Injectable({providedIn: "root"})
export class ErrorInterceptor implements HttpInterceptor{
  error = "something went wrong!";

  constructor(){}

  intercept(req: HttpRequest<any> , next: HttpHandler){
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
