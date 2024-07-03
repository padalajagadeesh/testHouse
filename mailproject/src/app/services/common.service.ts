import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService implements OnInit {
  data: any=[];
  private apiUrl = 'http://192.168.10.14:3000';
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.getHouseData(eval);
    this.Favourite.subscribe(res=>{
      this.data = res;
    }) 
  }
  HouserentDetails = new BehaviorSubject([]);
  Favourite = new BehaviorSubject([]);
  UserLogin = new BehaviorSubject('');

  //MY ADDS BehavaiorsSubject...
  myadds = new BehaviorSubject([]);
  updatemyadds(myadd:any){
    this.myadds.next(myadd)
  }

  // House Creating Data:
  createHouseData = new BehaviorSubject([]);
  getCreateHouseData(data: any) {
    this.createHouseData.next(data);
  }
  // <><><><>.

  favouriteData(val: any) {
    this.data = [...this.data , ...val]
     this.Favourite.next(this.data);
  }

  getHouseData(val: any) {
    this.HouserentDetails.next(val)
  }
  getJsonData() {
    return this.http.get('assets/Houses.json');
  }
  // userLoginData
  UserBehavior(data: any) {
    this.UserLogin.next(data)
  }
  // <<< DB register Data >>>

  registerData() {
    return this.http.get('http://192.168.10.14:3000/api/register');
  }
  updateRegisterData(data: any) {
    return this.http.post('http://192.168.10.14:3000/api/update/register', data);
  }

  //<<< Upadte House Data >>

  getDBHouseData() {
    return this.http.get('http://192.168.10.14:3000/api/house');
  }
  updateHouseData(data: any) {
    return this.http.post('http://192.168.10.14:3000/api/update/house', data);
  }

  //Fav Data

  updateFavData(data: any) {
    return this.http.post('http://192.168.10.14:3000/api/update/favdata', data);
  }

  // Forget Password post call....
  sendOtp(to: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-otp`, { to });
  } 
}
