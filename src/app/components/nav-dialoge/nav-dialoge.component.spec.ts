import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDialogeComponent } from './nav-dialoge.component';

describe('NavDialogeComponent', () => {
  let component: NavDialogeComponent;
  let fixture: ComponentFixture<NavDialogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavDialogeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
