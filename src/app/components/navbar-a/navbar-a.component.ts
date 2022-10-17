import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { NavDialogeComponent } from '@appComponents/nav-dialoge/nav-dialoge.component';
@Component({
  selector: 'app-navbar-a',
  templateUrl: './navbar-a.component.html',
  styleUrls: ['./navbar-a.component.css']
})
export class NavbarAComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(NavDialogeComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }

}
