import { Component, OnInit } from '@angular/core';
import { DjangoHttpService } from 'src/app/services/django-http.service';
import { Road } from 'src/app/models/road';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roads',
  templateUrl: './roads.component.html',
  styleUrls: ['./roads.component.css']
})
export class RoadsComponent implements OnInit {
  startLoc: string;
  endLoc: string;
  contractAmount: number;
  duration: string;
  roadId: string;
  roads: Road[];
  showSpinner = false;
  constructor(private httpService: DjangoHttpService, private router: Router) {

   }

  ngOnInit(): void {
    this.updateRoads();
  }
  addNewRoad() {
    this.showSpinner = true;
    const road = {
      start: this.startLoc,
      end: this.endLoc,
      contract_duration: this.duration,
      contract_amount: this.contractAmount,
      // road_id: this.roadId
    };
    this.httpService.addNewRoad(road).subscribe(resp => {
      this.showSpinner = false;
      console.log(resp);
      this.updateRoads();
      document.getElementById('success').style.display = 'block';    
      setTimeout(()=>{document.getElementById('success').style.display = 'none'; this.router.navigateByUrl('dashboard');},2000);
    },
    err=>{
      document.getElementById('fail').style.display = 'block';
    });
  }
  updateRoads() {
    this.httpService.getRoads().subscribe(
      res => {
        this.roads = res;
        this.roadId = 'RD' + (this.roads.length + 10).toString();    
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('done');
      }
    );
  }
  assignAuthority(currentRoad) {
    console.log(currentRoad);
    this.router.navigate(['assignauthority'], {state: {road: currentRoad}});
  }
  removeNotification() {
    document.getElementById('fail').style.display = 'none';
    document.getElementById('success').style.display = 'none';
  }
}
