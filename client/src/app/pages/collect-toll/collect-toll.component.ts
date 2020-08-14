import { Component, OnInit } from '@angular/core';
import { Booth } from 'src/app/models/booth';
import { DjangoHttpService } from 'src/app/services/django-http.service';
import { User } from 'src/app/models/userInterface';
import { Rate } from 'src/app/models/rates';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collect-toll',
  templateUrl: './collect-toll.component.html',
  styleUrls: ['./collect-toll.component.css']
})
export class CollectTollComponent implements OnInit {
  vehicleId: string;
  vehicleType: string;
  toll: number;
  booth: User;
  rates: Rate;
  isReturn = false;
  constructor(private httpService: DjangoHttpService, private router: Router) { }

  ngOnInit(): void {
    this.httpService.getProfile().subscribe(res => {
      this.booth = res;
      this.httpService.getRates({ plaza_id: this.booth.plaza_id}).subscribe(data => {
        this.rates = data;
      });
    });
  }
  removeNotification() {
    document.getElementById('fail').style.display = 'none';
    document.getElementById('success').style.display = 'none';
  }
  collectToll() {
    let rateCharged = 0;
    if(this.vehicleType === 'car') {
      rateCharged = this.rates.car_rate;
    } else if (this.vehicleType === 'bus') {
      rateCharged = this.rates.bus_rate;
    } else if (this.vehicleType === 'truck') {
      rateCharged = this.rates.truck_rate;
    } else if (this.vehicleType === 'LCV') {
      rateCharged = this.rates.lcv_rate;
    }
    const data = {
      amount: rateCharged,
      authority_id: this.booth.authority_id,
      plaza_id: this.booth.plaza_id,
      booth_id: this.booth.booth_id,
      road_id: this.booth.road_id,
      vehicle_id: this.vehicleId,
      vehicle_type: this.vehicleType,
      is_return: this.isReturn
    };
    this.httpService.collectToll(data).subscribe(
      res => {
      console.log(res);
      document.getElementById('success').style.display = 'block';
      setTimeout(() => {
        this.router.navigateByUrl('dashboard');
      }, 2000);
    },
    err => {
      console.log(err);
      document.getElementById('fail').style.display = 'block';
      document.getElementById('fail-span').innerHTML = err['error'].split(":")[1];
    },
    () => {}
    );
  }
}
