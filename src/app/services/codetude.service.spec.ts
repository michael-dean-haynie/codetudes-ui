import { TestBed, inject } from '@angular/core/testing';

import { CodetudeService } from './codetude.service';

describe('CodetudeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodetudeService],
    });
  });

  it('should be created', inject(
    [CodetudeService],
    (service: CodetudeService) => {
      expect(service).toBeTruthy();
    }
  ));
});
