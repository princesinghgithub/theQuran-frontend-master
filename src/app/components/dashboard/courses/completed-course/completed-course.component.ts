import { Component, OnInit } from '@angular/core';
import { AuthService } from '@appServices/auth/auth.service';
import { HelperService } from '@appServices/helper/helper.service';
import { HttpService } from '@appServices/http/http.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-completed-course',
  templateUrl: './completed-course.component.html',
  styleUrls: ['./completed-course.component.css'],
})
export class CompletedCourseComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public pageName = 'mycourses';
  public userData: any = this.authService.user();
  public limit: number = this.helperService.getPaginateLimit();
  public page: number = 1;
  public isNext: boolean = true;
  public myCourses: any = [];
  public test: any;
  public progressBarValue: any = 0;
  imageUrlXMPP: string = environment.imageUrlXMPP;

  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.getCompletedCourses(this.limit, this.page, false);
  }

  public getCompletedCourses(limit: number, page: number, reset?: boolean) {
    this.isNext = false;
    this.subscriptions.push(
      this.httpService
        .post('getCompletedUserCourses', {
          page: page,
          pageSize: limit,
          userId: this.userData.Id,
        })
        .subscribe((data) => {
          console.log(data);
          const mycourses = data.data.rows;

          if (this.myCourses.length > 0 && !reset) {
            this.myCourses.push(mycourses);
            this.myCourses = [].concat.apply([], this.myCourses);
          } else {
            this.myCourses = mycourses;
          }

          this.getInvitedCourses(false);
        })
    );
  }

  public getInvitedCourses(reset?: boolean) {
    this.subscriptions.push(
      this.httpService
        .post('getCompletedInviteCourse', {
          page: this.page,
          pageSize: this.limit,
          userId: this.userData.Id,
        })
        .subscribe((data) => {
          console.log(data);
          const rows = data.data.rows;
          const mycourses = rows.map((row) => {
            return {
              ...row.UserCourse,
              inviteFrom: row.InviteFrom,
              randomId: row.RandomId,
              userCourseId: row.UserCourseId,
              userInvitedCourseId: row.UserInvitedCourseId,
              isAccepted: row.isAccepted,
            };
          });
          if (this.myCourses.length > 0 && !reset) {
            this.myCourses.push(mycourses);
            this.myCourses = [].concat.apply([], this.myCourses);
          } else {
            this.myCourses = mycourses;
          }
        })
    );
  }

  public getProgressBarValue(lessonLength: any, userLessonLength: any) {
    let percent = (userLessonLength / lessonLength) * 100;
    return percent;
  }

  public getInviteFrom(inviteFrom) {
    this.httpService
      .post('getUser', {
        userId: inviteFrom,
      })
      .subscribe((data) => {
        if (!data?.data?.ProfilePicture) {
          return 'pic';
        } else return data?.data?.ProfilePicture;
      });
  }

  public checkMoreAvailable(length: any) {
    let num = length - 6;
    return num > 0 ? true : false;
  }

  public checkDate(date: any) {
    let specific_date = new Date(date);
    let current_date = new Date();
    if (current_date.getTime() > specific_date.getTime()) {
      return false;
    } else {
      return true;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }
}
