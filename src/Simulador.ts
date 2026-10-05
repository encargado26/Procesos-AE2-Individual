import { GestorDeMemoria } from "./GestordeMemoria";
import { PlanificadorRoundRobin } from "./PlanificadorRoundRobin";

export class Simulador {

	private _tick: number;
	private _gestorDeMemoria: GestorDeMemoria;
	private _planificador: PlanificadorRoundRobin;

	constructor(
		gestorDeMemoria: GestorDeMemoria,
		planificador: PlanificadorRoundRobin
	) {
		this._tick = 0;
		this._gestorDeMemoria = gestorDeMemoria;
		this._planificador = planificador;
	}

	avanzarTick(): void {
		this._tick++;
	}

	get tick(): number {
		return this._tick;
	}

}
