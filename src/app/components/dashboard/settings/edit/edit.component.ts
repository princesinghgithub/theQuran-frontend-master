import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@appServices/auth/auth.service';
import { HttpService } from '@appServices/http/http.service';
import { AlertService } from 'ngx-alerts';
import { country, religions } from './select-data';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss', '../settings.component.scss'],
})
export class EditComponent implements OnInit {
  countries = country;
  religions = religions;
  public userData: any = this.authService.user();
  allUserData: any = [];
  editProfileForm!: FormGroup;

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.editProfileForm = this.formBuilder.group({
      FirstName: [''],
      LastName: [''],
      NickName: [''],
      Description: [''],
      Country: [''],
      Religion: [''],
      Address: [''],
    });
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
    this.editProfileForm.reset();
  }

  submitProfileChange() {
    this.httpService
      .post('editProfile', this.editProfileForm.value)
      .subscribe((data) => {
        console.log(data);
        localStorage.setItem(
          'auth_app_token',
          JSON.stringify({
            user: data.data,
            token: data.data.token,
          })
        );
        this.alertService.success(data.msg);
      });
  }
}
