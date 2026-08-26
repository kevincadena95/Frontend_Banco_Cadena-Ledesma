import { TestBed } from '@angular/core/testing';
import { MovimientoService } from '../service/movimiento-service';

describe('MovimientoService', () => {
  let service: MovimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
