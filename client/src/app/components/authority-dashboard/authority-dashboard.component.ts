import { Component, OnInit } from '@angular/core';
import { DjangoHttpService } from 'src/app/services/django-http.service';
import { Road } from 'src/app/models/road';
import { Router } from '@angular/router';
import { Plaza } from 'src/app/models/plaza';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-authority-dashboard',
  templateUrl: './authority-dashboard.component.html',
  styleUrls: ['./authority-dashboard.component.css']
})
export class AuthorityDashboardComponent implements OnInit {
  roads: Road[];
  plazas: Plaza[];
  panelOpenState: boolean;
  plazaSort: Road[] = [];
  constructor(private httpService: DjangoHttpService, private router: Router) {
    // close the panel on page load.
    this.panelOpenState = false;
  }

  ngOnInit(): void {
    this.httpService.getProfile().subscribe(data => {
      // get the current user JSON
      if (data.authority_id) {
        // if user is authority then
        this.httpService.getRoads(data.authority_id).subscribe(res => {
          // get assigned roads
          this.roads = res;
        });
        this.httpService.getPlazas('authority_id', data.authority_id).subscribe(res => {
          // get assigned plazas
          this.plazas = res;
          this.roadWisePlazaSort(); // sort the plazas by road id.
        },
          err => {
            console.log(err);
          });
      }
    });
  }
  assignPlaza(road: any) {
    // navigate to add plaza and send the clicked road as state data.
    this.router.navigate(['addplaza'], {
      state: {
        currentRoad: road
      }
    });
  }

  roadWisePlazaSort() {
    // spooky magic stuff that works.
    this.plazaSort = this.plazas.reduce((r, a) => {
      r[a.road_id] = r[a.road_id] || [];
      r[a.road_id].push(a);
      return r;
    }, Object.create(null));
    console.log(this.plazaSort);
  }
}
