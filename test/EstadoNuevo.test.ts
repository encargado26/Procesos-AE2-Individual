import { describe, expect, it } from "vitest";
import { EstadoNuevo } from "../src/EstadoNuevo";
import { EstadoSimulado } from "../src/EstadoSimulado";
import { Proceso } from "../src/Proceso";

describe("Clase EstadoNuevo", () => {

    it("debería crear una instancia de EstadoNuevo", () => {

        const estado = new EstadoNuevo();

        expect(
            estado
        ).toBeInstanceOf(
            EstadoNuevo
        );

    });

    it("debería ejecutar avanzar sin errores", () => {

        const estado = new EstadoNuevo();

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

        const estado = new EstadoNuevo();

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