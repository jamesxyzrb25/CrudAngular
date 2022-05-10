import { CelularModel } from "./celular.model";
import { EmpresaModel } from "./empresa.model";
import { ImpresoraModel } from "./impresora.model";
import { PosModel } from "./pos.model";

export class ValidadorModel{
    constructor(
        public id?:number,
        public codigo_bd?:number,
        public celular?:CelularModel,
        public impresora?:ImpresoraModel,
        public pos?: PosModel,
        public empresa?:EmpresaModel,
        public fecha_salida?: string,
        public observacion?:string
    ){}
}