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
import { TopicDetail, Language } from '@appModels/index';
import { Subscription } from 'rxjs';
import { TranslationDropdownComponent } from '@appCommon/components/translation-dropdown/translation-dropdown.component';
import * as _ from 'underscore';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
})
export class TopicDetailComponent implements OnInit, OnDestroy {
  @ViewChild(TranslationDropdownComponent) child: any;
  private subscriptions: Subscription[] = [];
  public topicDetail: TopicDetail = <TopicDetail>{};
  public arabicLanguage: boolean = false;
  public languageList: Language[] = [<Language>{}];
  private counter: boolean = true;
  private translationId: number = 0;
  private topicId: number = 0;
  public showAllVerses: boolean = false;
  topicImageUrl: string = environment.topicImageUrl;

  constructor(
    private httpService: HttpService,
    private helperService: HelperService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.topicId = params.topicId;
      this.translationId = params.translationId;
    });
    if(localStorage.getItem("language")==="ar"){
       this.translationId = 1
    } else {
      this.translationId = 2
    }
    this.getTopicDetail(this.topicId, this.translationId);
  }

  // ngAfterViewChecked() {
  //   this.languageList = this.child.languageList;
  //   if (this.child.languageList.length > 1) {
  //     this.languageList.forEach((element) => {
  //       element.Translations.forEach((value, index) => {
  //         if (element.LanguageCode === 'en' && index === 0) {
  //           this.translationId = value.TranslationId;
  //         }
  //       });
  //     });
  //     this.getTopicDetail(this.topicId, this.translationId);
  //     this.counter = false;
  //   } else this.getTopicDetail(this.topicId, 2);
  // }

  private getTopicDetail(topicId: number, translationId: number) {
    this.subscriptions.push(
      this.httpService
        .post('getTopicDetail', {
          topicId: topicId,
          translationId: translationId,
        })
        .subscribe((data) => {
          this.topicDetail = data.data;
          this.setText(this.topicDetail.TopicNames[0].Language);
        })
    );
  }

  safeHTML(unsafe: string) {
    return this.sanitizer.bypassSecurityTrustHtml(unsafe);
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
    this.getTopicDetail(this.topicId, translation);
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
