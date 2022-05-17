import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { delay, map, Observable, of} from "rxjs";
import { GestionService } from "../services/gestion.service";

@Injectable({
    providedIn: "root"
  })
export class CustomValidator{

    nroSerieList: string[] =[];

    constructor(private gestionSrv:GestionService){
        this.gestionSrv.getByNroSerie().subscribe((result)=>{
            this.nroSerieList = result;
            console.log(this.nroSerieList);
        })
    }
    
    checkIfNroSerieExists(nro_serie:string):Observable<boolean>{
        nro_serie = nro_serie.toUpperCase();
        return of(this.nroSerieList.includes(nro_serie)).pipe(delay(1000));
    }

    nroSerieValidator():AsyncValidatorFn{
        return (control: AbstractControl):Observable<ValidationErrors|null> =>{
            return this.checkIfNroSerieExists(control.value).pipe(
                map(res =>{
                    console.log("resultado es: "+res);
                    return res?{nroSerieExists:true}:null;
                })
            );
        };
    }

}