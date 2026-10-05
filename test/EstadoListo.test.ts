import { describe, expect, it } from "vitest";
import { EstadoListo } from "../src/EstadoListo";

describe("Clase EstadoListo", () => {
	it("debería crear una instancia de EstadoListo", () => {
		const estado = new EstadoListo();

		expect(estado).toBeInstanceOf(EstadoListo);
	});
});