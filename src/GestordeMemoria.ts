import { BloqueDeMemoria } from "./BloquedeMemoria";
import { IPoliticadeAsignacion } from "./IPoliticadeAsignacion";
import { Proceso } from "./Proceso";

export class GestorDeMemoria {

    private _bloques: BloqueDeMemoria[];
    private _politica: IPoliticadeAsignacion;

    constructor(
        memoriaTotal: number,
        politica: IPoliticadeAsignacion
    ) {
        this._politica = politica;

        this._bloques = [
            new BloqueDeMemoria(0, memoriaTotal)
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
            new BloqueDeMemoria(
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
    }

    fusionarBloquesLibres(): void {
        if (this._bloques.length < 2) {
            return;
        }

        this._bloques.sort((a, b) => a.inicio - b.inicio);

        let i = 0;

        while (i < this._bloques.length - 1) {
            const bloqueActual = this._bloques[i];
            const siguienteBloque = this._bloques[i + 1];

            const bloquesLibresAdyacentes =
                bloqueActual.proceso === null &&
                siguienteBloque.proceso === null &&
                bloqueActual.inicio + bloqueActual.tamanio === siguienteBloque.inicio;

            if (!bloquesLibresAdyacentes) {
                i++;
                continue;
            }

            bloqueActual.actualizarTamanio(
                bloqueActual.tamanio + siguienteBloque.tamanio
            );

            this._bloques.splice(i + 1, 1);
        }
    }

    get bloques(): BloqueDeMemoria[] {
        return this._bloques;
    }
}