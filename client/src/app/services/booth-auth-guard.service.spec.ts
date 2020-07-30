import { TestBed } from '@angular/core/testing';

import { BoothAuthGuardService } from './booth-auth-guard.service';

describe('BoothAuthGuardService', () => {
  let service: BoothAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoothAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
