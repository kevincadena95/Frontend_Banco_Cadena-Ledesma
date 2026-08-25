import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovimientosAdmin } from './movimientos-admin';

describe('MovimientosAdmin', () => {
  let component: MovimientosAdmin;
  let fixture: ComponentFixture<MovimientosAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimientosAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(MovimientosAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
