import { TestBed } from '@angular/core/testing';

import { ClerkService } from './clerk.service';

describe('ClerkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClerkService = TestBed.get(ClerkService);
    expect(service).toBeTruthy();
  });
});
