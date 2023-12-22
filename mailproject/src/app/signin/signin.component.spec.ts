import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninComponent ],
      imports:[ReactiveFormsModule,HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return if email value does not exist', () => {
    component.name;
    const mockSignin = {
      get: jasmine.createSpy('get').and.returnValue('Username')
    };
    expect(mockSignin.get).toBeDefined()
  });
  it('should return if email value does not exist', () => {
    component.email;
    const mockSignin = {
      get: jasmine.createSpy('get').and.returnValue('Email')
    };
    expect(mockSignin.get).toBeDefined()
  });
  it('should return if email value does not exist', () => {
    component.password;
    const mockSignin = {
      get: jasmine.createSpy('get').and.returnValue('Password')
    };
    expect(mockSignin.get).toBeDefined()
  });
  it('should execute the if block when signin status is VALID', () => {
    component.signin.status === 'VALID';
    spyOn(localStorage, 'setItem');
    component.SigninForm(); // Replace with the actual method or function containing the given code
    // expect(localStorage.setItem).toHaveBeenCalledWith('form-data', JSON.stringify(component.arr));
    // expect(console.log).toHaveBeenCalledWith(component.signin.value, '21:::');
  });

  it('should skip the if block when signin status is not VALID', () => {
    component.signin.status === 'INVALID';
    spyOn(localStorage, 'setItem');
  });
   it('should execute the if block when signin status is VALID', () => {
      component.signin.status == 'VALID';
      spyOn(localStorage, 'setItem');
      component.SigninForm();
      // expect(localStorage.setItem).toHaveBeenCalledWith('form-data', JSON.stringify(component.arr));
  });
  it('should skip the if block when signin status is not VALID', () => {
      component.signin.status === 'INVALID';
      spyOn(localStorage, 'setItem');
      component.SigninForm();
  
      expect(localStorage.setItem).not.toHaveBeenCalled();
  });
  });




