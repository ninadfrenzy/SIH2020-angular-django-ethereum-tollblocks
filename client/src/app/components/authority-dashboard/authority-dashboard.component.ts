import { Component, OnInit } from '@angular/core';
import { DjangoHttpService } from 'src/app/services/django-http.service';
import { Road } from 'src/app/models/road';
import { Router } from '@angular/router';
import { Plaza } from 'src/app/models/plaza';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { throwIfEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-authority-dashboard',
  templateUrl: './authority-dashboard.component.html',
  styleUrls: ['./authority-dashboard.component.css']
})
export class AuthorityDashboardComponent implements OnInit {
  roads: Road[];
  plazas: Plaza[];
  panelOpenState: boolean;
  plazaSort: {};
  collection:number[]=[];

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

  public barChartOptionsSngl: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabelsSngl: Label[] = [];
  public barChartTypeSngl: ChartType = 'bar';
  public barChartLegendSngl = true;

  public barChartDataSngl: ChartDataSets[] = [ ];

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
          this.roads.forEach(road=>{
            this.barChartLabels.push(road.road_id);
            this.completed.push(parseInt(road.collected_amount));
            this.remaining.push(road.contract_amount-parseInt(road.collected_amount));});
            this.barChartData=[{data:this.completed, label: 'completed'},{data:this.remaining,label:'remaining'}];
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
  showPlazaChart(even:any){
    console.log("show function called", this.plazaSort[even['tab'].textLabel]);
    var road_id=even['tab'].textLabel;
    // var collection:number[];
    console.log(this.plazaSort[road_id],road_id);
    this.plazaSort[road_id].forEach(plaza => {
      this.barChartLabelsSngl.push(plaza.plaza_name);
      this.collection.push(plaza.total_collection);
    });
    this.barChartDataSngl=[{data:this.collection, label:'collection'}]
    // for (let plaza of this.plazaSort[road_id]){

    // }
  }
}
