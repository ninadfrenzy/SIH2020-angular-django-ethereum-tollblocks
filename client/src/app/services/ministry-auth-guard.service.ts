import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CookieUserPayload } from '../models/cookieUser';

@Injectable({
  providedIn: 'root'
})
export class MinistryAuthGuardService {

  decodedToken: CookieUserPayload;
  constructor(private cookie: CookieService, private router: Router) { }
  canActivate(): any{
    const token = this.cookie.get('jwtToken');
    if (token !== null){
      try {
        this.decodedToken = JSON.parse(atob(token.split('.')[1]));
        console.log('token is ', this.decodedToken);
        // perform role based auth with decoded token user field.
        if (this.decodedToken.user_type === 'ministry') {
          return true;
        }
      } catch (err) {
        this.router.navigateByUrl('');
      }
    } else {
      this.router.navigateByUrl('');
    }
  }
}
