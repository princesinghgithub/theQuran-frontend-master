import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@appServices/auth/auth.service';
import { HttpService } from '@appServices/http/http.service';
import * as _ from 'underscore';
import { DomSanitizer } from '@angular/platform-browser';
import { isUndefined } from 'underscore';
import { TranslationDropdownComponent } from '@appCommon/components/translation-dropdown/translation-dropdown.component';

@Component({
  selector: 'app-read-lesson',
  templateUrl: './read-lesson.component.html',
  styleUrls: ['./read-lesson.component.scss'],
})
export class ReadLessonComponent implements OnInit {
  @ViewChild(TranslationDropdownComponent) child: any;
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
  allLessons: any = [];

  quranNarration: any = [];
  quranNarrationCurrentPage: number = 1;
  quranNarrationTotalCount: number;
  quranNarrationTotalPages: number;
  translationId: number = 1;
  Rtl: boolean = false;

  verseStart: number;
  verseEnd: number;
  fullChapter: string = 'Read full chapter';

  currentStatus: any;
  currentDayStatus: any;

  scrollDistance = 1;
  throttle = 300;

  invited: string;
  courseUserId: any;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.routeParams = { ...params };

      // this.setLocalData(params);
      //instead of local storage I can save it to data the procedure is same as usercourselesson commpletion
    });
    this.route.queryParams.subscribe((params) => {
      if (isUndefined(params['invited'])) {
        this.invited = 'false';
        this.courseUserId = this.userData.Id;
      } else {
        this.invited = params['invited'];
        this.courseUserId = this.routeParams.userId;
      }
      this.getCurrentLesson();
    });

    // this.getTimePeriod();
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
        this.translationId = Course.LanguageId;
        this.userInvitedCourses = UserInvitedCourses;
        this.otherInfo = otherInfo;
        this.allLessons = Course.CourseLessons;
        this.currentCourseReference =
          this.course.CourseLessons[
            this.routeParams.lesson - 1
          ].CourseLessonReferences[this.routeParams.reference - 1];
        this.currentLesson =
          this.course.CourseLessons[this.routeParams.lesson - 1];
        Course.LanguageId == 1 ? (this.Rtl = true) : (this.Rtl = false);
        // this.changeDay(this.routeParams.lesson - 1);
        this.getTimePeriod();
        this.getQurandetail(
          this.currentCourseReference?.VerseStart,
          this.currentCourseReference?.VerseEnd,
          this.translationId,
          true
        );
      });
  }

  safeHTML(unsafe: string) {
    return this.sanitizer.bypassSecurityTrustHtml(unsafe);
  }

  public getQurandetail(verseStart, verseEnd, translationId, reset?: boolean) {
    this.quranNarrationCurrentPage = 1;
    this.httpService
      .post('getQuranDetail', {
        filters: {
          page: this.quranNarrationCurrentPage,
          pageSize: 25,
          translationId: translationId,
          sooraId: this.currentCourseReference.SooraId,
          verseStart: verseStart,
          verseEnd: verseEnd,
        },
      })
      .subscribe(
        (data) => {
          console.log(data);
          if (this.quranNarration.length > 0 && !reset) {
            this.quranNarration.push(data.data.rows);
          } else {
            this.quranNarration = data.data.rows;
          }
          this.quranNarrationTotalCount = data.data.count;
          this.quranNarrationTotalPages = data.data.totalPages;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  public readFullChapter() {
    if (this.fullChapter == 'Read full chapter') {
      this.fullChapter = 'Show current chapter only';
      this.getQurandetail(
        1,
        this.currentCourseReference.Soora.VerseCount,
        this.translationId,
        true
      );
    } else {
      this.fullChapter = 'Read full chapter';
      this.getQurandetail(
        this.currentCourseReference.VerseStart,
        this.currentCourseReference.VerseEnd,
        this.translationId,
        true
      );
    }
  }

  changeTranslation(translation) {
    this.translationId = translation;
    this.child.selectedTranslation.LanguageId == 1
      ? (this.Rtl = true)
      : (this.Rtl = false);
    this.getQurandetail(
      this.currentCourseReference.VerseStart,
      this.currentCourseReference.VerseEnd,
      this.translationId,
      true
    );
  }

  public setLocalData(params) {
    const allCourseDetails = JSON.parse(
      localStorage.getItem('allCourseDetails')
    );
    this.currentStatus = _.where(allCourseDetails, params);
    const { courseId, lesson } = params;
    this.currentDayStatus = _.where(allCourseDetails, { courseId, lesson });
  }

  public changeDay(i) {
    this.currentCourseReference =
      this.course.CourseLessons[i].CourseLessonReferences[i];
    this.currentDay = i + 1;
  }

  // GET ALL THE REFERENCE COMPLETION AND CHECK IF EVERY REFERENCE IS COMPLETED OR NOT THEN ON CLICK OF THE ARROW BUTTON ADD COURSE LESSON COMPLETION

  getPreviousLesson() {
    if (this.routeParams.reference == 1) {
      console.log(this.routeParams.reference);
      this.router.navigateByUrl(
        `/dashboard/my-lessons/read/user/${this.courseUserId}/course/${
          this.course.CourseId
        }/lesson/${this.routeParams.lesson}/message${
          this.invited == 'true' ? '?invited=true' : ''
        }`
      );
    } else if (!this.routeParams.reference) {
      console.log(this.routeParams.reference);
      this.router.navigateByUrl(
        `/dashboard/my-lessons/read/user/${this.courseUserId}/course/${this.course.CourseId}`
      );
    } else {
      const prevReference: number = this.routeParams.reference - 1;
      console.log(prevReference);
      // this.changeDay(prevReference - 1);
      this.router
        .navigateByUrl(
          `/dashboard/my-lessons/read/user/${this.courseUserId}/course/${
            this.course.CourseId
          }/lesson/${this.routeParams.lesson}/reference/${prevReference}${
            this.invited == 'true' ? '?invited=true' : ''
          }`
        )
        .then((worked) => this.getCurrentLesson());
    }
  }

  saveToLocal(type: string) {
    const tempCourseDetails =
      JSON.parse(localStorage.getItem('allCourseDetails')) || [];

    const courseDetail = { ...this.routeParams, type: type };
    const checkDuplicate = _.where(tempCourseDetails, courseDetail);

    if (_.isEmpty(checkDuplicate)) {
      tempCourseDetails.push(courseDetail);
      localStorage.setItem(
        'allCourseDetails',
        JSON.stringify(tempCourseDetails)
      );
    }
  }

  saveCourseReferenceStatus() {
    this.httpService
      .post('saveCourseReferenceStatus', {
        userCourseId: this.otherInfo.UserCourseId,
        userId: this.userData.Id,
        lessonId: this.currentLesson.CourseLessonId,
        courseLessonReferenceId:
          this.currentCourseReference.CourseLessonReferenceId,
        isCompleted: true,
      })
      .subscribe((data) => {
        this.currentCourseReference.UserLessonReferenceCompletion = {};
        this.currentCourseReference.UserLessonReferenceCompletion.IsCompleted = 1;
        this.checkLessonComplete();
      });
  }

  saveUserCourseLessonStatus() {
    this.httpService
      .post('saveUserCourseLessonStatus', {
        userCourseId: this.otherInfo.UserCourseId,
        userId: this.userData.Id,
        lessonId: this.currentLesson.CourseLessonId,
        isCompleted: true,
      })
      .subscribe((data) => {
        this.alertService.success(data.msg);
        this.currentLesson.UserCourseLessonCompletion = {};
        this.currentLesson.UserCourseLessonCompletion.IsCompleted = 1;
        this.checkCourseComplete();
      });
  }

  saveUserCourseStatus() {
    this.httpService
      .post('saveUserCourseStatus', {
        userCourseId: this.otherInfo.UserCourseId,
        userId: this.userData.Id,
        isCompleted: true,
      })
      .subscribe((data) => {
        this.alertService.success(data.msg);
      });
  }

  saveMessageStatus() {
    this.httpService
      .post('saveLessonMessageStatus', {
        userCourseId: this.otherInfo.UserCourseId,
        userId: this.userData.Id,
        lessonId: this.currentLesson.CourseLessonId,
        isCompleted: true,
      })
      .subscribe((data) => {
        this.alertService.success(data.msg);
        this.currentLesson.LessonMessageCompletion = {};
        this.currentLesson.LessonMessageCompletion.IsCompleted = 1;
        this.checkLessonComplete();
      });
  }

  checkLessonComplete() {
    const messageComplete =
      this.currentLesson.LessonMessageCompletion?.IsCompleted;
    const referencesCompleted =
      this.currentLesson.CourseLessonReferences.filter(
        (reference) => reference.UserLessonReferenceCompletion?.IsCompleted == 1
      );
    const references = this.currentLesson.CourseLessonReferences.length;
    const currentReference = isUndefined(this.currentCourseReference)
      ? true
      : this.currentCourseReference?.UserLessonReferenceCompletion?.IsCompleted;
    console.log({
      currentReference,
      messageComplete,
      referencesCompleted,
      references,
    });
    if (
      messageComplete &&
      referencesCompleted.length == references &&
      currentReference
    ) {
      this.saveUserCourseLessonStatus();
      console.log('lesson complete');
    } else {
      console.log('not complete');
    }
  }

  checkCourseComplete() {
    const completedLessons = this.allLessons.filter(
      (lesson) => lesson.UserCourseLessonCompletion?.IsCompleted == 1
    );
    console.log({ completedLessons });
    if (completedLessons.length == this.allLessons.length) {
      this.saveUserCourseStatus();
    }
  }

  getNextLesson() {
    if (
      !this.routeParams.reference &&
      this.currentLesson.CourseLessonReferences.length > 0
    ) {
      console.log('first');
      this.saveMessageStatus();
      this.router.navigateByUrl(
        `/dashboard/my-lessons/read/user/${this.courseUserId}/course/${
          this.course.CourseId
        }/lesson/${this.routeParams.lesson}/reference/1${
          this.invited == 'true' ? '?invited=true' : ''
        }`
      );
    } else if (
      this.routeParams.reference >=
      Number(this.currentLesson.CourseLessonReferences.length)
    ) {
      console.log('second');
      const currentReference =
        this.currentCourseReference?.UserLessonReferenceCompletion?.IsCompleted;
      if (!currentReference) {
        this.saveCourseReferenceStatus();
      }
      console.log({
        routeReference: this.routeParams.reference,
        currentReference,
        courseReference: this.currentLesson.CourseLessonReferences.length,
      });
      this.router.navigateByUrl(
        `/dashboard/my-lessons/read/user/${this.courseUserId}/course/${
          this.course.CourseId
        }/lesson/${this.routeParams.lesson}/discussion${
          this.invited == 'true' ? '?invited=true' : ''
        }`
      );
    } else if (
      !this.routeParams.reference &&
      this.currentLesson.CourseLessonReferences.length === 0
    ) {
      console.log('third');
      this.saveMessageStatus();
      this.router.navigateByUrl(
        `/dashboard/my-lessons/read/user/${this.courseUserId}/course/${
          this.course.CourseId
        }/lesson/${this.routeParams.lesson}/discussion${
          this.invited == 'true' ? '?invited=true' : ''
        }`
      );
    } else {
      console.log('fourth');
      const currentReference =
        this.currentCourseReference?.Soora.UserLessonReferenceCompletion
          ?.IsCompleted;
      if (!currentReference) {
        this.saveCourseReferenceStatus();
      }
      this.checkLessonComplete();

      const nextReference: number = Number(this.routeParams.reference) + 1;
      // this.changeDay(nextReference - 1);
      this.router
        .navigateByUrl(
          `/dashboard/my-lessons/read/user/${this.courseUserId}/course/${
            this.course.CourseId
          }/lesson/${this.routeParams.lesson}/reference/${nextReference}${
            this.invited == 'true' ? '?invited=true' : ''
          }`
        )
        .then((worked) => this.getCurrentLesson());
    }
  }

  getNextPage() {
    if (this.quranNarrationTotalPages > this.quranNarrationCurrentPage) {
      this.quranNarrationCurrentPage = this.quranNarrationCurrentPage + 1;
      this.httpService
        .post('getQuranDetail', {
          filters: {
            page: this.quranNarrationCurrentPage,
            pageSize: 25,
            translationId: this.translationId,
            sooraId: this.currentCourseReference.SooraId,
          },
        })
        .subscribe((data) => {
          this.quranNarration.push(...data.data.rows);
        });
    }
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
