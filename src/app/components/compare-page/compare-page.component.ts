import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HttpService } from 'src/app/common/services/http/http.service';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/common/services/helper/helper.service';

import * as _ from 'underscore';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import * as $ from 'jquery';
import { any } from 'underscore';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-compare-page',
  templateUrl: './compare-page.component.html',
  styleUrls: ['./compare-page.component.css'],
})
export class ComparePageComponent implements OnInit {
  @Output() abbrogatedSideNav = new EventEmitter();
  @Output() passVerseAbbrogatedData = new EventEmitter();
  @Output() reloadOnChangeTranslation = new EventEmitter();

  private subscriptions: Subscription[] = [];
  sooraVerseDataArray: any[] = [];
  translationDataArray: any[] = [];
  sooraNarrationDataArray: any[] = [];
  currentPage: number = 1;
  pageSize: number = 150;
  translationId: number 
  defaultTranlationId: number 
  defaultLanguageId: number 
  sooraId: number;
  verseId: number;
  isIssue: boolean = false;

  currentQuran: any;
  currentQuran2: any;
  currentTranslation: any;
  verseAbbrogatedData: any = [];
  soorNarrationTotalCount: any = '';
  sooraNarrationTotalPages: any = '';
  sooraNarrationCurrentPage: number = 1;
  totalSooraCount: any;

  isLoading: any = false;
  sooraNarrationPageSize: number = 25;

  textDir: string = '';
  textRTL = false;
  throttle = 3000;
  scrollDistance = 1;

  translationVersionIds: any = [];

  submitted = false;
  compareSuraForm!: FormGroup;
  compareNarrationData: any = [];
  translationCompareVersionArr: any = [];
  compareNarrationPageSize: number = 25;
  compareNarrationCurrentPage: number = 1;
  comparedVerseNarrationTotalPages: any = '';
  comparedVerseNarrationCount: any = '';
  verseStart: any = '1';
  verseEnd: any = '';
  // verseComparisonArr: number[] = [];
  chapterTitle: any = '';
  verseFrom: string;
  verseTo: string;
  tempSooraId: number = 1;

