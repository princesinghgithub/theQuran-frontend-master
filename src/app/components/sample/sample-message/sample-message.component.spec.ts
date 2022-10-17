import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleMessageComponent } from './sample-message.component';

describe('SampleMessageComponent', () => {
  let component: SampleMessageComponent;
  let fixture: ComponentFixture<SampleMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
