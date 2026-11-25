import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { CatalogoComponent } from './catalogo.component';
import { DetalleItemComponent } from './detalle-item/detalle-item.component';

const routes: Routes = [
  { path: '', component: CatalogoComponent },
  { path: 'detalle/:id', component: DetalleItemComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class CatalogoRoutingModule {}
