import { Component, inject, signal } from '@angular/core';
import { MovimientoService } from '../../../service/movimiento-service';

@Component({
  selector: 'app-movimientos-admin',
  imports: [],
  templateUrl: './movimientos-admin.html',
  styleUrl: './movimientos-admin.css',
})
export class MovimientosAdmin {

  private movimientoService = inject(MovimientoService);
  usuariosMovimientos = signal<any[]>([]);

  ngOnInit() {
    this.obtenerMovimientos();
  }

  obtenerMovimientos() {

    this.movimientoService.obtenerMovimientos().subscribe({
      next: (datos) => {
        console.log('MOVIMIENTOS ADMIN:', datos);
        const grupos: any = {};
        datos.forEach((movimiento: any) => {
          const usuario = movimiento.usuario;

          if (!grupos[usuario.id]) {
            grupos[usuario.id] = {
              usuario: usuario,
              movimientos: []
            };
          }
          grupos[usuario.id].movimientos.push(movimiento);
        });

        this.usuariosMovimientos.set(
          Object.values(grupos)
        );
      },

      error: (error) => {
        console.error(
          'Error al obtener movimientos:',
          error
        );
      }
    });
  }
}