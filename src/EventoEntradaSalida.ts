export class EventoEntradaSalida {

	private _duracion: number;

	constructor(
		duracion: number
	) {
		this._duracion = duracion;
	}

	get duracion(): number {
		return this._duracion;
	}

}