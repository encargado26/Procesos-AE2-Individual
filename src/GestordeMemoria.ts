import { BloquedeMemoria } from "./BloquedeMemoria";
import { IPoliticadeAsignacion } from "./IPoliticadeAsignacion";
import { Proceso } from "./Proceso";

export class GestordeMemoria {

    private _bloques: BloquedeMemoria[];
    private _politica: IPoliticadeAsignacion;

    constructor(
        memoriaTotal: number,
        politica: IPoliticadeAsignacion
    ) {
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

    get bloques(): BloquedeMemoria[] {
        return this._bloques;
    }
}