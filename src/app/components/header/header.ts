import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../service/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  auth = inject(Auth);
  private router = inject(Router);

  ngOnInit() {
    this.auth.perfil().subscribe({
      next: () => this.auth.sesionActiva.set(true),
      error: () => this.auth.sesionActiva.set(false)
    });
  }

  cerrarSesion() {
    this.auth.logout().subscribe({
      next: () => {
        this.auth.sesionActiva.set(false);
        this.router.navigate(['/login']);
      }
    });
  }
}
