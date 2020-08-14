import { Component, OnInit } from '@angular/core';
import { DjangoHttpService } from 'src/app/services/django-http.service';
import { User } from 'src/app/models/userInterface';
import { Booth } from 'src/app/models/booth';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/models/transaction';
import { CustomTxn } from 'src/app/models/customTxns';
import { Rate } from 'src/app/models/rates';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
@Component({
  selector: 'app-plaza-dashboard',
  templateUrl: './plaza-dashboard.component.html',
  styleUrls: ['./plaza-dashboard.component.css']
})
export class PlazaDashboardComponent implements OnInit {
  to: any;

  constructor(private httpService: DjangoHttpService, public router: Router) { }
  plaza: User;
  booths: Booth[];
  txns: Array<CustomTxn> = [];
  rates: Rate;
  donutArray: [];
  carCount: number=0;
  boothWiseCollections=[];
  truckCount: number=0;
  busCount: number=0;
  lcvCount: number=0;
  numVehicles = 0;
  todaysCollection: number=0;
  uniqueBoothIds: any;
  public doughnutChartLabels: Label[] = ['cars', 'buses', 'trucks', 'lcvs'];
  public doughnutChartData: MultiDataSet = [
    [this.carCount, this.truckCount, this.busCount, this.lcvCount]
  ];
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{ticks: {beginAtZero: true}}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = this.uniqueBoothIds;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] =[
    {data: [], label: ''}
  ];

  public doughnutChartType: ChartType = 'doughnut';
  ngOnInit(): void {
    this.httpService.getProfile().subscribe(res => {
      if (res.plaza_id) {
        this.plaza = res;
        this.httpService.getBooths('plaza_id', this.plaza.plaza_id).subscribe(data => {
          this.booths = data;
          this.boothWiseCollections = this.booths.map(item => parseInt(item.total_collection));
          this.barChartData=[{
            data: this.boothWiseCollections,
            label: 'booth wise collection'
          }];
        });
        this.httpService.getTxns('plaza_id', this.plaza.plaza_id).subscribe(data => {
          this.txns = data;
          this.carCount = this.txns.filter((i) => i.vehicle_type=='car').length;
          this.busCount = this.txns.filter((i) => i.vehicle_type=='bus').length;
          this.truckCount = this.txns.filter((i) => i.vehicle_type=='truck').length;
          this.lcvCount = this.txns.filter((i) => i.vehicle_type=='LCV').length;
          console.log(this.carCount, this.busCount, this.truckCount, this.lcvCount);
          this.doughnutChartData = [
            [this.carCount, this.truckCount, this.busCount, this.lcvCount]
          ];

          this.uniqueBoothIds = Array.from(new Set(this.txns.map(item => item.booth_id.split('-')[3])));
          this.barChartLabels = this.uniqueBoothIds;
          const today = new Date();
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate()-1);
          console.log('today' ,today);
          
          const todaysTxns = this.txns.filter(item => {
            const current = new Date(item.created_at);
            // console.log(current);
            if(current <= today && current >yesterday){
              this.todaysCollection=this.todaysCollection+item.amount;
            }
            return current <= today && current >yesterday;
          });
          this.numVehicles = todaysTxns.length;        
          
          

        });
        this.httpService.getRates({ plaza_id: this.plaza.plaza_id}).subscribe(data => {
          this.rates = data;
        });
      }
    });
  }
  assignBooth() {
    this.router.navigate(['addbooth'], { state: {
      currentPlaza: this.plaza
    }});
  }

}
