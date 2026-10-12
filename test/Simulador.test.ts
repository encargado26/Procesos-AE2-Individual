import { describe, expect, it } from "vitest";
import { Simulador } from "../src/Simulador";
import { GestordeMemoria } from "../src/GestordeMemoria";
import { PlanificadorRoundRobin } from "../src/PlanificadorRoundRobin";
import { FirstFit } from "../src/FirstFit";
import { Metricas } from "../src/Metricas";
import { Proceso } from "../src/Proceso";
import { EstadoNuevo } from "../src/EstadoNuevo";
import { EstadoListo } from "../src/EstadoListo";
import { EsperandoMemoria } from "../src/EsperandoMemoria";
import { EstadoTerminado } from "../src/EstadoTerminado";

function crearSistema() {
    const gestor = new GestordeMemoria(
        1024,
        new FirstFit()
    );

    const planificador =
        new PlanificadorRoundRobin(2);

    const simulador =
        new Simulador(
            gestor,
            planificador
        );

    return {
        gestor,
        planificador,
        simulador
    };
}

describe("Clase Simulador", () => {

    it("debería iniciar correctamente", () => {
        const {
            gestor,
            planificador,
            simulador
        } = crearSistema();

        expect(simulador.tick).toBe(0);
        expect(simulador.obtenerTickActual()).toBe(0);
        expect(simulador.obtenerEstadoSistema()).toBe("Activo");
        expect(simulador.obtenerGestordeMemoria()).toBe(gestor);
        expect(simulador.obtenerPlanificador()).toBe(planificador);
        expect(simulador.obtenerMetricas()).toBeInstanceOf(Metricas);
    });

    it("debería avanzar ticks y actualizar métricas", () => {
        const { simulador } = crearSistema();

        simulador.avanzarTick();
        simulador.avanzarTick();

        const metricas =
            simulador.obtenerMetricas();

        expect(simulador.tick).toBe(2);
        expect(simulador.obtenerTickActual()).toBe(2);

        expect(metricas.utilizacionCpu).toBe(0);
        expect(metricas.ocupacionMemoria).toBe(0);
        expect(metricas.memoriaLibre).toBe(1024);
        expect(metricas.mayorBloqueLibre).toBe(1024);
        expect(metricas.fragmentacionExterna).toBe(0);
        expect(metricas.cambiosDeContexto).toBe(0);
    });

    it("debería registrar procesos protegiendo la colección interna", () => {
        const { simulador } = crearSistema();

        const proceso = new Proceso(
            1,
            256,
            new EstadoNuevo(),
            5
        );

        simulador.registrarProceso(proceso);

        const procesos =
            simulador.obtenerProcesos();

        expect(procesos).toEqual([proceso]);

        procesos.pop();

        expect(simulador.obtenerProcesos()).toEqual([proceso]);
    });

    it("debería rechazar un PID duplicado", () => {
        const { simulador } = crearSistema();

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

        expect(() =>simulador.registrarProceso(proceso2)).toThrow("El PID del proceso ya se encuentra registrado");
        expect(simulador.obtenerProcesos()).toEqual([proceso1]);
    });

    it("debería admitir un proceso cuando hay memoria", () => {
        const {
            gestor,
            planificador,
            simulador
        } = crearSistema();

        const proceso = new Proceso(
            1,
            256,
            new EstadoNuevo(),
            5
        );

        simulador.registrarProceso(proceso);

        const resultado =simulador.admitirProceso(proceso);

        expect(resultado).toBe(true);
        expect(proceso.estado).toBeInstanceOf(EstadoListo);
        expect(planificador.obtenerProcesoActual()).toBe(proceso);
        expect(gestor.bloques.some(bloque => bloque.proceso === proceso)).toBe(true);
    });

    it("debería esperar memoria y reintentar la admisión en el siguiente tick", () => {
        const {
            gestor,
            planificador,
            simulador
        } = crearSistema();

        const proceso1 = new Proceso(
            1,
            900,
            new EstadoNuevo(),
            5
        );

        const proceso2 = new Proceso(
            2,
            200,
            new EstadoNuevo(),
            3
        );

        simulador.registrarProceso(proceso1);
        simulador.registrarProceso(proceso2);

        const admision1 =
            simulador.admitirProceso(proceso1);

        const admision2 =
            simulador.admitirProceso(proceso2);

        expect(admision1).toBe(true);
        expect(admision2).toBe(false);
        expect(proceso2.estado).toBeInstanceOf(EsperandoMemoria);
        expect(simulador.obtenerProcesosEsperandoMemoria()).toEqual([proceso2]);
        expect(planificador.cantidadDeProcesos()).toBe(1);
        expect(gestor.bloques.some(bloque =>bloque.proceso === proceso2)).toBe(false);

        gestor.liberarProceso(proceso1);

        simulador.avanzarTick();

        expect(simulador.tick).toBe(1);
        expect(proceso2.estado).toBeInstanceOf(EstadoListo);
        expect(simulador.obtenerProcesosEsperandoMemoria()).toHaveLength(0);
        expect(planificador.obtenerProcesos()).toContain(proceso2);
        expect(gestor.bloques.some(bloque =>bloque.proceso === proceso2)).toBe(true);
    });

    it("debería ejecutar procesos automáticamente respetando Round Robin", () => {

        const {
            gestor,
            planificador,
            simulador
        } = crearSistema();

        const proceso1 = new Proceso(
            1,
            256,
            new EstadoNuevo(),
            3
        );

        const proceso2 = new Proceso(
            2,
            256,
            new EstadoNuevo(),
            2
        );

        simulador.registrarProceso(proceso1);
        simulador.registrarProceso(proceso2);

        simulador.admitirProceso(proceso1);
        simulador.admitirProceso(proceso2);

        simulador.avanzarTick();

        expect(proceso1.cpuRestante).toBe(2);
        expect(proceso2.cpuRestante).toBe(2);

        simulador.avanzarTick();

        expect(proceso1.cpuRestante).toBe(1);
        expect(planificador.obtenerProcesoActual()).toBe(proceso2);

        simulador.avanzarTick();

        expect(proceso2.cpuRestante).toBe(1);

        simulador.avanzarTick();

        expect(proceso2.cpuRestante).toBe(0);
        expect(proceso2.estado).toBeInstanceOf(EstadoTerminado);
        expect(gestor.bloques.some(bloque =>bloque.proceso === proceso2 )).toBe(false);
        expect(planificador.obtenerProcesoActual()).toBe(proceso1);

        simulador.avanzarTick();

        expect(proceso1.cpuRestante).toBe(0);
        expect(proceso1.estado).toBeInstanceOf(EstadoTerminado);
        expect(planificador.cantidadDeProcesos()).toBe(0);
        expect(gestor.bloques).toHaveLength(1);
        expect(gestor.bloques[0].tamanio).toBe(1024);
        expect(gestor.bloques[0].proceso).toBeNull();
        expect(simulador.tick).toBe(5);
});

    it("debería renovar el quantum sin cambio de contexto cuando existe un único proceso", () => {
        const {
            gestor,
            planificador,
            simulador
        } = crearSistema();

        const proceso = new Proceso(
            1,
            1024,
            new EstadoNuevo(),
            3
        );

        simulador.registrarProceso(proceso);

        const admision =
        simulador.admitirProceso(proceso);

        expect(admision).toBe(true);
        expect(planificador.obtenerProcesoActual()).toBe(proceso);
        expect(gestor.bloques).toHaveLength(1);
        expect(gestor.bloques[0].proceso).toBe(proceso);

        simulador.avanzarTick();

        expect(proceso.cpuRestante).toBe(2);
        expect(proceso.quantumConsumido).toBe(1);

        simulador.avanzarTick();

        expect(proceso.cpuRestante).toBe(1);
        expect(proceso.quantumConsumido).toBe(0);
        expect(planificador.obtenerProcesoActual()).toBe(proceso);
        expect(planificador.cambiosDeContexto).toBe(0);

        simulador.avanzarTick();

        expect(proceso.cpuRestante).toBe(0);
        expect(proceso.estado).toBeInstanceOf(EstadoTerminado);
        expect(planificador.cantidadDeProcesos()).toBe(0);
        expect(gestor.bloques).toHaveLength(1);
        expect(gestor.bloques[0].inicio).toBe(0);
        expect(gestor.bloques[0].tamanio).toBe(1024);
        expect(gestor.bloques[0].proceso).toBeNull();
        expect(simulador.obtenerMetricas().utilizacionCpu).toBe(100);
        expect(simulador.obtenerMetricas().memoriaLibre).toBe(1024);
        expect(simulador.obtenerMetricas().ocupacionMemoria).toBe(0);
        expect(simulador.obtenerMetricas().fragmentacionExterna).toBe(0);
        expect(simulador.tick).toBe(3);
    });
});