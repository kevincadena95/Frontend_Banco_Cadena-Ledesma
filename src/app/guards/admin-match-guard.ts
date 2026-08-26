import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { Auth } from '../service/auth';
import { map } from 'rxjs';

export const adminMatchGuard: CanMatchFn = (route, segments) => {
  
  const auth = inject(Auth);
  return auth.perfil().pipe(
    map((res: any) => res.roles.includes('ROLE_ADMINISTRADOR'))
  );
};
