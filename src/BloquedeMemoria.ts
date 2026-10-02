import {Proceso} from './Proceso';

export class BloquedeMemoria {
    private _incio: number;
    private _tamanio: number
    private _proceso: Proceso | null;

    constructor(inicio: number, tamanio: number) {
        this._incio = inicio;
        this._tamanio = tamanio;
        this._proceso = null;
    }

    asignarProceso(proceso: Proceso): void {
        this._proceso = proceso;
    }

    liberarProceso(): void {
        this._proceso = null;
    }

    get inicio(): number {
        return this._incio;
    }

    get tamanio(): number {
        return this._tamanio;
    }

    get proceso(): Proceso | null {
        return this._proceso;
    }
}