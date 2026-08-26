import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Auth } from '../service/auth';
import { catchError, map, of } from 'rxjs';

export const clienteMatchGuard: CanMatchFn = (route, segments) => {

  const router = inject(Router);
  const auth = inject(Auth);

  return auth.perfil().pipe(
    map((res: any) => {
      return res.rol === 'CLIENTE';
    }),

    catchError(() => {
      alert("Para acceder debes Iniciar Sesión primero");
      router.navigate(['login']);
      return of(false);
    })
  );




};