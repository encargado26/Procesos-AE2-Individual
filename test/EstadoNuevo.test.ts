import { describe, expect, it } from "vitest";
import { EstadoNuevo } from "../src/EstadoNuevo";

describe("Clase EstadoNuevo", () => {
	it("debería crear una instancia de EstadoNuevo", () => {
		const estado = new EstadoNuevo();

		expect(estado).toBeInstanceOf(EstadoNuevo);
	});
});