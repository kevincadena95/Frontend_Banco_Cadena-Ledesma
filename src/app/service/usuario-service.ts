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

    crearUsuario(usuario: any) {
        return this.http.post(
            this.api,
            usuario,
            {withCredentials: true}
        );
    }

    actualizarUsuario(id: number, usuario: any) {
        return this.http.put(
            `${this.api}/${id}`,
            usuario,
            {withCredentials: true}
        );
    }

    eliminarUsuario(id: number) {
        return this.http.delete(
            `${this.api}/${id}`,
            {withCredentials: true}
        );
    }

}