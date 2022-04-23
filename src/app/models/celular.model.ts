import { Empresa } from "./empresa.model";
import { Modelo } from "./modelo.model";
import { Operador } from "./operador.model";

export class Celular {
  constructor(
    public id?: number,
    public nro_imei?: string,
    public nro_celular?: string,
    public operador?: Operador,
    public modelo?: Modelo,
    public empresa?: Empresa,
    public observacion?: string

  ) {}
}
