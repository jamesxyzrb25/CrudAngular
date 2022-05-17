import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PosComponent } from './components/pos/pos.component';
import { GestionService } from './services/gestion.service';
import { ImpresorasComponent } from './components/impresoras/impresoras.component';
import { CelularesComponent } from './components/celulares/celulares.component';
import { ValidadoresComponent } from './components/validadores/validadores.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PosComponent,
    ImpresorasComponent,
    CelularesComponent,
    ValidadoresComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [GestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
