import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@appServices/auth/auth.service';
import { HttpService } from '@appServices/http/http.service';
import { AlertService } from 'ngx-alerts';
import * as _ from 'underscore';
import { isUndefined } from 'underscore';

@Component({
  selector: 'app-current-lesson',
  templateUrl: './current-lesson.component.html',
  styleUrls: ['./current-lesson.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CurrentLessonComponent implements OnInit {
  routeParams: any;
  course: any = {};
  user: any = {};
  public userData: any = this.authService.user();
  userCourseLessonCompletions: any = {};
  userInvitedCourses: any = {};
  otherInfo: any = {};
  timePeriod: any = [];
  currentLessons: any;
  currentCourseLesson: any;
  currentDay: number = 1;

  currentStatus: any;
  currentDayStatus: any;
  currentDayMessageStatus: string = 'incomplete';

  invited: string;
  isMore: boolean = false;
  textRtl: boolean;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.routeParams = { ...params };
    });
    this.route.queryParams.subscribe((params) => {
      if (isUndefined(params['invited'])) {
        this.invited = 'false';
      } else {
        this.invited = params['invited'];
      }
    });

    this.getCurrentLesson();

    // this.getTimePeriod();
  }

  private getCurrentLesson() {
    const courseUser =
      this.invited === 'true' ? this.routeParams.userId : this.userData.Id;
    console.log(courseUser, this.routeParams.courseId, this.userData.Id);
    //get invited from id through params and check if the course is invited or not. if it's invited then user the invitefrom user id else use current user id. maike sure to pass course id of invited user if the course is invited. then in save course lesson or refference change the user id to current user id
    this.httpService
      .post('getUserCourseDetail', {
        userId: courseUser,
        courseId: this.routeParams.courseId,
        currentUser: this.userData.Id,
      })
      .subscribe((data) => {
        console.log(data);
        const {
          Course,
          User,
          UserCourseLessonCompletions,
          UserInvitedCourses,
          ...otherInfo
        } = data.data;
        const checkPermision = UserInvitedCourses.some(
          (user) => user.UserId == this.userData.Id
        );
        this.messageCompleteStatus(Course);
        if (checkPermision || this.userData.Id == this.routeParams.userId) {
          this.course = Course;
          this.user = User;
          this.userCourseLessonCompletions = UserCourseLessonCompletions;
          this.userInvitedCourses = UserInvitedCourses;
          this.otherInfo = otherInfo;
          this.textRtl = Course.LanguageId == 1 ? true : false;
          this.changeDay(0);
          this.getTimePeriod();
        } else {
          console.log('you are not invited');
          this.alertService.danger(
            'You are do not have permision to view this page redirecting'
          );
          this.router.navigateByUrl('/home');
        }
      });
  }

  messageCompleteStatus(course) {
    console.log(course.CourseLessons);
    if (
      course.CourseLessons[this.currentDay - 1].LessonMessageCompletion
        ?.IsCompleted
    ) {
      this.currentDayMessageStatus = 'complete';
    } else {
      this.currentDayMessageStatus = 'incomplete';
    }
  }

  saveMessageStatus() {
    if (this.currentCourseLesson.LessonMessageCompletion?.IsCompleted) {
      this.alertService.success('Message is already completed');
    } else {
      this.httpService
        .post('saveLessonMessageStatus', {
          userCourseId: this.otherInfo.UserCourseId,
          userId: this.userData.Id,
          lessonId: this.currentCourseLesson.CourseLessonId,
          isCompleted: true,
        })
        .subscribe((data) => {
          this.alertService.success(data.msg);
          this.currentCourseLesson.LessonMessageCompletion = {};
          this.currentCourseLesson.LessonMessageCompletion.IsCompleted = 1;
          this.currentDayMessageStatus = 'complete';
          // this.checkLessonComplete();
        });
    }
  }

  saveCourseReferenceStatus(courseLessonReferenceId: number, lesson) {
    if (lesson.status == 'complete') {
      this.alertService.success('Reference is already completed');
    } else {
      this.httpService
        .post('saveCourseReferenceStatus', {
          userCourseId: this.otherInfo.UserCourseId,
          userId: this.userData.Id,
          lessonId: this.currentCourseLesson.CourseLessonId,
          courseLessonReferenceId: courseLessonReferenceId,
          isCompleted: true,
        })
        .subscribe((data) => {
          this.currentLessons.UserLessonReferenceCompletion = {};
          this.currentLessons.UserLessonReferenceCompletion.IsCompleted = 1;
          lesson.status = 'complete';
          this.alertService.success(data.msg);
          // this.checkLessonComplete();
        });
    }
  }

  // public setLocalData(params) {
  //   const allCourseDetails = JSON.parse(
  //     localStorage.getItem('allCourseDetails')
  //   );
  //   this.currentStatus = _.where(allCourseDetails, params);
  //   const { courseId } = params;
  //   this.currentDayStatus = _.where(allCourseDetails, {
  //     courseId,
  //     lesson: this.currentDay.toString(),
  //     type: 'reference',
  //   });
  //   this.currentDayMessageStatus = _.where(allCourseDetails, {
  //     courseId,
  //     lesson: this.currentDay.toString(),
  //     type: 'message',
  //   });
  // }

  // public setLessonReference() {
  //   this.httpService.post('')
  // }

  public changeDay(i) {
    this.currentDay = i + 1;
    this.messageCompleteStatus(this.course);
    // this.setLocalData(this.routeParams);
    const tempCurrentLessons =
      this.course.CourseLessons[i].CourseLessonReferences;
    this.currentCourseLesson = this.course.CourseLessons[i];
    this.currentLessons = tempCurrentLessons.map((lesson, index) => {
      if (lesson.UserLessonReferenceCompletion?.IsCompleted) {
        lesson.status = 'complete';
      }
      // console.log(this.currentDayStatus);
      // if (this.currentDayStatus[index]) {
      //   lesson.status = 'complete';
      //   return lesson;
      // }
      // lesson.status = 'incomplete';
      return lesson;
    });
  }

  more() {
    this.isMore ? (this.isMore = false) : (this.isMore = true);
  }

  cancelPlan() {
    this.httpService
      .post('cancelCourse', { userCourseId: this.otherInfo.UserCourseId })
      .subscribe((data) => {
        this.alertService.success(data.msg);
        this.router.navigateByUrl('/dashboard/my-lessons');
      });
  }

  public getTimePeriod() {
    const convertedDate = new Date(this.otherInfo.SelectedStartDate);
    const courseLength = this.course.CourseLessons.length;
    const timePeriod = [...Array(courseLength).keys()];
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    timePeriod.map((day) => {
      const dayDate = new Date(
        convertedDate.getFullYear(),
        convertedDate.getMonth(),
        convertedDate.getDate() + day
      );
      const currentDay = dayDate.getUTCDate();

      const currentMonth = monthNames[dayDate.getUTCMonth()].substring(0, 3);
      this.timePeriod.push({ currentDay, currentMonth, day: day + 1 });
    });
  }
}
