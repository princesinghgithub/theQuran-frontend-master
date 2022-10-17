import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css'],
})
export class PublicComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {
    if (this.router.url == '/') {
      this.router.navigate(['/home']);
    }
  }
  ngOnInit(): void {}
}
