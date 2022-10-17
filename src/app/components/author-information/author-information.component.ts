import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from '@appServices/helper/helper.service';
import { HttpService } from '@appServices/http/http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-author-information',
  templateUrl: './author-information.component.html',
  styleUrls: ['./author-information.component.css'],
})
export class AuthorInformationComponent implements OnInit {
  authorData: any = [];
  arabicTranslation: any = '';
  authorId: number;
  constructor(
    private helperService: HelperService,
    private spinnerService: NgxSpinnerService,
    private httpService: HttpService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.spinnerService.show();
    this.route.queryParams.subscribe((params) => {
      this.authorId = params['id'];
      this.getAuthor();
      this.spinnerService.hide();
    });

    // this.spinnerService.show();
    // this.authorData = JSON.parse(localStorage.getItem('authorData') || '[]');
    // if (this.authorData) {
    //   this.spinnerService.hide();
    //   let translationAr = JSON.parse(
    //     localStorage.getItem('arabicTranslation') || '[]'
    //   );
    //   if (translationAr == true) {
    //     this.arabicTranslation = true;
    //   }
    // } else {
    //   this.spinnerService.hide();
    //   console.log('author data empty');
    // }
  }

  safeHTML(unsafe: string) {
    return this.sanitizer.bypassSecurityTrustHtml(unsafe);
  }

  getAuthor() {
    this.httpService
      .post('getAuthor', { userId: this.authorId })
      .subscribe((data) => {
        console.log(data.user);
        this.authorData = data.user;
      });
  }
}
