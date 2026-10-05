import { describe, expect, it } from "vitest";
import { EstadoBloqueado } from "../src/EstadoBloqueado";
import { EstadoSimulado } from "../src/EstadoSimulado";
import { Proceso } from "../src/Proceso";

describe("Clase EstadoBloqueado", () => {
	it("debería crear una instancia de EstadoBloqueado", () => {
		const estado = new EstadoBloqueado();

		expect(estado).toBeInstanceOf(EstadoBloqueado);
	});

	it("debería ejecutar avanzar sin errores", () => {
		const estado = new EstadoBloqueado();
		const proceso = new Proceso(1, 10, new EstadoSimulado());

		expect(() => estado.avanzar(proceso)).not.toThrow();
	});

	it("debería ejecutar finalizar sin errores", () => {
		const estado = new EstadoBloqueado();
		const proceso = new Proceso(1, 10, new EstadoSimulado());

		expect(() => estado.finalizar(proceso)).not.toThrow();
	});
});