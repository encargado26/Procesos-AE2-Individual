import { describe, expect, it } from "vitest";
import { EsperandoMemoria } from "../src/EsperandoMemoria";

describe("Clase EstadoEsperandoMemoria", () => {

	it("debería crear una instancia de EstadoEsperandoMemoria", () => {

		const estado = new EsperandoMemoria();

		expect(
			estado
		).toBeInstanceOf(
			EsperandoMemoria
		);

	});

});