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
      // file: ['',Validators.required] 1111,
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
    console.log(this.SignInForm_Data,'50::')
    console.log(this.signin.controls?.['Username'].value,'42::::',this.signin)

    this.SubmitForm = true;
    //  this.service.updateMango(this.signin.value)
    if(this.signin.status === 'VALID'){
      // console.log(this.signin.status)
      // let data:any = localStorage.getItem('data') || '[]';
      // this.register = JSON.parse(data);
      this.commonservice.updateRegisterData(this.signin.value).subscribe();
      console.log(this.register,'123',this.signin.controls?.['Username'].value);
     this.SignInForm_Data= this.register.push(this.signin.value);
      // localStorage.setItem('data',JSON.stringify(this.register));
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
        console.log(reader.result,'67---')
        this.signin.patchValue({
          file:reader.result,
        });
        console.log(file,'7000++')
      
      }
    }
  }

  //Password 
  onClick() {
    if (this.password=== 'password') {
      // this.show ?'fa-regular fa-eye-slash':'fa-regular fa-eye';
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
}
