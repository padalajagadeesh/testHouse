import { Component } from '@angular/core';
import { CommonService } from '../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertyfyService } from '../services/alertyfy.service';
import { Store } from '@ngrx/store';
import { loadApi } from '../store/house.action';
import { houseData } from '../store/house.selector';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.scss']
})
export class HouseDetailsComponent {
  amount: any = 'Select Price';
  HouseArrayData: any = [];
  DetailsArray: any = [];
  productID: any;
  MainData: any = [];
  data: any;
  overAllData: any = [];
  array: any = [];
  selectFav: Boolean = false;
  statusClass = 'not-active';
  data1: any = [];
  selectArray: any = [];
  FavouritesArry: any = [];
  FavouritesData: boolean = false;
  FrtarrayData: any = [];
  popup: boolean = false;
  error: boolean = true;
  searchValue = '';
  OTP1: any;
  OTP2: any;
  OTP3: any;
  OTP4: any;
  otpmodal: boolean = false;
  ffff: any;
  SelectedBHK: any = [];

  constructor(private service: CommonService, private store: Store, private alertfy: AlertyfyService, private route: ActivatedRoute, private router: Router) {
    this.service.Favourite.subscribe((res) => {
      this.FavouritesArry = res;
    })
    this.route.params.subscribe(
      params => {
        this.productID = params['products']
      }
    );
  }

  ngOnInit() {
    this.store.select(houseData).subscribe((res) => {
      this.MainData = res;
      this.MainData.filter((val: any) => {
        if (val._id == this.productID) {
          this.DetailsArray.push(val);
        }
      })
    })
    this.store.select(houseData).subscribe((res) => {
      this.data = JSON.parse(JSON.stringify(res));
      this.data.filter((val: any) => {
        this.DetailsArray.forEach((v: any) => {
          if (val.BasicInfo.BHK === v.BasicInfo.BHK) {
            this.SelectedBHK.push(val);
          }
        })
      })
    })
  }
  PriceList() {
    let val1 = Number(this.amount.split('-')[0]);
    let valu2 = Number(this.amount.split('-')[1]);
    if (this.amount) {
      this.array = this.overAllData.filter((res: any) => res.Rent >= val1 && res.Rent <= valu2)
    } else {
      alert('Please Select Flat')
    }
  }
  setActiveClass() {
    this.statusClass = 'active';
  }
  GetSelectFave() {
    this.selectFav = !this.selectFav;
  }

  TotalDataFav(a: any) {
    this.SelectedBHK.forEach((val: any, i: any) => {
      if (a == i && !val.selectFav) {
        this.SelectedBHK[i]['selectFav'] = true;
        this.service.updateFavData({ username: val.username, selectFav: true }).subscribe();
      } else if (a === i && val.selectFav) {
        this.SelectedBHK[i]['selectFav'] = false;
        this.service.updateFavData({ username: val.username, selectFav: false }).subscribe();

      }
    })
  }
  GetOwnerDetails() {
    this.otpmodal = true;
  }
  sendOtp() {
    this.alertfy.Success('Otp Successfull...')
    this.otpmodal = false;
  }
  onlyNumberKey(e: any) {
    if ((e.keyCode >= 48 && e.keyCode <= 57)) {
      return true;
    } else {
      return false;
    }
  }
  SubmitData() {

  }
  SubmitNumber() {
    if (this.searchValue.length) {
      this.error = true;
    } else {
      this.error = false;
    }
  }
}
