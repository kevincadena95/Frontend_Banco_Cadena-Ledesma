import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MovimientoService {

    private http = inject(HttpClient);
    private api = 'http://192.168.137.1:8080/api/movimientos';

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

    crearMovimiento(movimiento: any) {
        return this.http.post(
            this.api,
            movimiento,
            {withCredentials: true}
        );
    }

    actualizarMovimiento(id: number, movimiento: any) {
        return this.http.put(
            `${this.api}/${id}`,
            movimiento,
            {withCredentials: true}
        );
    }

    eliminarMovimiento(id: number) {
        return this.http.delete(
            `${this.api}/${id}`,
            {withCredentials: true}
        );
    }
}