import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadSampleComponent } from './read-sample.component';

describe('ReadSampleComponent', () => {
  let component: ReadSampleComponent;
  let fixture: ComponentFixture<ReadSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
