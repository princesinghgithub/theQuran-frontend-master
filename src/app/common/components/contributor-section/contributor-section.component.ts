import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HelperService } from '@appServices/helper/helper.service';

@Component({
  selector: 'app-contributor-section',
  templateUrl: './contributor-section.component.html',
  styleUrls: ['./contributor-section.component.css'],
})
export class ContributorSectionComponent implements OnInit, OnChanges {
  @Input() authorList: any;
  @Input() arabicClass: any;
  public selectedAuthor: any;

  constructor(
    private router: Router,
    private helperService: HelperService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.authorList.length > 0
      ? (this.selectedAuthor = this.authorList.find((value: any) => {
          return value.FirstName === 'WaterLife Publishing';
        }))
      : null;
  }

  public changeAuthor(author: any) {
    this.selectedAuthor = author;
  }

  public authorDetailPage() {
    // localStorage.setItem('authorData', JSON.stringify(this.selectedAuthor));
    // if (this.arabicClass) {
    //   localStorage.setItem('arabicTranslation', JSON.stringify(true));
    // } else {
    //   localStorage.setItem('arabicTranslation', JSON.stringify(false));
    // }
    const authorId = String(this.selectedAuthor.Id);
    console.log(authorId);
    this.router.navigateByUrl(`/author?id=${authorId}`);
  }

  safeHTML(unsafe: string) {
    return this.sanitizer.bypassSecurityTrustHtml(unsafe);
  }

  public checkObjectEmpty(object: any) {
    return this.helperService.checkObjectEmpty(object);
  }
}
