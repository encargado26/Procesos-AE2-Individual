import { IPlanificador } from "./IPlanificador";
import { Proceso } from "./Proceso";

export class PlanificadorRoundRobin
implements IPlanificador {

	private _cola: Proceso[];

	constructor() {
		this._cola = [];
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

        this._cola.push(
            proceso
        );

    }

	}

}