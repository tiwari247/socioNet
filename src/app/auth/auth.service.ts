import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService{
    // token;
    constructor(private http: HttpClient, private router:Router){}

    private authStatusChanged = new Subject<boolean>();

    getToken(){
        // return this.token;
        console.log(localStorage.getItem("token"));
        return localStorage.getItem("token");
    }

    getAuthStatusChanged(){
        return this.authStatusChanged.asObservable();
    }

    isAuthenticated(){
        // return this.token?true:false ;
        console.log(localStorage.getItem("token")?true:false);
        return localStorage.getItem("token")?true:false ;
    }

    logout(){
        // this.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("expiresIn");
        this.authStatusChanged.next(false);
    }

    login(email:string, password:string){
        console.log("Login: "+email+"-"+password);
        this.http.post<{message:string, user: User, token:string, expiresIn:number}>("http://localhost:3000/api/users/login", {email, password})
            .subscribe((response)=>{
                console.log(response);
                // this.token = response.token;
                // console.log(this.token);
                let expiresIn = response.expiresIn;
                localStorage.setItem("token", response.token);
                let now = new Date();
                let expirationDate = new Date(now.getTime() + expiresIn * 1000);
                localStorage.setItem("expiresIn", expirationDate.toISOString());
                setTimeout(()=>{
                    this.logout();
                }, expiresIn * 1000);
                this.authStatusChanged.next(true);
                this.router.navigate(['/']);
            });
    }

    register(email:string, password:string){
        console.log("Register: "+email+"-"+password);
        this.http.post("http://localhost:3000/api/users/register", {email, password})
            .subscribe((response)=>{
                console.log(response);
            });
    }
}