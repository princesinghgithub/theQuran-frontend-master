import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '@appServices/http/http.service';
import { HelperService } from '@appServices/helper/helper.service';
import { AuthService } from '@appServices/auth/auth.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public userData: any = this.authService.user();
  public notes: any = [];

  constructor(
    private httpService: HttpService,
    private helperService: HelperService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserNotes();
  }

  getUserNotes() {
    this.subscriptions.push(
      this.httpService.post('listNarationNotes', {}).subscribe((data) => {
        this.notes = data.data;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }
}
