import { TestBed } from '@angular/core/testing';

import { AuthorityAuthGuardService } from './authority-auth-guard.service';

describe('AuthorityAuthGuardService', () => {
  let service: AuthorityAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorityAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
