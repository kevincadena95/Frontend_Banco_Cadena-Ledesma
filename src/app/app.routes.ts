import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { DashboardCliente } from './components/user/dashboard-cliente/dashboard-cliente';
import { MovimientosCliente } from './components/user/movimientos-cliente/movimientos-cliente';
import { MovimientosFormCliente } from './components/user/movimientos-form-cliente/movimientos-form-cliente';
import { MovimientosAdmin } from './components/admin/movimientos-admin/movimientos-admin';
import { DashboardAdmin } from './components/admin/dashboard-admin/dashboard-admin';
import { clienteMatchGuard } from './guards/cliente-match-guard';
import { adminMatchGuard } from './guards/admin-match-guard';
import { formGuard } from './guards/form-guard';

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },

    { path: 'dashboard', component: DashboardCliente, canMatch:[clienteMatchGuard] },
    { path: 'movimientos', component: MovimientosCliente, canMatch:[clienteMatchGuard]},
    { path: 'depositos-retiros', component: MovimientosFormCliente, canMatch:[clienteMatchGuard], canDeactivate: [formGuard]},

    { path: 'dashboard', component: DashboardAdmin, canMatch:[adminMatchGuard] },
    { path: 'movimientos', component: MovimientosAdmin, canMatch:[adminMatchGuard]  },

    { path: '**', redirectTo: 'login' }

];