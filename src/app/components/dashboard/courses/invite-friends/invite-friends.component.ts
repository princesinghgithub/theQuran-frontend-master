import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@appServices/auth/auth.service';
import { HttpService } from '@appServices/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.scss'],
  template: `<!-- To Render Calendar -->
    <ejs-calendar></ejs-calendar>`,
  encapsulation: ViewEncapsulation.None,
})
export class InviteFriendsComponent implements OnInit {
  courseId: number;
  public userData: any = this.authService.user();
  courseDetail: any;
  imageUrlXMPP: string = environment.imageUrlXMPP;
  // imageUrlS3: string = environment.imageUrlS3;

  selectedDate: any = new Date();
  dateString: string;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseId = params.courseId;
    });
    this.onDateSelect(this.selectedDate);
    this.getCourseDetail(this.courseId);
  }

  public getCourseDetail(courseId: number) {
    this.httpService
      .post('getCourseDetail', {
        courseId: courseId,
      })
      .subscribe((data) => {
        this.courseDetail = data.data;
      });
  }

  public saveCourse(type: string, selectedDate) {
    const selectedStartDate = selectedDate
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    this.httpService
      .post('saveUserCourse', {
        userId: this.userData.Id,
        courseId: this.courseId,
        selectedStartDate: selectedStartDate,
        type: type,
      })
      .subscribe((data) => {
        this.router.navigateByUrl(
          `/dashboard/invited-friends/${this.courseId}`
        );
      });
  }

  public onDateSelect(d) {
    if (!d.value) {
      d.value = d;
    }
    const weekday: number = d.value.getDay();
    const date: number = d.value.getDate();
    const year: number = d.value.getFullYear();
    const month: number = d.value.getMonth();
    if (d.value.getTime() + 60 < new Date().getTime()) {
      return;
    }
    this.selectedDate = d.value;
    const months = [
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
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let suffix;

    switch (date) {
      case 1:
      case 21:
      case 31:
        suffix = 'st';
        break;
      case 2:
      case 22:
        suffix = 'nd';
        break;
      case 3:
      case 23:
        suffix = 'rd';
        break;
      default:
        suffix = 'th';
        break;
    }

    const day: string = weekdays[weekday];
    const selectedMonth: string = months[month];
    this.dateString = `${day}, ${selectedMonth} ${date}${suffix} ${year}`;
  }
}
