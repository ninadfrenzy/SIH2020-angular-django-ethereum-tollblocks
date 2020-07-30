import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle';
import { User } from 'src/app/models/userInterface';
import { DjangoHttpService } from 'src/app/services/django-http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: Observable<Vehicle[]>;
  vehicleName: string;
  vehicleID: string;
  vehicleType: string;
  user: User;
  userMobileNumber: string;
  constructor(private httpService: DjangoHttpService) { }

  ngOnInit(): void {

    this.getVehicles();
    this.httpService.getProfile().pipe(
      map((userProfile: User) => userProfile.mobile_number)
    ).subscribe(mobileNumber => {
      this.userMobileNumber = mobileNumber;
    });
  }
  getVehicles() {
      this.vehicles = this.httpService.getVehicles();
    }

  addVehicle() {
    const newVehicle = {
      vehicle_name: this.vehicleName,
      vehicle_id: this.vehicleID,
      vehicle_type: this.vehicleType,
      mobile_number: this.userMobileNumber,
      balance: 0,
    };
    this.httpService.addNewVehicle(newVehicle).subscribe(
      vehicle => {
        this.getVehicles();
      },
      err => {
        console.log(err);
      },
      () => {}
    );
  }

}
