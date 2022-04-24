import { EmpresaModel } from "./empresa.model";
import { ModeloModel } from "./modelo.model";
import { OperadorModel } from "./operador.model";

export class CelularModel {
  constructor(
    public id?: number,
    public nro_imei?: string,
    public nro_celular?: string,
    public operador?: OperadorModel,
    public modelo?: ModeloModel,
    public empresa?: EmpresaModel,
    public fecha_ingreso?: string,
    public observacion?: string

  ) {}
}
