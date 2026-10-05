import { describe, expect, it } from "vitest";
import { EstadoBloqueado } from "../src/EstadoBloqueado";

describe("Clase EstadoBloqueado", () => {
	it("debería crear una instancia de EstadoBloqueado", () => {
		const estado = new EstadoBloqueado();

		expect(estado).toBeInstanceOf(EstadoBloqueado);
	});
});