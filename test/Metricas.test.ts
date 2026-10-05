import { describe, expect, it } from "vitest";
import { Metricas } from "../src/Metricas";

describe("Clase Metricas", () => {

    it("debería iniciar con ocupación de memoria en cero", () => {
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

    it("debería iniciar con memoria libre en cero", () => {
        const metricas = new Metricas();

        expect(metricas.memoriaLibre).toBe(0);
    });

    it("debería iniciar con mayor bloque libre en cero", () => {
        const metricas = new Metricas();

        expect(metricas.mayorBloqueLibre).toBe(0);
    });

    it("debería iniciar con fragmentación externa en cero", () => {
        const metricas = new Metricas();

        expect(metricas.fragmentacionExterna).toBe(0);
    });

});