import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})


export class MovimientoService {

    private http = inject(HttpClient);
    private api = 'http://localhost:8080/api/movimientos';

    obtenerMovimientos() {
        return this.http.get<any[]>(this.api, {
            withCredentials: true
        });
    }

    retirar(movimiento: any) {
        return this.http.post(
            this.api,
            movimiento,
            {withCredentials: true}
        );
    }

    transferir(datos: any) {
        return this.http.post(
            `${this.api}/transferencia`,
            datos,
            {withCredentials: true}
        );
    }
}