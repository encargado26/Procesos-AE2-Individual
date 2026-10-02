import {BloquedeMemoria} from "./BloquedeMemoria";
import {Proceso} from "./Proceso";

export interface IPoliticadeAsignacion {
    seleccionarBloque(
        bloques: BloquedeMemoria[], 
        proceso: Proceso
    ): BloquedeMemoria | null;
}