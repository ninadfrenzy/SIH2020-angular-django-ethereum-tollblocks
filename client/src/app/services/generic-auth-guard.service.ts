import { Injectable } from '@angular/core';
import { CookieUserPayload } from '../models/cookieUser';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GenericAuthGuardService {

  decodedToken: CookieUserPayload;
  constructor(private cookie: CookieService, private router: Router) { }
  canActivate(): any{
    const token = this.cookie.get('jwtToken');
    if (token !== null){
      try {
        this.decodedToken = JSON.parse(atob(token.split('.')[1]));
        // perform role based auth with decoded token user field.
        const userType = this.decodedToken.user_type;
        const allowedRoles = [
          'customer',
          'ministry',
          'plaza',
          'booth',
          'authority'
        ];
        if (allowedRoles.indexOf(userType) > -1) {
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
