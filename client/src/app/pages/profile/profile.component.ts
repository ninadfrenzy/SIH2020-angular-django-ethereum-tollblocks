import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/userInterface';
import { DjangoHttpService } from 'src/app/services/django-http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = null;
  constructor(private httpService: DjangoHttpService) {

  }

  ngOnInit(): void {
    // for testing without backend make a user and put it in localstorage.
    // comment it out before running with backend.
    // const dummyUser = {
    //   id: 11,
    //   first_name: 'snehal',
    //   last_name: 'naikare',
    //   email: 'snehaldon@bhaaai.com',
    //   user_type: 'customer',
    //   mobile_number: '1234567890',
    //   password: 'random hashed value very long',
    //   token: 'asjldhasjdhasjdhajsdnajnsdajsndlkjansd'
    // };
    // localStorage.setItem('user', JSON.stringify(dummyUser));
    // actual code begins
    // this.httpService.getProfile().subscribe(data => {
    //   this.user = data;
    // });
  }

}
