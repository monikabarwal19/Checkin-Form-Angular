import { TestBed } from '@angular/core/testing';

import { CheckinformService } from './checkinform.service';

describe('CheckinformService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckinformService = TestBed.get(CheckinformService);
    expect(service).toBeTruthy();
  });
});
