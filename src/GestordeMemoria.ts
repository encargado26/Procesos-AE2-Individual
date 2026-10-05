import { BloquedeMemoria } from "./BloquedeMemoria";
import { IPoliticadeAsignacion } from "./IPoliticadeAsignacion";
import { Proceso } from "./Proceso";

export class GestordeMemoria {

    private _bloques: BloquedeMemoria[];
    private _politica: IPoliticadeAsignacion;
    private _memoriaTotal: number;

    constructor(
        memoriaTotal: number,
        politica: IPoliticadeAsignacion
    ) {
        this._memoriaTotal = memoriaTotal;
        this._politica = politica;

        this._bloques = [
            new BloquedeMemoria(0, memoriaTotal)
        ];
    }

    asignarProceso(proceso: Proceso): void {

        const bloque =
            this._politica.seleccionarBloque(
                this._bloques,
                proceso
            );

        if (bloque === null) {
            return;
        }

        const espacioLibre =
            bloque.tamanio - proceso.tamanio;

        bloque.asignarProceso(proceso);

        bloque.actualizarTamanio(
            proceso.tamanio
        );

        const nuevoBloque =
            new BloquedeMemoria(
                bloque.inicio + proceso.tamanio,
                espacioLibre
            );

        this._bloques.push(
            nuevoBloque
        );
    }

    liberarProceso(proceso: Proceso): void {

        const bloque =
            this._bloques.find(
                bloque =>
                    bloque.proceso === proceso
            );

        bloque?.liberarProceso();
        this.fusionarBloquesLibres();
    }

    fusionarBloquesLibres(): void {

        if (this._bloques.length < 2) {
            return;
        }

        const bloquesOrdenados =
            [...this._bloques].sort(
                (a, b) => a.inicio - b.inicio
            );

        const bloquesFusionados: BloquedeMemoria[] = [];

        for (const bloque of bloquesOrdenados) {

            const ultimoBloque =
                bloquesFusionados[bloquesFusionados.length - 1];

            if (
                ultimoBloque &&
                ultimoBloque.proceso === null &&
                bloque.proceso === null &&
                ultimoBloque.inicio + ultimoBloque.tamanio === bloque.inicio
            ) {
                const bloqueFusionado =
                    new BloquedeMemoria(
                        ultimoBloque.inicio,
                        ultimoBloque.tamanio + bloque.tamanio
                    );

                bloquesFusionados[bloquesFusionados.length - 1] = bloqueFusionado;
                continue;
            }

            bloquesFusionados.push(bloque);
        }

        this._bloques = bloquesFusionados;
    }

    obtenerMemoriaLibre(): number {
    return this._bloques
        .filter(bloque => bloque.proceso === null)
        .reduce(
            (total, bloque) => total + bloque.tamanio,
            0
        );
}

    obtenerMayorBloqueLibre(): number {
        const tamaniosLibres = this._bloques
            .filter(bloque => bloque.proceso === null)
            .map(bloque => bloque.tamanio);

        return Math.max(0, ...tamaniosLibres);
    }

    obtenerOcupacionMemoria(): number {
        const memoriaOcupada =

        this._memoriaTotal - this.obtenerMemoriaLibre();

        return 100 * memoriaOcupada / this._memoriaTotal;
    }

    obtenerFragmentacionExterna(): number {
        const memoriaLibre = this.obtenerMemoriaLibre();
        const mayorBloqueLibre = this.obtenerMayorBloqueLibre();
        const existeMemoriaLibre = Number(memoriaLibre > 0);

        return existeMemoriaLibre * 100 * (
            1 - mayorBloqueLibre / Math.max(memoriaLibre, 1)
        );
    }

    get bloques(): BloquedeMemoria[] {
        return [...this._bloques];
    }

}
