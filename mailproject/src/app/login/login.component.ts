import { Component, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertyfyService } from '../services/alertyfy.service';
import { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../services/common.service';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { Store } from '@ngrx/store';
import { registerApiData } from '../store/house.selector';
// import * as alertyfy from 'alertifyjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  login!: FormGroup;
  FormsData: any;
  storeValue: any;
  loader: boolean = false;
  ForegetFormsData: boolean = false;
  retUrl: any;
  MailOtpPopUP: boolean = false;
  mailotp: any;
  Otpmtk: boolean = false;
  otpdata: any;

  title = 'otp';
  'form': FormGroup;
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;
  RegPassword: any;
  RegUserName: any;
  constructor(
    private route: Router,
    private alertyfy: AlertyfyService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private commanservice: CommonService,
    private store: Store,
  ) { }
  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.retUrl = params.get('retUrl');
    });
  }
  OnLogin(loginForm: NgForm) {
    console.log(loginForm, '39:::')
    this.authService.addUsers(loginForm.value)
    this.authService.userData.subscribe((res: any) => {
      const user = res
      if (user) {
        this.loader = true;
        this.commanservice.UserBehavior(user)
        setTimeout(() => {
          if (this.retUrl != null) {
            this.route.navigate([this.retUrl]);
          } else {
            this.route.navigate(['House']);
          }
          this.alertyfy.Success('successfully Registeted....');
        }, 1000)
      } else {
        this.alertyfy.Error();
      }
    })
  }
  ForgetPassword(loginForm: NgForm) {
    console.log('11111')
    this.ForegetFormsData = true;
    // this.otpmodal =true;
  }
  
  Forget(ForgetForm: NgForm) {
    // this.MailOtpPopUP 
    this.loader = false;
    this.ForegetFormsData = false;
    this.Otpmtk = true;
   
    // this.authService.ForgetgetData(ForgetForm.value);
    this.store.select(registerApiData).subscribe((res: any) => {
      console.log(res,'81::::')
      const user = res.find((res:any)=> res.Email === ForgetForm.value.Login_Username);
      if (user?.Email) {
        this.commanservice.sendOtp(ForgetForm.value).subscribe((res)=>{
         this.mailotp = res.OTP;
         this.RegPassword = user.Password;
         this.RegUserName = user.Username
         console.log(this.mailotp,'otp')
        });
        this.alertyfy.Success('successfully Registeted....');
        // this.alertyfy.alert(user.Password, user.Username);
        this.ForegetFormsData = false;
      }
      else {
        this.alertyfy.Error();
      }
    })
  }
  // OTP Functionality...
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
  };

  handeOtpChange(value: string[]): void {
  }

  handleFillEvent(value: string): void {
    this.otpdata = value;
    console.log(value, '21');
  }
  submitotp() {
    if( this.mailotp === this.otpdata){
      this.Otpmtk = false;
      this.alertyfy.alert(`Password: ${this.RegPassword}`, this.RegUserName);
    }else{
      this.alertyfy.Error();
    }
  }
  close() {
    this.ForegetFormsData = false;
  }
}
