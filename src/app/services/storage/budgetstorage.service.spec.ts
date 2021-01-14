import { TestBed } from '@angular/core/testing';

import { BudgetstorageService } from './budgetstorage.service';

describe('BudgetstorageService', () => {
  let service: BudgetstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
