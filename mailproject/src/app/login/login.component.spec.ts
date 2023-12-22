import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SigninComponent } from '../signin/signin.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { LoaderComponent } from '../loader/loader.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service:AuthService;
  let routing:Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ,LoaderComponent],
      imports:[ReactiveFormsModule,RouterTestingModule,RouterTestingModule,FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [{path: 'signin', component: SigninComponent},
          {path: 'home', component: SigninComponent}]
        )
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      providers:[AuthService]
    })
    .compileComponents();
    // service = jasmine.createSpyObj('AuthService',['addUsers']);
    fixture = TestBed.createComponent(LoginComponent);
    service = TestBed.inject(AuthService)
    routing = TestBed.inject(Router)
    component = fixture.componentInstance;
    fixture.detectChanges();
    // (service as any).addUsers.and.returnValue({Username:'hello',Password:'123'});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should be open the Login page `OnLogin`', () => {
  //   const mockngForm: NgForm = {
  //     value:{
  //       Login_Username:'dummy',
  //       Login_Password:'123'
  //     }
  //   } as NgForm;
  //   component.OnLogin(mockngForm);
  //   const addUsersSpy = spyOn(service, 'addUsers').and.returnValue(true);
  //   expect(addUsersSpy).toHaveBeenCalledWith(mockngForm.value);
  //   // (service as any).addUsers.and.returnValue({Login_Username:'',Login_Password:''})

    
  // })
  describe('LoginComponent', () => {
    it('should call addUsers method of AuthService with login user is successfully added', () => {
      const addUsersSpy = spyOn(service, 'addUsers').and.returnValue(true);
      const ngFormMock: NgForm = {
        value: {
        },
      } as NgForm;  
      component.OnLogin(ngFormMock);
      expect(addUsersSpy).toHaveBeenCalledWith(ngFormMock.value);
    });
  
    // it('should call addUsers method of AuthService with login form value and display error message if user is not added', () => {
    //   const addUsersSpy = spyOn(authService, 'addUsers').and.returnValue(false);
    //   const ngFormMock: NgForm = {
    //     value: {
    //       // Set the properties of the ngForm mock to simulate a valid login form value
    //     },
    //   } as NgForm;
    //   const errorSpy = spyOn(component.alertyfy, 'Error');
  
    //   component.OnLogin(ngFormMock);
  
    //   expect(addUsersSpy).toHaveBeenCalledWith(ngFormMock.value);
    //   expect(errorSpy).toHaveBeenCalled();
    // });
  });
  
  // it('should be called ngOnInit', () => {
  //   component.ngOnInit();
  //   component.login.controls['Username'].setValue('');
  //   component.login.controls['Password'].setValue('')
  //   expect(component.login).toBe(component.login)
  //   expect(component.login).toEqual([{username:''},{Password:''}] as any);
  // })
  // it('should be called LoginForm', () =>{
  //   component.LoginForm();
  //   expect(component.LoginForm).toBeDefined();
  // });
  // it('should be navigate to LoginPage', () => {
  //   component.SigninForm();
  // })
});
