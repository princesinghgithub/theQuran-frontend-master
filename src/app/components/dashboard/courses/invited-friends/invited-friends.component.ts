import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '@appServices/http/http.service';
import { HelperService } from '@appServices/helper/helper.service';
import { AuthService } from '@appServices/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { AlertService } from 'ngx-alerts';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invited-friends',
  templateUrl: './invited-friends.component.html',
  styleUrls: ['./invited-friends.component.scss'],
})
export class InvitedFriendsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public userData: any = this.authService.user();
  public limit: number = this.helperService.getPaginateLimit();
  public page: number = 1;
  public isNext: boolean = true;
  public notInvitedPage: number = 1;
  public notInvitedIsNext: boolean = true;
  public notInvited: any = [];
  public invited: any = [];
  public courseId: any;
  public courseDetail: any;
  public inviteUrl: any = '';
  public invitedUserIds = [];
  public searchValue: string = '';
  imageUrlXMPP: string = environment.imageUrlXMPP;
  // imageUrlS3: string = environment.imageUrlS3;

  constructor(
    private httpService: HttpService,
    private helperService: HelperService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private _clipboardService: ClipboardService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseId = params.courseId;
    });
    this._clipboardService.copyResponse$.subscribe((re) => {
      if (re.isSuccess) {
        this.alertService.success('Link has been copied');
      }
    });
    this.getUserCourseDetail(this.courseId);
  }

  private getUserCourseDetail(courseId: number) {
    this.subscriptions.push(
      this.httpService
        .post('getUserCourseInviteFriendRoute', {
          userId: this.userData.Id,
          courseId: courseId,
          currentUser: this.userData.Id,
        })
        .subscribe((data) => {
          this.courseDetail = data.data;
          this.inviteUrl = `${window.location.origin}/join-course/${this.userData.Id}/${courseId}`;
          // window.location.origin +
          // '?' +
          // this.courseDetail?.UserCourseId +
          // '/' +
          // this.courseDetail?.RandomId;
          this.getFriendListCourseNotInvited(
            this.limit,
            this.notInvitedPage,
            ''
          );
          this.getFriendListCourseInvited(this.limit, this.page);
        })
    );
  }

  public getFriendListCourseNotInvited(
    limit: number,
    page: number,
    searchParam: string,
    reset?: boolean
  ) {
    this.notInvitedIsNext = false;
    this.subscriptions.push(
      this.httpService
        .post('getFriendListCourseNotInvited', {
          myId: this.userData.Id,
          searchParam,
          page: page,
          pageSize: limit,
          userCourseId: this.courseDetail.UserCourseId,
        })
        .subscribe((data) => {
          this.notInvitedIsNext = page < data.data.totalPages ? true : false;
          this.notInvitedPage = this.notInvitedPage + 1;
          if (this.notInvited.length > 0 && !reset) {
            this.notInvited.push(data.data.rows);
            this.notInvited = [].concat.apply([], this.notInvited);
          } else {
            this.notInvited = data.data.rows;
          }
        })
    );
  }

  public sendInvite(userId) {
    if (!this.invitedUserIds.includes(userId)) {
      this.invitedUserIds.push(userId);
    }
    this.httpService
      .post('inviteUsersToCourse', {
        courseId: this.courseId,
        userId: this.userData.Id,
        invitedUsers: this.invitedUserIds,
      })
      .subscribe((data) => {
        this.getFriendListCourseNotInvited(25, 1, '', true);
        this.getFriendListCourseInvited(25, 1, true);
        this.invitedUserIds = [];
        this.alertService.success(data.msg);
      });
  }

  public searchFriend() {
    console.log(this.searchValue);
    this.subscriptions.push(
      this.httpService
        .post('getAllFriends', {
          myId: this.userData.Id,
          searchParam: this.searchValue,
        })
        .subscribe((data) => {
          this.notInvited = data?.data?.rows?.us;
          this.searchValue = '';
        })
    );
  }

  private getFriendListCourseInvited(
    limit: number,
    page: number,
    reset?: boolean
  ) {
    this.isNext = false;
    this.subscriptions.push(
      this.httpService
        .post('getFriendListCourseInvited', {
          myId: this.userData.Id,
          page: page,
          pageSize: limit,
          userCourseId: this.courseDetail.UserCourseId,
        })
        .subscribe((data) => {
          this.isNext = page < data.data.totalPages ? true : false;
          this.page = this.page + 1;
          if (this.invited.length > 0 && !reset) {
            this.invited.push(data.data.rows);
            this.invited = [].concat.apply([], this.invited);
          } else {
            this.invited = data.data.rows;
          }
        })
    );
  }

  public onScroll(type: string) {
    if (type === 'invited') {
      if (this.isNext) {
        this.getFriendListCourseInvited(this.limit, this.page);
      }
    } else {
      if (this.notInvitedIsNext) {
        this.getFriendListCourseNotInvited(this.limit, this.notInvitedPage, '');
      }
    }
  }

  public onSearchChange(event) {
    this.searchValue = event.target.value;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }
}
