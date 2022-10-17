import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerseAbbrogatedSideNavComponent } from './verse-abbrogated-side-nav.component';

describe('VerseAbbrogatedSideNavComponent', () => {
  let component: VerseAbbrogatedSideNavComponent;
  let fixture: ComponentFixture<VerseAbbrogatedSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerseAbbrogatedSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerseAbbrogatedSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
