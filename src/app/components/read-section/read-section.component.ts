import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { HttpService } from 'src/app/common/services/http/http.service';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/common/services/helper/helper.service';

import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import * as _ from 'underscore';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import * as $ from 'jquery';
@Component({
  selector: 'app-read-section',
  templateUrl: './read-section.component.html',
  styleUrls: ['./read-section.component.css'],
})
@HostListener('window:scroll', [])
export class ReadSectionComponent implements OnInit {
  @Output() abbrogatedSideNav = new EventEmitter();
  @Output() passVerseAbbrogatedData = new EventEmitter();
  @Output() reloadOnChangeTranslation = new EventEmitter();

  sooraVerseDataArray: any[] = [];
  translationDataArray: any[] = [];
  sooraNarrationDataArray: any[] = [];
  currentPage: number = 1;
  pageSize: number = 150;
  translationId: number = 4;

  defaultTranlationId: number = 4;
  defaultLanguageId: number = 2;
  currentTranslation: any;
  currentQuran: any;
  totalSooraCount: any;
  textDir: string = '';
  textRTL = false;
  sooraPage = 1;
  arabicSooraTitle = '';
  verseAbbrogatedData: any = [];
  issueTranslationData: any = [];

  sooraData: any = { SooraId: 1 };
  sooraTitle: string = '';

  notEmptySoora: any = true;
  notScrolly = true;
  sooraNarrationPageSize: number = 25;
  sooraNarrationCurrentPage: number = 1;
  soorNarrationTotalCount: any = '';
  isFullListDisplayed: boolean = false;
  sooraNarrationTotalPages: any = '';
  isLoading = false;
  recentlyUsedTranslations: any = [];
  defaultLanguageVerion: any = 'EN-Pickthal';
  currentSelectedTranslation: any = '';

  sum = 25;
  throttle = 3000;
  scrollDistance = 1;
  // scrollUpDistance = 2;
  direction = '';

  dropdownLang: boolean = false;
  dropdownSura: boolean = false;
  showSideIssuesNav = false; /* false by default, since hidden */

  constructor(
    private httpService: HttpService,
    private spinnerService: NgxSpinnerService,
    private alertService: AlertService,
    private helperService: HelperService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTranslationsearch();
    this.currentTranslation = {
      TranslationId: 4,
      LanguageId: 2,
      Translation: 'EN-Pickthal',
    };
    this.getQuransearch();
    this.recentlyUsedTranslations =
      this.helperService.getRecentUsedTranslations();
  }
  openSideIssuesNav(verseNarrationData: any) {
    // console.log("verseNarrationData",verseNarrationData);

    this.verseAbbrogatedData = verseNarrationData;

    $('body').addClass('body-no-scroll');
    $('#shift-to-left').removeClass('col-lg-offset-3');
    $('#next-arrow').addClass('chapter-arrow-next-sidenav');
    $('#previous-arrow').addClass('chapter-arrow-previous-sidenav');
    $('#shift-to-left').addClass('leftMargin');
    this.showSideIssuesNav = true;

    this.abbrogatedSideNav.emit(this.showSideIssuesNav);
    this.verseAbbrogatedData = verseNarrationData;
    this.passVerseAbbrogatedData.emit(this.verseAbbrogatedData);
  }
  closeSideIssuesNav(data: any) {
    if (!data) {
      $('body').removeClass('body-no-scroll');
      $('#next-arrow').removeClass('chapter-arrow-next-sidenav');
      $('#previous-arrow').removeClass('chapter-arrow-previous-sidenav');
      $('#shift-to-left').removeClass('leftMargin');
      $('#shift-to-left').addClass('col-lg-offset-3');
    }
    this.showSideIssuesNav = data;
  }

  setCurrentSelectedTranslation(translationType: any) {
    localStorage.setItem(
      'current_translation_type',
      JSON.stringify(translationType)
    );
  }
  getCurrentSelectedTranslation() {
    if (localStorage.getItem('current_translation_type') != null) {
      let currentSelected: any = JSON.parse(
        localStorage.getItem('current_translation_type') || '{}'
      );
      this.currentSelectedTranslation = currentSelected.translationName;
      this.translationId = currentSelected.translationId;
      //  console.log(this.currentSelectedTranslation);
      let element = <HTMLElement>document.getElementById('languageTitle');
      element.innerHTML = this.currentSelectedTranslation;
    }
  }

  closeIssueNav() {
    this.showSideIssuesNav = false;
    $('body').removeClass('body-no-scroll');
    $('#next-arrow').removeClass('chapter-arrow-next-sidenav');
    $('#previous-arrow').removeClass('chapter-arrow-previous-sidenav');
    $('#shift-to-left').removeClass('leftMargin');
    $('#shift-to-left').addClass('col-lg-offset-3');
  }

