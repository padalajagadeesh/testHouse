import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHousesComponent } from './create-houses.component';

describe('CreateHousesComponent', () => {
  let component: CreateHousesComponent;
  let fixture: ComponentFixture<CreateHousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHousesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
