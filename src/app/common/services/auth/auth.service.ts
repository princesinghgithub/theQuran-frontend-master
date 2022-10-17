import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SocialAuthService } from "angularx-social-login";
import {  GoogleLoginProvider } from "angularx-social-login";
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper: any;
  redirectUrl: string = '';
  isLoggedInUsingSocialAccount = false;

  constructor(private router: Router,private socialAuthService: SocialAuthService) {
    this.jwtHelper = new JwtHelperService();
    this.socialAuthService.authState.subscribe((user) => {
      this.isLoggedInUsingSocialAccount = (user != null);
    });
  }

  redirect() {
    let redirect = '';
    if (this.isLoggedIn()) {
      redirect = this.redirectUrl ? this.redirectUrl : '/home';
    } else {
      redirect = this.redirectUrl ? this.redirectUrl : '/login';
    }
    this.router.navigate([redirect]);
  }

  public isLoggedIn() {
    if (
      !(
        localStorage.getItem('auth_app_token') &&
        JSON.parse(localStorage.getItem('auth_app_token')!).user
      )
    ) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(
      JSON.parse(localStorage.getItem('auth_app_token')!).token
    );
  }

  public user() {
    if (
      !(
        localStorage.getItem('auth_app_token') &&
        JSON.parse(localStorage.getItem('auth_app_token')!).user
      )
    ) {
      return false;
    }
    let user = JSON.parse(localStorage.getItem('auth_app_token')!).user;
    return user;
  }

  public token() {
    if (
      !(
        localStorage.getItem('auth_app_token') &&
        JSON.parse(localStorage.getItem('auth_app_token')!).token
      )
    ) {
      return false;
    }
    return JSON.parse(localStorage.getItem('auth_app_token')!).token;
  }

  public logout() {
    if(this.isLoggedInUsingSocialAccount){
      this.socialAuthService.signOut().then(r=>{
        localStorage.clear();
        this.router.navigate(['/login']);
      })
    }else{
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
