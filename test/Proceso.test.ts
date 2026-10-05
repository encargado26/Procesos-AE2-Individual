import { describe, expect, it } from "vitest";
import { Proceso } from "../src/Proceso";
import { IEstadoProceso } from "../src/IEstadoProceso";
import { EstadoSimulado } from "../src/EstadoSimulado";

describe("Clase Proceso", () => {

  it("debería crear un proceso con PID y tamaño correctos", () => {
    const estadoInicial =
      new EstadoSimulado() as IEstadoProceso;

    const proceso = new Proceso(
      1,
      256,
      estadoInicial
    );

    expect(proceso.pid).toBe(1);
    expect(proceso.tamanio).toBe(256);
  });

  it("debería crear un proceso con tiempo total de CPU", () => {
    const proceso = new Proceso(
      1,
      256,
      new EstadoSimulado(),
      10
    );

    expect(proceso.tiempoTotalCpu).toBe(10);
  });

  it("debería iniciar con CPU restante igual al tiempo total", () => {
    const proceso = new Proceso(
      1,
      256,
      new EstadoSimulado(),
      10
    );

    expect(proceso.cpuRestante).toBe(10);
  });

  it("debería iniciar con quantum consumido en cero", () => {
    const proceso = new Proceso(
      1,
      256,
      new EstadoSimulado(),
      10
    );

    expect(proceso.quantumConsumido).toBe(0);
  });

  it("debería iniciar con tiempo de bloqueo en cero", () => {
    const proceso = new Proceso(
      1,
      256,
      new EstadoSimulado(),
      10
    );

    expect(proceso.tiempoBloqueoRestante).toBe(0);
  });

  it("debería cambiar el estado del proceso correctamente", () => {
    const estadoInicial = new EstadoSimulado();
    const nuevoEstado = new EstadoSimulado();

    const proceso = new Proceso(
      10,
      512,
      estadoInicial,
      5
    );

    proceso.cambiarEstado(nuevoEstado);

    expect(proceso.estado).toBe(nuevoEstado);
    expect(() => proceso.ejecutarCiclo()).not.toThrow();
  });

  it("debería consumir una unidad de CPU", () => {
    const proceso = new Proceso(
      1,
      256,
      new EstadoSimulado(),
      10
    );

    proceso.consumirCpu();

    expect(proceso.cpuRestante).toBe(9);
  });

  it("no debería permitir que la CPU restante sea negativa", () => {
    const proceso = new Proceso(
      1,
      256,
      new EstadoSimulado(),
      1
    );

    proceso.consumirCpu();
    proceso.consumirCpu();

    expect(proceso.cpuRestante).toBe(0);
  });

  it("debería incrementar el quantum consumido", () => {
    const proceso = new Proceso(
      1,
      256,
      new EstadoSimulado(),
      10
    );

    proceso.consumirQuantum();

    expect(proceso.quantumConsumido).toBe(1);
  });

  it("debería reiniciar el quantum consumido", () => {
    const proceso = new Proceso(
      1,
      256,
      new EstadoSimulado(),
      10
    );

    proceso.consumirQuantum();
    proceso.consumirQuantum();
    proceso.reiniciarQuantum();

    expect(proceso.quantumConsumido).toBe(0);
  });

  it("debería establecer el tiempo de bloqueo", () => {
    const proceso = new Proceso(
      1,
      256,
      new EstadoSimulado(),
      10
    );

    proceso.establecerTiempoBloqueo(3);

    expect(proceso.tiempoBloqueoRestante).toBe(3);
  });

  it("debería reducir el tiempo de bloqueo", () => {
    const proceso = new Proceso(
      1,
      256,
      new EstadoSimulado(),
      10
    );

    proceso.establecerTiempoBloqueo(3);
    proceso.reducirTiempoBloqueo();

    expect(proceso.tiempoBloqueoRestante).toBe(2);
  });

  it("no debería permitir que el tiempo de bloqueo sea negativo", () => {
    const proceso = new Proceso(
      1,
      256,
      new EstadoSimulado(),
      10
    );

    proceso.establecerTiempoBloqueo(1);
    proceso.reducirTiempoBloqueo();
    proceso.reducirTiempoBloqueo();

    expect(proceso.tiempoBloqueoRestante).toBe(0);
  });

});