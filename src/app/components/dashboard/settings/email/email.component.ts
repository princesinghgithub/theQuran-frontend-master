import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '@appServices/app-validators';
import { AuthService } from '@appServices/auth/auth.service';
import { HttpService } from '@appServices/http/http.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css', '../settings.component.scss'],
})
export class EmailComponent implements OnInit {
  public userData: any = this.authService.user();
  allUserData: any = [];
  editEmailForm!: FormGroup;

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.editEmailForm = this.formBuilder.group({
      Email: [
        '',
        [Validators.required, emailValidator, Validators.maxLength(40)],
      ],
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

  submitEmailChange() {
    console.log(this.editEmailForm.valid);
    if (this.editEmailForm.valid) {
      this.httpService
        .post('updateProfile', this.editEmailForm.value)
        .subscribe((data) => {
          this.alertService.success(data.msg);
        });
    }
  }
}
