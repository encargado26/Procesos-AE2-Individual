import { describe, expect, it } from "vitest";
import { EstadoListo } from "../src/EstadoListo";
import { EstadoSimulado } from "../src/EstadoSimulado";
import { Proceso } from "../src/Proceso";

describe("Clase EstadoListo", () => {
	it("debería crear una instancia de EstadoListo", () => {
		const estado = new EstadoListo();
		expect(estado).toBeInstanceOf(EstadoListo);
	});

	it("debería ejecutar avanzar sin errores", () => {
		const estado = new EstadoListo();
		const proceso = new Proceso(1, 10, new EstadoSimulado());
		expect(() => estado.avanzar(proceso)).not.toThrow();
	});

	it("debería ejecutar finalizar sin errores", () => {
		const estado = new EstadoListo();
		const proceso = new Proceso(1, 10, new EstadoSimulado());
		expect(() => estado.finalizar(proceso)).not.toThrow();
	});
});
