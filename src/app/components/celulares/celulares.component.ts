import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { CelularModel } from 'src/app/models/celular.model';
import { EmpresaModel } from 'src/app/models/empresa.model';
import { ModeloModel } from 'src/app/models/modelo.model';
import { OperadorModel } from 'src/app/models/operador.model';
import { GestionService } from 'src/app/services/gestion.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-celulares',
  templateUrl: './celulares.component.html',
  styleUrls: ['./celulares.component.css']
})
export class CelularesComponent implements OnInit {

  newCelular = new CelularModel();
  editCelular = new CelularModel();

  celulares: CelularModel[] = [];
  empresas: EmpresaModel[] = [];
  modelos: ModeloModel[] = [];
  operadores: OperadorModel[] = [];

  @ViewChild("celularForm", { static: false }) celularForm?: NgForm;
  @ViewChild("btnCerrar", { static: false }) btnCerrar?: ElementRef;

  constructor(private gestionSrv: GestionService,
              private chRef: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.gestionSrv.getCelulares()
      .subscribe(result =>{
        this.celulares = result;
        this.chRef.detectChanges();
        console.log(this.celulares);
      });

      this.gestionSrv.getEmpresaList()
      .subscribe((result) =>{
        this.empresas = result;
      });

    this.gestionSrv.getModeloCelulares()
      .subscribe((result) =>{
        this.modelos = result;
      })

    this.gestionSrv.getOperadores()
      .subscribe(result =>{
        this.operadores = result;
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
  compareOperador(p1: OperadorModel, p2: OperadorModel): boolean {
    if (p1 && p2) {
      return p1.nombre_operador === p2.nombre_operador;
    }
    return false;
  }
  private cerrarModal(){
    this.btnCerrar?.nativeElement.click();
  }
  cleanForm() {
    this.celularForm?.resetForm();
    this.chRef.detectChanges();
    this.newCelular.id = 0;
    this.newCelular.fecha_ingreso = moment().format('YYYY-MM-DD');
  }

  insertCelular({value}: {value: CelularModel}){
    this.gestionSrv.insertCelular(value)
      .subscribe(() => {
          this.celulares.push(value);
          swal('Nuevo celular', `IMEI: ${value.nro_imei},Numero cel: ${value.nro_celular}, Operador: ${value.operador} ha sido creado con éxito`, 'success');
    });
    this.celularForm?.resetForm();
    this.cerrarModal();
    this.ngOnInit();
  }

  onUpdateModalCelular(id?: number){
    if(id){
      this.gestionSrv.getCelularId(id)
        .subscribe((data) =>{
          this.newCelular = data;
      });
    }else{
      swal('Atención',`El id: ${this.newCelular.id} no existe`,'error');
    }
  }

  updateCelular(){
    this.editCelular = this.newCelular;
    this.gestionSrv.updateCelular(this.editCelular)
      .subscribe(() =>{
        this.celulares= this.celulares.map(cel=> cel.id === this.editCelular.id ?{...this.celulares, ...this.editCelular}:cel);
        swal('Celular Actualizado',
        `ID: ${this.editCelular.id}
        Nro de IMEI: ${this.editCelular.nro_imei}
        Modelo: ${this.editCelular.modelo?.nombre_modelo}
        Empresa: ${this.editCelular.empresa?.nombre_empresa}
        Observacion: ${this.editCelular.observacion}`,'success');
        this.celularForm?.resetForm();
        this.cerrarModal();
      });
  }

  deleteCelular(celular: CelularModel){
    swal({
      title:"Está seguro?",
      text:`¿Seguro que desea eliminar el celular ${celular.nro_imei} de ${celular.empresa?.nombre_empresa}?`,
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

        this.gestionSrv.deleteCelular(celular.id).subscribe(
          () =>{
            this.celulares= this.celulares.filter(imp => imp!== celular)
            swal(
              'Celular eliminado!',
              `Celular ${celular.nro_imei} eliminado con éxito.`,
              'success'
            )
          });
      }
    })
  }

}
