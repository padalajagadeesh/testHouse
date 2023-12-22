import { Component } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
import { loadApi } from '../store/house.action';
import { Store } from '@ngrx/store';
import { houseData } from '../store/house.selector';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent {
  storeArray: any = [];
  HouseArrayData: any = [];
  arrayfavData: any = [];
  constructor(private service: CommonService, private route: Router, private store: Store) { }
  data1: any = [];

   
  ngOnInit() {
    // this.store.dispatch(loadApi());
    this.service.UserLogin.subscribe((res: any) => {
      this.arrayfavData = res;
      console.log(this.arrayfavData, '111')
    });
    this.store.select(houseData).subscribe((res) => {
      console.log(res,'29:::::')
      res.map((val: any) => {
        // console.log(val.username, '28:::', val.selectFav && this.arrayfavData.Username == val.username)
        // if (val.selectFav && this.arrayfavData.Username == val.username) {
        // val.selectFav = true;
        if(val.selectFav && this.arrayfavData.Username == val.username){
          this.HouseArrayData.push(val);
          console.log(this.HouseArrayData.length,'31111',this.HouseArrayData)
        };
        //   if(val.selectFav){
        //   this.HouseArrayData.push(val);
        //   console.log(this.HouseArrayData.length,'31111')
        // };
      });
    });



    // this.service.getDBHouseData().subscribe((res) => {
    //   console.log(res, '17::::')
    // })
    // this.service.Favourite.subscribe((res) =>{
    //   this.storeArray = res
    // })
    // this.service.HouserentDetails.subscribe((res)=>{
    //   this.data1 = res;
    //   console.log(this.data1.products,'1111')
    // })
  }
  HomePage() {
    this.route.navigate(['House']);
  }
}


