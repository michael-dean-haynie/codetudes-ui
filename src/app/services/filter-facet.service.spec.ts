import { TestBed, inject } from '@angular/core/testing';

import { FilterFacetService } from './filter-facet.service';

describe('FilterFacetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterFacetService]
    });
  });

  it('should be created', inject([FilterFacetService], (service: FilterFacetService) => {
    expect(service).toBeTruthy();
  }));
});
