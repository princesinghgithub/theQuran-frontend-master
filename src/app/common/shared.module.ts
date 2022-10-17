import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from 'ngx-alerts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SidebarModule } from 'ng-sidebar';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxStripeModule } from 'ngx-stripe';
import { MatomoModule } from 'ngx-matomo';

/**Bootstrap modules[ */
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';
/**Bootstrap modules] */

import { AppInterceptor } from '@appInterceptors/app-interceptor';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
const googleLoginOptions = {
  scope: 'profile email',
};
import {
  RECAPTCHA_SETTINGS,
  RecaptchaSettings,
  RecaptchaFormsModule,
  RecaptchaModule,
} from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000 }),
    FontAwesomeModule,
    AccordionModule.forRoot(),
    InfiniteScrollModule,
    SidebarModule.forRoot(),
    TabsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    ClipboardModule,
    SocialLoginModule,
    NgxStripeModule.forRoot(environment.STRIPE_PUBIC_KEY),
    RecaptchaModule,
    RecaptchaFormsModule,
    MatomoModule.forRoot({
      scriptUrl: '//matomo.mykeycomm.com/matomo.js',
      trackers: [
        {
          trackerUrl: 'https://matomo.mykeycomm.com/matomo.php',
          siteId: 2
        }
      ],
      routeTracking: {
        enable: true
      }
    }),
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AlertModule,
    FontAwesomeModule,
    AccordionModule,
    InfiniteScrollModule,
    SidebarModule,
    TabsModule,
    TranslateModule,
    BsDropdownModule,
    ProgressbarModule,
    ModalModule,
    PaginationModule,
    ClipboardModule,
    CarouselModule,
    SocialLoginModule,
    NgxStripeModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatomoModule
  ],
  declarations: [],
  entryComponents: [],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(
                  environment.GOOGLE_OAUTH_CLIENT_ID,
                  googleLoginOptions
                ),
              },
              {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider(
                  environment.FACEBOOK_OAUTH_CLIENT_ID
                ),
              },
            ],
          } as SocialAuthServiceConfig,
        },
        {
          provide: RECAPTCHA_SETTINGS,
          useValue: {
            siteKey: environment.GOOGLE_RECAPTCHA_V2_SITE_KEY,
          } as RecaptchaSettings,
        },
      ],
    };
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
