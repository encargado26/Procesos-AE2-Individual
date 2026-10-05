import { IEstadoProceso } from "./IEstadoProceso";
import { Proceso } from "./Proceso";

export class EstadoListo implements IEstadoProceso {
	avanzar(proceso: Proceso): void {
	}

	finalizar(proceso: Proceso): void {
	}
}