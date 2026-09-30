import type { Proceso } from "./Proceso.ts";

export interface IEstadoProceso {
  avanzar(proceso: Proceso): void;
  finalizar(proceso: Proceso): void;
}