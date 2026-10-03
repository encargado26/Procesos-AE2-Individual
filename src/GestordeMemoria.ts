import { BloqueDeMemoria } from "./BloquedeMemoria";
import { IPoliticadeAsignacion } from "./IPoliticadeAsignacion";

export class GestorDeMemoria {
	private _bloques: BloqueDeMemoria[];
	private _politica: IPoliticadeAsignacion;

	constructor(memoriaTotal: number, politica: IPoliticadeAsignacion) {
		this._politica = politica;
		this._bloques = [new BloqueDeMemoria(0, memoriaTotal)];
	}

	get bloques(): BloqueDeMemoria[] {
		return this._bloques;
	}
}