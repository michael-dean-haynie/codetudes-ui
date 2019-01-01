import { TestBed, inject } from '@angular/core/testing';

import { CodetudeSortingService } from './codetude-sorting.service';

describe('SortingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodetudeSortingService],
    });
  });

  it('should be created', inject(
    [CodetudeSortingService],
    (service: CodetudeSortingService) => {
      expect(service).toBeTruthy();
    }
  ));
});
