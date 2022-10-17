import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@appServices/http/http.service';
import { HelperService } from '@appServices/helper/helper.service';
import { AuthService } from '@appServices/auth/auth.service';
import { Subscription } from 'rxjs';
import { AlertService } from 'ngx-alerts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css'],
})
export class FriendsListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public limit: number = this.helperService.getPaginateLimit();
  public page: number = 1;
  public searchPage: number = 1;
  public isNext: boolean = true;
  public isNextSearch: boolean = true;
  public friendsList: any = [];
  public searchList: any = [];
  public userData: any = this.authService.user();
  public friendText: any = [];
  public searchFriendText: any = [];
  public getFriendsAgain: boolean = false;
  public srchForm: FormGroup = this.formBuilder.group({
    keyword: ['', Validators.compose([Validators.required])],
  });

  constructor(
    private httpService: HttpService,
    private helperService: HelperService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getFriendsList(this.limit, this.page);
    this.search(this.limit, this.searchPage);
  }

  public out(index: number, type: string) {
    if (type === 'search') {
      this.searchFriendText[index] = 'Add Friend';
    } else {
      this.friendText[index] = 'Friends';
    }
  }

  public over(index: number, type: string) {
    if (type === 'search') {
      this.searchFriendText[index] = 'Add Friend';
    } else {
      this.friendText[index] = 'Remove friend';
    }
  }

  public addTextTofriend(type: string) {
    if (type === 'search') {
      this.searchFriendText.push('Add Friend');
    } else {
      this.friendText.push('Friends');
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
          } else {
            this.page = 1;
            this.getFriendsList(this.limit, this.page, true);
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
    } else {
      if (this.isNext) {
        this.getFriendsList(this.limit, this.page);
      }
    }
  }

  private getFriendsList(limit: number, page: number, reset?: boolean) {
    this.isNext = false;
    this.friendText = [];
    this.subscriptions.push(
      this.httpService
        .post('getAllFriends', {
          myId: this.userData.Id,
          page: page,
          pageSize: limit,
        })
        .subscribe((data) => {
          this.isNext = page < data.data.totalPages ? true : false;
          this.page = this.page + 1;
          if (this.friendsList.length > 0 && !reset) {
            this.friendsList.push(data.data.rows);
            this.friendsList = [].concat.apply([], this.friendsList);
          } else {
            this.friendsList = data.data.rows;
          }
          this.friendsList.forEach((element: any) => {
            this.addTextTofriend('friendList');
          });
        })
    );
  }

  private search(limit: number, page: number, reset?: boolean) {
    this.isNextSearch = false;
    this.searchFriendText = [];
    this.subscriptions.push(
      this.httpService
        .post('getAllFriendReq', {
          myId: this.userData.Id,
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
          if (this.getFriendsAgain) {
            this.page = 1;
            this.getFriendsList(this.limit, this.page, true);
            this.getFriendsAgain = false;
          }
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
          this.getFriendsAgain = true;
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
          this.getFriendsAgain = true;
          this.alertService.success(data.msg);
        })
    );
  }

  public onSearchSubmit() {
    if (this.srchForm.valid) {
      this.router.navigate([
        '/dashboard/search-content',
        this.srchForm.value.keyword,
      ]);
      /* this.searchPage = 1;
      this.search(this.limit, this.searchPage, true); */
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }
}
