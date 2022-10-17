import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@appServices/http/http.service';
import { HelperService } from '@appServices/helper/helper.service';
import { AbrogationDetail } from '@appModels/index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-abrogation-detail',
  templateUrl: './abrogation-detail.component.html',
  styleUrls: ['./abrogation-detail.component.css'],
})
export class AbrogationDetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private sooraId: number = 0;
  private verse: number = 0;
  private translationId: number = 0;
  public abrogationDetail: AbrogationDetail = <AbrogationDetail>{};
  public arabicClass: boolean = false;
  public abrogatingVerses: any = [];
  public abrogatingOthers: any = [];
  public authorList: any = [];

  constructor(
    private httpService: HttpService,
    private helperService: HelperService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.sooraId = params.sooraId;
      this.verse = params.verse;
      this.translationId = params.translationId;
    });
    this.getVerseDetail(this.sooraId, this.verse, this.translationId);
  }

  private getVerseDetail(
    sooraId: number,
    verse: number,
    translationId: number
  ) {
    this.subscriptions.push(
      this.httpService
        .post('getAbrogationDetail', {
          translationId: translationId,
          sooraId: sooraId,
          verse: verse,
        })
        .subscribe((data) => {
          this.abrogationDetail = data.data;
          this.abrogatingVerses = this.abrogationDetail.Abrogations.filter(
            (value) => {
              return value.AbrogatingVerse !== null;
            }
          );
          this.abrogatingOthers = [];
          this.abrogationDetail.Abrogations.forEach((value) => {
            value.AbrogationOthers !== null &&
              value.AbrogationOthers.length > 0 &&
              value.AbrogationOthers.forEach((other) => {
                this.abrogatingOthers.push(other.Name);
              });
          });
          this.authorList = this.abrogationDetail.Abrogations[0].Authors;
          this.setText(this.abrogationDetail.Narration.Translation.Language);
        })
    );
  }

  public setText(language: any) {
    this.helperService.setCurrentTranslatedLanguage(language.LanguageCode);
    if (language.LanguageCode === 'ar') {
      this.arabicClass = true;
    } else {
      this.arabicClass = false;
    }
  }

  public changeTranslation(translation: any) {
    this.getVerseDetail(this.sooraId, this.verse, translation);
  }

  public checkObjectEmpty(object: any) {
    return this.helperService.checkObjectEmpty(object);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }
}
