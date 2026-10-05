import { describe, expect, it } from "vitest";
import { PlanificadorRoundRobin } from "../src/PlanificadorRoundRobin";
import { Proceso } from "../src/Proceso";
import { EstadoSimulado } from "../src/EstadoSimulado";

describe("Clase PlanificadorRoundRobin", () => {
	it("debería iniciar sin procesos", () => {
		const planificador = new PlanificadorRoundRobin();

		expect(planificador.obtenerProcesoActual()).toBeNull();
	});

	it("debería agregar un proceso a la cola", () => {
		const planificador = new PlanificadorRoundRobin();
		const proceso = new Proceso(1, 256, new EstadoSimulado());

		planificador.agregarProceso(proceso);

		expect(planificador.obtenerProcesoActual()).toBe(proceso);
	});
    
});