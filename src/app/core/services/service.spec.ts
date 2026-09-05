import { TestBed } from '@angular/core/testing';
import { EldenRingService } from './service';

describe('EldenRing', () => {
  let service: EldenRingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EldenRingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
