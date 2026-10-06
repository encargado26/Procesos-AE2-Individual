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

    it("debería dividir el bloque cuando sobra memoria", () => {

        const gestor =
            new GestordeMemoria(
                1024,
                new FirstFit()
            );

        const proceso =
            new Proceso(
                1,
                1024,
                new EstadoSimulado(),
                5
            );

        const resultado =
            gestor.asignarProceso(proceso);

        expect(resultado).toBe(true);
        expect(gestor.bloques.length).toBe(1);

        expect(gestor.bloques[0].inicio).toBe(0);
        expect(gestor.bloques[0].tamanio).toBe(1024);
        expect(gestor.bloques[0].proceso).toBe(proceso);

    });

    it("debería dividir el bloque cuando sobra memoria", () => {

    const gestor =
        new GestordeMemoria(
            1024,
            new FirstFit()
        );

    const proceso =
        new Proceso(
            1,
            256,
            new EstadoSimulado(),
            5
        );

    const resultado =
        gestor.asignarProceso(proceso);

    expect(resultado).toBe(true);
    expect(gestor.bloques.length).toBe(2);

    expect(gestor.bloques[0].inicio).toBe(0);
    expect(gestor.bloques[0].tamanio).toBe(256);
    expect(gestor.bloques[0].proceso).toBe(proceso);

    expect(gestor.bloques[1].inicio).toBe(256);
    expect(gestor.bloques[1].tamanio).toBe(768);
    expect(gestor.bloques[1].proceso).toBeNull();
});

it("no debería modificar los bloques cuando no existe espacio suficiente", () => {

    const gestor =
        new GestordeMemoria(
            1024,
            new FirstFit()
        );

    const procesoGrande =
        new Proceso(
            1,
            900,
            new EstadoSimulado(),
            5
        );

    const procesoSinEspacio =
        new Proceso(
            2,
            200,
            new EstadoSimulado(),
            5
        );

    gestor.asignarProceso(procesoGrande);

    const bloquesAntes =
        gestor.bloques.map(
            bloque => ({
                inicio: bloque.inicio,
                tamanio: bloque.tamanio,
                proceso: bloque.proceso
            })
        );

    const resultado =
        gestor.asignarProceso(
            procesoSinEspacio
        );

    const bloquesDespues =
        gestor.bloques.map(
            bloque => ({
                inicio: bloque.inicio,
                tamanio: bloque.tamanio,
                proceso: bloque.proceso
            })
        );

    expect(resultado).toBe(false);
    expect(bloquesDespues).toEqual(bloquesAntes);
});

it("debería dividir el bloque cuando sobra memoria", () => {

    const gestor =
        new GestordeMemoria(
            1024,
            new FirstFit()
        );

    const proceso =
        new Proceso(
            1,
            256,
            new EstadoSimulado(),
            5
        );

    const resultado =
        gestor.asignarProceso(proceso);

    expect(resultado).toBe(true);
    expect(gestor.bloques.length).toBe(2);

    expect(gestor.bloques[0].inicio).toBe(0);
    expect(gestor.bloques[0].tamanio).toBe(256);
    expect(gestor.bloques[0].proceso).toBe(proceso);

    expect(gestor.bloques[1].inicio).toBe(256);
    expect(gestor.bloques[1].tamanio).toBe(768);
    expect(gestor.bloques[1].proceso).toBeNull();
});

it("no debería modificar los bloques cuando no existe espacio suficiente", () => {

    const gestor =
        new GestordeMemoria(
            1024,
            new FirstFit()
        );

    const procesoGrande =
        new Proceso(
            1,
            900,
            new EstadoSimulado(),
            5
        );

    const procesoSinEspacio =
        new Proceso(
            2,
            200,
            new EstadoSimulado(),
            5
        );

    gestor.asignarProceso(procesoGrande);

    const bloquesAntes =
        gestor.bloques.map(
            bloque => ({
                inicio: bloque.inicio,
                tamanio: bloque.tamanio,
                proceso: bloque.proceso
            })
        );

    const resultado =
        gestor.asignarProceso(
            procesoSinEspacio
        );

    const bloquesDespues =
        gestor.bloques.map(
            bloque => ({
                inicio: bloque.inicio,
                tamanio: bloque.tamanio,
                proceso: bloque.proceso
            })
        );

    expect(resultado).toBe(false);
    expect(bloquesDespues).toEqual(bloquesAntes);
});

