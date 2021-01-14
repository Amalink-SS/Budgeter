import { TestBed } from '@angular/core/testing';

import { AddItemServiceService } from './add-item-service.service';

describe('AddItemServiceService', () => {
  let service: AddItemServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddItemServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
