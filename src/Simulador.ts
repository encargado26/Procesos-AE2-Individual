import { GestordeMemoria } from "./GestordeMemoria";
import { PlanificadorRoundRobin } from "./PlanificadorRoundRobin";

export class Simulador {

	private _tick: number;
	private _gestordeMemoria: GestordeMemoria;
	private _planificador: PlanificadorRoundRobin;

	constructor(
		gestordeMemoria: GestordeMemoria,
		planificador: PlanificadorRoundRobin
	) {
		this._tick = 0;
		this._gestordeMemoria = gestordeMemoria;
		this._planificador = planificador;
	}

	avanzarTick(): void {
		this._tick++;
	}

	obtenerEstadoSistema(): string {
		return "Activo";
	}

	get tick(): number {
		return this._tick;
	}

}
