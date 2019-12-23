import { TestBed } from '@angular/core/testing';

import { PreviewCheckinService } from './preview-checkin.service';

describe('PreviewCheckinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreviewCheckinService = TestBed.get(PreviewCheckinService);
    expect(service).toBeTruthy();
  });
});
