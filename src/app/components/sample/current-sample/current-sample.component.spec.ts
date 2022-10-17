import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSampleComponent } from './current-sample.component';

describe('CurrentSampleComponent', () => {
  let component: CurrentSampleComponent;
  let fixture: ComponentFixture<CurrentSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
