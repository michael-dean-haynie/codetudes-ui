import { TestBed, inject } from '@angular/core/testing';

import { AppStateService } from './app-state.service';

describe('appStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppStateService],
    });
  });

  it('should be created', inject(
    [AppStateService],
    (service: AppStateService) => {
      expect(service).toBeTruthy();
    }
  ));
});
