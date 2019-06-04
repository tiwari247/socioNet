import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService:AuthService){
//
    }
    intercept(req: HttpRequest<any>, next: HttpHandler){
        // let token = this.authService.getToken();
        
        let authReq = req.clone({
            headers : req.headers.set("auth", this.authService.getToken()||"")
        });
        // console.log("Interceptor authReq: "+JSON.stringify(authReq));
        // newReq.headers.append("auth", localStorage.getItem("token"));
        return next.handle(authReq);
    }
}