import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle';
import { DjangoHttpService } from 'src/app/services/django-http.service';
import { NgForm, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  vehicles: Vehicle[];
  amount: number;
  selectedValue: string;
  vehicleNumber: string;
  constructor(private httpService: DjangoHttpService, private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    ).subscribe(data => {
      if (data.hasOwnProperty('vId')) {
        this.selectedValue = data['vId'];
      } else {
      }
    });
    this.httpService.getVehicles().subscribe(vehicles => {
      this.vehicles = vehicles;
    });
  }

  _keyUp(event: any) {
    return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
  removeNotification() {
    document.getElementById('fail').style.display = 'none';
    document.getElementById('success').style.display = 'none';
  }
  rechargeSubmit() {
    let vehicleId = '';
    if (this.selectedValue === 'Other') {
      vehicleId = this.vehicleNumber;
    }
    else {
      vehicleId = this.selectedValue;
    }
    this.httpService.updateBalance({ amount: this.amount, vehicle_id: vehicleId }).subscribe(
      resp => {
        document.getElementById('success').style.display = 'block';
        setTimeout(()=>{document.getElementById('success').style.display = 'none';this.router.navigateByUrl('dashboard');},2000);
      },
      err => {
        document.getElementById('fail').style.display = 'block';
      },
      () => {}
    );
  }

}
