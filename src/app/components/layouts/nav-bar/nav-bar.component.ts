import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@appServices/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { HelperService } from '@appServices/helper/helper.service';
import { NavDialogeComponent } from '@appComponents/nav-dialoge/nav-dialoge.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '@appServices/http/http.service';
import { TopicsList } from '@appModels/topics-list';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})

export class NavBarComponent implements OnInit, OnDestroy {
  
  @ViewChild("model", { read: ElementRef }) public model: ElementRef;
  navBarMenusArray: any = [
    {
      title: 'Home',
      menu_img: 'home.png',
      route: '/home',
      sub_menus: [],
    },
    {
      title: 'Read',
      menu_img: 'book.png',
      route: '/read',
      sub_menus: [],
    },
    // {
    //   title: 'Compare',
    //   menu_img: 'edit.png',
    //   route: '/compare',
    //   sub_menus: [],
    // },

    {
      title: 'Information',
      menu_img: 'Icon ionic-ios-information-circle-outline.png',
      route: '',
      sub_menus: [
        {
          title: 'Abrogations',
          route: '/information/abrogations-list',
          icon: 'Group 7671.svg',
        },
        {
          title: 'Differences',
          route: '/information/differences-list',
          icon: 'info_differences.svg',
        },
        {
          title: 'Different readings',
          route: '/information/different-readings-list',
          icon: 'info_diff_readings.svg',
        },
        {
          title: 'Repetitions',
          route: '/information/repetitions-list',
          icon: 'info_repetitions.svg',
        },
        {
          title: 'Soora Background',
          route: '/information/soora-background',
          icon: 'info_repetitions.svg',
        },
        {
          title: 'Articles',
          route: '/articles-list',
          icon: 'info_repetitions.svg',
        },
      ],
    },
    {
      title: 'Topics',
      menu_img: 'hashtag.png',
      route: '/information/topics-list',
      sub_menus: [],
    },
    // {
    //   title: 'Lessons',
    //   menu_img: 'light-bulb.png',
    //   route: this.isLoggedIn() ? '/dashboard/my-lessons' : '/lessons',
    //   sub_menus: [],
    // },
    // {
    //   title: 'Quizzes',
    //   menu_img: 'quiz.png',
    //   route: 'quizzes',
    //   sub_menus: [],
    // },
    // {
    //   title: 'Resources',
    //   menu_img: 'pc.png',
    //   route: '',
    //   sub_menus: [
    //     {
    //       title: 'Articles',
    //       route: '/articles-list',
    //       icon: 'info_repetitions.svg',
    //     },
    //   ],
    // },
    {
      title: 'Contribute',
      menu_img: 'pc.png',
      route: '/donation',
      sub_menus: [],
    },
    {
      title: 'About',
      menu_img: 'about-us.png',
      route: '',
      sub_menus: [
        {
          title: 'Contact Us',
          route: '/contact-us',
          icon: 'contact-us.png',
        },
      ],
    },
    // {
    //   title: 'Language',
    //   menu_img: 'globe.jpg',
    //    route: '#exampleModal',
    //   sub_menus: [
    //     // {
    //       // title: 'Contact Us',
    //       // route: '',
    //       // icon: 'contact-us.png',
    //     // },
    //   ],
    // },
  ];

