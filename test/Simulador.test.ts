import { describe, expect, it } from "vitest";
import { Simulador } from "../src/Simulador";
import { GestordeMemoria } from "../src/GestordeMemoria";
import { PlanificadorRoundRobin } from "../src/PlanificadorRoundRobin";
import { FirstFit } from "../src/FirstFit";
import { Metricas } from "../src/Metricas";
import { Proceso } from "../src/Proceso";
import { EstadoNuevo } from "../src/EstadoNuevo";

describe("Clase Simulador", () => {

    it("debería iniciar en tick cero", () => {

        const simulador = new Simulador(
            new GestordeMemoria(
                1024,
                new FirstFit()
            ),
            new PlanificadorRoundRobin()
        );

        expect(
            simulador.tick
        ).toBe(0);

    });

    it("debería avanzar un tick", () => {

        const simulador = new Simulador(
            new GestordeMemoria(
                1024,
                new FirstFit()
            ),
            new PlanificadorRoundRobin()
        );

        simulador.avanzarTick();

        expect(
            simulador.tick
        ).toBe(1);

    });

    it("debería avanzar dos ticks", () => {

        const simulador = new Simulador(
            new GestordeMemoria(
                1024,
                new FirstFit()
            ),
            new PlanificadorRoundRobin()
        );

        simulador.avanzarTick();
        simulador.avanzarTick();

        expect(
            simulador.tick
        ).toBe(2);

    });

    it("debería obtener el estado del sistema", () => {

        const simulador = new Simulador(
            new GestordeMemoria(
                1024,
                new FirstFit()
            ),
            new PlanificadorRoundRobin()
        );

        expect(
            simulador.obtenerEstadoSistema()
        ).toBe("Activo");

    });

    it("debería obtener el tick actual", () => {

        const simulador = new Simulador(
            new GestordeMemoria(
                1024,
                new FirstFit()
            ),
            new PlanificadorRoundRobin()
        );

        simulador.avanzarTick();

        expect(
            simulador.obtenerTickActual()
        ).toBe(1);

    });

    it("debería devolver el planificador asociado", () => {

        const planificador =
            new PlanificadorRoundRobin();

        const simulador =
            new Simulador(
                new GestordeMemoria(
                    1024,
                    new FirstFit()
                ),
                planificador
            );

        expect(
            simulador.obtenerPlanificador()
        ).toBe(planificador);

    });

    it("debería devolver el gestor de memoria asociado", () => {

        const gestorDeMemoria =
            new GestordeMemoria(
                1024,
                new FirstFit()
            );

        const simulador =
            new Simulador(
                gestorDeMemoria,
                new PlanificadorRoundRobin()
            );

        expect(
            simulador.obtenerGestordeMemoria()
        ).toBe(gestorDeMemoria);

    });

    it("debería devolver las métricas del simulador", () => {

        const simulador =
            new Simulador(
                new GestordeMemoria(
                    1024,
                    new FirstFit()
                ),
                new PlanificadorRoundRobin()
            );

        expect(
            simulador.obtenerMetricas()
        ).toBeInstanceOf(
            Metricas
        );

    });

    it("debería actualizar las métricas al avanzar un tick", () => {

        const simulador =
            new Simulador(
                new GestordeMemoria(
                    1024,
                    new FirstFit()
                ),
                new PlanificadorRoundRobin()
            );

        simulador.avanzarTick();

        expect(
            simulador.obtenerMetricas()
        ).toBeInstanceOf(
            Metricas
        );

    });

    it("debería registrar y consultar un proceso", () => {

        const simulador = new Simulador(
            new GestordeMemoria(
                1024,
                new FirstFit()
            ),
            new PlanificadorRoundRobin()
        );

        const proceso = new Proceso(
            1,
            256,
            new EstadoNuevo(),
            5
        );

        simulador.registrarProceso(proceso);

        expect(
            simulador.obtenerProcesos()
        ).toHaveLength(1);

        expect(
            simulador.obtenerProcesos()[0]
        ).toBe(proceso);

    });

    it("debería rechazar procesos con PID duplicado", () => {

        const simulador = new Simulador(
            new GestordeMemoria(
                1024,
                new FirstFit()
            ),
            new PlanificadorRoundRobin()
        );

        const proceso1 = new Proceso(
            1,
            256,
            new EstadoNuevo(),
            5
        );

        const proceso2 = new Proceso(
            1,
            128,
            new EstadoNuevo(),
            3
        );

        simulador.registrarProceso(proceso1);

        expect(
            () => simulador.registrarProceso(proceso2)
        ).toThrow(
            "El PID del proceso ya se encuentra registrado"
        );

        expect(
            simulador.obtenerProcesos()
        ).toHaveLength(1);

    });

});