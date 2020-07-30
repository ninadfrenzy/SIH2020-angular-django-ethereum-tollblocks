import { TestBed } from '@angular/core/testing';

import { DjangoHttpService } from './django-http.service';

describe('DjangoHttpService', () => {
  let service: DjangoHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DjangoHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
