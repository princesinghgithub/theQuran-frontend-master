import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '@appServices/http/http.service';
import { HelperService } from '@appServices/helper/helper.service';
import { DifferentReadingList, Language } from '@appModels/index';
import { Subscription } from 'rxjs';
import { TranslationDropdownComponent } from '@appCommon/components/translation-dropdown/translation-dropdown.component';

@Component({
  selector: 'app-different-readings-list',
  templateUrl: './different-readings-list.component.html',
  styleUrls: ['./different-readings-list.component.css'],
})
export class DifferentReadingsListComponent
  implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild(TranslationDropdownComponent) translationDropdownChild: any;
  private subscriptions: Subscription[] = [];
  public differentReadingList: DifferentReadingList[] = [
    <DifferentReadingList>{},
  ];
  public arabicLanguage: boolean = false;
  public languageList: Language[] = [<Language>{}];
  private counter: boolean = true;
  public limit: number = this.helperService.getPaginateLimit();
  public page: number = 1;
  public isNext: boolean = true;
  public translationId: any = 1;
  public selectedSoora: any;

  constructor(
    private httpService: HttpService,
    private helperService: HelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem("language")==="ar"){
      this.arabicLanguage = true;
      this.translationId =1
    } else {
      this.arabicLanguage = false;
      this.translationId =2
    }
    this.getDifferentReadings(this.translationId, this.limit, this.page);
  }

  ngAfterViewChecked() {
    this.languageList = this.translationDropdownChild.languageList;
    if (this.counter && this.translationDropdownChild.languageList.length > 1) {
      this.languageList.forEach((element) => {
        element.Translations.forEach((value, index) => {
          // if (element.LanguageCode === 'en' && index === 0) {
          //   this.translationId = value.TranslationId;
          // }
        });
      });
      this.getDifferentReadings(this.translationId, this.limit, this.page);
      this.counter = false;
    }
  }

  private getDifferentReadings(
    translationId: number,
    limit: number,
    page: number,
    reset?: boolean
  ) {
    this.isNext = false;
    this.subscriptions.push(
      this.httpService
        .post('getDifferentReadings', {
          filters: {
            page: page,
            pageSize: limit,
            translationId: translationId,
            keyword: this.checkObjectEmpty(this.selectedSoora)
              ? this.selectedSoora.SooraId
              : '',
            searchType: 'Soora',
          },
        })
        .subscribe((data) => {
          this.isNext = page < data.data.totalPages ? true : false;
          this.page = this.page + 1;
          if (this.differentReadingList.length > 1 && !reset) {
            this.differentReadingList.push(data.data.rows);
            this.differentReadingList = [<DifferentReadingList>{}].concat.apply(
              [],
              this.differentReadingList
            );
          } else {
            this.differentReadingList = data.data.rows;
            this.setText(
              this.differentReadingList[0].Narration.Translation.Language
            );
          }
        })
    );
  }

  public setText(language: any) {
    let languageCode: string = localStorage.getItem('language');
    language === 1 ? (languageCode = 'ar') : (languageCode = 'en');
    this.helperService.setCurrentTranslatedLanguage(language.LanguageCode);
    if (language.LanguageCode === 'ar') {
      this.arabicLanguage = true;
    } else {
      this.arabicLanguage = false;
    }
  }

  public changeTranslation(translation: any) {
    this.translationId = translation;
    this.page = 1;
    this.getDifferentReadings(translation, this.limit, this.page, true);
  }

  public onScroll() {
    if (this.isNext) {
      this.getDifferentReadings(this.translationId, this.limit, this.page);
    }
  }

  public checkObjectEmpty(object: any) {
    return this.helperService.checkObjectEmpty(object);
  }

  public getSelectedSooraFromChild(selectedSoora: any) {
    this.selectedSoora = selectedSoora;
    this.page = 1;
    this.getDifferentReadings(this.translationId, this.limit, this.page, true);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }
}
