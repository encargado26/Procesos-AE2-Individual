import { describe, expect, it } from "vitest";
import { BloquedeMemoria } from "../src/BloqueDeMemoria";

describe("Clase BloqueDeMemoria", () => {
	it("debería crear un bloque con inicio y tamaño", () => {
		const bloque = new BloquedeMemoria(0, 1024);

		expect(bloque.inicio).toBe(0);
		expect(bloque.tamanio).toBe(1024);
	});
});
