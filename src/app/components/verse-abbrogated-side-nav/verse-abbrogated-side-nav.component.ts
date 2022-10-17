import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/common/services/http/http.service';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/common/services/helper/helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabDirective } from 'ngx-bootstrap/tabs';
import * as _ from 'underscore';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-verse-abbrogated-side-nav',
  templateUrl: './verse-abbrogated-side-nav.component.html',
  styleUrls: ['./verse-abbrogated-side-nav.component.css'],
})
export class VerseAbbrogatedSideNavComponent implements OnInit {
  @Input() abbrogatedSideNav: any;
  @Input() verseNarrationData: any;
  @Input('verseNarrationTranslation') verseNarrationTranslation: any;
  @Output() closeSideNavEvent = new EventEmitter();

  opened?: boolean;
  showSideIssuesNav: any;
  value!: string;
  issuesDataArr: any = [];
  defaultToShow: any = '';
  abbrogatedDetails: any = [];
  diffReadingDetails: any = [];
  repeatitionDetails: any = [];
  diffErrorsDetails: any = [];
  arabicTranslation: boolean = false;
  selectedTabValue: any = '';
  authorsList: any = [];
  authorDetails: any = [];
  customStyle: any = { width: 'auto', height: 'auto' };

  constructor(
    private httpService: HttpService,
    private spinnerService: NgxSpinnerService,
    private alertService: AlertService,
    private helperService: HelperService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.showSideIssuesNav = !this.showSideIssuesNav;

    this.checkTranslationShowData();
    if (this.verseNarrationData.AbrogatedVerses.length > 0) {
      this.defaultToShow = 'Abbrogated';
      this.getVerseAbbrogatedDetails(this.verseNarrationData);
    } else if (this.verseNarrationData.RepetitionsSooraverses.length > 0) {
      this.defaultToShow = 'Repeated';
      this.getVerseRepetitionDetails(this.verseNarrationData);
    } else if (this.verseNarrationData.Errors.length > 0) {
      this.defaultToShow = 'Differences';
      this.getVerseDifferencesDetails(this.verseNarrationData);
    } else if (this.verseNarrationData.Readings.length > 0) {
      this.defaultToShow = 'Different Readings';
      this.getVerseDiffReadingDetails(this.verseNarrationData);
    }

    switch (this.defaultToShow) {
      case 'Abbrogated':
        this.getVerseAbbrogatedDetails(this.verseNarrationData);
        break;

      case 'Repeated':
        this.getVerseRepetitionDetails(this.verseNarrationData);
        break;

      case 'Differences':
        this.getVerseDifferencesDetails(this.verseNarrationData);
        break;

      case 'Different Readings':
        this.getVerseDiffReadingDetails(this.verseNarrationData);
        break;

      default:
        console.log('default case');
        break;
    }
  }
  ngOnChanges() {
    let verseData = this.verseNarrationData;
    this.checkTranslationShowData();
    this.ngOnInit();
    //  location.reload();
  }
  checkTranslationShowData() {
    let translation = this.verseNarrationData?.Translation?.Translation;
    let translationStr = translation.toLowerCase();
    let translatedAr = translationStr.startsWith('ar');
    if (translatedAr) {
      this.arabicTranslation = true;
    }

    // if(this.verseNarrationTranslation?.Translation.startsWith("AR", 1)){
    //   alert(this.verseNarrationTranslation?.Translation);
    // }
  }

  closeSideIssuesNav() {
    this.showSideIssuesNav = !this.abbrogatedSideNav;
    this.closeSideNavEvent.emit(false);
  }

  safeHTML(unsafe: string) {
    return this.sanitizer.bypassSecurityTrustHtml(unsafe);
  }

  onSelect(data: TabDirective): void {
    this.value = data.heading;
  }

  getVerseAbbrogatedDetails(abbrogatedNarrationData: any) {
    console.log({ abbrogatedNarrationData });
    this.selectedTabValue = 'Abbrogated';
    let headerOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    let postData = {
      sooraId: abbrogatedNarrationData.SooraId,
      verse: abbrogatedNarrationData.Verse,
      translationId: abbrogatedNarrationData.TranslationId,
    };
    this.spinnerService.show();
    this.httpService
      .post('getAbrogationDetail', postData, headerOptions)
      .subscribe(
        (data) => {
          this.spinnerService.hide();
          this.abbrogatedDetails = data.data;
          console.log({ abbrogatedDetails: data.data });
          this.authorsList = data.data.Abrogations[0].Authors;
        },
        (error) => {
          this.spinnerService.hide();
          let msg = this.helperService.handleErrorMessage(error);
          this.alertService.danger(msg);
        }
      );
  }

