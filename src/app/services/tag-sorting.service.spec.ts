import { TestBed, inject } from '@angular/core/testing';

import { TagSortingService } from './tag-sorting.service';

describe('TagSortingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TagSortingService]
    });
  });

  it('should be created', inject([TagSortingService], (service: TagSortingService) => {
    expect(service).toBeTruthy();
  }));
});
