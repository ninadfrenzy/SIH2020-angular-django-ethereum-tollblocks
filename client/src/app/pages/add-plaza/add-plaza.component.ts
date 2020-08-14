import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Road } from 'src/app/models/road';
import { DjangoHttpService } from 'src/app/services/django-http.service';

@Component({
  selector: 'app-add-plaza',
  templateUrl: './add-plaza.component.html',
  styleUrls: ['./add-plaza.component.css']
})
export class AddPlazaComponent implements OnInit {
  road: Road;
  plazaName: string;
  plazaId: string;
  email: string;
  password: string;
  plazaLocation: string;

  /*
        "name": "plaza4",
    "plaza_id": "PLZ04",
    "email": "plaza4@gmail.com",
    "password": "plaza123",
    "location": "Pune",
    "total_collection": "1000000",
    "road_id": "NH10",
    "authority_id": "ATH11"
  */
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private httpService: DjangoHttpService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    ).subscribe(data => {
      if (data.hasOwnProperty('currentRoad')) {
        this.road = data['currentRoad'];
      } else {
        this.router.navigateByUrl('dashboard');
      }
    });
  }
  addNewPlaza() {
    const data = {
      name: this.plazaName,
      // plaza_id: this.road.road_id + '-' + this.road.authority_id,
      email: this.email,
      password: this.password,
      location: this.plazaLocation,
      total_collection: '0',
      road_id: this.road.road_id,
      authority_id: this.road.authority_id
    };
    this.httpService.addPlaza(data).subscribe(res => {
      console.log(res);
      document.getElementById('success').style.display = 'block';
      setTimeout(() => {this.router.navigateByUrl('dashboard'); }, 2000);
    },
    err => {
      document.getElementById('fail').style.display = 'block';
    });

  }
  
  removeNotification() {
    document.getElementById('fail').style.display = 'none';
    document.getElementById('success').style.display = 'none';
  }

}
