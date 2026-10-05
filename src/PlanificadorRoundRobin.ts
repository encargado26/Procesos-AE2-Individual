import { IPlanificador } from "./IPlanificador";
import { Proceso } from "./Proceso";

export class PlanificadorRoundRobin
implements IPlanificador {

	private _cola: Proceso[];
	private _quantum: number;
	private _cambiosDeContexto: number;

	constructor(quantum: number = 2) {
		this._cola = [];
		this._quantum = quantum;
		this._cambiosDeContexto = 0;
	}

	agregarProceso(
		proceso: Proceso
	): void {

		this._cola.push(
			proceso
		);
	}

	obtenerProcesoActual():
		Proceso | null {

		return this._cola[0] ?? null;
	}

	obtenerProcesos(): Proceso[] {

    return this._cola;

	}

	rotarProceso(): void {
		const proceso =
		
		this._cola.shift();
		
		if (proceso) {
		this._cola.push(proceso);
		this._cambiosDeContexto++;
		}
	}

	cantidadDeProcesos(): number {

		return this._cola.length;

	}

	get quantum(): number {

		return this._quantum;

	}

	get cambiosDeContexto(): number {
	
		return this._cambiosDeContexto;
	
	}

}