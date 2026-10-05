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

	it("debería mantener el primer proceso agregado como proceso actual", () => {
		const planificador = new PlanificadorRoundRobin();

		const proceso1 = new Proceso(1, 256, new EstadoSimulado());
		const proceso2 = new Proceso(2, 128, new EstadoSimulado());

		planificador.agregarProceso(proceso1);
		planificador.agregarProceso(proceso2);

		expect(planificador.obtenerProcesoActual()).toBe(proceso1);
	});

	it("debería agregar varios procesos a la cola", () => {
		const planificador = new PlanificadorRoundRobin();

		const proceso1 = new Proceso(1, 256, new EstadoSimulado());
		const proceso2 = new Proceso(2, 128, new EstadoSimulado());

		planificador.agregarProceso(proceso1);
		planificador.agregarProceso(proceso2);

		expect(planificador.obtenerProcesos().length).toBe(2);
	});

	it("debería rotar el primer proceso al final de la cola", () => {
		const planificador = new PlanificadorRoundRobin();

		const proceso1 = new Proceso(1, 256, new EstadoSimulado());
		const proceso2 = new Proceso(2, 128, new EstadoSimulado());

		planificador.agregarProceso(proceso1);
		planificador.agregarProceso(proceso2);

		planificador.rotarProceso();

		expect(planificador.obtenerProcesoActual()).toBe(proceso2);
	});

});