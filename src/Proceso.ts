import { IEstadoProceso } from "./IEstadoProceso";

export class Proceso {

  private _pid: number;
  private _tamanio: number;
  private _estado: IEstadoProceso;
  private _tiempoTotalCpu: number;
  private _cpuRestante: number;
  private _quantumConsumido: number;
  private _tiempoBloqueoRestante: number;

  constructor(
    pid: number,
    tamanio: number,
    estadoInicial: IEstadoProceso,
    tiempoTotalCpu: number = 1
  ) {
    this._pid = pid;
    this._tamanio = tamanio;
    this._estado = estadoInicial;
    this._tiempoTotalCpu = tiempoTotalCpu;
    this._cpuRestante = tiempoTotalCpu;
    this._quantumConsumido = 0;
    this._tiempoBloqueoRestante = 0;
  }

  cambiarEstado(nuevoEstado: IEstadoProceso): void {
    this._estado = nuevoEstado;
  }

  ejecutarCiclo(): void {
    this._estado.avanzar(this);
  }

  consumirCpu(): void {
    this._cpuRestante = Math.max(
      0,
      this._cpuRestante - 1
    );
  }

  consumirQuantum(): void {
    this._quantumConsumido++;
  }

  reiniciarQuantum(): void {
    this._quantumConsumido = 0;
  }

  establecerTiempoBloqueo(tiempo: number): void {
    this._tiempoBloqueoRestante = tiempo;
  }

  reducirTiempoBloqueo(): void {
    this._tiempoBloqueoRestante = Math.max(
      0,
      this._tiempoBloqueoRestante - 1
    );
  }

  get pid(): number {
    return this._pid;
  }

  get tamanio(): number {
    return this._tamanio;
  }

  get estado(): IEstadoProceso {
    return this._estado;
  }

  get tiempoTotalCpu(): number {
    return this._tiempoTotalCpu;
  }

  get cpuRestante(): number {
    return this._cpuRestante;
  }

  get quantumConsumido(): number {
    return this._quantumConsumido;
  }

  get tiempoBloqueoRestante(): number {
    return this._tiempoBloqueoRestante;
  }
}