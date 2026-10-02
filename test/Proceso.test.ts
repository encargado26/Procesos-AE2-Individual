import { describe, it, expect } from "vitest";
import { Proceso } from "../src/Proceso";
import { IEstadoProceso } from "../src/IEstadoProceso";
import { EstadoSimulado } from "../src/EstadoSimulado";

describe("Clase Proceso", () => {
  it("debería crear un proceso con PID y tamaño correctos", () => {
    const estadoInicial = new EstadoSimulado() as IEstadoProceso;
    const proceso = new Proceso(1, 256, estadoInicial);

    expect(proceso.pid).toBe(1);
    expect(proceso.tamanio).toBe(256);
  });

  it("debería cambiar el estado del proceso correctamente", () => {
    const estadoInicial = new EstadoSimulado();
    const nuevoEstado = new EstadoSimulado();
    const proceso = new Proceso(10, 512, estadoInicial);

    proceso.cambiarEstado(nuevoEstado);

    expect(() => proceso.ejecutarCiclo()).not.toThrow();
  });
});