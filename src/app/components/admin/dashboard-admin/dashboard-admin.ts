import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../../service/auth';
import { UsuarioService } from '../../../service/usuario-service';

@Component({
  selector: 'app-dashboard-admin',
  imports: [],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css',
})

export class DashboardAdmin {
  private auth = inject(Auth);
  private usuarioService = inject(UsuarioService);
  usuarioAdmin = signal<any>(null);
  usuarios = signal<any[]>([]);

  ngOnInit() {
    this.obtenerPerfil();
    this.obtenerUsuarios();
  }

  obtenerPerfil() {
    this.auth.perfil().subscribe({

      next: (datos) => {
        this.usuarioAdmin.set(datos);
        console.log('ADMIN:', datos);
      },

      error: (error) => {
        console.error('Error al obtener el administrador:', error);
      }
    });
  }

  obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (datos) => {
        this.usuarios.set(datos);
        console.log('USUARIOS:', datos);
      },

      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }
}