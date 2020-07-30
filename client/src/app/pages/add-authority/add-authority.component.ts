import { Component, OnInit } from '@angular/core';
import { Authority } from 'src/app/models/authority';
import { DjangoHttpService } from 'src/app/services/django-http.service';

@Component({
  selector: 'app-add-authority',
  templateUrl: './add-authority.component.html',
  styleUrls: ['./add-authority.component.css']
})
export class AddAuthorityComponent implements OnInit {
  authorities: Authority[];
  authorityName: string;
  authorityEmail: string;
  authorityID: string;
  password: string;
  constructor(private httpService: DjangoHttpService) { }

  ngOnInit(): void {
    // dummy data
    // show only name id collection email on card
    this.getAuthorities();

  }

  addNewAuthority() {
    const data = {
      name: this.authorityName,
      email: this.authorityEmail,
      password: this.password,
      // authority_id: this.authorityID
    };
    this.httpService.addAuthority(data).subscribe(
      res => {
        console.log(res);
        this.getAuthorities();
      },
      err => {
        console.log(err);

      },
      () => {
        console.log('done');

      }
    );
  }
  getAuthorities() {
    this.httpService.getAuthorities().subscribe(ath => {
      this.authorities = ath;
      this.authorityID = 'ATH' + (this.authorities.length + 10).toString();
    });
  }
}
