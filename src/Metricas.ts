export class Metricas {

	private _ocupacionMemoria: number;
	private _utilizacionCpu: number;
	private _cambiosDeContexto: number;
	private _memoriaLibre: number;
	private _mayorBloqueLibre: number;
	private _fragmentacionExterna: number;

	constructor() {
		this._ocupacionMemoria = 0;
		this._utilizacionCpu = 0;
		this._cambiosDeContexto = 0;
		this._memoriaLibre = 0;
		this._mayorBloqueLibre = 0;
		this._fragmentacionExterna = 0;
	}

	actualizarMemoriaLibre(memoriaLibre: number): void {
		this._memoriaLibre = memoriaLibre;
	}

	actualizarMayorBloqueLibre(mayorBloqueLibre: number): void {
		this._mayorBloqueLibre = mayorBloqueLibre;
	}

	get ocupacionMemoria(): number {
		return this._ocupacionMemoria;
	}

	get utilizacionCpu(): number {
		return this._utilizacionCpu;
	}

	get cambiosDeContexto(): number {
		return this._cambiosDeContexto;
	}

	get memoriaLibre(): number {
		return this._memoriaLibre;
	}

	get mayorBloqueLibre(): number {
		return this._mayorBloqueLibre;
	}

	get fragmentacionExterna(): number {
		return this._fragmentacionExterna;
	}
}
