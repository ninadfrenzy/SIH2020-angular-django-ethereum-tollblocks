import { Component, OnInit } from '@angular/core';
import { DjangoHttpService } from 'src/app/services/django-http.service';
import { Road } from 'src/app/models/road';

@Component({
  selector: 'app-blockchain-dashboard',
  templateUrl: './blockchain-dashboard.component.html',
  styleUrls: ['./blockchain-dashboard.component.css']
})
export class BlockchainDashboardComponent implements OnInit {

  constructor( private httpService: DjangoHttpService) { }



  roadsFromBlockchain = []

  ngOnInit(): void {
    this.httpService.getRoadsfromBlockchain()
    .subscribe((data:Road[]) =>{
      console.log(data)
      this.roadsFromBlockchain = data;
    })

  
  }

  getRoadsFromBlockchain(){
    this.httpService.getRoadsfromBlockchain()
    .subscribe((data:Road[]) =>{
      console.log(data)
      this.roadsFromBlockchain = data;
    })

  }
}
