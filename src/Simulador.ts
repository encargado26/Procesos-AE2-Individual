import { GestordeMemoria } from "./GestordeMemoria";
import { PlanificadorRoundRobin } from "./PlanificadorRoundRobin";
import { Metricas } from "./Metricas";

export class Simulador {

	private _tick: number;
	private _gestordeMemoria: GestordeMemoria;
	private _planificador: PlanificadorRoundRobin;
	private _metricas: Metricas;

	constructor(
		gestordeMemoria: GestordeMemoria,
		planificador: PlanificadorRoundRobin
	) {
		this._tick = 0;
		this._gestordeMemoria = gestordeMemoria;
		this._planificador = planificador;
		this._metricas = new Metricas();
	}

	avanzarTick(): void {
		this._tick++;
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
