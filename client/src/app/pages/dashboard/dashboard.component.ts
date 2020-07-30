import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/userInterface';
import { Router } from '@angular/router';
import { CookieUserPayload } from 'src/app/models/cookieUser';
import { DjangoHttpService } from 'src/app/services/django-http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: CookieUserPayload;
  constructor(private httpService: DjangoHttpService) { }

  ngOnInit(): void {
    this.user = this.httpService.getDecodedToken();
  }

}
