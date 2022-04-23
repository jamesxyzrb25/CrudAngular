import { EquipoModel } from "./equipo.model";

export class ModeloModel{
    constructor(
        public id?:number,
        public equipo?:EquipoModel,
        public nombre_modelo?: string
    ){}
}