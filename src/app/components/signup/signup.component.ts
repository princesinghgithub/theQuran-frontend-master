import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@appServices/auth/auth.service';
import { HttpService } from '@appServices/http/http.service';
import { AlertService } from 'ngx-alerts';
import { Subscription } from 'rxjs';
import {
  emailValidator,
  name,
  passwordValidator,
  matchingPasswords,
} from '@appServices/app-validators';
import { Router } from '@angular/router';
import * as _ from 'underscore';
import { SocialAuthService } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  signupForm: FormGroup = this.formBuilder.group(
    {
      FirstName: ['', [Validators.required, name]],
      LastName: ['', [Validators.required, name]],
      Email: [
        '',
        [Validators.required, emailValidator, Validators.maxLength(40)],
      ],
      Password: ['', [Validators.required, passwordValidator]],
      ConfirmPassword: ['', [Validators.required]],
      Agree: [false, [Validators.requiredTrue]],
    },
    { validator: matchingPasswords('Password', 'ConfirmPassword') }
  );

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn() ? this.router.navigate(['/home']) : null;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      let formValues = Object.assign({}, this.signupForm.value);
      console.log(formValues);
      delete formValues.ConfirmPassword;
      delete formValues.Agree;
      this.httpService.post('signUp', formValues).subscribe((data) => {
        /* localStorage.setItem(
          'auth_app_token',
          JSON.stringify({
            user: data.data,
            token: data.data.token,
          })
        ); */
        this.alertService.success(data.msg);
        this.router.navigate(['/login']);
        //this.authService.redirect();
      });
    } else {
      console.log(this.signupForm.valid);
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
