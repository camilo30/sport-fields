import { TestBed } from '@angular/core/testing';

import { TypesOfService } from './types-of.service';

describe('TypesOfService', () => {
  let service: TypesOfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypesOfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