  test(event) {
    console.log(event);
  }

  isOpenChange(event: any, sooraVerseData: any) {
    if (event == true) {
      this.closeIssueNav();
      if (this.currentQuran.SooraId != sooraVerseData.SooraId) {
        this.sooraNarrationDataArray = [];
        this.closeIssueNav();
        this.sooraNarrationCurrentPage = 1;
        let languageData: any = _.find(this.translationDataArray, {
          LanguageId: this.defaultLanguageId,
        });
        let translationData: any = _.find(languageData.Translations, {
          TranslationId: this.defaultTranlationId,
        });
        this.currentTranslation = translationData;
        this.currentQuran = sooraVerseData;
        this.getQuranSooraDetailNew();
        this.arabicSooraTitle =
          this.currentQuran.SooraId + '.' + this.currentQuran.Soora.SooraName;
        // console.log("isopenChange",this.currentQuran);
      }
    } else {
    }
  }

  public setQueryParams(key: string, value: any) {
    const queryParams: Params = { key: value };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
  }

  getTranslationsearch() {
    this.spinnerService.show();
    this.httpService.get('getTranslation').subscribe(
      (data) => {
        this.spinnerService.hide();
        this.translationDataArray = data.data;
        this.getQuransearch();
      },
      (error) => {
        this.spinnerService.hide();
        let msg = this.helperService.handleErrorMessage(error);
        this.alertService.danger(msg);
      }
    );
  }

  getQuransearch() {
    let languageData: any = _.find(this.translationDataArray, {
      LanguageId: this.defaultLanguageId,
    });
    if (!_.isUndefined(languageData)) {
      let translationData: any = _.find(languageData.Translations, {
        TranslationId: this.defaultTranlationId,
      });
      this.currentTranslation = translationData;
    }

    this.spinnerService.show();
    this.httpService
      .post('getQuran', {
        filters: {
          page: 1,
          pageSize: 150,
          translationId: this.currentTranslation.TranslationId,
        },
      })
      .subscribe(
        (data) => {
          this.spinnerService.hide();
          this.sooraVerseDataArray = data.data.rows;
          this.totalSooraCount = data.data.count;
          this.currentQuran = this.sooraVerseDataArray[0];
          // console.log("this.currentQuran",this.currentQuran);
          this.getQuranSooraDetailNew();
        },
        (error) => {
          //console.log(error);
          console.log(error);
          this.spinnerService.hide();
          let msg = this.helperService.handleErrorMessage(error);
          this.alertService.danger(msg);
        }
      );
  }

  getQuranSooraDetailNew() {
    // let page:number=1;
    this.sooraNarrationCurrentPage = 1;
    let sooraId: number = this.currentQuran.SooraId;
    this.spinnerService.show();
    this.httpService
      .post('getQuranDetail', {
        filters: {
          page: this.sooraNarrationCurrentPage,
          pageSize: 25,
          translationId: this.currentTranslation.TranslationId,
          sooraId: sooraId,
        },
      })
      .subscribe(
        (data) => {
          this.spinnerService.hide();
          this.soorNarrationTotalCount = data.data.count;
          this.sooraNarrationTotalPages = data.data.totalPages;
          this.sooraNarrationDataArray = data.data.rows;
          // console.log(this.sooraNarrationDataArray);
          this.currentQuran = this.sooraNarrationDataArray[0];
          this.arabicSooraTitle =
            this.currentQuran.SooraId + '.' + this.currentQuran.Soora.SooraName;
          //  console.log("this.currentQuran",this.currentQuran);
        },
        (error) => {
          // console.log(error);
          this.spinnerService.hide();
          let msg = this.helperService.handleErrorMessage(error);
          this.alertService.danger(msg);
        }
      );
  }

  getQuranTranslatedDetails(translationVersion: any) {
    this.closeIssueNav();
    this.defaultLanguageId = translationVersion.LanguageId;
    this.defaultTranlationId = translationVersion.TranslationId;
    let languageData: any = _.find(this.translationDataArray, {
      LanguageId: this.defaultLanguageId,
    });
    let translationData: any = _.find(languageData.Translations, {
      TranslationId: this.defaultTranlationId,
    });
    this.currentTranslation = translationData;

    this.getQuranSooraDetailNew();
    this.helperService.setRecentUsedTranslation(translationVersion);
    this.recentlyUsedTranslations =
      this.helperService.getRecentUsedTranslations();
    if (languageData.Language == 'Arabic') {
      this.showArabicTranslations();
    } else {
      this.textDir = 'ltr';
      this.textRTL = false;
    }
  }

  showArabicTranslations() {
    this.textDir = 'rtl';
    this.textRTL = true;
  }

