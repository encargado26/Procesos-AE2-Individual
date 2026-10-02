import {BloquedeMemoria} from "./BloquedeMemoria";
import {Proceso} from "./Proceso";
import {IPoliticadeAsignacion} from "./IPoliticadeAsignacion";

export class FirstFit implements IPoliticadeAsignacion {
    seleccionarBloque(
        bloques: BloquedeMemoria[], 
        proceso: Proceso
    ): BloquedeMemoria | null {
        return (
            bloques.find(
                bloque => 
                    bloque.proceso === null &&
                    bloque.tamanio >= proceso.tamanio
            ) ?? null
        );      
    }
}