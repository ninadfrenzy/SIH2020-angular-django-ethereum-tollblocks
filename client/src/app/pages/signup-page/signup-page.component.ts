import { Component, OnInit } from '@angular/core';
import { DjangoHttpService } from 'src/app/services/django-http.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
  subscription: Subscription;

  constructor(private httpService: DjangoHttpService, private cookie: CookieService, public router: Router) {
    // clear the form fields as soon as page is reset.
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.mobileNumber = '';
    this.password = '';
    this.confirmPassword = '';
  }

  ngOnInit(): void {
  }

  signupSubmit(signupform: any) {
    // prepare JSON from form fields.
    const data = {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      user_type: 'customer',
      password: this.password,
      mobile_number: this.mobileNumber,
    };
    // send JSON to signup method.
    this.subscription = this.httpService.signup(data).subscribe(
      response => {
        // retrieve token from the response and store the token in cookie; navigate to dashboard.
        // cookie not set from backend and can be potentially exploited.
        const token = response.token;
        this.cookie.set('jwtToken', token);
        this.router.navigateByUrl('dashboard');
      },
      err => {
        // if error, log the error to console.
        const error = err['error'];
        Object.values(error).forEach((item) => {
          console.log(item[0]);
          document.getElementById('errtext').innerText += item[0];
        });
        document.getElementById('fail').style.display = 'block';
        signupform.reset();
      },
      () => {} // on complete, do nothing.
    );
  }
  removeNotification() {
    // toggle notification display on close.
    document.getElementById('fail').style.display = 'none';
  }
}
