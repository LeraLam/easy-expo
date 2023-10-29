import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { expoResolver } from './expo.resolver';

describe('expoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => expoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
