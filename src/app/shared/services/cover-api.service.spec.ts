import { TestBed } from '@angular/core/testing';

import { CoverApiService } from './cover-api.service';

describe('CoverApiService', () => {
  let service: CoverApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoverApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
