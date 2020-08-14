import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/userInterface';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import { CookieService } from 'ngx-cookie-service';
import { Road } from '../models/road';
import { CookieUserPayload } from '../models/cookieUser';
import { Authority } from '../models/authority';
import { Plaza } from '../models/plaza';
import { Booth } from '../models/booth';
import { Rate } from '../models/rates';
import { Transaction } from '../models/transaction';
import { CustomTxn } from '../models/customTxns';

@Injectable({
  providedIn: 'root'
})
export class DjangoHttpService {
  token: string;
  head: HttpHeaders;
  authenticatedHead: HttpHeaders;
  baseURL = '//192.168.1.100:8080/';
  constructor(private http: HttpClient, private cookie: CookieService) {
    this.head = new HttpHeaders().set('access-control-allow-origin', this.baseURL);
  }
  signup(user: any): Observable<User> {
    return this.http.post<User>(this.baseURL + 'test/api/signup/', user, { headers: this.head });
  }
  login(user: any): Observable<User> {
    return this.http.post<User>(this.baseURL + 'test/api/login/', user, { headers: this.head });
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL + 'test/api/profile/', { headers: this.head });
  }
  getDecodedToken(): CookieUserPayload {
    let decodedToken: CookieUserPayload;
    const token = this.cookie.get('jwtToken');
    if (token !== null){
      try {
        decodedToken = JSON.parse(atob(token.split('.')[1]));
        // perform role based auth with decoded token user field.
        return decodedToken;
      } catch (err) {
        return err;
      }
    }
  }
  getToken() {
    return this.cookie.get('jwtToken');
  }
  getVehicles() {
    return this.http.get<Vehicle[]>(this.baseURL + 'test/api/getvehicle/', {
      headers: this.head.append('Authorization', 'Bearer ' + this.getToken())
    });
  }
  updateBalance(data: any) {
    return this.http.post<Vehicle>(this.baseURL + 'test/api/update_balance/', data, {
      headers: this.head.append('Authorization', 'Bearer ' + this.getToken())
    });
  }
  addNewVehicle(vehicle: any): Observable<Vehicle> {
    return this.http.post<Vehicle>(
      this.baseURL + 'test/api/addvehicle/',
      vehicle,
      { headers: this.head.append('Authorization', 'Bearer ' + this.getToken()) }
    );
  }
  getProfile() {
    return this.http.get<User>(this.baseURL + 'test/api/profile/',
    { headers: this.head.append('Authorization', 'Bearer ' + this.getToken())});
  }
  logout() {
    return this.http.post(this.baseURL + 'test/api/logout/',
    {},
    { headers: this.head.append('Authorization', 'Bearer ' + this.getToken())});
  }
  addNewRoad(data: any) {
    return this.http.post(
      this.baseURL + 'test/api/addroad/',
      data,
      { headers: this.head.append('Authorization', 'Bearer ' + this.getToken()) }
    );
  }
  getRoads(authorityId: string = ''): Observable<Road[]> {
    if (authorityId === '') {
      return this.http.get<Road[]>(
        this.baseURL + 'test/api/getroads/',
        { headers: this.head.append('Authorization', 'Bearer ' + this.getToken()) }
      );
    } else {
      const data = {
        authority_id: authorityId
      };
      return this.http.post<Road[]>(
        this.baseURL + 'test/api/getroads/',
        data,
        { headers: this.head.append('Authorization', 'Bearer ' + this.getToken()) }
      );
    }
  }
  addAuthority(data: any) {
    return this.http.post(
      this.baseURL + 'test/api/addauthority/',
      data,
      { headers: this.head.append('Authorization', 'Bearer ' + this.getToken()) }
    );
  }
  getAuthorities(): Observable<Authority[]> {
    return this.http.get<Authority[]>(
      this.baseURL + 'test/api/getauthority/',
      { headers: this.head.append('Authorization', 'Bearer ' + this.getToken()) }
    );
  }
  assignAuthority(data: any) {
    return this.http.post(
      this.baseURL + 'test/api/assignauthority/',
      data,
      { headers: this.head.append('Authorization', 'Bearer ' + this.getToken()) }
    );
  }
  addPlaza(data: any): Observable<Plaza> {
    return this.http.post<Plaza>(
      this.baseURL + 'test/api/addplaza/',
      data,
      { headers: this.head.append('Authorization', 'Bearer ' + this.getToken()) }
    );
  }
  getPlazas(filterBy: string = '', filterProperty: string = ''): Observable<Plaza[]> {
    if (filterBy === '') {
      return this.http.get<Plaza[]>(
        this.baseURL + 'test/api/getplaza/',
        { headers: this.head.append('Authorization', 'Bearer ' + this.getToken()) }
      );
    } else {
      const data = {
        filter_by: filterBy,
        filter_property: filterProperty
      };
      return this.http.post<Plaza[]>(
        this.baseURL + 'test/api/getplaza/',
        data,
        { headers: this.head.append('Authorization', 'Bearer ' + this.getToken()) }
      );
    }
  }
  getBooths(filterBy: string = '', filterProperty: string = ''): Observable<Booth[]> {
    if (filterBy === '') {
      return this.http.get<Booth[]>(
        this.baseURL + 'test/api/getbooth/',
        { headers: this.head.append('Authorization', 'Bearer ' + this.getToken()) }
      );
    } else {
      const data = {
        filter_by: filterBy,
        filter_property: filterProperty
      };
      return this.http.post<Booth[]>(
        this.baseURL + 'test/api/getbooth/',
        data,
        { headers: this.head.append('Authorization', 'Bearer ' + this.getToken()) }
      );
    }
  }

  addBooth(data: any): Observable<Booth> {
    return this.http.post<Booth>(
      this.baseURL + 'test/api/addbooth/',
      data,
      { headers: this.head.append('Authorization', 'Bearer ' + this.getToken()) }
    );
  }

  addRates(data: any): Observable<Rate> {
    return this.http.post<Rate>(
      this.baseURL + 'test/api/addrates/',
      data,
      { headers: this.head.append('Authorization', 'Bearer ' + this.getToken()) }
    );
  }

  getRates(data: any): Observable<Rate> {
    return this.http.post<Rate>(
      this.baseURL + 'test/api/getrates/',
      data,
      { headers: this.head.append('Authorization', 'Bearer ' + this.getToken()) }
    );
  }
  collectToll(data: any): Observable<Transaction>{
    return this.http.post<Transaction>(
      this.baseURL + 'test/api/collect/',
      data,
      { headers: this.head.append('Authorization', 'Bearer ' + this.getToken()) }
    );
  }
  getTxns(filterBy: string = '', filterProperty: string = ''): Observable<CustomTxn[]> {
    if (filterBy === '') {
      return this.http.get<CustomTxn[]>(
        this.baseURL + 'test/api/gettransactions/',
        { headers: this.head.append('Authorization', 'Bearer ' + this.getToken()) }
      );
    } else {
      const data = {
        filter_by: filterBy,
        filter_property: filterProperty
      };
      return this.http.post<CustomTxn[]>(
        this.baseURL + 'test/api/gettransactions/',
        data,
        { headers: this.head.append('Authorization', 'Bearer ' + this.getToken()) }
      );
    }
  }

  getRoadsfromBlockchain(): Observable<Road[]>{
    console.log("in services")
    return this.http.get<Road[]>(this.baseURL + "test/api/getchain/")
  }

  
}
