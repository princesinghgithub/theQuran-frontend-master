import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@appServices/http/http.service';
import { HelperService } from '@appServices/helper/helper.service';
import { ErrorDetail } from '@appModels/index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-differences-detail',
  templateUrl: './differences-detail.component.html',
  styleUrls: ['./differences-detail.component.css'],
})
export class DifferencesDetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private sooraId: number = 0;
  private verse: number = 0;
  private translationId: number = 0;
  public differenceDetail: ErrorDetail = <ErrorDetail>{};
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
    this.getDifferencesDetail(this.sooraId, this.verse, this.translationId);
  }

  private getDifferencesDetail(
    sooraId: number,
    verse: number,
    translationId: number
  ) {
    this.subscriptions.push(
      this.httpService
        .post('getDifferencesDetail', {
          translationId: translationId,
          sooraId: sooraId,
          verse: verse,
        })
        .subscribe((data) => {
          this.differenceDetail = data.data;
          this.authorList = this.differenceDetail.Authors;
          this.setText(this.differenceDetail.Narration.Translation.Language);
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
    this.getDifferencesDetail(this.sooraId, this.verse, translation);
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
