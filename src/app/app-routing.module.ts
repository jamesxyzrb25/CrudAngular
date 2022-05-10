import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CelularesComponent } from './components/celulares/celulares.component';
import { ImpresorasComponent } from './components/impresoras/impresoras.component';
import { PosComponent } from './components/pos/pos.component';
import { ValidadoresComponent } from './components/validadores/validadores.component';

const routes: Routes = [
  {path: '', redirectTo:'', pathMatch:'full'},
  {path:'pos', component: PosComponent},
  {path:'impresoras', component: ImpresorasComponent},
  {path:'celulares', component:CelularesComponent},
  {path:'validadores', component:ValidadoresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
