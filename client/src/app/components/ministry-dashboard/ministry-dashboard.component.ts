import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Road } from 'src/app/models/road';
import { Authority } from 'src/app/models/authority';
import { DjangoHttpService } from 'src/app/services/django-http.service';
import {map, filter} from 'rxjs/operators';
import { CustomTxn } from 'src/app/models/customTxns';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
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
  allTxns: CustomTxn[] = [];
  todayCollection: number=0;
  
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{stacked: true}], yAxes: [{stacked: true}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  completed: number[]=[];
  remaining: number[]=[];
  public barChartData: ChartDataSets[] = [
    // { data: [65, 59], label: 'completed' },
    // { data: [28, 48], label: 'remaining' }
  ];
  constructor(public router: Router, private httpService: DjangoHttpService) { }

  ngOnInit(): void {
    this.httpService.getAuthorities().subscribe(res => {
      this.authorities = res;
      console.log(this.authorities);
    });
    let today = new Date();
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);  

    this.httpService.getTxns().subscribe(data => {
      console.log(data);
      
        data.filter((item)=> {
        let curr = new Date(item.created_at);
        console.log(curr, today, yesterday, curr>yesterday&&curr<=today);
        
        return curr>yesterday && curr<=today;
      }).map(item => {
        this.todayCollection = this.todayCollection + item.amount;
      })
    });

    this.httpService.getRoads().subscribe((res) => {
      this.roads = res;
      this.roads.map(road => {
        this.barChartLabels.push(road.road_id);
        this.completed.push(parseInt(road.collected_amount));
        this.remaining.push(road.contract_amount-parseInt(road.collected_amount));
        this.barChartData=[{data:this.completed, label: 'completed'},{data:this.remaining,label:'remaining'}];
      });
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
