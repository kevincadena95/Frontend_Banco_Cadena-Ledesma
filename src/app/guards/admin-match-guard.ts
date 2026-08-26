import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Auth } from '../service/auth';
import { catchError, map, of } from 'rxjs';

export const adminMatchGuard: CanMatchFn = (route, segments) => {

  const auth = inject(Auth);
  const router = inject(Router);

  return auth.perfil().pipe(
    map((res: any) => {
      return res.rol === 'ADMINISTRADOR';
    }),

    catchError(() => {
      alert("Para acceder debes Iniciar Sesión primero");
      router.navigate(['login']);
      return of(false);
    })
  );
  
};