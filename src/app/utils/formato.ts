export function formatearFecha(fecha: string): string {
    if (!fecha) {
        return '';
    }

    const [fechaParte, horaParte] = fecha.split('T');
    const [anio, mes, dia] = fechaParte.split('-');
    const hora = horaParte ? horaParte.slice(0, 5) : '';

    return `${dia}/${mes}/${anio} ${hora}`;
}
