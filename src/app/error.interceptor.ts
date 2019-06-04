import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from './error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor(private dialog: MatDialog){}
    
    intercept(req:HttpRequest<any>, next: HttpHandler){
        
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse)=>{
                console.log("MyError");
                console.log("Error: " +err.error.error);
                this.dialog.open(ErrorComponent,{data: {message: err.error.error}});
                return throwError(err);
            })
        );
    }
}//