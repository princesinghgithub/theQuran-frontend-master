import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SooraBackgroundComponent } from './soora-background.component';

describe('SooraBackgroundComponent', () => {
  let component: SooraBackgroundComponent;
  let fixture: ComponentFixture<SooraBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SooraBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SooraBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
