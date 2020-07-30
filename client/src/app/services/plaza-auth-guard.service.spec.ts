import { TestBed } from '@angular/core/testing';

import { PlazaAuthGuardService } from './plaza-auth-guard.service';

describe('PlazaAuthGuardService', () => {
  let service: PlazaAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlazaAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
