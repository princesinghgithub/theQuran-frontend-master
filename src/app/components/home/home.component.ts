import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewChecked,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '@appServices/http/http.service';
import { HelperService } from '@appServices/helper/helper.service';
import { AbrogationList, Language } from '@appModels/index';
import { Subscription } from 'rxjs';
import { TranslationDropdownComponent } from '@appCommon/components/translation-dropdown/translation-dropdown.component';
import { AuthService } from '@appServices/auth/auth.service';
import { AlertService } from 'ngx-alerts';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild(TranslationDropdownComponent) translationDropdownChild: any;
  private subscriptions: Subscription[] = [];
  public languageList: Language[] = [<Language>{}];
  public translationId: any = 1;
  public year: number = new Date().getFullYear();
  private counter: boolean = true;
  homePageData: any;
  imageUrlXMPP: string = environment.imageUrlXMPP;
  // imageUrlS3: string = environment.imageUrlS3;
  topicImageUrl: string = environment.topicImageUrl;

  courseCarousel: any = {
    itemsPerSlide: 3,
    singleSlideOffset: 3,
    noWrap: false,
    slides: [],
  };

  topicCarousel: any = {
    itemsPerSlide: 3,
    singleSlideOffset: 3,
    noWrap: false,
  };

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 768) {
      this.topicCarousel.itemsPerSlide = 1;
      this.courseCarousel.itemsPerSlide = 1;
    } else {
      this.topicCarousel.itemsPerSlide = 3;
      this.courseCarousel.itemsPerSlide = 3;
    }
  }
  constructor(
    private httpService: HttpService,
    private helperService: HelperService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngAfterViewChecked() {
    this.languageList = this.translationDropdownChild.languageList;
    if (this.counter && this.translationDropdownChild.languageList.length > 1) {
      this.languageList.forEach((element) => {
        element.Translations.forEach((value, index) => {
          if (element.LanguageCode === 'en' && index === 0) {
            this.translationId = value.TranslationId;
          }
        });
      });
      this.getHomePageData();
      this.counter = false;
    }
  }

  ngOnInit(): void {
    if (window.innerWidth < 768) {
      this.topicCarousel.itemsPerSlide = 1;
      this.courseCarousel.itemsPerSlide = 1;
    } else {
      this.topicCarousel.itemsPerSlide = 3;
      this.courseCarousel.itemsPerSlide = 3;
    }
  }

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public changeTranslation(translation: any) { }

  getHomePageData() {
    this.subscriptions.push(
      this.httpService
        .post('getHomePageData', {
          filters: {
            translationId: this.translationId,
          },
        })
        .subscribe((data) => {
          this.homePageData = data.data;
        })
    );
  }

  onSlideRangeChange(indexes: number[]): void { }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }
}
