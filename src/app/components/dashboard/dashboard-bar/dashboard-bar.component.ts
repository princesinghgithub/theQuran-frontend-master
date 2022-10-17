import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '@appServices/auth/auth.service';
import { HttpService } from '@appServices/http/http.service';

@Component({
  selector: 'app-dashboard-bar',
  templateUrl: './dashboard-bar.component.html',
  styleUrls: ['./dashboard-bar.component.css'],
})
export class DashboardBarComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  userData: any = this.authService.user();
  public userInfo: any = {};

  constructor(
    private authService: AuthService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  public getUserInfo() {
    this.httpService
      .post('getUser', { userId: this.userData.Id })
      .subscribe((data) => {
        this.userInfo = data.user;
      });
  }

  public isLoggedIn() {
    let token;
    token = this.authService.isLoggedIn();
    return !token ? false : true;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }
}
