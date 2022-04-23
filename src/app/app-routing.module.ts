import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpresorasComponent } from './components/impresoras/impresoras.component';
import { PosComponent } from './components/pos/pos.component';

const routes: Routes = [
  {path: '', redirectTo:'', pathMatch:'full'},
  {path:'pos', component: PosComponent},
  {path:'impresoras', component: ImpresorasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
