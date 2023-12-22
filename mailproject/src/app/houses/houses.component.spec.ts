import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousesComponent } from './houses.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HousesComponent', () => {
  let component: HousesComponent;
  let fixture: ComponentFixture<HousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousesComponent ],
      imports:[HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be called ngOnit', () =>{
    component.ngOnInit()
  })
});
