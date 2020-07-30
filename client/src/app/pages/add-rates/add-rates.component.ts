import { Component, OnInit } from '@angular/core';
import { DjangoHttpService } from 'src/app/services/django-http.service';
import { User } from 'src/app/models/userInterface';
import { Rate } from 'src/app/models/rates';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-rates',
  templateUrl: './add-rates.component.html',
  styleUrls: ['./add-rates.component.css']
})
export class AddRatesComponent implements OnInit {
  carRate: number;
  busRate: number;
  lcvRate: number;
  truckRate: number;
  rates: Rate;
  user: User;
  constructor(private httpService: DjangoHttpService, private router: Router) { }

  ngOnInit(): void {
    this.httpService.getProfile().subscribe(res => {
      this.user = res;
      this.httpService.getRates({ plaza_id: this.user.plaza_id }).subscribe(
        data => {
        this.rates = data;
        this.carRate = this.rates.car_rate;
        this.busRate = this.rates.bus_rate;
        this.truckRate = this.rates.truck_rate;
        this.lcvRate = this.rates.lcv_rate;
      },
      err => {
        console.log('not set yet');
      }
      );
    });

  }
  removeNotification() {
    document.getElementById('fail').style.display = 'none';
    document.getElementById('success').style.display = 'none';
  }
  addNewRates() {

    const data = {
      plaza_id: this.user.plaza_id,
      car_rate: this.carRate,
      bus_rate: this.busRate,
      truck_rate: this.truckRate,
      lcv_rate: this.lcvRate
    };

    this.httpService.addRates(data).subscribe(
      res => {
      this.rates = res;
      console.log(this.rates);
      document.getElementById('success').style.display = 'block';
      setTimeout(() => {
        this.router.navigateByUrl('dashboard');
      }, 800);
    },
    err => {
      console.log(err);
      document.getElementById('fail').style.display = 'block';
    },
    () => {}
    );


  }

}