  navBarMenusArraysecond: any = [

  
    // {
    //   title: 'Compare',
    //   menu_img: 'edit.png',
    //   route: '/compare',
    //   sub_menus: [],
    // },

  
  
    // {
    //   title: 'Lessons',
    //   menu_img: 'light-bulb.png',
    //   route: this.isLoggedIn() ? '/dashboard/my-lessons' : '/lessons',
    //   sub_menus: [],
    // },
    // {
    //   title: 'Quizzes',
    //   menu_img: 'quiz.png',
    //   route: 'quizzes',
    //   sub_menus: [],
    // },
    // {
    //   title: 'Resources',
    //   menu_img: 'pc.png',
    //   route: '',
    //   sub_menus: [
    //     {
    //       title: 'Articles',
    //       route: '/articles-list',
    //       icon: 'info_repetitions.svg',
    //     },
    //   ],
    // },
   


    {
      title: 'المزيد',
      menu_img: 'about-us.png',
      route: '',
      sub_menus: [
        {
          title: 'اتصل بنا',
          route: '/contact-us',
          icon: 'contact-us.png',
        },
      ],
    },
    {
      title: 'تبرع',
      menu_img: 'pc.png',
      route: '/donation',
      sub_menus: [],
    },
    {
      title:'المواضيع',
      menu_img: 'hashtag.png',
      route: '/information/topics-list',
      sub_menus: [],
    },
    {
      title: 'معلومات',
      menu_img: 'Icon ionic-ios-information-circle-outline.png',
      route: '',
      sub_menus: [
        {
          title: 'الناسخ والمنسوخ',
          route: '/information/abrogations-list',
          icon: 'Group 7671.svg',
        },
        {
          title: 'الاختلافات',
          route: '/information/differences-list',
          icon: 'info_differences.svg',
        },
        {
          title: 'قراءات مختلفة',
          route: '/information/different-readings-list',
          icon: 'info_diff_readings.svg',
        },
        {
          title: 'التكرار',
          route: '/information/repetitions-list',
          icon: 'info_repetitions.svg',
        },
        {
          title: 'خلفية السور',
          route: '/information/soora-background',
          icon: 'info_repetitions.svg',
        },
        {
          title: 'مقالات',
          route: '/articles-list',
          icon: 'info_repetitions.svg',
        },
      ],
    },
    {
      title: 'اقرأ',
      menu_img: 'book.png',
      route: '/read',
      sub_menus: [],
    },
    {
      title: 'الرئيسية',
      menu_img: 'home.png',
      route: '/home',
      sub_menus: [],
    },
    // {
    //   title: 'Language',
    //   menu_img: 'globe.jpg',
    //    route: '#exampleModal',
    //   sub_menus: [
    //     // {
    //       // title: 'Contact Us',
    //       // route: '',
    //       // icon: 'contact-us.png',
    //     // },
    //   ],
    // },
  ];
  private subscriptions: Subscription[] = [];
  public showClass: boolean = false;
  showHamMenu: boolean = false;
  searchInput: string = '';
  Language: string = 'en';
  page: number;
  translationId: any;
  public topicsList: TopicsList[] = [<TopicsList>{}];
  public isNext: boolean = true;
  public limit: number = this.helperService.getPaginateLimit();
  public arabicLanguage: boolean = false;

  constructor(
    private dialog: MatDialog,
    private translate: TranslateService,
    private router: Router,
    private helperService: HelperService,
    private authService: AuthService,
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem ('language')){
      this.Language = localStorage.getItem('language')
      this.translationId=1
      this.page = 1;
      this.getTopics(this.translationId, this.limit, this.page, true); 
    }else{
      localStorage.setItem("language","en")
    }
    
    // localStorage.setItem('SelectedLanguage','Arabic')
    // this.subscriptions.push(
    //   this.helperService.getCurrentTranslatedLanguage.subscribe((data) => {
    //     switch (data) {
    //       case 'ar':
    //         this.translate.setDefaultLang('ar');
    //         break;
    //       default:y
    //         this.translate.setDefaultLang('en');

    //         break;
    //     }
    //   })
    // );
    
    for (let menu of this.navBarMenusArray) {
      if (menu.sub_menus.length > 0) {
        for (let sub_menu of menu.sub_menus) {
          if (sub_menu.route == this.router.url) {
            menu.isActive = true;
            sub_menu.isActive = true;
          }
        }
      } else {
        if (menu.route == this.router.url) {
          menu.isActive = true;
        }
      }
    }
    // second navBarMenusArray 
    for (let menu of this.navBarMenusArraysecond) {
      if (menu.sub_menus.length > 0) {
        for (let sub_menu of menu.sub_menus) {
          if (sub_menu.route == this.router.url) {
            menu.isActive = true;
            sub_menu.isActive = true;
          }
        }
      } else {
        if (menu.route == this.router.url) {
          menu.isActive = true;
        }
      }
    }
  }

  public checkClass(navBarMenu: any) {
    return navBarMenu.title === 'Information' ? true : false;
  }

  public logout() {
    this.authService.logout();
  }

  public search() {
    this.router.navigateByUrl(`/search/read?q=${this.searchInput}`);
  }

  public isLoggedIn() {
    let token;
    token = this.authService.isLoggedIn();
    return !token ? false : true;
  }

  public changeSearchInput(e) {
    this.searchInput = e.target.value;
  }

  showMenu() {
    this.showHamMenu = !this.showHamMenu;
  }

  public getUserInfo() {
    return this.authService.user();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(NavDialogeComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  selectedLanguage(language:string,translation){
    this.Language = language
    // this.translate.setDefaultLang(language);
    localStorage.setItem('language', language)
     window.location.reload();
  
    this.translationId = translation;
    this.page = 1;
    this.getTopics(translation, this.limit, this.page, true); 
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
    if (language.LanguageCode === 'ar') {
      this.arabicLanguage = true;
    } else {
      this.arabicLanguage = false;
    }
  }
}


