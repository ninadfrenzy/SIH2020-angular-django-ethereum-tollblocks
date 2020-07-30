import { Component, OnInit, OnDestroy } from '@angular/core';
import { DjangoHttpService } from 'src/app/services/django-http.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy{
  emailOrMobile: string;
  password: string;
  userType: string;
  subscription: Subscription;
  constructor(private httpService: DjangoHttpService, private cookie: CookieService, public router: Router) {
    this.emailOrMobile = '';
    this.password = '';
    this.userType = '';
  }

  ngOnInit(): void {
  }
  ngOnDestroy(){
    // unsubscribe from subscriptions
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  loginSubmit(){
    // Create a JSON object from input to the form.
    const data = {
      email_mobile: this.emailOrMobile,
      password: this.password,
      user_type: this.userType
    };
    // Send JSON to backend and catch response.
    this.subscription = this.httpService.login(data).subscribe(
      res => {
        // if response is valid, retrive token from payload and set cookie; Then navigate to dashboard.
        this.cookie.set('jwtToken', res.token);
        this.router.navigateByUrl('dashboard');
      },
      err => {
        // if error then log the error, and unhide the fail element in HTML DOM.
        const error = err['error'];
        console.log(error);
        document.getElementById('fail').style.display = 'block';
      },
      () => {} // on complete do nothing.
    );
  }
  removeNotification() {
    // hide notification
    document.getElementById('fail').style.display = 'none';
  }

}
