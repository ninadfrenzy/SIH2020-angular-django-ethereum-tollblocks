import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Road } from 'src/app/models/road';
import { Authority } from 'src/app/models/authority';
import { DjangoHttpService } from 'src/app/services/django-http.service';

@Component({
  selector: 'app-ministry-dashboard',
  templateUrl: './ministry-dashboard.component.html',
  styleUrls: ['./ministry-dashboard.component.css']
})
export class MinistryDashboardComponent implements OnInit {
  assignedRoads: Road[] = [];
  unassignedRoads: Road[] = [];
  authorities: Authority[];
  roads: Road[];
  authSort: Road[] = [];
  constructor(public router: Router, private httpService: DjangoHttpService) { }

  ngOnInit(): void {
    this.httpService.getAuthorities().subscribe(res => {
      this.authorities = res;
      console.log(this.authorities);
    });
    this.httpService.getRoads().subscribe((res) => {
      this.roads = res;
      console.log(this.roads);
      for (const road of this.roads) {
        if (road.authority_id === '') {
          this.unassignedRoads.push(road);
        } else {
          this.assignedRoads.push(road);
        }
      }
      console.log(this.assignedRoads, this.unassignedRoads);
      this.authWisePlazaSort();
    });
  }
  assignAuthority(currentRoad) {
    console.log(currentRoad);
    this.router.navigate(['assignauthority'], { state: { road: currentRoad } });
  }
  authWisePlazaSort() {
    this.authSort = this.assignedRoads.reduce(function (r, a) {
      r[a.authority_id] = r[a.authority_id] || [];
      r[a.authority_id].push(a);
      return r;
    }, Object.create(null));
    console.log(this.authSort);
  }

}
