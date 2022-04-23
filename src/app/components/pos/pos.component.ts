import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmpresaModel } from 'src/app/models/empresa.model';
import { ModeloModel } from 'src/app/models/modelo.model';
import { PosModel } from 'src/app/models/pos.model';
import { GestionService } from 'src/app/services/gestion.service';

import swal from 'sweetalert2';
import * as moment from 'moment';


@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  newPos = new PosModel();
  editPos = new PosModel();

  posList: PosModel[] = [];
  empresas: EmpresaModel[] = [];
  modelos: ModeloModel[] = [];

  @ViewChild("posForm", { static: false }) posForm?: NgForm;
  @ViewChild("btnCerrar", { static: false }) btnCerrar?: ElementRef;

  constructor(private gestionSrv: GestionService,
              private chRef: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.gestionSrv.getPosList()
      .subscribe(result =>{
        this.posList = result;
        this.chRef.detectChanges();
      });
    
    this.gestionSrv.getEmpresaList()
      .subscribe((result) =>{
      this.empresas = result;
      });

    this.gestionSrv.getModeloPosList()
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

  insertPos({value}: {value: PosModel}) {
    this.gestionSrv.insertPos(value)
      .subscribe(() => {
          this.posList.push(value);
          console.log(value);
          swal('Nuevo POS', `El POS id: ${value.id}| Nro de serie: ${value.nro_serie} ha sido creado con éxito`, 'success');

    });
    this.posForm?.resetForm();
    this.cerrarModal();
    this.ngOnInit();
  }
  private cerrarModal(){
    this.btnCerrar?.nativeElement.click();
  }
  cleanForm(){
    this.posForm?.resetForm();
    this.chRef.detectChanges();
    this.newPos.id = 0;
    this.newPos.fecha_ingreso = moment().format('YYYY-MM-DD');
  }
  onUpdateModalPos(id?:number){
    if(id){
      this.gestionSrv.getPosId(id)
        .subscribe((data) =>{
          this.newPos = data;
      });
    }else{
      swal('Atención',`El id: ${id} no existe`,'error');
    }
  }
  updatePos(){
    this.editPos = this.newPos;
    this.gestionSrv.updatePos(this.editPos)
      .subscribe(() =>{
        this.posList= this.posList.map(p => p.id === this.editPos.id ?{...this.posList, ...this.editPos}:p);
        swal('Pos Actualizado',
        `ID: ${this.editPos.id}
        Nro de Serie: ${this.editPos.nro_serie}
        Modelo: ${this.editPos.modelo?.nombre_modelo}
        Empresa: ${this.editPos.empresa?.nombre_empresa}
        Fecha de ingreso: ${this.editPos.fecha_ingreso}
        Observacion: ${this.editPos.observacion}`,'success');
        this.posForm?.resetForm();
        this.cerrarModal();
      });
  }

  deletePos(pos: PosModel){
    swal({
      title:"Está seguro?",
      text:`¿Seguro que desea eliminar el pos ${pos.nro_serie} de ${pos.empresa?.nombre_empresa}?`,
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
        this.gestionSrv.deletePos(pos.id).subscribe(
          () =>{
            this.posList= this.posList.filter(p => p!== pos)
            swal(
              'Pos Eliminado!',
              `Pos ${pos.nro_serie} eliminado con éxito.`,
              'success'
            );
          });
      }
    })
  }

}
