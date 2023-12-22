import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseDetailsComponent } from './house-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AlertyfyService } from '../services/alertyfy.service';

describe('HouseDetailsComponent', () => {
  let component: HouseDetailsComponent;
  let fixture: ComponentFixture<HouseDetailsComponent>;
  let service: CommonService;
  let mockRoute:jasmine.SpyObj<Router>;
  let mockActiveRouter:ActivatedRoute;
  let alertfy:AlertyfyService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseDetailsComponent ],
      schemas:[NO_ERRORS_SCHEMA],
      imports:[HttpClientTestingModule,RouterTestingModule,FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // service = jasmine.createSpyObj('CommonService',['getJsonData']);
    // service.getJsonData.and.returnValue({} as any)
    service = TestBed.inject(CommonService)
    // alertfy.Success.and.returnValue('Otp Successfull...' as any)
    mockActiveRouter = TestBed.inject(ActivatedRoute)
    alertfy = TestBed.inject(AlertyfyService)

    component = new HouseDetailsComponent(
      service,
      mockActiveRouter,
      mockRoute,
      alertfy
    )
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be called ngOnInit',() =>{
    component.ngOnInit();
    service.getJsonData.and.returnValue([] as any)
  })
});
