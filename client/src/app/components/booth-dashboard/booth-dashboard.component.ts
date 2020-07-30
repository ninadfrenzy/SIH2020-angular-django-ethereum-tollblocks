import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/userInterface';
import { DjangoHttpService } from 'src/app/services/django-http.service';
import { Transaction } from 'src/app/models/transaction';

@Component({
  selector: 'app-booth-dashboard',
  templateUrl: './booth-dashboard.component.html',
  styleUrls: ['./booth-dashboard.component.css']
})
export class BoothDashboardComponent implements OnInit {
  user: User
  txns: Array<Transaction> = [];
  constructor( public router: Router, private httpService: DjangoHttpService) { }

  ngOnInit(): void {
    this.httpService.getProfile().subscribe(res => {
      this.user = res;
      this.httpService.getTxns('booth_id', this.user.booth_id).subscribe(data => {
        this.txns = data;
      });
    });
  }

}
