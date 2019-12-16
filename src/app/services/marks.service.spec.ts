import { TestBed } from '@angular/core/testing';

import { MarksService } from './marks.service';

describe('MarksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarksService = TestBed.get(MarksService);
    expect(service).toBeTruthy();
  });
});
