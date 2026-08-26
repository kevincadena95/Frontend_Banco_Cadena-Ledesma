import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {

    private http = inject(HttpClient);
    private api = 'http://localhost:8080/api/usuarios';

    obtenerUsuarios() {
        return this.http.get<any[]>(this.api, {
            withCredentials: true
        });
    }

}