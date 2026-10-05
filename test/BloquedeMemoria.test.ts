import { describe, expect, it } from "vitest";
import { BloquedeMemoria } from "../src/BloquedeMemoria";
import { EstadoSimulado } from "../src/EstadoSimulado";
import { Proceso } from "../src/Proceso";

describe("Clase BloquedeMemoria", () => {
	it("debería crear un bloque con inicio y tamaño", () => {
		const bloque = new BloquedeMemoria(0, 1024);

		expect(bloque.inicio).toBe(0);
		expect(bloque.tamanio).toBe(1024);
	});

	it("debería iniciar sin proceso asignado", () => {
		const bloque = new BloquedeMemoria(0, 1024);

		expect(bloque.proceso).toBeNull();
	});

    it("debería asignar un proceso al bloque", () => {
        const bloque = new BloquedeMemoria(0,1024);
        const proceso = new Proceso(1,256,new EstadoSimulado());

        bloque.asignarProceso(proceso);
        expect(bloque.proceso).toBe(proceso);
    });

    it("debería liberar el proceso asignado", () => {
        const bloque = new BloquedeMemoria(0,1024);
        const proceso = new Proceso(1,256,new EstadoSimulado());

        bloque.asignarProceso(proceso);
        bloque.liberarProceso();
        expect(bloque.proceso).toBeNull();
    });
});
