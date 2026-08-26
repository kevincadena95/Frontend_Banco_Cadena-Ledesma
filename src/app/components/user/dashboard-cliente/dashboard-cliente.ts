import { Component, inject } from '@angular/core';
import { Auth } from '../../../service/auth';

@Component({
  imports: [],
  selector: 'app-dashboard-cliente',
  styleUrl: './dashboard-cliente.css',
  templateUrl: './dashboard-cliente.html',
})
export class DashboardCliente {

  private auth = inject(Auth);
  usuario: any;

  ngOnInit() {
    this.auth.perfil().subscribe({
      next: (datos) => {
        console.log('DATOS PERFIL:', datos);
        this.usuario = datos;
      },

      error: (error) => {
        console.error('ERROR PERFIL:', error);
      }
    });
  }
}
