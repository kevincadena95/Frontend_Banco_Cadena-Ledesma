import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../service/auth';
import { UsuarioService } from '../../../service/usuario-service';


@Component({
  selector: 'app-dashboard-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css',
})
export class DashboardAdmin {

  private auth = inject(Auth);
  private usuarioService = inject(UsuarioService);
  private fb = inject(FormBuilder);
  usuarioAdmin = signal<any>(null);
  usuarios = signal<any[]>([]);
  editando = signal(false);
  usuarioEditandoId = signal<number | null>(null);

  formularioUsuario = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [''],
    rol: ['CLIENTE', Validators.required],
    saldo: [0, Validators.required]
  });

  ngOnInit() {
    this.obtenerPerfil();
    this.obtenerUsuarios();
  }

  obtenerPerfil() {
    this.auth.perfil().subscribe({
      next: (datos) => {
        this.usuarioAdmin.set(datos);
      }
    });

  }

  obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (datos) => {
        this.usuarios.set(datos);
      }
    });
  }

  nuevoUsuario() {
    this.editando.set(false);
    this.usuarioEditandoId.set(null);
    this.formularioUsuario.reset({
      nombre: '',
      email: '',
      password: '',
      rol: 'CLIENTE',
      saldo: 0
    });
  }

  editarUsuario(usuario: any) {
    this.editando.set(true);
    this.usuarioEditandoId.set(usuario.id);
    this.formularioUsuario.patchValue({
      nombre: usuario.nombre,
      email: usuario.email,
      password: '',
      rol: usuario.rol,
      saldo: usuario.saldo
    });

  }

  guardarUsuario() {

    if (this.formularioUsuario.invalid) {
      return;
    }

    if (this.editando()) {

      const id = this.usuarioEditandoId()!;
      this.usuarioService
        .actualizarUsuario(id, this.formularioUsuario.value)
        .subscribe({
          next: () => {
            this.obtenerUsuarios();
            this.nuevoUsuario();
          }
        });

    } else {

      this.usuarioService
        .crearUsuario(this.formularioUsuario.value)
        .subscribe({
          next: () => {
            this.obtenerUsuarios();
            this.nuevoUsuario();
          }
        });
    }
  }

  eliminarUsuario(id: number) {
    this.usuarioService.eliminarUsuario(id).subscribe({
      next: () => {
        this.obtenerUsuarios();
      }
    });
  }
}