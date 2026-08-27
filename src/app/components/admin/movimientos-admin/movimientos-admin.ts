import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovimientoService } from '../../../service/movimiento-service';
import { UsuarioService } from '../../../service/usuario-service';
import { formatearFecha } from '../../../utils/formato';

@Component({
  selector: 'app-movimientos-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './movimientos-admin.html',
  styleUrl: './movimientos-admin.css',
})
export class MovimientosAdmin {

  private movimientoService = inject(MovimientoService);
  private usuarioService = inject(UsuarioService);
  private fb = inject(FormBuilder);
  formatearFecha = formatearFecha;

  usuariosMovimientos = signal<any[]>([]);
  usuarios = signal<any[]>([]);
  editando = signal(false);
  movimientoEditandoId = signal<number | null>(null);

  formularioMovimiento = this.fb.group({
    usuarioId: [null as number | null, Validators.required],
    tipo: ['DEPOSITO', Validators.required],
    monto: [0, [Validators.required, Validators.min(0.01)]],
    descripcion: ['', Validators.required]
  });

  ngOnInit() {
    this.obtenerMovimientos();
    this.obtenerUsuarios();
  }

  obtenerMovimientos() {
    this.movimientoService.obtenerMovimientos().subscribe({
      next: (datos) => {
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

        this.usuariosMovimientos.set(Object.values(grupos));
      },

      error: (error) => {
        console.error('Error al obtener movimientos:', error);
      }
    });
  }

  obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (datos) => {
        this.usuarios.set(datos);
      },

      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }

  nuevoMovimiento() {
    this.editando.set(false);
    this.movimientoEditandoId.set(null);

    this.formularioMovimiento.reset({
      usuarioId: null,
      tipo: 'DEPOSITO',
      monto: 0,
      descripcion: ''
    });
  }

  editarMovimiento(movimiento: any) {
    this.editando.set(true);
    this.movimientoEditandoId.set(movimiento.id);

    this.formularioMovimiento.patchValue({
      usuarioId: movimiento.usuario.id,
      tipo: movimiento.tipo,
      monto: movimiento.monto,
      descripcion: movimiento.descripcion
    });
  }

  guardarMovimiento() {
    if (this.formularioMovimiento.invalid) {
      return;
    }

    const movimiento = {
      tipo: this.formularioMovimiento.value.tipo,
      monto: this.formularioMovimiento.value.monto,
      descripcion: this.formularioMovimiento.value.descripcion,
      usuario: {
        id: this.formularioMovimiento.value.usuarioId
      }
    };

    if (this.editando()) {
      const id = this.movimientoEditandoId()!;

      this.movimientoService.actualizarMovimiento(id, movimiento).subscribe({
        next: () => {
          this.obtenerMovimientos();
          this.nuevoMovimiento();
        },

        error: (error) => {
          console.error('Error al actualizar movimiento:', error);
        }
      });

    } else {

      this.movimientoService.crearMovimiento(movimiento).subscribe({
        next: () => {
          this.obtenerMovimientos();
          this.nuevoMovimiento();
        },

        error: (error) => {
          console.error('Error al crear movimiento:', error);
        }
      });
    }
  }

  eliminarMovimiento(id: number) {
    this.movimientoService.eliminarMovimiento(id).subscribe({
      next: () => {
        this.obtenerMovimientos();
      },

      error: (error) => {
        console.error('Error al eliminar movimiento:', error);
      }
    });
  }
}