  getVerseDiffReadingDetails(readingNarrationData: any) {
    console.log({ readingNarrationData });
    this.selectedTabValue = 'Different Readings';
    let headerOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    let postData = {
      sooraId: readingNarrationData.SooraId,
      verse: '' + readingNarrationData.Verse,
      translationId: readingNarrationData.TranslationId,
      narrationId: readingNarrationData.NarrationId,
      reading: readingNarrationData.Readings[0].Reading,
    };
    this.spinnerService.show();
    this.httpService
      .post('getDifferentReadingDetail', postData, headerOptions)
      .subscribe(
        (data) => {
          this.spinnerService.hide();
          this.diffReadingDetails = data.data;
          console.log({ diffReadingDetails: data.data });
          this.authorsList = data.data.DifferentReadings[0].Authors;
        },
        (error) => {
          this.spinnerService.hide();
          let msg = this.helperService.handleErrorMessage(error);
          this.alertService.danger(msg);
        }
      );
  }
  getVerseRepetitionDetails(repetitionNarrationData: any) {
    console.log({ repetitionNarrationData });
    this.selectedTabValue = 'Repeated';
    let headerOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    let postData = {
      sooraId: repetitionNarrationData.SooraId,
      verse: '' + repetitionNarrationData.Verse,
      translationId: repetitionNarrationData.TranslationId,
    };
    this.spinnerService.show();
    this.httpService
      .post('getRepetitionsDetail', postData, headerOptions)
      .subscribe(
        (data) => {
          this.spinnerService.hide();
          this.repeatitionDetails = data.data;
          console.log({ repeatitionDetails: data.data });
          this.authorsList = data.data.repetitionData[0].Authors;
        },
        (error) => {
          this.spinnerService.hide();
          let msg = this.helperService.handleErrorMessage(error);
          this.alertService.danger(msg);
        }
      );
  }

  getVerseDifferencesDetails(errorNarrationData: any) {
    console.log({ errorNarrationData });
    this.selectedTabValue = 'Differences';
    let headerOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    let postData = {
      sooraId: errorNarrationData.SooraId,
      verse: '' + errorNarrationData.Verse,
      translationId: errorNarrationData.TranslationId,
    };
    this.spinnerService.show();
    this.httpService
      .post('getDifferencesDetail', postData, headerOptions)
      .subscribe(
        (data) => {
          this.spinnerService.hide();
          this.diffErrorsDetails = data.data;
          console.log({ diffErrorsDetails: data.data });
          this.authorsList = data.data.Authors;
        },
        (error) => {
          this.spinnerService.hide();
          let msg = this.helperService.handleErrorMessage(error);
          this.alertService.danger(msg);
        }
      );
  }
  authorDetailPage(authorId: any) {
    authorId && this.router.navigateByUrl(`/author?id=${authorId}`);
    // console.log(authorId);
    // this.authorDetails = _.find(this.authorsList, {
    //   Id: authorId,
    // });
    // if (this.authorDetails) {
    //   console.log(this.authorDetails);
    //   localStorage.setItem('authorData', JSON.stringify(this.authorDetails));
    //   let translation = this.verseNarrationData?.Translation?.Translation;
    //   let translationStr = translation.toLowerCase();
    //   let translatedAr = translationStr.startsWith('ar');
    //   console.log('translatedAr', translatedAr);
    //   if (translatedAr) {
    //     localStorage.setItem('arabicTranslation', JSON.stringify(true));
    //     // this.arabicTranslation = true;
    //   } else {
    //     localStorage.setItem('arabicTranslation', JSON.stringify(false));
    //   }
    //   const url = '/author';
    //   window.open(url, '_blank');
    // } else {
    //   this.router.navigateByUrl(`/author?id=${authorId}`);
    // }
  }
  ngOnDestroy() {
    this.closeSideIssuesNav();
  }
}
