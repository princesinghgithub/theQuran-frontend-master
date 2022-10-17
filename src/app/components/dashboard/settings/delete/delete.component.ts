import { Component, OnInit } from '@angular/core';
import { AuthService } from '@appServices/auth/auth.service';
import { HttpService } from '@appServices/http/http.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css', '../settings.component.scss'],
})
export class DeleteComponent implements OnInit {
  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  deleteAccount() {
    this.httpService
      .post('deleteAccount', { userId: this.authService.user().Id })
      .subscribe((data) => {
        this.alertService.success('Account deleted successfully');
        this.authService.logout();
      });
  }
}
