import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@appServices/auth/auth.service';
import { HttpService } from '@appServices/http/http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-join-course',
  templateUrl: './join-course.component.html',
  styleUrls: ['./join-course.component.scss'],
})
export class JoinCourseComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public userId: number;
  public courseId: number;
  public userData: any = this.authService.user();
  public invitedUserIds: any = [this.userData.Id];
  public courseDetail: any = {};
  public response: string = 'Adding you to the course. Please wait...';

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = parseInt(params.userId);
      this.courseId = parseInt(params.courseId);
      this.getCourseDetail(this.userId, this.courseId);
      this.sendInvite();
    });
  }

  private getCourseDetail(userId: number, courseId: number) {
    this.subscriptions.push(
      this.httpService
        .post('getUserCourseInviteFriendRoute', {
          userId,
          courseId,
          attributeArray: ['CourseTitle', 'CourseDuration'],
        })
        .subscribe((data) => {
          this.courseDetail = data?.data?.Course;
        })
    );
  }

  public sendInvite() {
    if (this.userId === this.userData.Id)
      return (this.response = 'You can not invite yourself');
    this.httpService
      .post('inviteUsersToCourse', {
        courseId: this.courseId,
        userId: this.userId,
        invitedUsers: this.invitedUserIds,
      })
      .subscribe((data) => {
        this.invitedUserIds = [];
        this.response = data.msg;
      });
  }
}
