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
import { Language } from '@appModels/index';
import { Subscription } from 'rxjs';
import { LanguageDropdownComponent } from '@appCommon/components/language-dropdown/language-dropdown.component';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css'],
})
export class ArticlesListComponent
  implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild(LanguageDropdownComponent) child: any;
  private subscriptions: Subscription[] = [];
  public articlesList: any = [];
  public arabicLanguage: boolean = false;
  public languageList: Language[] = [<Language>{}];
  private counter: boolean = true;
  public limit: number = this.helperService.getPaginateLimit();
  public page: number = 1;
  public isNext: boolean = true;
  public translationId: any = 0;
  public lang: string = 'lang'

  constructor(
    private httpService: HttpService,
    private helperService: HelperService,
    private router: Router
  ) { }

  ngOnInit(): void {
   
    if (localStorage.getItem("language") === "ar") {
      this.arabicLanguage = true;
      this.translationId = 1
      this.page = 1;
      this.getTopics(this.translationId, this.limit, this.page, true);
      this.counter = false;
      // window.location.reload();
    } else {
      this.translationId = 2
      this.arabicLanguage = false;
    }

  }
  getTopics(translationId: any, limit: number, page: number, arg3: boolean) {
    throw new Error('Method not implemented.');
  }

  ngAfterViewChecked() {
    this.languageList = this.child.languageList;
    if (this.counter && this.child.languageList.length > 1) {
      this.languageList.forEach((element) => {
        // if (element.LanguageCode === 'en') {
        //   this.translationId = element.LanguageId;
        // }
        /* element.Translations.forEach((value, index) => {
          if (element.LanguageCode === 'en' && index === 0) {
            this.translationId = value.TranslationId;
          }
        }); */
      });
      this.getArticles(this.translationId, this.limit, this.page);
      this.counter = false;
    }
  }

  private getArticles(
    translationId: number,
    limit: number,
    page: number,
    reset?: boolean
  ) {
    this.isNext = false;
    this.subscriptions.push(
      this.httpService
        .post('getArticles', {
          filters: {
            page: page,
            pageSize: limit,
            translationId: translationId,
          },
        })
        .subscribe((data) => {
          this.isNext = page < data.data.totalPages ? true : false;
          this.page = this.page + 1;
          if (this.articlesList.length > 1 && !reset) {
            this.articlesList.push(data.data.rows);
            this.articlesList = [].concat.apply([], this.articlesList);
          } else {
            this.articlesList = data.data.rows;
            this.setText(this.articlesList[0].ArticleNames[0].Language);

          }

        }
        )

    );
  }

  public setText(language: any) {
    this.helperService.setCurrentTranslatedLanguage(language.LanguageCode);
    if (language.LanguageCode === 'ar' && localStorage.getItem("language") === "ar") {
      this.arabicLanguage = true;
    } else {
      this.arabicLanguage = false;
    }

  }

  public changeTranslation(translation: any) {
    this.translationId = translation;
    this.page = 1;
    this.getArticles(translation, this.limit, this.page, true);
  }

  public onScroll() {
    if (this.isNext) {
      this.getArticles(this.translationId, this.limit, this.page);
    }

  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }
}
