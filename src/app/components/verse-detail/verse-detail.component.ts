import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@appServices/http/http.service';
import { HelperService } from '@appServices/helper/helper.service';
import { QuranDetail } from '@appModels/index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verse-detail',
  templateUrl: './verse-detail.component.html',
  styleUrls: ['./verse-detail.component.css'],
})
export class VerseDetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private sooraId: number = 0;
  private verse: number = 0;
  private translationId: number = 0;
  public verseDetail: any = {};
  public textDir: string = 'ltr';
  public textRTL: boolean = false;

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
    this.getVerseDetail();
  }

  private getVerseDetail() {
    this.subscriptions.push(
      this.httpService
        .post('getQuranDetail', {
          filters: {
            page: 1,
            pageSize: 25,
            translationId: this.translationId,
            sooraId: this.sooraId,
            verse: this.verse,
          },
        })
        .subscribe((data) => {
          this.verseDetail = data.data.rows[0];
          this.setText(this.verseDetail);
        })
    );
  }

  public setText(verseDetail: any) {
    this.helperService.setCurrentTranslatedLanguage(
      verseDetail.Translation.Language.LanguageCode
    );
    if (verseDetail.Translation.Language.LanguageCode === 'ar') {
      this.textDir = 'rtl';
      this.textRTL = true;
    } else {
      this.textDir = 'ltr';
      this.textRTL = false;
    }
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
