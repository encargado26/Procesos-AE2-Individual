import { describe, expect, it } from "vitest";
import { EstadoTerminado } from "../src/EstadoTerminado";
import { EstadoSimulado } from "../src/EstadoSimulado";
import { Proceso } from "../src/Proceso";

describe("Clase EstadoTerminado", () => {
    it("debería crear una instancia de EstadoTerminado", () => {
        const estado = new EstadoTerminado();

        expect(estado).toBeInstanceOf(EstadoTerminado);
    });

    it("debería ejecutar avanzar sin errores", () => {
        const estado = new EstadoTerminado();
        const proceso = new Proceso(1, 10, new EstadoSimulado());

        expect(() => estado.avanzar(proceso)).not.toThrow();
    });

    it("debería ejecutar finalizar sin errores", () => {
        const estado = new EstadoTerminado();
        const proceso = new Proceso(1, 10, new EstadoSimulado());

        expect(() => estado.finalizar(proceso)).not.toThrow();
    });
});