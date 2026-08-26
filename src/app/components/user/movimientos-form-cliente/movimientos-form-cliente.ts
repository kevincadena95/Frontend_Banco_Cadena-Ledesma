import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../service/auth';
import { MovimientoService } from '../../../service/movimiento-service';

@Component({
  selector: 'app-movimientos-form-cliente',
  imports: [ReactiveFormsModule],
  templateUrl: './movimientos-form-cliente.html',
  styleUrl: './movimientos-form-cliente.css',
})
export class MovimientosFormCliente {

  private fb = inject(FormBuilder);
  private movimientoService = inject(MovimientoService);
  private auth = inject(Auth);
  usuario = signal<any>(null);
  mensaje = signal('');
  error = signal('');

  formularioMovimiento = this.fb.group({
    tipo: ['RETIRO', Validators.required],
    monto: [0, [Validators.required, Validators.min(0.01)]],
    usuarioDestinoId: [null as number | null],
    descripcion: ['', Validators.required]
  });

  ngOnInit() {
    this.auth.perfil().subscribe({
      next: (datos) => {
        this.usuario.set(datos);
      }
    });
  }

  realizarOperacion() {
    if (this.formularioMovimiento.invalid) {
      return;
    }

    const tipo = this.formularioMovimiento.value.tipo;
    const monto = this.formularioMovimiento.value.monto;
    const descripcion = this.formularioMovimiento.value.descripcion;

    if (tipo === 'RETIRO') {
      const movimiento = {
        tipo: 'RETIRO',
        monto: monto,
        descripcion: descripcion,
        usuario: {
          id: this.usuario().id
        }
      };

      this.movimientoService.retirar(movimiento).subscribe({

        next: () => {
          this.error.set('');
          this.mensaje.set('Retiro realizado correctamente');
        },

        error: (error) => {
          this.error.set(
            error.error?.error || 'No se pudo realizar el retiro'
          );
        }

      });

    }

    if (tipo === 'TRANSFERENCIA') {

      const transferencia = {
        usuarioDestinoId:
          this.formularioMovimiento.value.usuarioDestinoId,

        monto: monto,
        descripcion: descripcion
      };

      this.movimientoService.transferir(transferencia).subscribe({

        next: () => {
          this.error.set('');
          this.mensaje.set('Transferencia realizada correctamente');
        },

        error: (error) => {
          this.error.set(
            error.error?.error || 'No se pudo realizar la transferencia'
          );
        }

      });

    }

  }

}