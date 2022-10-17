import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@appServices/http/http.service';

@Component({
  selector: 'app-current-sample',
  templateUrl: './current-sample.component.html',
  styleUrls: [
    './current-sample.component.css',
    '../../current-lesson/current-lesson.component.scss',
  ],
})
export class CurrentSampleComponent implements OnInit {
  courseId: number;
  courseImage: string;
  courseImageName: string;
  courseTitle: string = 'loading';
  courseDescription: string = 'loading';
  courseLessons: any = [];
  currentDay: number = 1;
  currentLesson: any = [];
  timePeriod: any = [];
  textRtl: boolean;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseId = params.courseId;
    });
    this.getCourseDetail();
  }

  getCourseDetail() {
    this.httpService
      .post('getCourseDetail', {
        courseId: this.courseId,
      })
      .subscribe(({ data }) => {
        this.courseImage = data.CourseImage;
        this.courseImageName = data.CourseImageName;
        this.courseTitle = data.CourseTitle;
        this.courseDescription = data.CourseDescription;
        this.courseLessons = data.CourseLessons;
        this.changeDay(0);
        this.timePeriod = [...Array(this.courseLessons.length).keys()];
        this.textRtl = data.LanguageId == 1 ? true : false;
      });
  }

  public changeDay(i) {
    this.currentDay = i + 1;
    this.currentLesson = this.courseLessons[i].CourseLessonReferences;
    console.log(this.currentLesson);
  }
}
