import { IEstadoProceso } from "./IEstadoProceso";
import { Proceso } from "./Proceso";

export class EstadoEjecutando implements IEstadoProceso {

	avanzar(proceso: Proceso): void {

	}

	finalizar(proceso: Proceso): void {

	}
    
}