import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HelperService } from '@appServices/helper/helper.service';
import { HttpService } from '@appServices/http/http.service';

@Component({
  selector: 'app-soora-background',
  templateUrl: './soora-background.component.html',
  styleUrls: ['./soora-background.component.css'],
})
export class SooraBackgroundComponent implements OnInit {
  private translationId: number;
  public arabicClass: boolean = false;
  public currentSoora: any;
  sooras: any = [];

  constructor(
    private httpService: HttpService,
    private helperService: HelperService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem("language")==="ar"){
      this.arabicClass = true;
      this.translationId = 1
    } else {
      this.arabicClass = false;
      this.translationId = 2
    }
    this.getSooraBackgrounds(this.translationId);

  }

  public getSooraBackgrounds(languageId: number) {
    this.httpService
      .post('getSooraBackgrounds', {
        filters: { languageId },
      })
      .subscribe((data) => {
        this.sooras = data.data.rows;
        if (this.currentSoora) {
          this.currentSoora = data.data.rows[this.currentSoora.SooraId - 1];
        } else {
          this.currentSoora = data.data.rows[0];
        }
      });
  }

  public setCurrentSoora(soora: any) {
    this.currentSoora = soora;
  }

  safeHTML(unsafe: string) {
    return this.sanitizer.bypassSecurityTrustHtml(unsafe);
  }

  public setText(language: number) {
    let languageCode: string = localStorage.getItem('language');
     language === 1 ? (languageCode = 'ar') : (languageCode = 'en');
    this.helperService.setCurrentTranslatedLanguage(languageCode);
    if (languageCode = 'ar') {
      this.arabicClass = true;
    } else {
      this.arabicClass = false;
    }
  }

  public changeTranslation(translation: number) {
    this.getSooraBackgrounds(translation);
    this.setText(translation);
  }
}
