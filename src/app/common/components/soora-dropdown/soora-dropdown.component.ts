import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { SooraList } from '@appModels/index';
import { HttpService } from '@appServices/http/http.service';
import { Subscription } from 'rxjs';
import { HelperService } from '@appServices/helper/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-soora-dropdown',
  templateUrl: './soora-dropdown.component.html',
  styleUrls: ['./soora-dropdown.component.css'],
})
export class SooraDropdownComponent implements OnInit, OnDestroy {
  @Input() arabicLanguage: any;
  @Output() passSooraParent = new EventEmitter<object>();
  public sooraList: SooraList[] = [<SooraList>{}];
  public selectedSoora: SooraList = <SooraList>{};
  private subscriptions: Subscription[] = [];
  private slug: string = '';

  constructor(
    private httpService: HttpService,
    private helperService: HelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('abrogations')) {
      this.slug = 'abrogations';
    } else if (this.router.url.includes('repetitions')) {
      this.slug = 'repetitions';
    } else if (this.router.url.includes('differences')) {
      this.slug = 'differences';
    } else if (this.router.url.includes('different-readings')) {
      this.slug = 'differentReadings';
    } else {
      this.slug = 'topics';
    }
    this.getSooras();
  }

  private getSooras() {
    this.subscriptions.push(
      this.httpService.get(`getSooras?type=${this.slug}`).subscribe((data) => {
        this.sooraList = data.data;
      })
    );
  }

  public changeSoora(soora: any, emptyValue: boolean) {
    this.selectedSoora = emptyValue ? <SooraList>{} : soora;
    this.passSooraParent.emit(this.selectedSoora);
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
