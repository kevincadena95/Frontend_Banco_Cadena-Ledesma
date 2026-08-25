import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class Auth {

    private user = 'usuario';
    private admin = 'admin';
    private password = '12345';

    entrar(usuario: string, contraseña: string): boolean {

        if ((this.user === usuario || this.admin === usuario) && this.password === contraseña) {
            localStorage.setItem('userAuth', usuario)
            return true;
        } else {
            return false;
        }
    }


    logut() {
        return localStorage.removeItem('userAuth')
    }

    estarLogeado(): boolean {
        return localStorage.getItem('userAuth') !== null;

    }
}