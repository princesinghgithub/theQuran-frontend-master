import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-header',
  templateUrl: './course-header.component.html',
  styleUrls: ['./course-header.component.css']
})
export class CourseHeaderComponent implements OnInit {
  @Input() type:string;
  constructor() { }

  ngOnInit(): void {
  }

}
