import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@appServices/http/http.service';

@Component({
  selector: 'app-read-sample',
  templateUrl: './read-sample.component.html',
  styleUrls: [
    './read-sample.component.css',
    '../../read-lesson/read-lesson.component.scss',
  ],
})
export class ReadSampleComponent implements OnInit {
  routeParams: any;
  courseImage: string;
  courseImageName: string;
  courseTitle: string = 'loading';
  courseDescription: string = 'loading';
  currentLessonReferences: any = [];
  currentLesson: any = [];
  currentLessonReference: any = [];
  quranNarration: any = [];

  language: any;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.routeParams = { ...params };
      this.getCurrentLesson();
    });
  }

  public getCurrentLesson() {
    this.httpService
      .post('getCourseDetail', {
        courseId: this.routeParams.courseId,
      })
      .subscribe(({ data }) => {
        console.log(data);
        this.language = data.Language;
        this.courseImage = data.CourseImage;
        this.courseImageName = data.CourseImageName;
        this.courseTitle = data.CourseTitle;
        this.courseDescription = data.CourseDescription;

        this.currentLessonReference =
          data.CourseLessons[
            this.routeParams.currentDay - 1
          ].CourseLessonReferences[this.routeParams.referenceId - 1];

        this.currentLesson =
          data.CourseLessons[this.routeParams.currentDay - 1];

        this.currentLessonReferences =
          data.CourseLessons[
            this.routeParams.currentDay - 1
          ].CourseLessonReferences;

        this.getQurandetail(
          this.currentLessonReference?.VerseStart,
          this.currentLessonReference?.VerseEnd,
          this.language.LanguageId,
          true
        );
      });
  }

  getPreviousLesson() {
    if (this.routeParams.referenceId <= 1) {
      this.router.navigateByUrl(
        `/start-lesson/${this.routeParams.courseId}/sample/${this.routeParams.currentDay}/message`
      );
    } else {
      this.router.navigateByUrl(
        `/start-lesson/${this.routeParams.courseId}/sample/${
          this.routeParams.currentDay
        }/reference/${this.routeParams.referenceId - 1}`
      );
    }
  }
  getNextLesson() {
    if (this.routeParams.referenceId == this.currentLessonReferences.length) {
      return;
    } else {
      this.router.navigateByUrl(
        `/start-lesson/${this.routeParams.courseId}/sample/${
          this.routeParams.currentDay
        }/reference/${Number(this.routeParams.referenceId) + 1}`
      );
    }
  }

  public getQurandetail(verseStart, verseEnd, translationId, reset?: boolean) {
    // this.quranNarrationCurrentPage = 1;
    this.httpService
      .post('getQuranDetail', {
        filters: {
          // page: this.quranNarrationCurrentPage,
          // pageSize: 25,
          translationId: translationId,
          sooraId: this.currentLessonReference.SooraId,
          verseStart: verseStart,
          verseEnd: verseEnd,
        },
      })
      .subscribe(
        ({ data }) => {
          this.quranNarration = data.rows;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
