import { IEstadoProceso } from "./IEstadoProceso";
import { Proceso } from "./Proceso";

export class EstadoBloqueado implements IEstadoProceso {
	avanzar(proceso: Proceso): void {
	}

	finalizar(proceso: Proceso): void {
	}
}