import { TestBed } from '@angular/core/testing';

import { GuardGuard } from './guard.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GuardGuard', () => {
  let guard: GuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],

    });
    guard = TestBed.inject(GuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
