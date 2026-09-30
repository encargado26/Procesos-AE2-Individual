import { IEstadoProceso } from "./IEstadoProceso";

export class Proceso {
  private _pid!: number;
  private _tamanio!: number;
  private _estado!: IEstadoProceso;

   constructor(pid: number, tamanio: number, estadoInicial: IEstadoProceso) {
    this._pid = pid;
    this._tamanio = tamanio;
    this._estado = estadoInicial;
  }

  cambiarEstado(nuevoEstado: IEstadoProceso): void {
    this._estado = nuevoEstado;
  }

  ejecutarCiclo(): void {
    this._estado.avanzar(this);
  }

  get pid(): number {
    return this._pid;
  }

  get tamanio(): number {
    return this._tamanio;
  }
}