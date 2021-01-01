import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setObjest() | getObject() | test cases', (DoneFn) => {
    const object = {test : 'changed vlaue'};
    const actual = service.setObject('test',object);
    const expected = service.getObject('test').then((val)=>{
      expect(val).toEqual(object);DoneFn();
    });
  });

  it('removeItem() | removes item from db', (DoneFn) =>{
    const object = {test : 'changed vlaue'};
    const actual = service.setObject('test',object);
    service.getObject('test').then((val)=>{
      console.log('the value is',val);DoneFn();
    });
    service.removeItem('test').then((val) => {
      expect(val).toEqual(undefined);
      DoneFn();
    });
  });

  it('clear() | flushes storage', (DoneFn) => {
    const object = {test : 'changed vlaue'};
    const actual = service.setObject('test',object);
    service.getObject('test').then((val)=>{
      console.log('the value is',val);DoneFn();
    });
    service.clear().then((val) => {
      expect(val).toEqual(undefined);DoneFn();
    });
  })
});
