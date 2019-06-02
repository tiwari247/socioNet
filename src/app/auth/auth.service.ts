import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY } from '@angular/material';

@Injectable()
export class AuthService{
    token;
    timer:any;
    constructor(private http: HttpClient, private router:Router){}

    private authStatusChanged = new Subject<boolean>();

    getToken(){
        // return this.token;
        // console.log(localStorage.getItem("token"));
        return localStorage.getItem("token");
    }

    getAuthStatusChanged(){
        return this.authStatusChanged.asObservable();
    }

    isAuthenticated(){
        // return this.token?true:false ;
        console.log("isAuthenticated:AuthService: "+localStorage.getItem("token")?true:false);
        return localStorage.getItem("token")?true:false ;
    }

    logout(){
        this.token = null;
        this.clearAuthData();
        this.authStatusChanged.next(false);
        clearTimeout(this.timer);
    }

    login(email:string, password:string){
        console.log("Login: "+email+"-"+password);
        this.http.post<{message:string, user: User, token:string, expiresIn:number}>("http://localhost:3000/api/users/login", {email, password})
            .subscribe((response)=>{
                console.log(response);
                this.token = response.token;
                // console.log(this.token);
                let expiresIn = response.expiresIn;
                let now = new Date();
                let expirationDate = new Date(now.getTime() + expiresIn * 1000);
                this.setAuthData(response.token, expirationDate);
                this.setAuthTimer(expiresIn);               
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

    autoAuthUser(){
        const authInfo = this.getAuthData();
        console.log(authInfo);
        if(authInfo){
            const now = new Date();
            const difference = authInfo.expiresIn.getTime() - now.getTime();
            console.log(difference);
            if(difference>0){
                this.token = authInfo.token;
                // this.isAuthenticated = true;
    
                this.authStatusChanged.next(true);
                this.setAuthTimer(difference);
            }
        }else{
            this.logout();
        }
        
    }

    private setAuthTimer(duration:number){
        this.timer = setTimeout(()=>{
            this.logout();
        }, duration * 1000 );
    }

    private setAuthData(token:string, expirationDate:Date){
        localStorage.setItem("expiresIn", expirationDate.toISOString());
        localStorage.setItem("token", token);
    }

    private clearAuthData(){
        localStorage.removeItem("token");
        localStorage.removeItem("expiresIn");
    }

    private getAuthData(){
        const token = localStorage.getItem("token");
        const expiresIn = localStorage.getItem("expiresIn");

        if(!token||!expiresIn){
            return;
        }

        return {
            token: token,
            expiresIn: new Date(expiresIn)
        };
    }

}