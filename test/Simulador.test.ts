import { describe, expect, it } from "vitest";
import { Simulador } from "../src/Simulador";
import { GestordeMemoria } from "../src/GestordeMemoria";
import { PlanificadorRoundRobin } from "../src/PlanificadorRoundRobin";
import { FirstFit } from "../src/FirstFit";

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

});