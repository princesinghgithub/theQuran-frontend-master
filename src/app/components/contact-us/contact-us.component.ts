import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator, name } from '@appServices/app-validators';
import { HttpService } from '@appServices/http/http.service';
import { AlertService } from 'ngx-alerts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  contactForm: FormGroup = this.formBuilder.group({
    FirstName: ['', [Validators.required, name]],
    LastName: ['', [Validators.required, name]],
    Email: [
      '',
      [Validators.required, emailValidator, Validators.maxLength(40)],
    ],
    Message: ['', [Validators.required, Validators.maxLength(500)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.contactForm.valid) {
      let formValues = Object.assign({}, this.contactForm.value);
      this.httpService
        .post('sendContactUsEmail', formValues)
        .subscribe((data) => {
          this.alertService.success(data.msg);
          this.router.navigate(['/home']);
        });
    } else {
      console.log(this.contactForm.valid);
    }
  }
}
