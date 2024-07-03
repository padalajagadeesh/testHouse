import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { Store } from '@ngrx/store';
import { loadApi } from '../store/house.action';
import { houseData } from '../store/house.selector';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss']
})
export class HousesComponent {

  HouseArrayData: any = [];
  selectdata: any = '';
  array: any = [];
  amount: any = '';
  bhkPrice: any;
  CountData: any;
  selectedProduct: any = [];
  filterBy: any;
  array1: any;
  array123: any = [];
  constructor(private http: HttpClient, private store: Store, private route: Router, private commonservice: CommonService) {
  }

  ngOnInit() {
    this.store.dispatch(loadApi());
    this.store.select(houseData).subscribe((res) => {
      this.HouseArrayData = res;
      this.array = res;
    });
  }

  GotoDetailsPage(a: any) {
    this.selectedProduct = a;
    this.route.navigate(['/House-Details', a._id]);
  }
  SearchFilter() {
    this.HouseArrayData.filter((user: any) => {
      this.array = user
      console.log(user,'404::',this.array)
    });
    console.log(this.array, '4333::::', this.filterBy,)
  }

  SelectDropDownData() {
    if (this.amount) {
      let val1 = Math.ceil(this.amount.split('-')[0]);
      let valu2 = Math.ceil(this.amount.split('-')[1]);
      this.array = this.HouseArrayData.filter((val: any) => {
        val.BasicInfo.BHK >= val1 && val.BasicInfo.BHK <= valu2 && val.BasicInfo.BHK == this.amount
      })
    } else {
      this.array = this.HouseArrayData.filter((val: any) => val.BasicInfo.BHK == this.selectdata);
    }
  }
  PriceList() {
    let val1 = Math.ceil(this.amount.split('-')[0]);
    let valu2 = Math.ceil(this.amount.split('-')[1]);
    if (this.selectdata) {
      let val1 = Math.ceil(this.amount.split('-')[0]);
      let valu2 = Math.ceil(this.amount.split('-')[1]);
      this.array = this.HouseArrayData.filter((val: any) => val.PriceInfo.Price >= val1 && val.PriceInfo.Price <= valu2 && val.BasicInfo.BHK == this.selectdata)
    } else {
      this.array = this.HouseArrayData.filter((val: any) => val.PriceInfo.Price >= val1 && val.PriceInfo.Price <= valu2);
    }
  }
}

