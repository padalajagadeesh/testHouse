import { Component } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-myadds',
  templateUrl: './myadds.component.html',
  styleUrls: ['./myadds.component.scss']
})
export class MyaddsComponent {
  myaddsData: any=[];
  
  constructor(private commonservice:CommonService){}

  ngOnInit(){
    this.commonservice.myadds.subscribe((res)=>{
      this.myaddsData= res;
    })
  }
}
