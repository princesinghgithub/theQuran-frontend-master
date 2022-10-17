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
import { ErrorList, Language } from '@appModels/index';
import { Subscription } from 'rxjs';
import { TranslationDropdownComponent } from '@appCommon/components/translation-dropdown/translation-dropdown.component';

@Component({
  selector: 'app-differences-list',
  templateUrl: './differences-list.component.html',
  styleUrls: ['./differences-list.component.css'],
})
export class DifferencesListComponent
  implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild(TranslationDropdownComponent) translationDropdownChild: any;
  private subscriptions: Subscription[] = [];
  public differencesList: ErrorList[] = [<ErrorList>{}];
  public arabicLanguage: boolean = false;
  public languageList: Language[] = [<Language>{}];
  private counter: boolean = true;
  public limit: number = this.helperService.getPaginateLimit();
  public page: number = 1;
  public isNext: boolean = true;
  public translationId: any;
  public selectedSoora: any;
  getSooraBackgrounds: any;
  arabicClass: boolean;

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
      this.getDifferences(this.translationId, this.limit, this.page);
      this.counter = false;
    }
  }

  private getDifferences(
    translationId: number,
    limit: number,
    page: number,
    reset?: boolean
  ) {
    this.isNext = false;
    this.subscriptions.push(
      this.httpService
        .post('getDifferences', {
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
          if (this.differencesList.length > 1 && !reset) {
            this.differencesList.push(data.data.rows);
            this.differencesList = [<ErrorList>{}].concat.apply(
              [],
              this.differencesList
            );
          } else {
            this.differencesList = data.data.rows;
            this.setText(
              this.differencesList[0].Narration.Translation.Language
            );
          }
        })
    );
  }

  public setText(language: any) {
    let languageCode: string = localStorage.getItem('language');
    language === 1 ? (languageCode = 'ar') : (languageCode = 'en');
    this.helperService.setCurrentTranslatedLanguage(language.LanguageCode);
    if (languageCode === 'ar') {
      this.arabicLanguage = true;
    } else {
      this.arabicLanguage = false;
    }
  }

  public changeTranslation(translation: any) {
    this.translationId = translation;
    this.page = 1;
    this.getDifferences(translation, this.limit, this.page, true);
  }

  public onScroll() {
    if (this.isNext) {
      this.getDifferences(this.translationId, this.limit, this.page);
    }
  }

  public checkObjectEmpty(object: any) {
    return this.helperService.checkObjectEmpty(object);
  }

  public getSelectedSooraFromChild(selectedSoora: any) {
    this.selectedSoora = selectedSoora;
    this.page = 1;
    this.getDifferences(this.translationId, this.limit, this.page, true);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }
}
