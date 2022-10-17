import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AlertService } from 'ngx-alerts';
import { HttpService } from '@appServices/http/http.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

import {
  StripeService,
  Elements,
  Element as StripeElement,
  ElementsOptions,
} from 'ngx-stripe';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'underscore';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css'],
})
export class DonationComponent implements OnInit, OnDestroy {
  elements: Elements;
  card: StripeElement;
  loading = false;
  submitted = false;
  // isCapchaResolved = false;
  // optional parameters
  elementsOptions: ElementsOptions = {
    locale: 'auto',
  };
  countryDataArr: any = [];
  donationForm: FormGroup = this.fb.group({
    //amount: ['', [Validators.required, Validators.pattern(/^(0|[1-9]\d*)(\.\d+)?$/)]],
    is_recurring: [false],
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone_number: [
      '',
      [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(16),
        Validators.pattern('[0-9]+'),
      ],
    ],
    address_one: ['', [Validators.required, Validators.maxLength(200)]],
    address_two: ['', [Validators.maxLength(200)]],
    country: ['', [Validators.required, Validators.maxLength(25)]],
    state: ['', [Validators.required, Validators.maxLength(25)]],
    city: ['', [Validators.required, Validators.maxLength(25)]],
    zip: [
      '',
      [Validators.required, Validators.pattern(/^(0|[1-9]\d*)(\.\d+)?$/)],
    ],
  });

  contrubutionAmountArr = [
    {
      id: 1,
      amount: 10,
      type: 'prefilled',
      active: false,
    },
    {
      id: 2,
      amount: 25,
      active: false,
    },
    {
      id: 3,
      amount: 50,
      type: 'prefilled',
      active: false,
    },
    {
      id: 4,
      amount: 100,
      type: 'prefilled',
      active: false,
    },
    {
      id: 5,
      amount: 500,
      type: 'prefilled',
      active: false,
    },
    {
      id: 6,
      amount: '',
      type: 'other',
      active: false,
    },
  ];

  planButtonsArr = [
    {
      label: 'One Time',
      is_recurring: false,
      active: false,
    },
    {
      label: 'Monthly',
      is_recurring: true,
      active: false,
    },
  ];
  queryParams: any = {};
  donationAmount: any = 0;
  is_reccuring = false;
  source_page: string = '';
  private subscriptions: Subscription[] = [];
  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private stripeService: StripeService,
    private alertService: AlertService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      let temp: any = { ...params.keys, ...params };
      this.queryParams = temp.params;
    });
    this.source_page = this.queryParams.source_page || 'TheQuran.com';
    this.setPlan(this.planButtonsArr[0]);
    this.selectAmount(this.contrubutionAmountArr[0]);

    this.stripeService.elements(this.elementsOptions).subscribe((elements) => {
      this.elements = elements;
      // Only mount the element the first time
      if (!this.card) {
        this.card = this.elements.create('card', {
          style: {
            base: {
              iconColor: '#666EE8',
              color: '#31325F',
              lineHeight: '40px',
              fontWeight: 300,
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSize: '16px',
              '::placeholder': {
                color: '#808080',
              },
            },
          },
        });
        this.card.mount('#card-element');
      }
    });
  }

  get f() {
    return this.donationForm.controls;
  }

  changeValue(val: any) {
    let tval = val.target.value;
    if (tval == '') {
      var span: any = document.getElementById('total-don-value');
      span.innerHTML = '$' + ' ' + 0;
    } else {
      var span: any = document.getElementById('total-don-value');
      span.innerHTML = '$' + ' ' + tval;
    }
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.donationForm.invalid) {
      return;
    }
    let donationAMountData = _.findWhere(this.contrubutionAmountArr, {
      active: true,
    });
    if (_.isUndefined(donationAMountData)) {
      this.alertService.danger('Please select a donation amount');
      return;
    }
    this.donationAmount = donationAMountData.amount;
    if (donationAMountData.type == 'other') {
      this.donationAmount = (
        document.getElementById('donationOtherAoount') as HTMLInputElement
      ).value;
    }
    if (this.donationAmount == '' || parseInt(this.donationAmount) == 0) {
      this.alertService.danger('Please select a donation amount');
      return;
    }
    let reg = /^\d{0,4}(\.\d{0,2})?$/;
    if (!reg.test(this.donationAmount)) {
      this.alertService.danger('Please fill a valid amount');
      return;
    }

    // if (!this.isCapchaResolved) {
    //   this.alertService.danger('Invalid Capcha');
    //   return;
    // }
    this.loading = true;
    let first_name = this.donationForm.get('first_name').value;
    let last_name = this.donationForm.get('last_name').value;
    let name = first_name + ' ' + last_name;
    let phone_number = this.donationForm.get('phone_number').value;
    let currency = 'usd';
    let address_line1 = this.donationForm.get('address_one').value;
    let address_line2 = this.donationForm.get('address_two').value;
    let address_country = this.donationForm.get('country').value;
    let address_state = this.donationForm.get('state').value;
    let address_city = this.donationForm.get('city').value;
    let email = this.donationForm.get('email').value;
    let amount = this.donationAmount;
    let is_recurring = this.is_reccuring;
    let zip = this.donationForm.get('zip').value;
    this.spinner.show();
    this.stripeService.createToken(this.card, { name }).subscribe((r) => {
      let result: any = r;
      if (result.token) {
        this.subscriptions.push(
          this.httpService
            .post('donate', {
              stripe_payment_token: result.token.id,
              amount: amount,
              is_recurring: is_recurring,
              first_name: first_name,
              last_name: last_name,
              phone_number: phone_number,
              currency: currency,
              address_one: address_line1,
              address_two: address_line2,
              country: address_country,
              state: address_state,
              city: address_city,
              zip: zip,
              email: email,
              payment_method: 'stripe',
              source_page: this.source_page,
            })
            .subscribe(
              (data) => {
                this.loading = false;
                this.submitted = false;
                if (data.status == 1) {
                  this.alertService.success(data.msg);
                  //this.router.navigate(['/donation/thank-you']);
                } else {
                  this.alertService.danger(data.msg);
                }
              },
              (error) => {
                this.spinner.hide();
                this.loading = false;
                this.submitted = false;
              }
            )
        );
      } else if (result.error) {
        this.loading = false;
        this.spinner.hide();
        this.alertService.danger(result.error.message);
      }
    });
  }

  selectAmount(element) {
    this.contrubutionAmountArr.map((el) => {
      el.active = false;
      if (el.id == element.id) {
        el.active = true;
      }
      return el;
    });
    if (element.type == 'prefilled') {
      this.donationAmount = element.amount;
    }
  }

  setPlan(element) {
    this.is_reccuring = element.is_recurring;
    this.planButtonsArr.map((el) => {
      el.active = false;
      if (el == element) {
        el.active = true;
      }
      return el;
    });
  }

  // resolveCapcha(captchaResponse: string) {
  //   this.isCapchaResolved = true;
  //   console.log(`Resolved captcha with response: ${captchaResponse}`);
  // }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }
}
