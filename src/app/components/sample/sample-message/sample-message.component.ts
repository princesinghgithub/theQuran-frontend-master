import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@appServices/http/http.service';
import { isEmpty } from 'underscore';

@Component({
  selector: 'app-sample-message',
  templateUrl: './sample-message.component.html',
  styleUrls: [
    './sample-message.component.css',
    '../../read-lesson/read-lesson.component.scss',
  ],
})
export class SampleMessageComponent implements OnInit {
  routeParams: any;
  courseImage: string;
  courseImageName: string;
  courseTitle: string = 'loading';
  courseDescription: string = 'loading';
  currentLesson: any = {};
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
        this.courseImage = data.CourseImage;
        this.courseImageName = data.CourseImageName;
        this.courseTitle = data.CourseTitle;
        this.courseDescription = data.CourseDescription;
        this.currentLesson =
          data.CourseLessons[this.routeParams.currentDay - 1];
      });
  }

  getPreviousLesson() {
    this.router.navigateByUrl(
      `/start-lesson/${this.currentLesson.CourseId}/sample`
    );
  }
  getNextLesson() {
    if (isEmpty(this.currentLesson.CourseLessonReferences)) {
      return;
    } else {
      this.router.navigateByUrl(
        `/start-lesson/${this.routeParams.courseId}/sample/${this.routeParams.currentDay}/reference/1`
      );
    }
  }

  safeHTML(unsafe: string) {
    return this.sanitizer.bypassSecurityTrustHtml(unsafe);
  }
}
