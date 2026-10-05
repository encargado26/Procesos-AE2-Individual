import { describe, expect, it } from "vitest";
import { EstadoTerminado } from "../src/EstadoTerminado.ts";

describe("Clase EstadoTerminado", () => {
	it("debería crear una instancia de EstadoTerminado", () => {
		const estado = new EstadoTerminado();

		expect(estado).toBeInstanceOf(EstadoTerminado);
	});
});