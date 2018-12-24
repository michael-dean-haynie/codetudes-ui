import { TestBed, inject } from '@angular/core/testing';

import { FilterStateService } from './filter-state.service';

describe('FilterStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterStateService]
    });
  });

  it('should be created', inject([FilterStateService], (service: FilterStateService) => {
    expect(service).toBeTruthy();
  }));
});
