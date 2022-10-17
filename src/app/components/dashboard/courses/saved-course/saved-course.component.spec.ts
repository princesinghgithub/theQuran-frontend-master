import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCourseComponent } from './saved-course.component';

describe('SavedCourseComponent', () => {
  let component: SavedCourseComponent;
  let fixture: ComponentFixture<SavedCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
