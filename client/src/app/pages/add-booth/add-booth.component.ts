import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Plaza } from 'src/app/models/plaza';
import { DjangoHttpService } from 'src/app/services/django-http.service';

@Component({
  selector: 'app-add-booth',
  templateUrl: './add-booth.component.html',
  styleUrls: ['./add-booth.component.css']
})
export class AddBoothComponent implements OnInit {
  plaza: Plaza;
  boothName: string;
  email: string;
  password: string;
  /*
  {
    "name":"abc",
    "booth_id":"BTH787",
    "email":"test@test.com",
    "password":"temp123",
    "road_id": "NH10",
    "authority_id": "ATH11",
    "plaza_id":"PLZ04",
    "total_collection": "1000000"

}
  */
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private httpService: DjangoHttpService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    ).subscribe(data => {
      if (data.hasOwnProperty('currentPlaza')) {
        this.plaza = data['currentPlaza'];
      } else {
        this.router.navigateByUrl('dashboard');
      }
    });
  }
  addNewBooth() {
    const data = {
      name: this.boothName,
      email: this.email,
      password: this.password,
      road_id: this.plaza.road_id,
      authority_id: this.plaza.authority_id,
      plaza_id: this.plaza.plaza_id,
      total_collection: '0'
    };
    this.httpService.addBooth(data).subscribe(
      res => {
        document.getElementById('success').style.display = 'block';
        setTimeout(() => {
          this.router.navigateByUrl('dashboard');
        }, 800);
    },
    err => {
      console.log(err);
      document.getElementById('fail').style.display = 'block';
    },
    () => {} // on complete do nothing.
    );


  }
  removeNotification() {
    document.getElementById('fail').style.display = 'none';
    document.getElementById('success').style.display = 'none';
  }

}
