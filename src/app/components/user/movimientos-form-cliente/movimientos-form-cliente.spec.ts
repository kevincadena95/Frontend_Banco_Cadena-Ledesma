import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovimientosFormCliente } from './movimientos-form-cliente';

describe('MovimientosFormCliente', () => {
  let component: MovimientosFormCliente;
  let fixture: ComponentFixture<MovimientosFormCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimientosFormCliente],
    }).compileComponents();

    fixture = TestBed.createComponent(MovimientosFormCliente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
