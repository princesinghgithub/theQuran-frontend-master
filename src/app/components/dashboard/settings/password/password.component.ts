import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  matchingPasswords,
  passwordValidator,
} from '@appServices/app-validators';
import { AuthService } from '@appServices/auth/auth.service';
import { HttpService } from '@appServices/http/http.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css', '../settings.component.scss'],
})
export class PasswordComponent implements OnInit {
  public userData: any = this.authService.user();
  allUserData: any = [];
  passwordForm!: FormGroup;
  isOldPassword: boolean;

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.passwordForm = this.formBuilder.group(
      {
        Password: ['', [Validators.required, passwordValidator]],
        ConfirmPassword: ['', [Validators.required]],
        CurrentPassword: ['', [Validators.required]],
      },
      { validator: matchingPasswords('Password', 'ConfirmPassword') }
    );
  }

  public getUser() {
    this.httpService
      .post('getUser', {
        userId: this.userData.Id,
      })
      .subscribe(({ user }) => {
        this.allUserData = user;
      });
  }

  resetEditForm() {
    this.passwordForm.reset();
  }

  submitPasswordChange() {
    this.checkOldPassword();
    if (this.passwordForm.valid && this.checkOldPassword()) {
      this.httpService
        .post('changePassword', {
          Password: this.passwordForm.value.Password,
          OldPassword: this.passwordForm.value.CurrentPassword,
        })
        .subscribe((data) => {
          this.alertService.success(data.msg);
          this.resetEditForm();
        });
    }
  }

  checkOldPassword() {
    if (this.allUserData.Password == this.passwordForm.value.CurrentPassword) {
      this.isOldPassword = true;
      return true;
    } else {
      this.isOldPassword = false;
      return false;
    }
  }

  currentPasswordInput(e) {
    if (e.target.value == this.allUserData.Password) {
      this.isOldPassword = true;
    } else {
      this.isOldPassword = false;
    }
  }
}
