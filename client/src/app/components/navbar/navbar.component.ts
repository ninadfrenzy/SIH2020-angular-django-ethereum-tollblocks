import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { DjangoHttpService } from 'src/app/services/django-http.service';
import { User } from 'src/app/models/userInterface';
import { CookieUserPayload } from 'src/app/models/cookieUser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User = null;
  cookieUser: CookieUserPayload;
  constructor(private cookie: CookieService, public router: Router, private httpService: DjangoHttpService) { }

  ngOnInit(): void {
    this.cookieUser = this.httpService.getDecodedToken();
    this.httpService.getProfile().subscribe(
      profile => {
        this.user = profile;
        this.user.user_type = this.cookieUser.user_type;
        if (this.user.user_type === 'customer') {
          this.user.name = this.user.first_name + ' ' + this.user.last_name;
        }
      },
      err => {
        console.log('could not fetch profile');
      },
      () => {
      }
    );
  }
  toggleHamburgerMenu() {
    document.getElementById('navbar-burger').classList.toggle('is-active');
    document.getElementById('navbar-menu').classList.toggle('is-active');
  }
  showProfile() {
    document.getElementById('modal').classList.add('is-active');
  }
  hideProfile() {
    document.getElementById('modal').classList.remove('is-active');
  }
  logout() {
    this.httpService.logout().subscribe(
      data => {
        console.log(data);
        this.cookie.delete('jwtToken');
        this.router.navigateByUrl('');
      },
      err => {
        console.log(err);

      },
      () => {
        console.log('logout successfull');

      }
    );
    // this.cookie.delete('jwtToken');
    // this.router.navigateByUrl('');
  }
}