it("debería mantener la continuidad entre los bloques", () => {

    const gestor =
        new GestordeMemoria(
            1024,
            new FirstFit()
        );

    gestor.asignarProceso(
        new Proceso(
            1,
            300,
            new EstadoSimulado(),
            5
        )
    );

    gestor.asignarProceso(
        new Proceso(
            2,
            200,
            new EstadoSimulado(),
            5
        )
    );

    const continuidad =
        gestor.bloques
            .slice(1)
            .every(
                (bloque, indice) => {

                    const bloqueAnterior =
                        gestor.bloques[indice];

                    return bloque.inicio ===
                        bloqueAnterior.inicio +
                        bloqueAnterior.tamanio;
                }
            );

    expect(continuidad).toBe(true);
});

it("debería fusionar un bloque liberado con su vecino derecho libre", () => {

    const gestor = new GestordeMemoria(
        1024,
        new FirstFit()
    );

    const proceso1 = new Proceso(
        1,
        200,
        new EstadoSimulado(),
        5
    );

    const proceso2 = new Proceso(
        2,
        300,
        new EstadoSimulado(),
        5
    );

    const proceso3 = new Proceso(
        3,
        100,
        new EstadoSimulado(),
        5
    );

    gestor.asignarProceso(proceso1);
    gestor.asignarProceso(proceso2);
    gestor.asignarProceso(proceso3);

    gestor.liberarProceso(proceso3);

    expect(gestor.bloques.length).toBe(3);

    expect(gestor.bloques[2].inicio).toBe(500);
    expect(gestor.bloques[2].tamanio).toBe(524);
    expect(gestor.bloques[2].proceso).toBeNull();
});

it("debería fusionar un bloque liberado con su vecino izquierdo libre", () => {

    const gestor = new GestordeMemoria(
        1024,
        new FirstFit()
    );

    const proceso1 = new Proceso(
        1,
        200,
        new EstadoSimulado(),
        5
    );

    const proceso2 = new Proceso(
        2,
        300,
        new EstadoSimulado(),
        5
    );

    const proceso3 = new Proceso(
        3,
        100,
        new EstadoSimulado(),
        5
    );

    gestor.asignarProceso(proceso1);
    gestor.asignarProceso(proceso2);
    gestor.asignarProceso(proceso3);

    gestor.liberarProceso(proceso1);
    gestor.liberarProceso(proceso2);

    expect(gestor.bloques.length).toBe(3);

    expect(gestor.bloques[0].inicio).toBe(0);
    expect(gestor.bloques[0].tamanio).toBe(500);
    expect(gestor.bloques[0].proceso).toBeNull();

    expect(gestor.bloques[1].proceso).toBe(proceso3);
});

it("debería fusionar un bloque liberado con ambos vecinos libres", () => {

    const gestor = new GestordeMemoria(
        1024,
        new FirstFit()
    );

    const proceso1 = new Proceso(
        1,
        200,
        new EstadoSimulado(),
        5
    );

    const proceso2 = new Proceso(
        2,
        300,
        new EstadoSimulado(),
        5
    );

    const proceso3 = new Proceso(
        3,
        100,
        new EstadoSimulado(),
        5
    );

    gestor.asignarProceso(proceso1);
    gestor.asignarProceso(proceso2);
    gestor.asignarProceso(proceso3);

    gestor.liberarProceso(proceso1);
    gestor.liberarProceso(proceso3);

    gestor.liberarProceso(proceso2);

    expect(gestor.bloques.length).toBe(1);
    expect(gestor.bloques[0].inicio).toBe(0);
    expect(gestor.bloques[0].tamanio).toBe(1024);
    expect(gestor.bloques[0].proceso).toBeNull();
});

it("debería dejar un único bloque libre al liberar todos los procesos", () => {

    const gestor = new GestordeMemoria(
        1024,
        new FirstFit()
    );

    const proceso1 = new Proceso(
        1,
        200,
        new EstadoSimulado(),
        5
    );

    const proceso2 = new Proceso(
        2,
        300,
        new EstadoSimulado(),
        5
    );

    const proceso3 = new Proceso(
        3,
        100,
        new EstadoSimulado(),
        5
    );

    gestor.asignarProceso(proceso1);
    gestor.asignarProceso(proceso2);
    gestor.asignarProceso(proceso3);

    gestor.liberarProceso(proceso1);
    gestor.liberarProceso(proceso2);
    gestor.liberarProceso(proceso3);

    expect(gestor.bloques).toHaveLength(1);
    expect(gestor.bloques[0].inicio).toBe(0);
    expect(gestor.bloques[0].tamanio).toBe(1024);
    expect(gestor.bloques[0].proceso).toBeNull();
});

});