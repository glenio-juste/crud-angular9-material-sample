import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { HomeComponent } from './views/home/home.component';

// const routes: Routes = []; Na criação do projeto vem assim

// Registro de Rotas
const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "products",
    component: ProductCrudComponent
  }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
