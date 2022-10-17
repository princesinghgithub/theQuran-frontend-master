import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from '@appServices/http/http.service';
import { HelperService } from '@appServices/helper/helper.service';
import { LanguageDropdownComponent } from '@appCommon/components/language-dropdown/language-dropdown.component';
import { Language } from '@appModels/index';
import { environment } from 'src/environments/environment';
import * as _ from 'underscore';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  @ViewChild(LanguageDropdownComponent) child: any;
  public pageName = 'findcourses';
  private subscriptions: Subscription[] = [];
  public limit: number = this.helperService.getPaginateLimit();
  public page: number = 1;
  public isNext: boolean = true;
  public courses: any = [];
  public courseCategories: any = [];
  // public filteredCourses: any = [];
  public languageList: Language[] = [<Language>{}];
  private counter: boolean = true;
  private translationId: number = 0;
  imageUrlXMPP: string = environment.imageUrlXMPP;
  // imageUrlS3: string = environment.imageUrlS3;

  constructor(
    private httpService: HttpService,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {}

  ngAfterViewChecked() {
    this.languageList = this.child.languageList;
    if (this.counter && this.child.languageList.length > 1) {
      this.languageList.forEach((element) => {
        if (element.LanguageCode === 'en') {
          this.translationId = element.LanguageId;
        }
        /* element.Translations.forEach((value, index) => {
          if (element.LanguageCode === 'en' && index === 0) {
            this.translationId = value.TranslationId;
          }
        }); */
      });
      this.getCourses(undefined, this.limit, this.page);
      this.counter = false;
    }
  }

  public getCourses(
    translationId: number | undefined,
    limit: number,
    page: number,
    reset?: boolean
  ) {
    this.isNext = false;
    this.subscriptions.push(
      this.httpService
        .post('getCourses', {
          page: page,
          pageSize: limit,
          translationId: translationId,
        })
        .subscribe((data) => {
          this.isNext = page < data.data.totalPages ? true : false;
          this.page = this.page + 1;
          if (this.courses.length > 0 && !reset) {
            this.courses.push(data.data.rows);
            this.courses = [].concat.apply([], this.courses);
            this.sortByCategories();
          } else {
            this.courses = data.data.rows;
            this.sortByCategories();
            // this.filteredCourses = data.data.rows;
          }
        })
    );
  }

  public sortByCategories() {
    const lang: number = this.translationId == 25 ? 1 : 0;
    this.courseCategories = _.groupBy(this.courses, (course) => {
      return course.CourseCategory.CourseCategoryNames[lang].Name;
    });
  }

  public scrollLeft(id) {
    const el = <HTMLElement>document.getElementById('category-' + id);
    el.scrollTo({
      top: 0,
      left: -500,
      behavior: 'smooth',
    });
  }
  public scrollRight(id) {
    const el = <HTMLElement>document.getElementById('category-' + id);
    el.scrollTo({
      top: 0,
      left: 500,
      behavior: 'smooth',
    });
  }

  public changeTranslation(translation: any) {
    // this.filteredCourses = this.courses.filter(
    //   (course) => course.LanguageId == translation
    // );
    this.translationId = translation;
    this.page = 1;
    if (translation == 25) {
      this.getCourses(undefined, this.limit, this.page, true);
    } else {
      this.getCourses(translation, this.limit, this.page, true);
    }
  }

  public onScroll() {
    if (this.isNext) {
      this.getCourses(this.translationId, this.limit, this.page);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }
}
