import { Component, OnInit } from '@angular/core';
import { AuthService } from '@appServices/auth/auth.service';
import { HttpService } from '@appServices/http/http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-saved-course',
  templateUrl: './saved-course.component.html',
  styleUrls: ['./saved-course.component.css'],
})
export class SavedCourseComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public pageName = 'mycourses';
  public userData: any = this.authService.user();
  public mySavedCourses: any = [];

  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getCompleted();
  }

  getCompleted() {
    this.subscriptions.push(
      this.httpService
        .post('getSavedCourse', {
          userId: this.userData.Id,
        })
        .subscribe(({ data }) => {
          const courses = data.rows.map((row) => {
            return row.Course;
          });
          this.mySavedCourses = courses;
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }
}
