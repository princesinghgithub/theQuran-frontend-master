import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@appServices/http/http.service';
import { HelperService } from '@appServices/helper/helper.service';
import { VerseBackgroundDetail } from '@appModels/index';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-verse-background-detail',
  templateUrl: './verse-background-detail.component.html',
  styleUrls: ['./verse-background-detail.component.css'],
})
export class VerseBackgroundDetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private verseBackgroundId: number = 0;
  private translationId: number = 0;
  public verseBackgroundDetail: VerseBackgroundDetail = <
    VerseBackgroundDetail
  >{};
  public arabicClass: boolean = false;
  public authorList: any = [];

  constructor(
    private httpService: HttpService,
    private helperService: HelperService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.verseBackgroundId = params.verseBackgroundId;
      this.translationId = params.translationId;
    });
    this.getVerseBackgroundDetail(this.verseBackgroundId, this.translationId);
  }

  private getVerseBackgroundDetail(
    verseBackgroundId: number,
    translationId: number
  ) {
    this.subscriptions.push(
      this.httpService
        .post('getVerseBackgroundDetail', {
          translationId: translationId,
          verseBackgroundId: verseBackgroundId,
        })
        .subscribe((data) => {
          this.verseBackgroundDetail = data.data;
          this.authorList = this.verseBackgroundDetail.Authors;
          this.setText(
            this.verseBackgroundDetail.Narration.Translation.Language
          );
        })
    );
  }

  safeHTML(unsafe: string) {
    return this.sanitizer.bypassSecurityTrustHtml(unsafe);
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
    this.getVerseBackgroundDetail(this.verseBackgroundId, translation);
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
