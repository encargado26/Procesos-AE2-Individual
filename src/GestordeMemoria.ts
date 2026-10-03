import { BloqueDeMemoria } from "./BloquedeMemoria";
import { IPoliticadeAsignacion } from "./IPoliticadeAsignacion";
import { Proceso } from "./Proceso";

export class GestorDeMemoria {
	private _bloques: BloqueDeMemoria[];
	private _politica: IPoliticadeAsignacion;

	constructor(memoriaTotal: number, politica: IPoliticadeAsignacion) {
		this._politica = politica;
		this._bloques = [new BloqueDeMemoria(0, memoriaTotal)];
	}

	asignarProceso(proceso: Proceso): void {
		const bloque = this._politica.seleccionarBloque(this._bloques, proceso);

		if (bloque === null) {
			return;
		}

		const espacioLibre = bloque.tamanio - proceso.tamanio;
		const inicioEspacioLibre = bloque.inicio + proceso.tamanio;

		bloque.tamanio = proceso.tamanio;
		bloque.proceso = proceso;

		if (espacioLibre > 0) {
			const bloqueLibre = new BloqueDeMemoria(inicioEspacioLibre, espacioLibre);
			const indice = this._bloques.indexOf(bloque);
			this._bloques.splice(indice + 1, 0, bloqueLibre);
		}
	}
}