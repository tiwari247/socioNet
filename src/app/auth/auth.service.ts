import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable()
export class AuthService{
    token;
    timer:any;//
    userId;
    constructor(private http: HttpClient, private router:Router){}

    private authStatusChanged = new Subject<boolean>();

    getUserId(){
        return this.userId;
    }

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
        // console.log("isAuthenticated:AuthService: "+(localStorage.getItem("token")?true:false));
        // console.log("isAuthenticated:AuthService:token "+localStorage.getItem("token"));
        
        return localStorage.getItem("token")?true:false ;
    }

    logout(){
        this.token = null;
        this.userId = null;
        this.clearAuthData();
        this.authStatusChanged.next(false);
        clearTimeout(this.timer);
    }

    login(email:string, password:string){
        console.log("Login: "+email+"-"+password);
        this.http.post<{message:string, user: any, token:string, expiresIn:number}>("http://localhost:3000/api/users/login", {email, password})
            .subscribe((response)=>{
                console.log(response);
                this.token = response.token;
                this.userId = response.user.id;
                let expiresIn = response.expiresIn;
                let now = new Date();
                let expirationDate = new Date(now.getTime() + expiresIn * 1000);
                this.setAuthData(response.token, expirationDate, this.userId);
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
                this.router.navigate(["/signin"]);
            });
    }

    autoAuthUser(){
        const authInfo = this.getAuthData();
        // console.log(authInfo);
        if(authInfo){
            // console.log("inside authInfo log");
            const now = new Date();
            const difference = authInfo.expiresIn.getTime() - now.getTime();
            // console.log(difference);
            if(difference>0){
                this.token = authInfo.token;
        //         // this.isAuthenticated = true;
                localStorage.setItem("token", authInfo.token);
                this.userId = authInfo.userId;
                this.authStatusChanged.next(true);
                this.setAuthTimer(Math.ceil(difference/1000));
            }
            else{
                this.logout();
            }
        // }else{
        //     // this.logout();
        }
        
    }

    private setAuthTimer(duration:number){
        // alert(duration);
        let totalDuration = duration * 1000; 
        // alert(totalDuration);
        this.timer = setTimeout(()=>{
            this.logout();
        }, totalDuration);
        
    }

    private setAuthData(token:string, expirationDate:Date, id:string){
        localStorage.setItem("expiresIn", expirationDate.toISOString());
        localStorage.setItem("token", token);
        localStorage.setItem("userId", id);
    }

    private clearAuthData(){
        localStorage.removeItem("token");
        localStorage.removeItem("expiresIn");
        localStorage.removeItem("userId");
    }

    private getAuthData(){
        const token = localStorage.getItem("token");
        const expiresIn = localStorage.getItem("expiresIn");
        const userId = localStorage.getItem("userId");
        // console.log("getAuthData(): "+token,expiresIn,userId);
        if(!token||!expiresIn){
            return;
        }

        return {
            token: token,
            expiresIn: new Date(expiresIn),
            userId: userId
        };
    }

}