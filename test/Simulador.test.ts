import { describe, expect, it } from "vitest";
import { Simulador } from "../src/Simulador";
import { GestordeMemoria } from "../src/GestordeMemoria";
import { PlanificadorRoundRobin } from "../src/PlanificadorRoundRobin";
import { FirstFit } from "../src/FirstFit";
import { Metricas } from "../src/Metricas";

describe("Clase Simulador", () => {
	it("debería iniciar en tick cero", () => {
		const simulador = new Simulador(
			new GestordeMemoria(1024, new FirstFit()),
			new PlanificadorRoundRobin()
		);

		expect(simulador.tick).toBe(0);
	});

	it("debería avanzar un tick", () => {
		const simulador = new Simulador(
			new GestordeMemoria(1024, new FirstFit()),
			new PlanificadorRoundRobin()
		);

		simulador.avanzarTick();

		expect(simulador.tick).toBe(1);
	});

	it("debería avanzar dos ticks", () => {
		const simulador = new Simulador(
			new GestordeMemoria(1024, new FirstFit()),
			new PlanificadorRoundRobin()
		);

		simulador.avanzarTick();
		simulador.avanzarTick();

		expect(simulador.tick).toBe(2);
	});

	it("debería obtener el estado del sistema", () => {

		const simulador = new Simulador(
			new GestordeMemoria(
				1024,
				new FirstFit()
			),
			new PlanificadorRoundRobin()
		);

		expect(
			simulador.obtenerEstadoSistema()
		).toBe("Activo");

	});

	it("deberia obtener el tick actual", () => {
		const simulador = new Simulador(
			new GestordeMemoria(
				1024,
				new FirstFit()
			),
			new PlanificadorRoundRobin()
		);

		simulador.avanzarTick();

		expect(
			simulador.obtenerTickActual()
		).toBe(1);

	});

	it("deberia devolver el planificador asociado", () => {
		const planificador = new PlanificadorRoundRobin();
		const simulador = new Simulador(
			new GestordeMemoria(
				1024,
				new FirstFit()
			),
			planificador
		);

		expect(
			simulador.obtenerPlanificador()
		).toBe(planificador);

	});

	it("deberia devolver el gestor de memoria asociado", () => {
		const gestordeMemoria = new GestordeMemoria(
			1024,
			new FirstFit()
		);
		const simulador = new Simulador(
			gestordeMemoria,
			new PlanificadorRoundRobin()
		);

		expect(
			simulador.obtenerGestordeMemoria()
		).toBe(gestordeMemoria);

	});

	it("deberia devolver las metricas del simulador", () => {
		const simulador = new Simulador(
			new GestordeMemoria(
				1024,
				new FirstFit()
			),
			new PlanificadorRoundRobin()
		);

		expect(
			simulador.obtenerMetricas()
		).toBeInstanceOf(Metricas);
	});

});