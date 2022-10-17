import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@appServices/auth/auth.service';
import { HttpService } from '@appServices/http/http.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css', '../settings.component.scss'],
})
export class PictureComponent implements OnInit {
  public userData: any = this.authService.user();
  allUserData: any = [];
  profilePicture: any;

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.getUser();
  }

  public getUser() {
    this.httpService
      .post('getUser', {
        userId: this.userData.Id,
      })
      .subscribe(({ user }) => {
        this.allUserData = user;
      });
  }

  setImage(file): void {
    this.profilePicture = file;
  }

  public uploadMedia(file): void {
    if (file.length < 1) {
      return;
    }
    const fileToUpload = file.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(fileToUpload);
    reader.onload = (_event) => {
      const formData: FormData = new FormData();
      formData.append('ProfilePicture', fileToUpload);
      console.log(formData);
      this.httpService
        .post(`profilePictureUpload`, formData)
        .subscribe(({ data }) => {
          this.allUserData.ProfilePicture = data.ProfilePicture;
          window.location.reload();
        });
    };
  }

  // submitEmailChange() {
  //   console.log(this.pictureForm.valid);
  //   if (this.pictureForm.valid) {
  //     this.httpService
  //       .post('updateProfile', this.pictureForm.value)
  //       .subscribe((data) => {
  //         this.alertService.success(data.msg);
  //       });
  //   }
  // }
}
