import {ModeloModel} from "./modelo.model";
import {EmpresaModel} from "./empresa.model";

export class ImpresoraModel{
  constructor(
    public id?:number,
    public codigo?:string,
    public modelo?:ModeloModel,
    public empresa?:EmpresaModel,
    public fecha_ingreso?: string,
    public observacion?:string

    
  ) {}

}
