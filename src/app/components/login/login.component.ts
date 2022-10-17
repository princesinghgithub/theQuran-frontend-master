import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@appServices/auth/auth.service';
import { HttpService } from '@appServices/http/http.service';
import { AlertService } from 'ngx-alerts';
import { Subscription } from 'rxjs';
import { SocialAuthService } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import * as _ from 'underscore';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  loginForm: FormGroup = this.formBuilder.group({
    Email: ['', Validators.required],
    Password: ['', Validators.required],
  });
  resendEmail: boolean = false;
  emailVerifyUserId: number;
  resetEmail: string;
  modalRef?: BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private alertService: AlertService,
    private socialAuthService: SocialAuthService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.logout();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.httpService.post('login', this.loginForm.value).subscribe(
        (data) => {
          localStorage.setItem(
            'auth_app_token',
            JSON.stringify({
              user: data.data,
              token: data.data.token,
            })
          );
          this.alertService.success(data.msg);
          const redirectUrl = this.authService.redirectUrl || '/home';
          this.router.navigate([redirectUrl]);
        },
        (error) => {
          if (error.error.msg == 'Email is not verified.') {
            this.resendEmail = true;
            this.emailVerifyUserId = error.error.data.Id;
          }
        }
      );
    }
  }

  signInWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        let userData: any;
        if (user.provider.toLowerCase() == 'google') {
          userData = {
            FirstName: user.firstName,
            LastName: user.lastName,
            Email: user.email,
            SocialType: user.provider,
            SocialId: user.id,
          };
        }
        this.httpService.post('socialLogin', userData).subscribe((data) => {
          localStorage.setItem(
            'auth_app_token',
            JSON.stringify({
              user: data.data,
              token: data.data.token,
            })
          );
          this.alertService.success(data.msg);
          this.authService.redirect();
        });
      });
  }

  resendVerificationEmail(): void {
    this.httpService
      .get(`resendVerifyEmail/${this.emailVerifyUserId}`)
      .subscribe((data) => {
        this.resendEmail = false;
        this.alertService.success(data.msg);
      });
  }

  saveEmailInput(e) {
    this.resetEmail = e.target.value;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  resetPassword() {
    this.httpService
      .post('forgotPassword', { Email: this.resetEmail })
      .subscribe((data) => {
        this.alertService.success(data.msg);
      });
  }

  signInWithFB(): void {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user) => {
        let userData: any;
        if (user.provider.toLowerCase() == 'facebook') {
          userData = {
            FirstName: user.firstName,
            LastName: user.lastName,
            Email: user.email,
            SocialType: user.provider,
            SocialId: user.id,
          };
        }
        this.httpService.post('socialLogin', userData).subscribe((data) => {
          localStorage.setItem(
            'auth_app_token',
            JSON.stringify({
              user: data.data,
              token: data.data.token,
            })
          );
          this.alertService.success(data.msg);
          this.authService.redirect();
        });
      });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }
}
