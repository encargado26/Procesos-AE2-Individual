import { describe, expect, it } from "vitest";
import { EsperandoMemoria } from "../src/EsperandoMemoria";
import { EstadoSimulado } from "../src/EstadoSimulado";
import { Proceso } from "../src/Proceso";

describe("Clase EsperandoMemoria", () => {

    it("debería crear una instancia de EsperandoMemoria", () => {
        const estado = new EsperandoMemoria();

        expect(estado).toBeInstanceOf(EsperandoMemoria);
    });

    it("debería ejecutar avanzar sin errores", () => {
        const estado = new EsperandoMemoria();
        const proceso = new Proceso(1, 10, new EstadoSimulado());

        expect(() => estado.avanzar(proceso)).not.toThrow();
    });

    it("debería ejecutar finalizar sin errores", () => {
        const estado = new EsperandoMemoria();
        const proceso = new Proceso(1, 10, new EstadoSimulado());

        expect(() => estado.finalizar(proceso)).not.toThrow();
    });

});