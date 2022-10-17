import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Language } from '@appModels/index';
import { HttpService } from '@appServices/http/http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-translation-dropdown',
  templateUrl: './translation-dropdown.component.html',
  styleUrls: ['./translation-dropdown.component.css'],
})
export class TranslationDropdownComponent implements OnInit, OnDestroy {
  @Output() passTranslationParent = new EventEmitter<number>();
  public languageList: Language[] = [<Language>{}];
  public selectedTranslation: any = null;
  private subscriptions: Subscription[] = [];
  public isLangClicked: boolean = false;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getTranslation();
  }

  private getTranslation() {
    this.httpService.get('getTranslation').subscribe((data) => {
      this.languageList = data.data;
    });
  }

  public showLang() {
    this.isLangClicked = !this.isLangClicked;
  }

  public changeTranslation(translation: any) {
    this.isLangClicked = false;
    this.selectedTranslation = translation;
    this.passTranslationParent.emit(translation.TranslationId);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
    this.isLangClicked = false;
  }
}
