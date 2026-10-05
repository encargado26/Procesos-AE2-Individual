import { describe, expect, it } from "vitest";
import { Metricas } from "../src/Metricas";

describe("Clase Metricas", () => {
	it("debería iniciar con ocupación en cero", () => {
		const metricas = new Metricas();

		expect(metricas.ocupacionMemoria).toBe(0);
	});

	it("debería iniciar con utilización de cpu en cero", () => {
		const metricas = new Metricas();

		expect(metricas.utilizacionCpu).toBe(0);
	});

	it("debería iniciar con cambios de contexto en cero", () => {
		const metricas = new Metricas();

		expect(metricas.cambiosDeContexto).toBe(0);
	});
});