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

    get bloques(): BloqueDeMemoria[] {
        return this._bloques;
    }
}