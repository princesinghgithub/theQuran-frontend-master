import {
  Component,
  OnInit,
  OnDestroy,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '@appServices/http/http.service';
import { HelperService } from '@appServices/helper/helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from '@appServices/auth/auth.service';
import { AlertService } from 'ngx-alerts';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-start-plan',
  templateUrl: './start-plan.component.html',
  styleUrls: ['./start-plan.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StartPlanComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  modalRef: any;
  modalRef2: any;
  public courseId: any;
  public courseDetail: any;
  public userData: any = this.authService.user();
  imageUrlXMPP: string = environment.imageUrlXMPP;
  dir: string = 'ltr';
  // imageUrlS3: string = environment.imageUrlS3;

  constructor(
    private httpService: HttpService,
    private helperService: HelperService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseId = params.courseId;
    });
    this.getCourseDetail(this.courseId);
  }

  private getCourseDetail(courseId: number) {
    this.subscriptions.push(
      this.httpService
        .post('getCourseDetail', {
          courseId: courseId,
        })
        .subscribe((data) => {
          this.courseDetail = data.data;
          this.dir = data?.data?.Language?.RTL === 1 ? 'rtl' : 'ltr';
        })
    );
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'start_lesson_modal' })
    );
  }
  public openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, {
      id: 2,
      class: 'second',
    });
  }

  safeHTML(unsafe: string) {
    return this.sanitizer.bypassSecurityTrustHtml(unsafe);
  }

  public saveCourse(type: string) {
    const d = new Date();
    const selectedStartDate = d.toISOString().slice(0, 19).replace('T', ' ');
    this.httpService
      .post('saveUserCourse', {
        userId: this.userData.Id,
        courseId: this.courseId,
        selectedStartDate: selectedStartDate,
        type: type,
      })
      .subscribe((data) => {
        this.alertService.success(data.msg);
        this.modalRef2.hide();
        this.router.navigateByUrl('/dashboard/my-lessons');
      });
  }

  public addToSavedCourse() {
    if (this.isLoggedIn()) {
      this.httpService
        .post('savedCourse', {
          userId: this.userData.Id,
          courseId: this.courseId,
        })
        .subscribe((data) => {
          this.alertService.success(data.msg);
        });
    } else {
      this.alertService.info('Please Login to save course');
      this.router.navigateByUrl('/login');
    }
  }

  public isLoggedIn() {
    let token;
    token = this.authService.isLoggedIn();
    return !token ? false : true;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
    const modalCount = this.modalService.getModalsCount();
    if (modalCount > 0) {
      this.modalRef.hide();
    }
  }
}
