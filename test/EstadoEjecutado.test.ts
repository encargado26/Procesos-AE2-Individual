import { describe, expect, it } from "vitest";
import { EstadoEjecutando } from "../src/EstadoEjecutado";
import { EstadoSimulado } from "../src/EstadoSimulado";
import { Proceso } from "../src/Proceso";

describe("Clase EstadoEjecutando", () => {

    it("debería crear una instancia de EstadoEjecutando", () => {

        const estado = new EstadoEjecutando();

        expect(
            estado
        ).toBeInstanceOf(
            EstadoEjecutando
        );

    });

    it("debería ejecutar avanzar sin errores", () => {

        const estado = new EstadoEjecutando();

        const proceso = new Proceso(
            1,
            10,
            new EstadoSimulado()
        );

        expect(
            () => estado.avanzar(proceso)
        ).not.toThrow();

    });

    it("debería ejecutar finalizar sin errores", () => {

        const estado = new EstadoEjecutando();

        const proceso = new Proceso(
            1,
            10,
            new EstadoSimulado()
        );

        expect(
            () => estado.finalizar(proceso)
        ).not.toThrow();

    });
    
});
