import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle';
import { Observable } from 'rxjs';
import { DjangoHttpService } from 'src/app/services/django-http.service';
import { Transaction } from 'src/app/models/transaction';
import { CustomTxn } from 'src/app/models/customTxns';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  vehicles: Observable<Vehicle[]>;
  txns: Array<CustomTxn> = [];
  constructor(public router: Router, private httpService: DjangoHttpService) { }

  ngOnInit(): void {
    this.getVehicles();
    this.httpService.getVehicles().subscribe(data => {
      data.forEach((vehicle: Vehicle) => {
        this.httpService.getTxns('vehicle_id', vehicle.vehicle_id).subscribe(res => {
          this.txns = this.txns.concat(res);
        });
      });
    });
  }
  getVehicles() {
    this.vehicles = this.httpService.getVehicles();
  }
  sendToPayments(vehicleId: string) {
    this.router.navigate(['pay'], { state: {
      vId : vehicleId
    }});
  }

}
