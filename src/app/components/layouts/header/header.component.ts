import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.createOnline$().subscribe((isOnline) => {
      if (isOnline) {
        //this.alertService.info('Online');
      } else {
        this.alertService.warning('Please check your Internet connection!');
      }
    });
  }

  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }
}
