import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationDropdownComponent } from '@appCommon/components/translation-dropdown/translation-dropdown.component';
import { AuthService } from '@appServices/auth/auth.service';
import { HttpService } from '@appServices/http/http.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  @ViewChild(TranslationDropdownComponent) child: any;
  @Output() abbrogatedSideNav = new EventEmitter();
  @Output() passVerseAbbrogatedData = new EventEmitter();
  tabs: any[] = [
    { name: 'Quran', type: 'read' },
    { name: 'Lessons', type: 'course' },
    { name: 'Topics', type: 'topics' },
    { name: 'Articles', type: 'article' },
    // { name: 'Information', type: 'information' },
    { name: 'Users', type: 'users' },
  ];
  type: string = 'read';
  query: string;
  searchData: any[] = [];
  searchPages: any;
  public userData: any = this.authService.user();
  languageId: number = 2;
  translationId: number = 2;
  selectedTranslation = [];
  verseAbbrogatedData: any = [];
  showSideIssuesNav = false;

  maxSize: number = 10;
  itemCount: number;
  currentPage: number = 1;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private sanitizer: DomSanitizer
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.type = params.type;
    });
    this.route.queryParams.subscribe((params) => {
      this.query = params.q;
      if (this.type) this.getSearch();
    });
  }

  public getSearch() {
    if (this.type === 'users' && !this.userData?.Id) {
      return null;
    } else {
      this.httpService
        .post('searchContent', {
          type: this.type,
          content: this.query,
          languageId: this.languageId,
          translationId: this.translationId,
          page: this.currentPage,
          pageSize: 25,
          myId: this.userData.Id,
        })
        .subscribe((data) => {
          const { rows, ...searchPageInfo } = data.data;
          console.log(rows);
          this.searchData = rows;
          this.searchPages = searchPageInfo;
          this.itemCount = searchPageInfo.count;
        });
    }
  }

  openSideIssuesNav(verseNarrationData: any) {
    // console.log("verseNarrationData",verseNarrationData);
    console.log({ verseNarrationData });
    this.verseAbbrogatedData = verseNarrationData;

    $('body').addClass('body-no-scroll');
    $('#shift-to-left').removeClass('col-lg-offset-3');
    $('#next-arrow').addClass('chapter-arrow-next-sidenav');
    $('#previous-arrow').addClass('chapter-arrow-previous-sidenav');
    $('#shift-to-left').addClass('leftMargin');
    this.showSideIssuesNav = true;

    this.abbrogatedSideNav.emit(this.showSideIssuesNav);
    console.log('after abbrogatedsidenav emit');
    this.verseAbbrogatedData = verseNarrationData;
    console.log('verseAbbrogatedData', this.verseAbbrogatedData);
    this.passVerseAbbrogatedData.emit(this.verseAbbrogatedData);
    console.log('after passVerseAbbrogatedData emit');
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

  changeSearchTab(type: string) {
    this.router.navigateByUrl(`/search/${type}?q=${this.query}`);
  }

  public sendRequest(userId: number) {
    this.httpService
      .post('makePendingInvite', {
        myId: this.userData.Id,
        userId: userId,
      })
      .subscribe((data) => {
        this.getSearch();
        this.alertService.success(data.msg);
      });
  }

  public pageChanged(e) {
    this.currentPage = e.page;
    this.getSearch();
  }

  public cancelRequest(userId: number) {
    this.httpService
      .post('cancelInviteRequest', {
        myId: this.userData.Id,
        userId: userId,
      })
      .subscribe((data) => {
        this.getSearch();
        this.alertService.success(data.msg);
      });
  }

  public changeTranslation(translation: any) {
    this.translationId = translation;
    this.languageId = this.child.selectedTranslation.LanguageId;
    this.getSearch();
  }

  safeHTML(unsafe: string) {
    return this.sanitizer.bypassSecurityTrustHtml(unsafe);
  }

  public acceptRequest(userId: number) {
    this.httpService
      .post('makeFriend', {
        myId: this.userData.Id,
        userId: userId,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  public removeFriend(userId: any, type: string) {
    this.httpService
      .post('deleteFriend', {
        myId: this.userData.Id,
        userId: userId,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }
}
