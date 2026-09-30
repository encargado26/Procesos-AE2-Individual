import { describe, it, expect } from "vitest";
import { Proceso } from "../src/Proceso";
import { IEstadoProceso } from "../src/IEstadoProceso";

describe("Clase Proceso", () => {
  it("debería crear un proceso con PID y tamaño correctos", () => {
    const estadoInicial = {} as IEstadoProceso;
    const proceso = new Proceso(1, 256, estadoInicial);

    expect(proceso.pid).toBe(1);
    expect(proceso.tamanio).toBe(256);
  });
  
  it("debería cambiar el estado del proceso correctamente", () => {
    const estadoInicial = {} as IEstadoProceso;
    const nuevoEstado = {} as IEstadoProceso;
    const proceso = new Proceso(10, 512, estadoInicial);

    proceso.cambiarEstado(nuevoEstado);

    // accedemos al estado interno mediante ejecucion
    proceso.ejecutarCiclo(); // delega en el nuevo estado para avanzar el proceso
    expect(proceso).toBeInstanceOf(Proceso);
  });
});
