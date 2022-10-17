import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  Input,
} from '@angular/core';
import { Language } from '@appModels/index';
import { HttpService } from '@appServices/http/http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-language-dropdown',
  templateUrl: './language-dropdown.component.html',
  styleUrls: ['./language-dropdown.component.css'],
})
export class LanguageDropdownComponent implements OnInit, OnDestroy {
  @Output() passTranslationParent = new EventEmitter<number>();
  @Input() type: string = 'all';
  public languageList: Language[] = [<Language>{}];
  public selectedTranslation: any = null;
  private subscriptions: Subscription[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getTranslation();
  }

  private getTranslation() {
    //query param type=all might cause problem I have to test it
    this.httpService.get(`getTranslation?type=${this.type}`).subscribe((data) => {
      this.languageList = data.data;
    });
  }

  public changeTranslation(translation: any) {
    this.selectedTranslation = translation;
    this.passTranslationParent.emit(translation.LanguageId);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => {
      value.unsubscribe();
    });
  }
}
