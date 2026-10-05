import { GestordeMemoria } from "./GestordeMemoria";
import { PlanificadorRoundRobin } from "./PlanificadorRoundRobin";
import { Metricas } from "./Metricas";

export class Simulador {

    private _tick: number;
    private _ticksCpuOcupada: number;
    private _gestordeMemoria: GestordeMemoria;
    private _planificador: PlanificadorRoundRobin;
    private _metricas: Metricas;

    constructor(
        gestordeMemoria: GestordeMemoria,
        planificador: PlanificadorRoundRobin
    ) {
        this._tick = 0;
        this._ticksCpuOcupada = 0;
        this._gestordeMemoria = gestordeMemoria;
        this._planificador = planificador;
        this._metricas = new Metricas();
    }

    avanzarTick(): void {
        const cpuOcupada =
            this._planificador.obtenerProcesoActual() !== null;

        this._ticksCpuOcupada += Number(cpuOcupada);
        this._tick++;

        const utilizacionCpu =
            100 * this._ticksCpuOcupada / this._tick;

        this._metricas.actualizarUtilizacionCpu(
            utilizacionCpu
        );

        this._metricas.actualizarCambiosDeContexto(
            this._planificador.cambiosDeContexto
        );

        this._metricas.actualizarOcupacionMemoria(
            this._gestordeMemoria.obtenerOcupacionMemoria()
        );

        this._metricas.actualizarMemoriaLibre(
            this._gestordeMemoria.obtenerMemoriaLibre()
        );

        this._metricas.actualizarMayorBloqueLibre(
            this._gestordeMemoria.obtenerMayorBloqueLibre()
        );

        this._metricas.actualizarFragmentacionExterna(
            this._gestordeMemoria.obtenerFragmentacionExterna()
        );
    }

    obtenerEstadoSistema(): string {
        return "Activo";
    }

    obtenerTickActual(): number {
        return this._tick;
    }

    obtenerPlanificador(): PlanificadorRoundRobin {
        return this._planificador;
    }

    obtenerGestordeMemoria(): GestordeMemoria {
        return this._gestordeMemoria;
    }

    obtenerMetricas(): Metricas {
        return this._metricas;
    }

    get tick(): number {
        return this._tick;
    }
}