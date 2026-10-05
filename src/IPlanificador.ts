import { Proceso } from "./Proceso";

export interface IPlanificador {
	agregarProceso(proceso: Proceso): void;

	obtenerProcesoActual(): Proceso | null;
}
