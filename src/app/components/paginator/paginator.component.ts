import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input()
  paginator: any;
  @Input()
  routePaginator:string ='';

  pages: number[] = [];
  from:number=0;
  to: number=0;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    let paginatorActualizado = changes['paginator'];
    if(paginatorActualizado.previousValue){
      this.initPaginator();
    }
  }

  ngOnInit(): void {
    this.initPaginator();
  }

  private initPaginator(){
    this.from= Math.min(Math.max(1, this.paginator.number-4), this.paginator.totalPages-5);
    this.to= Math.max(Math.min(this.paginator.totalPages, this.paginator.number+4),6);
    if(this.paginator.totalPages>5){
      this.pages = new Array(this.to-this.from+1).fill(0).map((_valor, indice) => indice+this.from);
    }else{
      this.pages = new Array(this.paginator.totalPages).fill(0).map((_valor, indice) => indice+1);
    }
  }

}
