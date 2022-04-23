import { EmpresaModel } from "./empresa.model";
import { ModeloModel } from "./modelo.model";

import * as moment from 'moment';

export class PosModel{
    constructor(
      public id?: number,
      public nro_serie?: string,
      public modelo?: ModeloModel,
      public empresa?: EmpresaModel,
      public fecha_ingreso?: string,
      public observacion?: string
    ) {

      
    }
}
