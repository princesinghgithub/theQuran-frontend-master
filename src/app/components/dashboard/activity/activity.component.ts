import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }
}
