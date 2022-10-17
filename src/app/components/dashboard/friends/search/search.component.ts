import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@appServices/http/http.service';
import { HelperService } from '@appServices/helper/helper.service';
import { AuthService } from '@appServices/auth/auth.service';
import { Subscription } from 'rxjs';
import { AlertService } from 'ngx-alerts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public limit: number = this.helperService.getPaginateLimit();
  public searchPage: number = 1;
  public isNextSearch: boolean = true;
  public searchList: any = [];
  public userData: any = this.authService.user();
  public searchFriendText: any = [];
  private content: any;
  public srchForm: FormGroup = this.formBuilder.group({
    keyword: ['', Validators.compose([Validators.required])],
  });

  constructor(
    private httpService: HttpService,
    private helperService: HelperService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.content = params.content;
    });
    this.srchForm.patchValue({
      keyword: this.content,
    });
    this.search(this.limit, this.searchPage, true);
  }

  public out(index: number, type: string) {
    if (type === 'search') {
      this.searchFriendText[index] = 'Add Friend';
    }
  }

  public over(index: number, type: string) {
    if (type === 'search') {
      this.searchFriendText[index] = 'Add Friend';
    }
  }

  public addTextTofriend(type: string) {
    if (type === 'search') {
      this.searchFriendText.push('Add Friend');
    }
  }

  public removeFriend(userId: any, type: string) {
    this.subscriptions.push(
      this.httpService
        .post('deleteFriend', {
          myId: this.userData.Id,
          userId: userId,
        })
        .subscribe((data) => {
          if (type === 'search') {
            this.searchPage = 1;
            this.search(this.limit, this.searchPage, true);
          }
          this.alertService.success(data.msg);
        })
    );
  }

  public onScroll(type: string) {
    if (type === 'search') {
      if (this.isNextSearch) {
        this.search(this.limit, this.searchPage);
      }
    }
  }

  private search(limit: number, page: number, reset?: boolean) {
    this.isNextSearch = false;
    this.searchFriendText = [];
    this.subscriptions.push(
      this.httpService
        .post('searchContent', {
          myId: this.userData.Id,
          type: 'user',
          content: this.srchForm.value.keyword,
          page: page,
          pageSize: limit,
        })
        .subscribe((data) => {
          this.isNextSearch = page < data.data.totalPages ? true : false;
          this.searchPage = this.searchPage + 1;
          if (this.searchList.length > 0 && !reset) {
            this.searchList.push(data.data.rows);
            this.searchList = [].concat.apply([], this.searchList);
          } else {
            this.searchList = data.data.rows;
          }
          this.searchList.forEach((element: any) => {
            this.addTextTofriend('search');
          });
        })
    );
  }

  public sendRequest(userId: number) {
    this.subscriptions.push(
      this.httpService
        .post('makePendingInvite', {
          myId: this.userData.Id,
          userId: userId,
        })
        .subscribe((data) => {
          this.searchPage = 1;
          this.search(this.limit, this.searchPage, true);
          this.alertService.success(data.msg);
        })
    );
  }

  public cancelRequest(userId: number) {
    this.subscriptions.push(
      this.httpService
        .post('cancelInviteRequest', {
          myId: this.userData.Id,
          userId: userId,
        })
        .subscribe((data) => {
          this.searchPage = 1;
          this.search(this.limit, this.searchPage, true);
          this.alertService.success(data.msg);
        })
    );
  }

  public acceptRequest(userId: number) {
    this.subscriptions.push(
      this.httpService
        .post('makeFriend', {
          myId: this.userData.Id,
          userId: userId,
        })
        .subscribe((data) => {
          this.searchPage = 1;
          this.search(this.limit, this.searchPage, true);
          this.alertService.success(data.msg);
        })
    );
  }

  public onSearchSubmit() {
    if (this.srchForm.valid) {
      this.searchPage = 1;
      this.search(this.limit, this.searchPage, true);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }
}
