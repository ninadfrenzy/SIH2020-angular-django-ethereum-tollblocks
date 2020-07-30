import { TestBed } from '@angular/core/testing';

import { GenericAuthGuardService } from './generic-auth-guard.service';

describe('GenericAuthGuardService', () => {
  let service: GenericAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
