import { Proceso } from './Proceso';

export class BloqueDeMemoria {
	private _inicio: number;
	private _tamanio: number;
	private _proceso: Proceso | null;

	constructor(inicio: number, tamanio: number) {
		this._inicio = inicio;
		this._tamanio = tamanio;
		this._proceso = null;
	}

	asignarProceso(proceso: Proceso): void {
		this._proceso = proceso;
	}

	liberarProceso(): void {
		this._proceso = null;
	}

	actualizarTamanio(nuevoTamanio: number): void {
		this._tamanio = nuevoTamanio;
	}

	get inicio(): number {
		return this._inicio;
	}

	get tamanio(): number {
		return this._tamanio;
	}

	get proceso(): Proceso | null {
		return this._proceso;
	}
}