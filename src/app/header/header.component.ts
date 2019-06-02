import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated=false;
  subscription: Subscription;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.subscription = this.authService.getAuthStatusChanged()
      .subscribe((isAuth)=>{
        this.isAuthenticated = isAuth;
      });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }

}
