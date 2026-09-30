import { Proceso } from "./Proceso";

export interface IEstadoProceso {
  avanzar(proceso: Proceso): void;
  finalizar(proceso: Proceso): void;
}