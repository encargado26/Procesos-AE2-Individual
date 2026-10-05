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

    it("deberia actualizar la memoria libre ", () => {
        const metricas = new Metricas();
        metricas.actualizarMemoriaLibre(400);

        expect(metricas.memoriaLibre).toBe(400);
    });

    it("deberia actualizar el mayor bloque libre ", () => {
        const metricas = new Metricas();
        metricas.actualizarMayorBloqueLibre(300);

        expect(metricas.mayorBloqueLibre).toBe(300);
    });

    it("deberia actualizar la fragmentación externa ", () => {
        const metricas = new Metricas();
        metricas.actualizarFragmentacionExterna(25);

        expect(metricas.fragmentacionExterna).toBe(25);
    });

    it("deberia actualizar la ocupación de memoria ", () => {
        const metricas = new Metricas();
        metricas.actualizarOcupacionMemoria(60);

        expect(metricas.ocupacionMemoria).toBe(60);
    });

    it("deberia actualizar la utilización de cpu ", () => {
        const metricas = new Metricas();
        metricas.actualizarUtilizacionCpu(75);

        expect(metricas.utilizacionCpu).toBe(75);
    });

    it("deberia actualizar los cambios de contexto ", () => {
        const metricas = new Metricas();
        metricas.actualizarCambiosDeContexto(3);

        expect(metricas.cambiosDeContexto).toBe(3);
    });

});