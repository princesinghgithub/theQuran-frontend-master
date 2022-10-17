import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@appServices/http/http.service';
import { HelperService } from '@appServices/helper/helper.service';
import { Language } from '@appModels/index';
import { Subscription } from 'rxjs';
import { LanguageDropdownComponent } from '@appCommon/components/language-dropdown/language-dropdown.component';
import * as _ from 'underscore';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  @ViewChild(LanguageDropdownComponent) child: any;
  private subscriptions: Subscription[] = [];
  public articleDetail: any;
  public arabicLanguage: boolean = false;
  public languageList: Language[] = [<Language>{}];
  private counter: boolean = true;
  private translationId: number;
  private articleId: number = 0;
  public showAllVerses: boolean = false;
  public authorList: any = [];
  public arabicClass: boolean = false;
  articleImageUrl: string = environment.articleImageUrl;

  constructor(
    private httpService: HttpService,
    private helperService: HelperService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.articleId = params.articleId;
      this.translationId = params.translationId;
    });
    if(localStorage.getItem("language")==="ar"){
      this.translationId = 1
      this.arabicLanguage = true;
      this.arabicClass = true
   } else {
     this.translationId = 2
     this.arabicLanguage = false;
      this.arabicClass = false
   }
   this.getarticleDetail(this.articleId, this.translationId);
  }

  // ngAfterViewChecked() {
  //   this.languageList = this.child.languageList;
  //   if (this.counter && this.child.languageList.length > 1) {
  //     this.languageList.forEach((element) => {
  //       element.Translations.forEach((value, index) => {
  //         if (element.LanguageCode === 'en' && index === 0) {
  //           this.translationId = value.TranslationId;
  //         }
  //       });
  //     });
  //     this.getarticleDetail(this.articleId, this.translationId);
  //     this.counter = false;
  //   }
  // }

  private getarticleDetail(articleId: number, translationId: number) {
    this.subscriptions.push(
      this.httpService
        .post('getarticleDetail', {
          articleId: articleId,
          translationId: translationId,
        })
        .subscribe((data) => {
          this.articleDetail = data.data;
          this.authorList = this.articleDetail.Authors;
          this.setText(this.articleDetail.ArticleNames[0].Language);
        })
    );
  }

  public setText(language: any) {
    this.helperService.setCurrentTranslatedLanguage(language.LanguageCode);
    if (language.LanguageCode === 'ar') {
      this.arabicLanguage = true;
    } else {
      this.arabicLanguage = false;
    }
  }

  public changeTranslation(translation: any) {
    this.showAllVerses = false;
    this.getarticleDetail(this.articleId, translation);
  }

  public checkObjectEmpty(object: any) {
    return this.helperService.checkObjectEmpty(object);
  }

  public displayAllVerses() {
    this.showAllVerses = true;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }
}
