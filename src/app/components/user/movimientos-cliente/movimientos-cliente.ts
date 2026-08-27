import { Component, inject, signal } from '@angular/core';
import { MovimientoService } from '../../../service/movimiento-service';
import { formatearFecha } from '../../../utils/formato';


@Component({
  selector: 'app-movimientos-cliente',
  imports: [],
  templateUrl: './movimientos-cliente.html',
  styleUrl: './movimientos-cliente.css',
})
export class MovimientosCliente {

  private movimientoService = inject(MovimientoService);
  movimientos = signal<any[]>([]);
  formatearFecha = formatearFecha;

  ngOnInit() {
    this.obtenerMovimientos();
  }

  obtenerMovimientos() {
    this.movimientoService.obtenerMovimientos().subscribe({
      next: (datos) => {
        console.log('MOVIMIENTOS:', datos);
        this.movimientos.set(datos);
      },
      error: (error) => {
        console.error('Error al obtener movimientos:', error);
      }
    });

  }

}