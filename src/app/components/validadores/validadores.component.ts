import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { CelularModel } from 'src/app/models/celular.model';
import { EmpresaModel } from 'src/app/models/empresa.model';
import { ImpresoraModel } from 'src/app/models/impresora.model';
import { PosModel } from 'src/app/models/pos.model';
import { ValidadorModel } from 'src/app/models/validador.model';
import { GestionService } from 'src/app/services/gestion.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-validadores',
  templateUrl: './validadores.component.html',
  styleUrls: ['./validadores.component.css']
})
export class ValidadoresComponent implements OnInit {

  newValidador = new ValidadorModel();
  editValidador = new ValidadorModel();

  validadores: ValidadorModel[] = [];
  celulares: CelularModel[] = [];
  posList: PosModel[] = [];
  impresoras: ImpresoraModel[] = [];
  empresas: EmpresaModel[]=[];

  paginator:any;
  routePaginator:string ='/validadores/page';

  @ViewChild("validadorForm", { static: false }) validadorForm?: NgForm;
  @ViewChild("btnCerrar", { static: false }) btnCerrar?: ElementRef;

  constructor(private gestionSrv: GestionService,
              private chRef: ChangeDetectorRef,
              private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {

    this.chRef.detectChanges();

    this.activatedRoute.paramMap.subscribe(params =>{
      let page:number = +params.get('page')!;
      if(!page){
        page=0;
      }
      this.gestionSrv.getValidadoresPage(page)
        .subscribe(
          result =>{
            this.validadores = result.content;
            this.paginator = result;
        });
    });

    /* this.gestionSrv.getValidadores()
      .subscribe(result =>{
        this.validadores = result;
      }) */

     this.gestionSrv.getEmpresaList()
      .subscribe((result) =>{
        this.empresas = result;
        this.chRef.detectChanges();
      }); 
  }

  getEquiposxEmpresa(event: any){

    this.gestionSrv.getPosxEmpresa(event.target['selectedIndex'])
      .subscribe(result =>{
        this.posList = result;
      });
    
    this.gestionSrv.getCelularesxEmpresa(event.target['selectedIndex'])
      .subscribe(result =>{
        this.celulares = result;
        this.chRef.detectChanges();

      });

    this.gestionSrv.getImpresorasxEmpresa(event.target['selectedIndex'])
      .subscribe(result =>{
        this.impresoras = result;
      });
    
  } 

  compareEmpresa(e1:EmpresaModel, e2:EmpresaModel):boolean{
    if(e1 && e2){
      return e1.nombre_empresa === e2.nombre_empresa;
    }
    return false;
  }

  compareCelularImei(c1:CelularModel, c2:CelularModel):boolean{
    if(c1 && c2){
      return c1.nro_imei === c2.nro_imei;
    }
    return false;
  }
  compareCelularNro(c1:CelularModel, c2:CelularModel):boolean{
    if(c1 && c2){
      return c1.nro_cel === c2.nro_cel;
    }
    return false;
  }
  compareImpresora(imp1:ImpresoraModel, imp2: ImpresoraModel):boolean{
    if(imp1 && imp2){
      return imp1.codigo === imp2.codigo;
    }
    return false;
  }
  comparePos(p1: PosModel, p2: PosModel):boolean{
    if(p1 && p2){
      return p1.nro_serie == p2.nro_serie;
    }
    return false;
  }

  private cerrarModal(){
    this.btnCerrar?.nativeElement.click();
  }

  cleanForm(){
    this.validadorForm?.resetForm();
    this.chRef.detectChanges();
    this.newValidador.id=0;
    this.newValidador.fecha_salida = moment().format('YYYY-MM-DD');

  }

  insertValidador({value}: {value: ValidadorModel}){
    this.gestionSrv.insertValidador(value)
      .subscribe(() => {
          
          this.validadores.push(value);
          swal('Nuevo validador', `BD: ${value.codigo_bd},
           Empresa: ${value.impresora?.empresa}, 
           IMEI: ${value.celular?.nro_imei},
           Celular: ${value.celular?.nro_cel},
           Modelo: ${value.celular?.modelo?.nombre_modelo},
           usaboka: ${value.impresora?.codigo},
           Serie pos: ${value.pos?.nro_serie},
           Fecha de salida: ${value.fecha_salida} ha sido creado con éxito`, 'success');
    });
    this.validadorForm?.resetForm();
    this.cerrarModal();
    this.ngOnInit();
  }

  onUpdateModalValidador(id?: number){
    if(id){
      this.gestionSrv.getValidadorId(id)
        .subscribe((data) =>{
          this.newValidador = data;
      });
    }else{
      swal('Atención',`El id: ${this.newValidador.id} no existe`,'error');
    }
  }

  updateValidador(){
    this.editValidador = this.newValidador;
    this.gestionSrv.updateValidador(this.editValidador)
      .subscribe(() =>{
        this.validadores= this.validadores.map(val=> val.id === this.editValidador.id ?{...this.validadores, ...this.editValidador}:val);
        swal('Celular Actualizado',
        `ID: ${this.editValidador.id}
        BD: ${this.editValidador.codigo_bd}
        Empresa: ${this.editValidador.impresora?.empresa?.nombre_empresa}
        Observacion: ${this.editValidador.observacion}`,'success');
        this.validadorForm?.resetForm();
        this.cerrarModal();
      });
  }

  deleteValidador(validador: ValidadorModel){
    swal({
      title:"Está seguro?",
      text:`¿Seguro que desea eliminar el validador ${validador.codigo_bd} de ${validador.impresora?.empresa?.nombre_empresa}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) =>{
      if(result.value){

        this.gestionSrv.deleteValidador(validador.id).subscribe(
          () =>{
            this.validadores= this.validadores.filter(val => val!== validador)
            swal(
              'Validador eliminado!',
              `Validador BD: ${validador.codigo_bd} eliminado con éxito.`,
              'success'
            )
          });
      }
    })
  }

}

