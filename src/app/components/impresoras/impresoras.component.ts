import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { EmpresaModel } from 'src/app/models/empresa.model';
import { ImpresoraModel } from 'src/app/models/impresora.model';
import { ModeloModel } from 'src/app/models/modelo.model';
import { GestionService } from 'src/app/services/gestion.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-impresoras',
  templateUrl: './impresoras.component.html',
  styleUrls: ['./impresoras.component.css']
})
export class ImpresorasComponent implements OnInit {

  newImpresora = new ImpresoraModel();
  editImpresora = new ImpresoraModel();

  impresoras: ImpresoraModel[] = [];
  empresas: EmpresaModel[] = [];
  modelos: ModeloModel[] = [];

  paginator: any;
  routePaginator: string='/impresoras/page';

  @ViewChild("impresoraForm", { static: false }) impresoraForm?: NgForm;
  @ViewChild("btnCerrar", { static: false }) btnCerrar?: ElementRef;

  constructor(private gestionSrv: GestionService,
              private chRef: ChangeDetectorRef,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.chRef.detectChanges();

    this.activatedRoute.paramMap.subscribe(params =>{
      let page:number = +params.get('page')!;
      if(!page){
        page=0;
      }
      this.gestionSrv.getImpresorasPage(page)
        .subscribe(
          result =>{
            this.impresoras = result.content;
            this.paginator = result;
        });
    });

    /* this.gestionSrv.getImpresoras()
      .subscribe(result =>{
        this.impresoras = result;
      }); */

    this.gestionSrv.getEmpresaList()
      .subscribe((result) =>{
        this.empresas = result;
      });

    this.gestionSrv.getModeloImpresoras()
      .subscribe((result) =>{
        this.modelos = result;
      })
  }
  compareEmpresa(p1:EmpresaModel, p2:EmpresaModel):boolean{
    if(p1 && p2){
      return p1.nombre_empresa === p2.nombre_empresa;
    }
    return false;
  }
  compareModelo(p1:ModeloModel, p2:ModeloModel):boolean{
    if(p1 && p2){
      return p1.nombre_modelo === p2.nombre_modelo;
    }
    return false;
  }

  private cerrarModal(){
    this.btnCerrar?.nativeElement.click();
  }

  cleanForm(){
    this.impresoraForm?.resetForm();
    this.chRef.detectChanges();
    this.newImpresora.id = 0;
    this.newImpresora.fecha_ingreso = moment().format('YYYY-MM-DD');
  }

  insertImpresora({value}: {value: ImpresoraModel}){
    this.gestionSrv.insertImpresora(value)
      .subscribe(() => {
          this.impresoras.push(value);
          swal('Nueva Impresora', `La impresora id: ${value.id}| Nro de serie: ${value.codigo} ha sido creado con éxito`, 'success');
    });
    this.impresoraForm?.resetForm();
    this.cerrarModal();
    this.ngOnInit();
  }

  onUpdateModalImpresora(id?: number){
    if(id){
      this.gestionSrv.getImpresoraId(id)
        .subscribe((data) =>{
          this.newImpresora = data;
      });
    }else{
      swal('Atención',`El id: ${this.newImpresora.id} no existe`,'error');
    }
  }

  updateImpresora(){
    this.editImpresora = this.newImpresora;
    console.log("Update pos: "+this.editImpresora);
    this.gestionSrv.updateImpresora(this.editImpresora)
      .subscribe(() =>{
        this.impresoras= this.impresoras.map(imp=> imp.id === this.editImpresora.id ?{...this.impresoras, ...this.editImpresora}:imp);
        swal('Impresora Actualizada',
        `ID: ${this.editImpresora.id}
        Nro de Serie: ${this.editImpresora.codigo}
        Modelo: ${this.editImpresora.modelo?.nombre_modelo}
        Empresa: ${this.editImpresora.empresa?.nombre_empresa}
        Observacion: ${this.editImpresora.observacion}`,'success');
        this.impresoraForm?.resetForm();
        this.cerrarModal();
      });
  }

  deleteImpresora(impresora: ImpresoraModel){
    swal({
      title:"Está seguro?",
      text:`¿Seguro que desea eliminar la impresora ${impresora.codigo} de ${impresora.empresa?.nombre_empresa}?`,
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

        this.gestionSrv.deleteImpresora(impresora.id).subscribe(
          () =>{
            this.impresoras= this.impresoras.filter(imp => imp!== impresora)
            swal(
              'Impresora eliminada!',
              `Impresora ${impresora.codigo} eliminada con éxito.`,
              'success'
            )
          });
      }
    })
  }
}

