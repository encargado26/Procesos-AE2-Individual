import { describe, expect, it } from "vitest";
import { GestorDeMemoria } from "../src/GestorDeMemoria";
import { FirstFit } from "../src/FirstFit";
import { Proceso } from "../src/Proceso";
import { EstadoSimulado } from "../src/EstadoSimulado";

describe("Clase GestorDeMemoria", () => {
	it("debería crear un único bloque libre al iniciar", () => {
		const gestor = new GestorDeMemoria(1024, new FirstFit());

		expect(gestor.bloques.length).toBe(1);
	});

	it("debería crear un bloque con inicio cero", () => {
		const gestor = new GestorDeMemoria(1024, new FirstFit());

		expect(gestor.bloques[0].inicio).toBe(0);
	});

	it("debería crear un bloque con el tamaño total de memoria", () => {
		const gestor = new GestorDeMemoria(1024, new FirstFit());

		expect(gestor.bloques[0].tamanio).toBe(1024);
	});

	it("debería dividir un bloque al asignar un proceso", () => {
		const gestor = new GestorDeMemoria(1024, new FirstFit());
		const proceso = new Proceso(1, 256, new EstadoSimulado());

		gestor.asignarProceso(proceso);

		expect(gestor.bloques.length).toBe(2);
	});
});