import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CelularesComponent } from './components/celulares/celulares.component';
import { ImpresorasComponent } from './components/impresoras/impresoras.component';
import { PosComponent } from './components/pos/pos.component';
import { ValidadoresComponent } from './components/validadores/validadores.component';

const routes: Routes = [
  {path: '', redirectTo:'', pathMatch:'full'},
  {path:'pos', component: PosComponent},
  {path:'pos/page/:page', component: PosComponent},
  {path:'impresoras', component: ImpresorasComponent},
  {path:'impresoras/page/:page', component: ImpresorasComponent},
  {path:'celulares', component:CelularesComponent},
  {path:'celulares/page/:page', component:CelularesComponent},
  {path:'validadores', component:ValidadoresComponent},
  {path:'validadores/page/:page', component:ValidadoresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
