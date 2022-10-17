import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '@appServices/auth/auth.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.show();
    let modifiedReq = req;
    if (this.authService.token()) {
      const userToken = this.authService.token();
      modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${userToken}`),
      });
    }
    return next.handle(modifiedReq).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.spinner.hide();
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            console.log(err);
            this.spinner.hide();
            if (err.status == 401) {
              this.authService.logout();
            }
            this.alertService.danger(err.error.msg);
          }
        }
      )
    );
  }
}
