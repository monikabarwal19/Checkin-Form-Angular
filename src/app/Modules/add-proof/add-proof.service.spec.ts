import { TestBed } from '@angular/core/testing';

import { AddProofService } from './add-proof.service';

describe('AddProofService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddProofService = TestBed.get(AddProofService);
    expect(service).toBeTruthy();
  });
});
