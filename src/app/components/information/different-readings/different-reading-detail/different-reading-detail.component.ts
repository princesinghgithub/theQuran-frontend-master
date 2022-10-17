import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@appServices/http/http.service';
import { HelperService } from '@appServices/helper/helper.service';
import { DifferentReadingDetail } from '@appModels/index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-different-reading-detail',
  templateUrl: './different-reading-detail.component.html',
  styleUrls: ['./different-reading-detail.component.css'],
})
export class DifferentReadingDetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private sooraId: number = 0;
  private verse: number = 0;
  private translationId: number = 0;
  private narrationId: number = 0;
  private reading: string = '';
  public differentReadingDetail: DifferentReadingDetail = <
    DifferentReadingDetail
  >{};
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
      this.narrationId = params.narrationId;
      this.reading = params.reading;
    });
    this.getDifferentReadingDetail(
      this.sooraId,
      this.verse,
      this.translationId,
      this.narrationId,
      this.reading
    );
  }

  private getDifferentReadingDetail(
    sooraId: number,
    verse: number,
    translationId: number,
    narrationId: number,
    reading: string
  ) {
    this.subscriptions.push(
      this.httpService
        .post('getDifferentReadingDetail', {
          translationId: translationId,
          sooraId: sooraId,
          verse: verse,
          narrationId: narrationId,
          reading: reading,
        })
        .subscribe((data) => {
          this.differentReadingDetail = data.data;
          this.authorList = this.differentReadingDetail.DifferentReadings[0].Authors;
          this.setText(
            this.differentReadingDetail.mainNarration.Translation.Language
          );
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
    this.getDifferentReadingDetail(
      this.sooraId,
      this.verse,
      translation,
      this.narrationId,
      this.reading
    );
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
