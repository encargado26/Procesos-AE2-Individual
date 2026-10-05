import { describe, expect, it } from "vitest";
import { GestordeMemoria } from "../src/GestordeMemoria";
import { FirstFit } from "../src/FirstFit";
import { Proceso } from "../src/Proceso";
import { EstadoSimulado } from "../src/EstadoSimulado";

describe("Clase GestordeMemoria", () => {

    it("debería crear un único bloque libre al iniciar", () => {
        const gestor = new GestordeMemoria(1024, new FirstFit());

        expect(gestor.bloques.length).toBe(1);
    });

    it("debería crear un bloque con inicio cero", () => {
        const gestor = new GestordeMemoria(1024, new FirstFit());

        expect(gestor.bloques[0].inicio).toBe(0);
    });

    it("debería crear un bloque con el tamaño total de memoria", () => {
        const gestor = new GestordeMemoria(1024, new FirstFit());

        expect(gestor.bloques[0].tamanio).toBe(1024);
    });

    it("debería dividir un bloque al asignar un proceso", () => {
        const gestor = new GestordeMemoria(1024, new FirstFit());
        const proceso = new Proceso(1, 256, new EstadoSimulado());

        gestor.asignarProceso(proceso);

        expect(gestor.bloques.length).toBe(2);
    });

    it("debería asignar el proceso al primer bloque", () => {
        const gestor = new GestordeMemoria(1024, new FirstFit());
        const proceso = new Proceso(1, 256, new EstadoSimulado());

        gestor.asignarProceso(proceso);

        expect(gestor.bloques[0].proceso).toBe(proceso);
    });

    it("debería crear un bloque libre con el espacio sobrante", () => {
        const gestor = new GestordeMemoria(1024, new FirstFit());
        const proceso = new Proceso(1, 256, new EstadoSimulado());

        gestor.asignarProceso(proceso);

        expect(gestor.bloques[1].tamanio).toBe(768);
    });

    it("debería ubicar el bloque sobrante después del bloque ocupado", () => {
        const gestor = new GestordeMemoria(1024, new FirstFit());
        const proceso = new Proceso(1, 256, new EstadoSimulado());

        gestor.asignarProceso(proceso);

        expect(gestor.bloques[1].inicio).toBe(256);
    });

    it("debería liberar un proceso asignado", () => {

        const gestor = new GestordeMemoria(
            1024,
            new FirstFit()
        );

        const proceso = new Proceso(
            1,
            256,
            new EstadoSimulado()
        );

        gestor.asignarProceso(proceso);

        gestor.liberarProceso(proceso);

        expect(
            gestor.bloques[0].proceso
        ).toBeNull();

    });

    it("debería fusionar bloques libres adyacentes", () => {

        const gestor = new GestordeMemoria(
            1024,
            new FirstFit()
        );

        const proceso = new Proceso(
            1,
            256,
            new EstadoSimulado()
        );

        gestor.asignarProceso(proceso);

        gestor.liberarProceso(proceso);

        gestor.fusionarBloquesLibres();

        expect(
            gestor.bloques.length
        ).toBe(1);

        expect(
            gestor.bloques[0].tamanio
        ).toBe(1024);

    });
});