import { TestBed } from '@angular/core/testing';

import { MinistryAuthGuardService } from './ministry-auth-guard.service';

describe('MinistryAuthGuardService', () => {
  let service: MinistryAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinistryAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
