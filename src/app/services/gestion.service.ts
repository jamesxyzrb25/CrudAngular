import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import swal from 'sweetalert2';
import { CelularModel } from '../models/celular.model';
import { EmpresaModel } from '../models/empresa.model';
import { ImpresoraModel } from '../models/impresora.model';
import { ModeloModel } from '../models/modelo.model';
import { OperadorModel } from '../models/operador.model';

import { PosModel } from '../models/pos.model';
import { ValidadorModel } from '../models/validador.model';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private urlEndPointEmpresa = 'http://localhost:8080/api/empresaList';
  private urlEndPointModeloPos = 'http://localhost:8080/api/modeloPosList';
  private urlEndPointModeloCelular = 'http://localhost:8080/api/modeloCelularList';
  private urlEndPointModeloImpresora = 'http://localhost:8080/api/modeloImpresoraList';
  private urlEndPointOperadores = 'http://localhost:8080/api/operadorList';

  private urlEndPointPosxEmpresa = 'http://localhost:8080/api/posxEmpresa';
  private urlEndPointCelularesxEmpresa = 'http://localhost:8080/api/celularesxEmpresa';
  private urlEndPointImpresorasxEmpresa = 'http://localhost:8080/api/impresorasxEmpresa';

  private urlEndPointPos = 'http://localhost:8080/api/pos';
  private urlEndPointCelulares = 'http://localhost:8080/api/celulares';
  private urlEndPointImpresoras = 'http://localhost:8080/api/impresoras';
  private urlEndPointValidadores = 'http://localhost:8080/api/validadores';


  constructor(private http:HttpClient) { }

  //Listar 
  getPosList(): Observable<PosModel[]> {
    return this.http.get<PosModel[]>(this.urlEndPointPos);
  }
  getImpresoras(): Observable<ImpresoraModel[]>{
    return this.http.get<ImpresoraModel[]>(this.urlEndPointImpresoras);
  }
  getCelulares(): Observable<CelularModel[]>{
    return this.http.get<CelularModel[]>(this.urlEndPointCelulares);
  }
  getValidadores():Observable<ValidadorModel[]>{
    return this.http.get<ValidadorModel[]>(this.urlEndPointValidadores);
  }
  //Buscar por id
  getPosId(id: number):Observable<PosModel> {
    return this.http.get<PosModel>(this.urlEndPointPos+"/"+id, {headers: this.httpHeaders});
  }
  getImpresoraId(id: number):Observable<ImpresoraModel>{
    return this.http.get<ImpresoraModel>(this.urlEndPointImpresoras+"/"+id, {headers: this.httpHeaders});
  }
  getCelularId(id: number):Observable<CelularModel>{
    return this.http.get<CelularModel>(this.urlEndPointCelulares+"/"+id, {headers: this.httpHeaders});
  }
  getValidadorId(id: number):Observable<ValidadorModel>{
    return this.http.get<ValidadorModel>(this.urlEndPointValidadores+"/"+id,{headers:this.httpHeaders});
  }
  //Insertar 
  insertPos(pos: PosModel){
    console.log('Se ha agregado correctamente el pos');
    return this.http.post(this.urlEndPointPos, pos, {headers: this.httpHeaders})
            .pipe(
              map((resp:any) =>{
                pos.id = resp.id;
                return pos;
              })
            )
  }
  insertImpresora(impresora: ImpresoraModel){
    console.log('Se ha agregado correctamente la impresora');
    return this.http.post(this.urlEndPointImpresoras, impresora, {headers: this.httpHeaders})
            .pipe(
              map((resp:any) =>{
                impresora.id = resp.id;
                return impresora;
              })
            )
  }
  insertCelular(celular: CelularModel){
    console.log('Se ha agregado correctamente el celular');
    return this.http.post(this.urlEndPointCelulares, celular, {headers: this.httpHeaders})
            .pipe(
              map((resp:any) =>{
                celular.id = resp.id;
                console.log("La respuesta es: "+JSON.stringify(resp));
                console.log("El celular es: "+JSON.stringify(celular));
                return celular;
              })
            )
  }
  insertValidador(validador:ValidadorModel){
    console.log('Se ha agregado correctamente el validador');
    return this.http.post(this.urlEndPointValidadores, validador, {headers: this.httpHeaders})
            .pipe(
              map((resp:any) =>{
                validador.id = resp.id;
                return validador;
              })
            )
  }
  //Actualizar
  updatePos(pos: PosModel):Observable<any> {
    console.log('Se ha actualizado correctamente el pos');
    return this.http.put<any>(`${this.urlEndPointPos}/${pos.id}`, pos,{ headers: this.httpHeaders }).pipe(
      catchError(e =>{
        if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  updateImpresora(impresora: ImpresoraModel):Observable<any> {
    console.log('Se ha actualizado correctamente la impresora');
    return this.http.put<any>(`${this.urlEndPointImpresoras}/${impresora.id}`, impresora,{ headers: this.httpHeaders }).pipe(
      catchError(e =>{
        if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  updateCelular(celular:CelularModel):Observable<any> {
    console.log('Se ha actualizado correctamente la impresora');
    return this.http.put<any>(`${this.urlEndPointCelulares}/${celular.id}`, celular,{ headers: this.httpHeaders }).pipe(
      catchError(e =>{
        if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  updateValidador(validador: ValidadorModel):Observable<any> {
    console.log('Se ha actualizado correctamente el validador');
    return this.http.put<any>(`${this.urlEndPointValidadores}/${validador.id}`, validador,{ headers: this.httpHeaders }).pipe(
      catchError(e =>{
        if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  //Eliminar
  deletePos(id?:number): Observable<PosModel> {
    return this.http.delete<PosModel>(`${this.urlEndPointPos}/${id}`,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }
  deleteImpresora(id?:number): Observable<ImpresoraModel> {
    return this.http.delete<ImpresoraModel>(`${this.urlEndPointImpresoras}/${id}`,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }
  deleteCelular(id?:number): Observable<CelularModel> {
    return this.http.delete<CelularModel>(`${this.urlEndPointCelulares}/${id}`,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }
  deleteValidador(id?:number): Observable<ValidadorModel> {
    return this.http.delete<ValidadorModel>(`${this.urlEndPointValidadores}/${id}`,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  //Empresa
  getEmpresaList(): Observable<EmpresaModel[]> {
    return this.http.get<EmpresaModel[]>(this.urlEndPointEmpresa);
  }
  //Modelos
  getModeloPosList(): Observable<ModeloModel[]>{
    return this.http.get<ModeloModel[]>(this.urlEndPointModeloPos);
  }
  getModeloCelulares(): Observable<ModeloModel[]> {
    return this.http.get<ModeloModel[]>(this.urlEndPointModeloCelular);
  }
  getModeloImpresoras(): Observable<ModeloModel[]> {
    return this.http.get<ModeloModel[]>(this.urlEndPointModeloImpresora);
  }
  //Operadores
  getOperadores():Observable<OperadorModel[]>{
    return this.http.get<OperadorModel[]>(this.urlEndPointOperadores);
  }
  getPosxEmpresa(id: number):Observable<PosModel[]> {
    return this.http.get<PosModel[]>(this.urlEndPointPosxEmpresa+"/"+id, {headers: this.httpHeaders});
  }
  getCelularesxEmpresa(id: number):Observable<CelularModel[]> {
    return this.http.get<CelularModel[]>(this.urlEndPointCelularesxEmpresa+"/"+id, {headers: this.httpHeaders});
  }
  getImpresorasxEmpresa(id: number):Observable<ImpresoraModel[]> {
    return this.http.get<ImpresoraModel[]>(this.urlEndPointImpresorasxEmpresa+"/"+id, {headers: this.httpHeaders});
  }



}
