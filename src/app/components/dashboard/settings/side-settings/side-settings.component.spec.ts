import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideSettingsComponent } from './side-settings.component';

describe('SideSettingsComponent', () => {
  let component: SideSettingsComponent;
  let fixture: ComponentFixture<SideSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