  showDropdown(type: string) {
    if (type == 'lang') {
      this.dropdownSura = false;
      this.dropdownLang = !this.dropdownLang;
    } else {
      this.dropdownLang = false;
      this.dropdownSura = !this.dropdownSura;
    }
  }

  getQuranNextChapter(currentQuranSoora: any) {
    this.closeIssueNav();
    let sooraId: any = currentQuranSoora.SooraId;
    if (sooraId == this.totalSooraCount) {
      this.currentQuran.SooraId = 1;
    } else {
      this.currentQuran.SooraId = parseInt(this.currentQuran.SooraId) + 1;
    }
    this.getQuranSooraDetailNew();
  }

  getQuranPreviousChapter(currentQuranSoora: any) {
    this.closeIssueNav();
    let sooraId: any = currentQuranSoora.SooraId;
    if (sooraId == 1) {
      this.currentQuran.SooraId = this.totalSooraCount;
    } else {
      this.currentQuran.SooraId = parseInt(this.currentQuran.SooraId) - 1;
    }
    this.getQuranSooraDetailNew();
  }

  onclickScrollToVerse(verseId: any) {
    // console.log(
    //   verseId > this.sooraNarrationDataArray.length,
    //   321,
    //   verseId,
    //   this.sooraNarrationDataArray.length
    // );
    if (verseId > this.sooraNarrationDataArray.length) {
      let containVerseId: any = _.contains(
        this.sooraNarrationDataArray,
        verseId
      );

      if (containVerseId == false) {
        // console.log(containVerseId,'containVerseId')
        containVerseId = _.contains(this.sooraNarrationDataArray, verseId);
        let el = <HTMLElement>(
          document.getElementById(
            'verse-' + this.sooraNarrationDataArray.length
          )
        );
        el?.scrollIntoView({ behavior: 'smooth' });
        this.isLoading = true;
        let sooraId = this.currentQuran.SooraId;
        this.sooraNarrationCurrentPage = this.sooraNarrationCurrentPage + 1;
        this.spinnerService.show();
        this.httpService
          .post('getQuranDetail', {
            filters: {
              page: this.sooraNarrationCurrentPage,
              pageSize: this.sooraNarrationPageSize,
              translationId: this.defaultTranlationId,
              sooraId: sooraId,
            },
          })
          .subscribe(
            (data) => {
              this.spinnerService.hide();
              this.isLoading = false;
              this.onclickScrollToVerse(verseId);
              let sooraNarrationArr: [] = [];
              sooraNarrationArr = data.data.rows;
              this.sooraNarrationDataArray = [
                ...this.sooraNarrationDataArray,
                ...sooraNarrationArr,
              ];
              if (this.sooraNarrationDataArray.length == 0) {
                this.notEmptySoora = false;
              }
            },
            (error) => {
              this.spinnerService.hide();
              this.isLoading = false;
              let msg = this.helperService.handleErrorMessage(error);
              this.alertService.danger(msg);
            }
          );

        // }
      }
    } else {
      let el = <HTMLElement>document.getElementById('verse-' + verseId);
      el.scrollIntoView({ behavior: 'smooth' });
      //3rdsoora 27thverse issue on opening
    }
  }
  onScrollDown(sooraNarrationData: any) {
    // const start = this.sum;
    // this.sum += this.sooraNarrationPageSize;

    if (this.sooraNarrationCurrentPage < this.sooraNarrationTotalPages) {
      if (!this.isLoading) {
        this.loadNextSooraNarrationData(sooraNarrationData);
      }
    }
  }

  loadNextSooraNarrationData(narrationData: any) {
    let sooraId = narrationData.SooraId;
    this.sooraNarrationCurrentPage = this.sooraNarrationCurrentPage + 1;
    this.spinnerService.show();
    this.isLoading = true;
    this.httpService
      .post('getQuranDetail', {
        filters: {
          page: this.sooraNarrationCurrentPage,
          pageSize: this.sooraNarrationPageSize,
          translationId: this.defaultTranlationId,
          sooraId: sooraId,
        },
      })
      .subscribe(
        (data) => {
          this.spinnerService.hide();
          this.isLoading = false;
          let sooraNarrationArr: [] = [];
          sooraNarrationArr = data.data.rows;
          this.sooraNarrationDataArray = [
            ...this.sooraNarrationDataArray,
            ...sooraNarrationArr,
          ];
          if (this.sooraNarrationDataArray.length == 0) {
            this.notEmptySoora = false;
          }
        },
        (error) => {
          this.spinnerService.hide();
          this.isLoading = false;

          let msg = this.helperService.handleErrorMessage(error);
          this.alertService.danger(msg);
        }
      );
  }
}
