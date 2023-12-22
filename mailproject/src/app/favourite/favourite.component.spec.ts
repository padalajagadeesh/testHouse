import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteComponent } from './favourite.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FavouriteComponent', () => {
  let component: FavouriteComponent;
  let fixture: ComponentFixture<FavouriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteComponent ],
      imports: [ HttpClientTestingModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
