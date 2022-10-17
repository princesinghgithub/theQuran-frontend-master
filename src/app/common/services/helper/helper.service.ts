import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  private listLimit = new BehaviorSubject(25);
  public getListLimt = this.listLimit.asObservable();
  public itemsPerPageList: number[] = [];
  public currentTranslatedLanguage = new BehaviorSubject('en');
  public getCurrentTranslatedLanguage = this.currentTranslatedLanguage.asObservable();

  public getItemsPerPageList() {
    this.itemsPerPageList = [25, 50, 150, 250, 300];
    return this.itemsPerPageList;
  }

  public setListLimit(limit: number) {
    this.listLimit.next(limit);
  }

  public handleErrorMessage(errData: any) {
    if ((errData.status = 404)) {
      let msg = errData.statusText;
      return msg;
    }
  }

  public setRecentUsedTranslation(translation: any) {
    let resultValue: any = this.getRecentUsedTranslations();
    let translationIndx: any = _.findIndex(resultValue, {
      LanguageId: translation.LanguageId,
      TranslationId: translation.TranslationId,
      Translation: translation.Translation,
    });
    if (translationIndx == -1) {
      let newArr = _.last(resultValue, 4);
      let newArr2 = newArr.concat([
        {
          LanguageId: translation.LanguageId,
          TranslationId: translation.TranslationId,
          Translation: translation.Translation,
          Time: new Date().getTime(),
        },
      ]);
      localStorage.setItem('recently_used_languages', JSON.stringify(newArr2));
    } else {
      resultValue[translationIndx].Time = new Date().getTime();
      localStorage.setItem(
        'recently_used_languages',
        JSON.stringify(resultValue)
      );
    }
  }
  public getRecentUsedTranslations() {
    if (localStorage.getItem('recently_used_languages') != null) {
      let recentTranslations: any = JSON.parse(
        localStorage.getItem('recently_used_languages') || '[]'
      );
      recentTranslations.sort(function (a: any, b: any) {
        return b.Time - a.Time;
      });
      return recentTranslations;
    }
    return [];
  }

  public checkObjectEmpty(object: any) {
    return object && Object.keys(object).length > 0 ? true : false;
  }

  public checkArrayEmpty(array: any) {
    return array && array.length > 0 ? true : false;
  }

  public getPaginateLimit(): number {
    return 25;
  }

  public setCurrentTranslatedLanguage(language: string) {
    this.currentTranslatedLanguage.next(language);
  }

  public getRandomUserImages() {
    let pics = [
      'assets/images/Group 110.png',
      'assets/images/Group 111.png',
      'assets/images/Group 112.png',
    ];
    let random_color = pics[Math.floor(Math.random() * pics.length)];
    return random_color;
  }
}
