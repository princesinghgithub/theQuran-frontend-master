import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '@appServices/http/http.service';
import { HelperService } from '@appServices/helper/helper.service';
import { AuthService } from '@appServices/auth/auth.service';
import { environment } from 'src/environments/environment';
import { findIndex, isUndefined } from 'underscore';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css'],
})
export class MyCourseComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public pageName = 'mycourses';
  public userData: any = this.authService.user();
  public limit: number = this.helperService.getPaginateLimit();
  public page: number = 1;
  public isNext: boolean = true;
  public myCourses: any = [];
  public myCompletedCourses: any = [];
  public test: any;
  public progressBarValue: any = 0;
  imageUrlXMPP: string = environment.imageUrlXMPP;
  // imageUrlS3: string = environment.imageUrlS3;

  constructor(
    private httpService: HttpService,
    private helperService: HelperService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getUserCourses(this.limit, this.page, false);
    // this.getInvitedCourses(false);
  }

  public getUserCourses(limit: number, page: number, reset?: boolean) {
    this.isNext = false;
    this.subscriptions.push(
      this.httpService
        .post('getUserCourses', {
          page: page,
          pageSize: limit,
          userId: this.userData.Id,
        })
        .subscribe(
          (data) => {
            this.isNext = page < data.data.totalPages ? true : false;
            this.page = this.page + 1;
            if (this.myCourses.length > 0 || !reset) {
              console.log('getusercourse');
              this.myCourses.push(data.data.rows);
              this.myCourses = [].concat.apply([], this.myCourses);
            } else {
              console.log('else');
              this.myCourses = data.data.rows;
            }

            // this.isNext = page < data.data.totalPages ? true : false;
            // this.page = this.page + 1;
            // const mycourses = data.data.rows.filter(
            //   (course) => course.UserCourseCompletion == null
            // );
            // const mycompleted = data.data.rows.filter(
            //   (course) => course.UserCourseCompletion?.IsCompleted == 1
            // );
            // if (this.myCourses.length > 0 && !reset) {
            //   console.log('getusercourse', reset);
            //   this.myCourses.push(mycourses);
            //   this.myCourses = [].concat.apply([], this.myCourses);
            // } else {
            //   console.log('else');
            //   this.myCourses = mycourses;
            // }

            // if (this.myCompletedCourses.length > 0 && !reset) {
            //   console.log('getusercourse', reset);
            //   this.myCompletedCourses.push(mycompleted);
            //   this.myCompletedCourses = [].concat.apply(
            //     [],
            //     this.myCompletedCourses
            //   );
            // } else {
            //   console.log('else');
            //   this.myCompletedCourses = mycompleted;
            // }
            this.getInvitedCourses(false);
          },
          () => this.getInvitedCourses(false)
        )
    );
  }

  public getInvitedCourses(reset?: boolean) {
    this.httpService
      .post('getInvitedUserCourse', {
        userId: this.userData.Id,
      })
      .subscribe((data) => {
        const rows = data.data.rows;
        console.log(rows);
        if (isUndefined(rows)) {
          return null;
        }
        const mycourses = rows.map((row) => {
          const mycourse = {
            ...row.UserCourse,
            inviteFrom: row.InviteFrom,
            isAccepted: row.isAccepted,
            randomId: row.RandomId,
            userCourseId: row.UserCourseId,
            userInvitedCourseId: row.UserInvitedCourseId,
          };
          return mycourse;
        });
        if (mycourses.length > 0 || !reset) {
          this.myCourses.push(mycourses);
          this.myCourses = [].concat.apply([], this.myCourses);
          console.log(this.myCourses, 'getinvitedcourse');
        } else {
          this.myCourses = mycourses;
        }

        // const rows = data.data.rows;
        // console.log({ rows });
        // const courses = rows.map((row) => {
        //   const mycourse = {
        //     ...row.UserCourse,
        //     inviteFrom: row.InviteFrom,
        //     randomId: row.RandomId,
        //     userCourseId: row.UserCourseId,
        //     userInvitedCourseId: row.UserInvitedCourseId,
        //     isAccepted: row.isAccepted,
        //   };
        //   return mycourse;
        // });
        // const mycourses = courses.filter(
        //   (course) => course.UserCourseCompletion == null
        // );
        // const mycompleted = courses.filter(
        //   (course) => course.UserCourseCompletion?.IsCompleted == 1
        // );
        // if (mycourses.length > 0 || !reset) {
        //   this.myCourses.push(mycourses);
        //   this.myCourses = [].concat.apply([], this.myCourses);
        // } else {
        //   this.myCourses = mycourses;
        // }
        // if (mycompleted.length > 0 || !reset) {
        //   this.myCompletedCourses.push(mycompleted);
        //   this.myCompletedCourses = [].concat.apply(
        //     [],
        //     this.myCompletedCourses
        //   );
        // } else {
        //   this.myCompletedCourses = mycompleted;
        // }
      });
  }

  public getProgressBarValue(lessonLength: any, userLessonLength: any) {
    let percent = (userLessonLength / lessonLength) * 100;
    return percent;
  }

  // public acceptInvitation(
  //   courseId: number,
  //   selectedStartDate,
  //   userInvitedCourseId: number,
  //   userInvitedCourses
  // ) {
  //   const invitedUsers = userInvitedCourses.map((user) => user.UserId);
  //   this.httpService
  //     .post('saveUserCourse', {
  //       userId: this.userData.Id,
  //       courseId: courseId,
  //       selectedStartDate: selectedStartDate,
  //       type: 'invited',
  //       userInvitedCourseId: userInvitedCourseId,
  //       invitedUsers: invitedUsers,
  //     })
  //     .subscribe((data) => {
  //       this.getUserCourses(this.limit, this.page, true);
  //       // this.getInvitedCourses(false);
  //     });
  // }

  public declineInvitation(userInvitedCourseId: number) {
    this.httpService
      .post('declineInvitedCourse', {
        userInvitedCourseId: userInvitedCourseId,
      })
      .subscribe((data) => {
        const courseIndex = findIndex(this.myCourses, {
          userInvitedCourseId: userInvitedCourseId,
        });
        this.myCourses.splice(courseIndex, 1);
      });
  }
  public acceptCourseInvite(userInvitedCourseId: number) {
    this.httpService
      .post('acceptCourseInvite', {
        userInvitedCourseId: userInvitedCourseId,
      })
      .subscribe((data) => {
        this.getUserCourses(this.limit, this.page, true);
      });
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

  public onScroll() {
    if (this.isNext) {
      this.getUserCourses(this.limit, this.page, false);
      // this.getInvitedCourses(false);
    }
  }

  public getRandomUserImages() {
    //this.cdRef.detectChanges();
    return this.helperService.getRandomUserImages();
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
