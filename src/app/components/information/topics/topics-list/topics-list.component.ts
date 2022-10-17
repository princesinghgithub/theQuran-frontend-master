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
import { TopicsList, Language } from '@appModels/index';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LanguageDropdownComponent } from '@appCommon/components/language-dropdown/language-dropdown.component';

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.css'],
})
export class TopicsListComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  @ViewChild(LanguageDropdownComponent) child: any;
  private subscriptions: Subscription[] = [];
  public topicsList: TopicsList[] = [<TopicsList>{}];
  public arabicLanguage: boolean = false;
  public languageList: Language[] = [<Language>{}];
  private counter: boolean = true;
  public limit: number = this.helperService.getPaginateLimit();
  public page: number = 1;
  public isNext: boolean = true;
  public translationId: any;
  topicImageUrl: string = environment.topicImageUrl;

  constructor(
    private httpService: HttpService,
    private helperService: HelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    if(localStorage.getItem("language")==="ar"){
      this.arabicLanguage = true;
      this.translationId=1
      this.page = 1;
      this.getTopics(this.translationId, this.limit, this.page, true); 
      this.counter = false;
    } else {
      this.arabicLanguage = false;
    }
  }

  ngAfterViewChecked() {
    this.languageList = this.child.languageList;
    if (this.counter && this.child.languageList.length > 1) {
      this.languageList.forEach((element) => {
        element.Translations.forEach((value, index) => {
          if (element.LanguageCode === 'en' && index === 0) {
            this.translationId = value.TranslationId;
          }
        });
      });
      this.getTopics(this.translationId, this.limit, this.page);
      this.counter = false;
    }
  }

  private getTopics(
    translationId: number,
    limit: number,
    page: number,
    reset?: boolean
  ) {
    this.isNext = false;
    this.subscriptions.push(
      this.httpService
        .post('getTopics', {
          filters: {
            page: page,
            pageSize: limit,
            translationId: translationId,
          },
        })
        .subscribe((data) => {
          this.isNext = page < data.data.totalPages ? true : false;
          this.page = this.page + 1;
          if (this.topicsList.length > 1 && !reset) {
            this.topicsList.push(data.data.rows);
            this.topicsList = [<TopicsList>{}].concat.apply(
              [],
              this.topicsList
            );
          } else {
            this.topicsList = data.data.rows;
            this.setText(this.topicsList[0].Topic.TopicNames[0].Language);
          }
        })
    );
  }

  public setText(language: any) {
   
    this.helperService.setCurrentTranslatedLanguage(language.LanguageCode);
    if (language.LanguageCode === 'ar' && localStorage.getItem("language")==="ar") {
      this.arabicLanguage = true;
    } else {
      this.arabicLanguage = false;
    }
  }

  public changeTranslation(translation: any) {
    this.translationId = translation;
    this.page = 1;
    this.getTopics(translation, this.limit, this.page, true); 
  }

  public onScroll() {
    if (this.isNext) {
      this.getTopics(this.translationId, this.limit, this.page);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }
  
}







