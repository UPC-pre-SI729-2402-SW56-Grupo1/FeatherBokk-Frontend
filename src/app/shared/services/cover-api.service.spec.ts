import { TestBed } from '@angular/core/testing';

import { EventDataService } from './http-common.service';

describe('CoverApiService', () => {
  let service: EventDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
