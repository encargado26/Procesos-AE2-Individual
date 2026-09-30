import { Proceso } from "./Proceso";
import { IEstadoProceso } from "./IEstadoProceso";

export class EstadoSimulado implements IEstadoProceso {
	avanzar(proceso: Proceso): void {
	}

	finalizar(proceso: Proceso): void {
	}
}
