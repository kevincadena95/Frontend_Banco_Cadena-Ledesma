import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { DashboardCliente } from './components/user/dashboard-cliente/dashboard-cliente';
import { MovimientosCliente } from './components/user/movimientos-cliente/movimientos-cliente';
import { MovimientosAdmin } from './components/admin/movimientos-admin/movimientos-admin';
import { MovimientosFormCliente } from './components/user/movimientos-form-cliente/movimientos-form-cliente';
import { UsuariosAdmin } from './components/admin/usuarios-admin/usuarios-admin';

export const routes: Routes = [



    { path: 'login', component: Login },

    { path: 'dashboard', component: DashboardCliente },
    { path: 'dashboard', component: UsuariosAdmin },

    { path: 'movimientos', component: MovimientosCliente },
    { path: 'movimientos', component: MovimientosAdmin },

    { path: 'movimientos-operacion', component: MovimientosFormCliente },


    { path: '*', component: Login },

    




];
