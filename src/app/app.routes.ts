import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { DashboardCliente } from './components/user/dashboard-cliente/dashboard-cliente';
import { MovimientosCliente } from './components/user/movimientos-cliente/movimientos-cliente';
import { MovimientosFormCliente } from './components/user/movimientos-form-cliente/movimientos-form-cliente';
import { UsuariosAdmin } from './components/admin/usuarios-admin/usuarios-admin';
import { MovimientosAdmin } from './components/admin/movimientos-admin/movimientos-admin';
import { clienteMatchGuard } from './guards/cliente-match-guard';
import { adminMatchGuard } from './guards/admin-match-guard';

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },

    { path: 'dashboard', component: DashboardCliente, },
    { path: 'movimientos', component: MovimientosCliente, },
    { path: 'depositos-retiros', component: MovimientosFormCliente,  },

    { path: 'dashboard-admin', component: DashboardCliente, },
    { path: 'movimientos-admin', component: MovimientosAdmin, },

    { path: '**', redirectTo: 'login' }

];