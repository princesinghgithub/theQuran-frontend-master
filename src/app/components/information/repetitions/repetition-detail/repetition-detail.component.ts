import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@appServices/http/http.service';
import { HelperService } from '@appServices/helper/helper.service';
import { RepetitionsDetail } from '@appModels/index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-repetition-detail',
  templateUrl: './repetition-detail.component.html',
  styleUrls: ['./repetition-detail.component.css'],
})
export class RepetitionDetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private sooraId: number = 0;
  private verse: number = 0;
  private translationId: number = 0;
  public repetitionsDetail: RepetitionsDetail = <RepetitionsDetail>{};
  public arabicClass: boolean = false;
  public authorList: any = [];

  constructor(
    private httpService: HttpService,
    private helperService: HelperService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.sooraId = params.sooraId;
      this.verse = params.verse;
      this.translationId = params.translationId;
    });
    this.getRepetitionsDetail(this.sooraId, this.verse, this.translationId);
  }

  private getRepetitionsDetail(
    sooraId: number,
    verse: number,
    translationId: number
  ) {
    this.subscriptions.push(
      this.httpService
        .post('getRepetitionsDetail', {
          translationId: translationId,
          sooraId: sooraId,
          verse: verse,
        })
        .subscribe((data) => {
          this.repetitionsDetail = data.data;
          this.authorList = this.repetitionsDetail.repetitionData[0].Authors;
          this.setText(this.repetitionsDetail.mainVerse.Translation.Language);
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
    this.getRepetitionsDetail(this.sooraId, this.verse, translation);
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
