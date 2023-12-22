import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.inject(AuthService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('if User is valid ', () =>{
    service.isUserLoggedIn();
    expect(service['isloggedIn']).toBeFalsy();
  })
  it('if User is LogOuted ', () =>{
    service.isUserLogOut();
    expect(service['isloggedIn']).toBeFalsy();
  })
  
  it('should be get the forms values geting the localStorage', () =>{
    const setItem = spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake((key) => key);  
    const result = service.addUsers(setItem);
    expect(service['isloggedIn']).toBe(true);
    expect(localStorage.getItem).toHaveBeenCalledWith({Username:"test",Password:"123"} as any)
    expect(setItem).toHaveBeenCalledWith('data', result);
  })
  it('should be forget the password', () =>{
    const setItem = spyOn(localStorage,'setItem').and.returnValue('data' as any);
    spyOn(localStorage,'getItem').and.callFake((k:any)=>(k));
  //  const getItems =  spyOn(localStorage,'getItem');
    const result= service.ForgetgetData(setItem);
    // expect(result.Username).toEqual(setItem);
    expect(setItem).toHaveBeenCalledWith(result,'data');
  });
});



