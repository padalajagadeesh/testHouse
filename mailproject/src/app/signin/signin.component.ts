import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertyfy from 'alertifyjs';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';
import { Store } from '@ngrx/store';
import { registerApiData } from '../store/house.selector';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  'signin':FormGroup<any>;
  SubmitForm=false;
  
  emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  register:any[]=[];
  SignInForm_Data: any;
  wwe: any;
  raw: any;
  password:any;

  show = false;

  constructor(private fb:FormBuilder,private route:Router , private service : AuthService,
    private store: Store, private commonservice :CommonService){}
  ngOnInit(){
    this.signin = this.fb.group({
      Username:['',Validators.required],
      Email:['',Validators.compose([Validators.required,Validators.pattern(this.emailRegEx)])],
      Password: ['', Validators.compose([Validators.required,Validators.minLength(3)])]
    });
    //password hide or show....
    this.password = 'password'; 
  }
  get name(){
    return this.signin.get('Username')
  }
  get email(){
    return this.signin.get('Email')
  }
  get passwordd(){
    return this.signin.get('Password')
  }
  SigninForm(){
    this.SubmitForm = true;
    if(this.signin.status === 'VALID'){
      this.commonservice.updateRegisterData(this.signin.value).subscribe();
     this.SignInForm_Data= this.register.push(this.signin.value);
      this.route.navigate(['login'])
      alertyfy.success('successfully Registeted....');
    }
    else{
      alertyfy.error('please kindly proper Details...')
    }
  }
  //Image Uploaded....
  uploadFile(event:any) {
    let reader = new FileReader(); 
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.signin.patchValue({
          file:reader.result,
        });      
      }
    }
  }

  //Password 
  onClick() {
    if (this.password=== 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
}
