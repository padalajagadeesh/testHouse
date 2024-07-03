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
    this.service.UserLogin.subscribe((res: any) => {
      this.arrayfavData = res;
    });
    this.store.select(houseData).subscribe((res) => {
      res.map((val: any) => {
        if(val.selectFav && this.arrayfavData.Username == val.username){
          this.HouseArrayData.push(val);
        };
      });
    });
  }
  HomePage() {
    this.route.navigate(['House']);
  }
}


