import { describe, expect, it } from "vitest";
import { EstadoEjecutando } from "../src/EstadoEjecutado";

describe("Clase EstadoEjecutando", () => {

	it("debería crear una instancia de EstadoEjecutando", () => {

		const estado = new EstadoEjecutando();

		expect(
			estado
		).toBeInstanceOf(
			EstadoEjecutando
		);

	});

});