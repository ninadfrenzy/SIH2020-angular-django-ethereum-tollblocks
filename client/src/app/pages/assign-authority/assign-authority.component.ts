import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Road } from 'src/app/models/road';
import { DjangoHttpService } from 'src/app/services/django-http.service';
import { Authority } from 'src/app/models/authority';
@Component({
  selector: 'app-assign-authority',
  templateUrl: './assign-authority.component.html',
  styleUrls: ['./assign-authority.component.css']
})
export class AssignAuthorityComponent implements OnInit {
  state: Observable<object>;
  road: Road;
  authorities: Authority[];
  authorityId: string;
  constructor(public activatedRoute: ActivatedRoute, private router: Router, private httpService: DjangoHttpService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    ).subscribe(data => {
      if (data.hasOwnProperty('road')) {
        this.road = data['road'];
      } else {
        this.router.navigateByUrl('dashboard');
      }
    });
    this.httpService.getAuthorities().subscribe(data => {
      this.authorities = data;
    });


  }
  assignNewAuthority() {
    const data = {
      road_id: this.road.road_id,
      authority_id: this.authorityId
    };
    this.httpService.assignAuthority(data).subscribe(res => {
      console.log(res);      
      document.getElementById('success').style.display = 'block';
      setTimeout(()=>{document.getElementById('success').style.display='none';this.router.navigateByUrl('dashboard')},2000);
    },
    err=>{
      document.getElementById('fail').style.display = 'block';
    });
  }
  removeNotification() {
    document.getElementById('fail').style.display = 'none';
    document.getElementById('success').style.display = 'none';
  }

}
