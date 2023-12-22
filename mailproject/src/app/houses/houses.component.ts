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
  selectdata: any='';
  array: any = [];
  amount: any='';
  bhkPrice: any;
  CountData: any;
  selectedProduct: any=[];
  filterBy:any;
  array1: any;
  array123: any=[];
  constructor(private http: HttpClient,private store:Store, private route: Router, private commonservice: CommonService) {
  }

  ngOnInit() {
    this.store.dispatch(loadApi());
    this.store.select(houseData).subscribe((res) => {
      this.HouseArrayData = res;
      this.array = res;
      console.log(this.array,'34:::')
    });

    // this.commonservice.getDBHouseData().subscribe((res:any)=>{
    //   // this.HouseArrayData = res;
    //   // this.array = res;
    //   console.log(this.array,'30::::')
    //   // this.array = res.filter((val:any) =>{
    //   //   this.array123.push(val);
    //   // });
    //   // console.log(res,'2911',this.array.AddressInfo.Address)
    //   // if(res && res.length){
    //   //   this.array = res;
    //   // }else{
    //   //   this.http.get('assets/Houses.json').subscribe((res: any) => {
    //   //      this.HouseArrayData = res.products;
    //   //     this.array = res.products;
    //   //     console.log(this.array,'34:::')
    //   //     this.commonservice.updateHouseData(this.array).subscribe()
    //   //     // console.log(this.array,'29:::')
    //   //   })
    //   // }
        
    //   // this.array.push(this.array.length + 1);
    //   // console.table(this.array)

    //   // // this.array = res.filter((val:any) =>{
    //   // //   return this.array.push(val);
    //   // //   console.log(val,'0213')
    //   // // });
    // })
    // this.commonservice.createHouseData.subscribe((res:any) =>{
    //   console.log(res,'41:::__');
    // })
  }

  GotoDetailsPage(a: any) {
    this.selectedProduct = a;
    this.route.navigate(['/House-Details',a._id]);
  }
  SearchFilter(){
    this.array = this.HouseArrayData.filter((user:any) => user.BasicInfo.BHK != user.BasicInfo.BHK);
    console.log(this.array,'65::::',this.HouseArrayData)
  }

  SelectDropDownData() {
    console.log(this.array,'1023::::',this.HouseArrayData)
    if(this.amount){
      let val1 =  Math.ceil(this.amount.split('-')[0]);
      let valu2 = Math.ceil(this.amount.split('-')[1]);
      this.array =  this.HouseArrayData.filter((val:any)=>{
        val.BasicInfo.BHK >= val1 && val.BasicInfo.BHK <= valu2 && val.BasicInfo.BHK == this.amount})
    }else{
      this.array = this.HouseArrayData.filter((val:any)=>  val.BasicInfo.BHK == this.selectdata);
    }
  }
  PriceList() {
    let val1 =  Math.ceil(this.amount.split('-')[0]);
    let valu2 = Math.ceil(this.amount.split('-')[1]);
    if(this.selectdata){
      let val1 =  Math.ceil(this.amount.split('-')[0]);
      let valu2 = Math.ceil(this.amount.split('-')[1]);
      console.log(valu2,'96::',val1)
      this.array =  this.HouseArrayData.filter((val:any)=> val.PriceInfo.Price >= val1 && val.PriceInfo.Price <= valu2 && val.BasicInfo.BHK == this.selectdata)
      console.log(this.array,'98::::')
    }else{
      this.array = this.HouseArrayData.filter((val:any)=> val.PriceInfo.Price >= val1 && val.PriceInfo.Price <= valu2);
      console.log('else part....', this.array )
    }
  }
}

