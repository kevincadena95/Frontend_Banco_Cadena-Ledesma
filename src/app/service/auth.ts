import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class Auth {

    private http = inject(HttpClient);

    private api = 'http://localhost:8080/api/auth';

    login(email: string, password: string) {

        return this.http.post(
            `${this.api}/login`,
            {
                email: email,
                password: password
            },
            {
                withCredentials: true
            }
        );
    }

    logout() {
        return this.http.post(
            `${this.api}/logout`,
            {},
            {
                withCredentials: true
            }
        );
    }

    perfil() {
        return this.http.get(
            `${this.api}/perfil`,
            {
                withCredentials: true
            }
        );
    }
}