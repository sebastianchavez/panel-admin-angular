import { TestBed } from '@angular/core/testing';

import { EasycookService } from './easycook.service';

describe('EasycookService', () => {
  let service: EasycookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EasycookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
