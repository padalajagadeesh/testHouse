import { Component, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertyfyService } from '../services/alertyfy.service';
import { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../services/common.service';
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

  title = 'otp';
  form: FormGroup;
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;
  constructor(
    private route: Router,
    private alertyfy: AlertyfyService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private commanservice: CommonService
  ) { }
  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.retUrl = params.get('retUrl');
    });
  }
  OnLogin(loginForm: NgForm) {
    console.log(loginForm,'39:::')
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
    this.MailOtpPopUP 
    this.loader = false;
    this.authService.ForgetgetData(ForgetForm.value);
    console.log(ForgetForm.value,'65::::')
    // this.authService.forgetUser.subscribe((res: any) => {
    //   const user = res;
    //   if (user) {
    //     this.commanservice.sendOtp(ForgetForm.value).subscribe((res)=>{
    //      this.mailotp = res.OTP;
    //     });
    //     this.alertyfy.Success('successfully Registeted....');
    //     // this.alertyfy.alert(user.Password, user.Username);
    //     this.ForegetFormsData = false;
    //   }
    //   else {
    //     this.alertyfy.Error();
    //   }
    // })
  }
  close() {
    this.ForegetFormsData = false;
  }
}
