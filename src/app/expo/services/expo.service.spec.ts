import { TestBed } from '@angular/core/testing';

import { ExpoService } from './expo.service';

describe('ExpoService', () => {
  let service: ExpoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
