import { GestordeMemoria } from "./GestordeMemoria";
import { PlanificadorRoundRobin } from "./PlanificadorRoundRobin";
import { Metricas } from "./Metricas";
import { Proceso } from "./Proceso";
import { EstadoListo } from "./EstadoListo";
import { EsperandoMemoria } from "./EsperandoMemoria";
import { EstadoEjecutando } from "./EstadoEjecutado";
import { EstadoTerminado } from "./EstadoTerminado";

export class Simulador {
    private _tick: number;
    private _ticksCpuOcupada: number;
    private _gestordeMemoria: GestordeMemoria;
    private _planificador: PlanificadorRoundRobin;
    private _metricas: Metricas;
    private _procesos: Proceso[];
    private _esperandoMemoria: Proceso[];

    constructor(gestordeMemoria: GestordeMemoria, planificador: PlanificadorRoundRobin) {
        this._tick = 0;
        this._ticksCpuOcupada = 0;
        this._gestordeMemoria = gestordeMemoria;
        this._planificador = planificador;
        this._metricas = new Metricas();
        this._procesos = [];
        this._esperandoMemoria = [];
    }


    avanzarTick(): void {

    this.reintentarAdmision();

    this.ejecutarProcesoActual();

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

    registrarProceso(proceso: Proceso): void {
        if (this._procesos.some(registrado => registrado.pid === proceso.pid)) {
            throw new Error("El PID del proceso ya se encuentra registrado");
        }
        this._procesos.push(proceso);
    }

    obtenerProcesos(): Proceso[] {
        return [...this._procesos];
    }

    admitirProceso(proceso: Proceso): boolean {
        const memoriaAsignada = this._gestordeMemoria.asignarProceso(proceso);
        if (memoriaAsignada) {
            proceso.cambiarEstado(new EstadoListo());
            this._planificador.agregarProceso(proceso);
            return true;
        }

        proceso.cambiarEstado(new EsperandoMemoria());
        if (!this._esperandoMemoria.some(esperando => esperando.pid === proceso.pid)) {
            this._esperandoMemoria.push(proceso);
        }
        return false;
    }

    obtenerProcesosEsperandoMemoria(): Proceso[] {
        return [...this._esperandoMemoria];
    }

    private reintentarAdmision(): void {
        const pendientes = [...this._esperandoMemoria];
        this._esperandoMemoria = [];
        pendientes.forEach(proceso => this.admitirProceso(proceso));
    }

    private ejecutarProcesoActual(): void {

        const procesoActual = 
            this._planificador.obtenerProcesoActual();

        if (procesoActual === null) {
            return;
        }
        procesoActual.cambiarEstado(new EstadoEjecutando());

        procesoActual.consumirCpu();
        procesoActual.consumirQuantum();

        if (procesoActual.cpuRestante === 0) {
            
            this._planificador.retirarProcesoActual();

            procesoActual.cambiarEstado(new EstadoTerminado());

            procesoActual.reiniciarQuantum();

            this._gestordeMemoria.liberarProceso(procesoActual);

            return;
        }

        const quatumAgotado = 
             procesoActual.quantumConsumido >=
             this._planificador.quantum;

        if (quatumAgotado) {

            procesoActual.reiniciarQuantum();
            
            const existenOtrosListos =
                this._planificador.cantidadDeProcesos() > 1;

            if (existenOtrosListos) {
                procesoActual.cambiarEstado(new EstadoListo());
                this._planificador.rotarProceso();
            }
        }      
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