  dropdownLang: boolean = false;
  dropdownSura: boolean = false;
  showSideIssuesNav = false;
  arabicLanguage: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private spinnerService: NgxSpinnerService,
    private alertService: AlertService,
    private helperService: HelperService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if(localStorage.getItem("language")==="ar"){
      this.translationId=1
    } else {
      this.translationId=2
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.sooraId = parseInt(params.soora);
      this.verseId = parseInt(params.verse);
      if (this.sooraId && this.verseId) {
        this.isIssue = true;
      } else {
        this.isIssue = false;
      }
    });
    this.getTranslationsearch();
    this.currentTranslation = {
      TranslationId: this.translationId,
      LanguageId: 2,
      Translation: 'EN-Pickthal',
    };
    this.getQuransearch();
    this.compareSuraForm = this.formBuilder.group({
      translationIds: [''],
      verseStart: [''],
      verseEnd: [''],
    });
    // this.route.params.subscribe((params) => {
    //   console.log(params);
    //   this.sooraId = Number(params.sooraId);
    //   this.verseId = Number(params.verseId);
    // });
  }

  isOpenChange(event: any, sooraVerseData: any, formReset: boolean = true) {
    if (event == true) {
      // this.closeIssueNav();
      if (this.currentQuran.SooraId != sooraVerseData.SooraId) {
        this.sooraNarrationDataArray = [];
        // this.closeIssueNav();
        if (formReset) {
          this.resetCompareForm();
        }
        this.sooraNarrationCurrentPage = 1;
        this.compareNarrationCurrentPage = 1;
        let languageData: any = _.find(this.translationDataArray, {
          LanguageId: this.defaultLanguageId,
        });
        let translationData: any = _.find(languageData.Translations, {
          TranslationId: this.defaultTranlationId,
        });
        this.currentTranslation = translationData;
        this.currentQuran = sooraVerseData;
        this.verseEnd = this.currentQuran.Soora.VerseCount;
        // console.log(' this.currentQuran', this.currentQuran);
        this.chapterTitle =
          this.currentQuran.Soora.SooraId +
          '.' +
          ' ' +
          this.currentQuran.Soora.ArabicEnglishName;
        this.getQuranSooraDetailNew();
        // this.arabicSooraTitle = this.currentQuran.SooraId+'.'+this.currentQuran.Soora.SooraName;
      }
    } else {
    }
  }

  // compareVerseHandler(event: boolean, sooraVerseData: any, verseId: number) {
  //   if (this.translationCompareVersionArr.length === 0) {
  //     this.isOpenChange(event, sooraVerseData);
  //     // this.onclickScrollToVerse(verseId);
  //   } else {
  //     this.currentQuran2 = sooraVerseData;
  //     if (
  //       this.verseComparisonArr.length == 0 &&
  //       verseId !== this.verseComparisonArr[0]
  //     ) {
  //       this.verseComparisonArr.push(verseId);
  //       this.compareSuraForm.controls['verseStart'].setValue(
  //         this.verseComparisonArr[0]
  //       );
  //       // this.verseStart = this.verseComparisonArr[0];
  //     } else if (
  //       this.verseComparisonArr.length == 1 &&
  //       verseId !== this.verseComparisonArr[1]
  //     ) {
  //       this.verseComparisonArr.push(verseId);
  //       this.compareSuraForm.controls['verseEnd'].setValue(
  //         this.verseComparisonArr[1]
  //       );
  //       // this.verseEnd = this.verseComparisonArr[1];
  //     } else if (this.verseComparisonArr.length === 2) {
  //       this.verseComparisonArr = [];
  //       this.compareVerseHandler(event, sooraVerseData, verseId);
  //     }
  //   }
  // }

  showDropdown(type: string) {
    if (type == 'lang') {
      this.dropdownSura = false;
      this.dropdownLang = !this.dropdownLang;
    } else {
      this.dropdownLang = false;
      this.dropdownSura = !this.dropdownSura;
    }
  }

  setCurrentQuran(currentQuran: any) {
    this.currentQuran = currentQuran;
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
    // if (!_.isUndefined(languageData)) {
    //   let translationData: any = _.find(languageData.Translations, {
    //     TranslationId: this.defaultTranlationId,
    //   });
    //   this.currentTranslation = translationData;
    // }

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
          this.currentQuran =
            this.sooraVerseDataArray.find(
              (sooraVerse) => sooraVerse.SooraId == this.sooraId
            ) || this.sooraVerseDataArray[0];
          this.verseEnd = this.currentQuran.Soora.VerseCount;
          this.chapterTitle =
            this.currentQuran.Soora.SooraId +
            '.' +
            ' ' +
            this.currentQuran.Soora.ArabicEnglishName;
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
          pageSize: this.pageSize,
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
          const verseData = this.sooraNarrationDataArray.find(
            (verse) => verse.Verse == this.verseId
          );
          if (this.isIssue && verseData) {
            this.openSideIssuesNav(verseData);
          }
          //  this.arabicSooraTitle = this.currentQuran.SooraId+'.'+this.currentQuran.Soora.SooraName;
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
  changeChapter(sooraVerseData) {
    // let page:number=1;
    this.sooraNarrationCurrentPage = 1;
    let sooraId: number = sooraVerseData.Soora.SooraId;
    this.tempSooraId = sooraVerseData.Soora.SooraId;
    this.soorNarrationTotalCount = sooraVerseData.Soora.VerseCount;
    this.verseStart = 1;
    this.verseEnd = sooraVerseData.Soora.VerseCount;
    this.chapterTitle =
      sooraVerseData.Soora.SooraId +
      '.' +
      ' ' +
      sooraVerseData.Soora.ArabicEnglishName;
    // this.spinnerService.show();
    // this.httpService
    //   .post('getQuranDetail', {
    //     filters: {
    //       page: this.sooraNarrationCurrentPage,
    //       pageSize: 300,
    //       translationId: this.currentTranslation.TranslationId,
    //       sooraId: sooraId,
    //     },
    //   })
    //   .subscribe(
    //     (data) => {
    //       this.spinnerService.hide();
    //       this.soorNarrationTotalCount = data.data.count;
    //       this.sooraNarrationTotalPages = data.data.totalPages;
    //       this.sooraNarrationDataArray = data.data.rows;
    //       this.verseStart = 1;
    //       this.verseEnd = data.data.rows.length;
    //       this.chapterTitle =
    //         data.data.rows[0].SooraId +
    //         '.' +
    //         ' ' +
    //         data.data.rows[0].Soora.ArabicEnglishName;
    //       // console.log(this.sooraNarrationDataArray);
    //       this.currentQuran = data.data.rows[0];
    //       //  this.arabicSooraTitle = this.currentQuran.SooraId+'.'+this.currentQuran.Soora.SooraName;
    //       //  console.log("this.currentQuran",this.currentQuran);
    //     },
    //     (error) => {
    //       // console.log(error);
    //       this.spinnerService.hide();
    //       let msg = this.helperService.handleErrorMessage(error);
    //       this.alertService.danger(msg);
    //     }
    //   );
  }

  getCurrentChapter(sooraId, verseStart, verseEnd) {
    let translationId = null;
    // if (this.translationCompareVersionArr.length == 1) {
    //   translationId = this.translationCompareVersionArr[0].translationId;
    // }
    this.spinnerService.show();
    this.httpService
      .post('getQuranDetail', {
        filters: {
          page: this.sooraNarrationCurrentPage,
          pageSize: 300,
          translationId:this.currentTranslation.TranslationId,
          sooraId: sooraId,
        },
      })
      .subscribe(
        (data) => {
          this.spinnerService.hide();
          this.soorNarrationTotalCount = data.data.count;
          this.sooraNarrationTotalPages = data.data.totalPages;
          this.sooraNarrationDataArray = data.data.rows;
          this.verseStart = verseStart;
          this.verseEnd = verseEnd;
          this.chapterTitle =
            data.data.rows[0].SooraId +
            '.' +
            ' ' +
            data.data.rows[0].Soora.ArabicEnglishName;
          // console.log(this.sooraNarrationDataArray);
          this.currentQuran = data.data.rows[0];
          //  this.arabicSooraTitle = this.currentQuran.SooraId+'.'+this.currentQuran.Soora.SooraName;
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

  openSideIssuesNav(verseNarrationData: any) {
    // console.log("verseNarrationData",verseNarrationData);
    const verseId = verseNarrationData.Verse;
    const sooraId = verseNarrationData.SooraId;
    this.router.navigate(['/read'], {
      queryParams: { soora: sooraId, verse: verseId },
    });
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

  closeIssueNav() {
    this.showSideIssuesNav = false;
    $('body').removeClass('body-no-scroll');
    $('#next-arrow').removeClass('chapter-arrow-next-sidenav');
    $('#previous-arrow').removeClass('chapter-arrow-previous-sidenav');
    $('#shift-to-left').removeClass('leftMargin');
    $('#shift-to-left').addClass('col-lg-offset-3');
    this.router.navigate(['read']);
  }

  onclickScrollToVerse(verseId: any) {
    if (verseId > this.sooraNarrationDataArray.length) {
      let containVerseId: any = _.contains(
        this.sooraNarrationDataArray,
        verseId
      );

      if (containVerseId == false) {
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
              // if(this.sooraNarrationDataArray.length==0){
              //     this.notEmptySoora=false;
              // }
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
      el?.scrollIntoView({ behavior: 'smooth' });
      //3rdsoora 27thverse issue on opening
    }
  }
  addTranslationVersion(event: any, translationVersion: any) {
    if (event.target.checked) {
      // this.translationVersionIds.push(translationVersion.TranslationId);
      this.currentTranslation = translationVersion;
      let translationData = {
        translationId: translationVersion.TranslationId,
        translationName: translationVersion.Translation,
      };
      this.translationCompareVersionArr.push(translationData);
      if (this.translationVersionIds.length > 0) {
        if (
          this.translationCompareVersionArr.indexOf(
            this.translationVersionIds
          ) === -1
        ) {
          this.translationVersionIds.push(translationVersion.TranslationId);
        }
        this.onSubmitcompareVerses(
          this.currentQuran.SooraId,
          this.verseStart,
          this.verseEnd
        );
      }
    } else {
      this.removeCompareTranslation(translationVersion.TranslationId);
      // var removeIndex = this.translationCompareVersionArr
      //   .map(function (item: any) {
      //     return item.translationId;
      //   })
      //   .indexOf(translationVersion.TranslationId);

      // // remove object
      // this.translationCompareVersionArr.splice(removeIndex, 1);
      // if (this.translationVersionIds.length > 0) {
      //   var idx = this.translationVersionIds.indexOf(
      //     translationVersion.TranslationId
      //   );
      //   if (idx >= 0) {
      //     this.translationVersionIds.splice(idx, 1);
      //   }
      //   this.onSubmitcompareVerses();
      // }
    }
  }

  // TODO
  //  hafs is selected from default ** might be bad experience for users
  // bug removing translation from 2 language doesn't change anything  // FIXME
  //  add both arabic and english title
  //  audio on lesson description
  //  add right sidebar on click of narattion
  //  link this component to read url and remove compare route and icon
  //  add on click next page

  changeVerseLimit(type, e) {
    if (type == 'from') {
      this.verseStart = e.target.value;
    } else {
      this.verseEnd = e.target.value;
    }
  }

  removeCompareTranslation(translationVersionCompareId: any) {
    this.compareNarrationCurrentPage = 1;

    var removeIndex = this.translationCompareVersionArr
      .map(function (item: any) {
        return item.translationId;
      })
      .indexOf(translationVersionCompareId);

    this.translationCompareVersionArr.splice(removeIndex, 1);

    $('#v-' + translationVersionCompareId).prop('checked', false);

    if (this.translationVersionIds.length > 0) {
      var idx = this.translationVersionIds.indexOf(translationVersionCompareId);
      if (idx >= 0) {
        this.translationVersionIds.splice(idx, 1);
      }
    }
    if (this.translationCompareVersionArr.length > 0 && this.submitted) {
      this.onSubmitcompareVerses(
        this.currentQuran.SooraId,
        this.verseStart,
        this.verseEnd
      );
    } else {
      this.submitted = false;
    }
  }

  resetCompareForm() {
    this.compareSuraForm.reset();
  }

  getQuranTranslatedDetails(translationVersion: any) {
    // this.closeIssueNav();
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
    // this.recentlyUsedTranslations = this.helperService.getRecentUsedTranslations();
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
          // if(this.sooraNarrationDataArray.length==0){
          //     this.notEmptySoora=false;
          // }
        },
        (error) => {
          this.spinnerService.hide();
          this.isLoading = false;

          let msg = this.helperService.handleErrorMessage(error);
          this.alertService.danger(msg);
        }
      );
  }
  onSubmitcompareVerses(sooraId, verseStart, verseEnd) {
    this.dropdownLang = false;
    if (this.translationCompareVersionArr.length < 2 && !this.submitted) {
      this.getCurrentChapter(sooraId, verseStart, verseEnd);
      return;
      // this.alertService.danger('Please select translations!');
    }

    if (this.translationVersionIds < 1) {
      for (var i = 0; i < this.translationCompareVersionArr.length; i++) {
        var value = this.translationVersionIds[i];
        if (
          this.translationCompareVersionArr.indexOf(
            this.translationVersionIds
          ) === -1
        ) {
          this.translationVersionIds.push(
            this.translationCompareVersionArr[i].translationId
          );
        }
      }
    }

    console.log('this.translationVersionIds', this.translationVersionIds);
    let postData = {
      ...this.compareSuraForm.value,

      translationIds: this.translationVersionIds,
    };
    if (postData.verseStart == '' && postData.verseEnd == '') {
      this.alertService.danger('Please enter Verse start and end range');
    } else if (postData.verseStart == '') {
      this.alertService.danger('Please enter Verse start range');
    } else if (postData.verseEnd == '') {
      this.alertService.danger('Please enter Verse end range');
    } else if (postData.verseStart < 1) {
      this.alertService.danger('start minimum range will be 1');
    } else if (postData.verseEnd > verseEnd) {
      this.alertService.danger(
        'Verse end range not allowed as maximum verse range for particular verse is:' +
          verseEnd
      );
    } else {
      this.submitted = true;
      console.log('translationIds', postData);
      this.spinnerService.show();
      this.httpService
        .post('getQuranDetailCompare', {
          filters: {
            page: this.compareNarrationCurrentPage,
            pageSize: this.compareNarrationPageSize,
            translationIds: postData.translationIds,
            sooraId: sooraId,
            verseStart: verseStart,
            verseEnd: verseEnd,
          },
        })
        .subscribe(
          (data) => {
            this.spinnerService.hide();
            this.compareNarrationData = data.data.rows;
            this.comparedVerseNarrationTotalPages = data.data.totalPages;
          },
          (error) => {
            this.spinnerService.hide();
            let msg = this.helperService.handleErrorMessage(error);
            this.alertService.danger(msg);
          }
        );
    }
    // this.resetCompareForm();
  }
  onScrollLoadMoreCompareData(sooraCompareNarrationData: any) {
    if (
      this.compareNarrationCurrentPage < this.comparedVerseNarrationTotalPages
    ) {
      if (!this.isLoading) {
        this.loadNextCompareNarrationData();
      }
    }
  }
  loadNextCompareNarrationData() {
    let postData = {
      ...this.compareSuraForm.value,

      translationIds: this.translationVersionIds,
    };

    // console.log('translationIds', postData);
    this.compareNarrationCurrentPage = this.compareNarrationCurrentPage + 1;
    this.spinnerService.show();
    this.isLoading = true;
    this.httpService
      .post('getQuranDetailCompare', {
        filters: {
          page: this.compareNarrationCurrentPage,
          pageSize: this.compareNarrationPageSize,
          translationIds: postData.translationIds,
          sooraId: this.currentQuran.SooraId,
          verseStart: postData.verseStart,
          verseEnd: postData.verseEnd,
        },
      })
      .subscribe(
        (data) => {
          this.spinnerService.hide();
          this.isLoading = false;
          let comparedNarrationArr: [] = [];
          comparedNarrationArr = data.data.rows;
          this.compareNarrationData = [
            ...this.compareNarrationData,
            ...comparedNarrationArr,
          ];
        },
        (error) => {
          this.spinnerService.hide();
          this.isLoading = false;

          let msg = this.helperService.handleErrorMessage(error);
          this.alertService.danger(msg);
        }
      );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
    $('body').removeClass('body-no-scroll');
  }
}
