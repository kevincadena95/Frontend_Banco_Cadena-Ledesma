import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovimientosCliente } from './movimientos-cliente';

describe('MovimientosCliente', () => {
  let component: MovimientosCliente;
  let fixture: ComponentFixture<MovimientosCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimientosCliente],
    }).compileComponents();

    fixture = TestBed.createComponent(MovimientosCliente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
