import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../../service/auth';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-dashboard-cliente',
  styleUrl: './dashboard-cliente.css',
  templateUrl: './dashboard-cliente.html',
})
export class DashboardCliente {

  private auth = inject(Auth);
  usuario = signal<any>(null);

  ngOnInit() {
    this.auth.perfil().subscribe({
      next: (datos) => {
        console.log('DATOS PERFIL:', datos);
        this.usuario.set(datos);
      },

      error: (error) => {
        console.error('ERROR PERFIL:', error);
      }
    });
  }
}
