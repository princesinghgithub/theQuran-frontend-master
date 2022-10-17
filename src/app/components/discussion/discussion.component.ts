import { Component, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@appServices/auth/auth.service';
import { HttpService } from '@appServices/http/http.service';
import { AlertService } from 'ngx-alerts';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { find, isUndefined } from 'underscore';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss'],
})
export class DiscussionComponent implements OnInit {
  routeParams: any;
  course: any = {};
  user: any = {};
  public userData: any = this.authService.user();
  userCourseLessonCompletions: any = {};
  userInvitedCourses: any = {};

  otherInfo: any = {};
  timePeriod: any = [];
  currentCourseReference: any;
  currentDay: number;
  currentLesson: any = [];

  comment: string = '';
  editComment: string = '';
  lessonComments = [];
  direction: string = 'ltr';

  invited: string;
  courseUserId: any;

  modalRef?: BsModalRef;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private httpService: HttpService,
    private authService: AuthService,
    private alertService: AlertService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.routeParams = { ...params };
      //instead of local storage I can save it to data the procedure is same as usercourselesson commpletion
    });
    this.route.queryParams.subscribe((params) => {
      console.log(params['invited'], this.userData.Id, this.routeParams.userId);
      if (isUndefined(params['invited'])) {
        this.invited = 'false';
        this.courseUserId = this.userData.Id;
      } else {
        this.invited = params['invited'];
        this.courseUserId = this.routeParams.userId;
      }
      this.getCurrentLesson();
    });
  }

  private getCurrentLesson() {
    this.httpService
      .post('getUserCourseDetail', {
        userId: this.routeParams.userId,
        courseId: this.routeParams.courseId,
        currentUser: this.userData.Id,
      })
      .subscribe((data) => {
        const {
          Course,
          User,
          UserCourseLessonCompletions,
          UserInvitedCourses,
          ...otherInfo
        } = data.data;
        this.course = Course;
        this.user = User;
        this.userCourseLessonCompletions = UserCourseLessonCompletions;
        this.userInvitedCourses = UserInvitedCourses;
        this.otherInfo = otherInfo;
        this.currentCourseReference =
          this.course.CourseLessons[
            this.routeParams.lesson - 1
          ].CourseLessonReferences[this.routeParams.reference - 1];
        this.currentLesson =
          this.course.CourseLessons[this.routeParams.lesson - 1];
        // this.changeDay(this.routeParams.lesson - 1);
        // this.lessonComments = this.currentLesson.LessonComments;
        this.getLessonComments();
        this.getTimePeriod();
      });
  }

  safeHTML(unsafe: string) {
    return this.sanitizer.bypassSecurityTrustHtml(unsafe);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  changeDirection(e) {
    if (e.target.checked) {
      this.direction = 'rtl';
    } else {
      this.direction = 'ltr';
    }
  }

  nextLesson() {
    if (this.course.CourseLessons.length == this.routeParams.lesson) {
      this.router.navigateByUrl('/dashboard/my-lessons');
    } else {
      this.router.navigateByUrl(
        `/dashboard/my-lessons/read/user/${this.courseUserId}/course/${
          this.course.CourseId
        }/lesson/${this.routeParams.lesson * 1 + 1}/message${
          this.invited == 'true' && '?invited=true'
        }`
      );
    }
  }

  prevLesson() {
    if (this.currentLesson.CourseLessonReferences.length == 0) {
      this.router.navigateByUrl(
        `/dashboard/my-lessons/read/user/${this.courseUserId}/course/${
          this.course.CourseId
        }/lesson/${this.routeParams.lesson}/message${
          this.invited == 'true' ? '?invited=true' : ''
        }`
      );
    } else {
      this.router.navigateByUrl(
        `/dashboard/my-lessons/read/user/${this.courseUserId}/course/${
          this.course.CourseId
        }/lesson/${this.routeParams.lesson}/reference/${
          this.currentLesson.CourseLessonReferences.length
        }${this.invited == 'true' ? '?invited=true' : ''}`
      );
    }
  }

  // getPreviousLesson() {
  //   if (this.routeParams.reference == 1 || !this.routeParams.reference) {
  //     this.router.navigateByUrl(
  //       `/dashboard/my-lessons/read/user/${this.userData.Id}/course/${this.course.CourseId}/lesson/${this.routeParams.lesson}/message`
  //     );
  //   } else {
  //     const prevReference: number = this.routeParams.reference - 1;
  //     // this.changeDay(prevReference - 1);
  //     this.router
  //       .navigateByUrl(
  //         `/dashboard/my-lessons/read/user/${this.userData.Id}/course/${this.course.CourseId}/lesson/${this.routeParams.lesson}/reference/${prevReference}`
  //       )
  //       .then((worked) => this.getCurrentLesson());
  //   }
  // }

  saveCourseReferenceStatus() {
    this.httpService
      .post('saveCourseReferenceStatus', {
        userCourseId: this.otherInfo.UserCourseId,
        userId: this.routeParams.userId,
        lessonId: this.currentLesson.CourseLessonId,
        referenceId: this.currentCourseReference.CourseLessonReferenceId,
        isCompleted: true,
      })
      .subscribe((data) => console.log(data));
  }

  postComment() {
    this.httpService
      .post('saveLessonComment', {
        comment: this.comment,
        courseLessonId: this.currentLesson.CourseLessonId,
        userId: this.userData.Id,
        userCourseId: this.otherInfo.UserCourseId,
        direction: this.direction,
      })
      .subscribe((data) => {
        this.comment = '';
        this.getLessonComments();
        this.alertService.success(data.msg);
      });
  }

  deleteComment(lessonCommentId) {
    this.httpService
      .post('deleteLessonComment', {
        lessonCommentId: lessonCommentId,
      })
      .subscribe((data) => {
        this.getLessonComments();
        this.alertService.success(data.msg);
      });
  }

  updateLessonComment(lessonCommentId, editComment) {
    this.httpService
      .post('updateLessonComment', {
        lessonCommentId: lessonCommentId,
        comment: editComment,
        direction: this.direction,
      })
      .subscribe((data) => {
        this.getLessonComments();
        this.alertService.success(data.msg);
      });
  }

  saveComment(e) {
    this.comment = e.target.value;
  }
  saveEditComment(e) {
    this.editComment = e.target.value;
  }

  getLessonComments() {
    this.httpService
      .post('getLessonComments', {
        courseLessonId: this.currentLesson.CourseLessonId,
        userCourseId: this.otherInfo.UserCourseId,
      })
      .subscribe(
        (data) => {
          console.log(data.data.rows);
          this.lessonComments = data.data.rows;
        },
        (error) => console.log(error)
      );
  }

  saveUserCourseLessonStatus() {
    this.httpService
      .post('saveUserCourseLessonStatus', {
        userCourseId: this.otherInfo.UserCourseId,
        userId: this.routeParams.userId,
        lessonId: this.currentLesson.CourseLessonId,
        isCompleted: true,
      })
      .subscribe((data) => {
        this.alertService.success(data.msg);
      });
  }

  likeComment(commentId) {
    this.httpService
      .post('saveLessonLike', {
        lessonCommentId: commentId,
        userId: this.userData.Id,
        courseLessonId: this.currentLesson.CourseLessonId,
      })
      .subscribe((data) => {
        this.getLessonComments();
      });
  }

  isLiked(likes) {
    return find(likes, { UserId: this.userData.Id });
  }

  public checkMoreAvailable(length: any) {
    let num = length - 4;
    return num > 0 ? true : false;
  }

  public getTimePeriod() {
    const convertedDate = new Date(this.otherInfo.SelectedStartDate);
    const courseLength =
      this.course.CourseLessons[0].CourseLessonReferences.length;
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
    this.timePeriod = timePeriod.map((day) => {
      const dayDate = new Date(
        convertedDate.getFullYear(),
        convertedDate.getMonth(),
        convertedDate.getDate() + day
      );
      const currentDay = dayDate.getUTCDate();
      const currentMonth = monthNames[dayDate.getUTCMonth()].substring(0, 3);
      return { currentDay, currentMonth, day: day + 1 };
    });
  }
}
