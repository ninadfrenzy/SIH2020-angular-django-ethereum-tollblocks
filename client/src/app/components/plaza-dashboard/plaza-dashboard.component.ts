import { Component, OnInit } from '@angular/core';
import { DjangoHttpService } from 'src/app/services/django-http.service';
import { User } from 'src/app/models/userInterface';
import { Booth } from 'src/app/models/booth';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/models/transaction';
import { CustomTxn } from 'src/app/models/customTxns';
import { Rate } from 'src/app/models/rates';

@Component({
  selector: 'app-plaza-dashboard',
  templateUrl: './plaza-dashboard.component.html',
  styleUrls: ['./plaza-dashboard.component.css']
})
export class PlazaDashboardComponent implements OnInit {

  constructor(private httpService: DjangoHttpService, public router: Router) { }
  plaza: User;
  booths: Booth[];
  txns: Array<CustomTxn> = [];
  rates: Rate;
  ngOnInit(): void {
    this.httpService.getProfile().subscribe(res => {
      if (res.plaza_id) {
        this.plaza = res;
        this.httpService.getBooths('plaza_id', this.plaza.plaza_id).subscribe(data => {
          this.booths = data;
        });
        this.httpService.getTxns('plaza_id', this.plaza.plaza_id).subscribe(data => {
          this.txns = data;
        });
        this.httpService.getRates({ plaza_id: this.plaza.plaza_id}).subscribe(data => {
          this.rates = data;
        });
      }
    });
  }
  assignBooth() {
    this.router.navigate(['addbooth'], { state: {
      currentPlaza: this.plaza
    }});
  }

}
