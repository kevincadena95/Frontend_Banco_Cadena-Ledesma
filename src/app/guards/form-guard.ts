import { CanDeactivateFn } from '@angular/router';
import { MovimientosFormCliente } from '../components/user/movimientos-form-cliente/movimientos-form-cliente';

export const formGuard: CanDeactivateFn<MovimientosFormCliente> = (
  component,
  currentRoute,
  currentState,
  nextState,
) => {
  if (component.nosPermiteSalir()) {
    confirm('¿Esta seguro que quieres salir de la pagina?, Se perderan los datos ingresados en el formulario')
    return true;
  }
  return true;
}