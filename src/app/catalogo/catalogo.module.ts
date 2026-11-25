import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { CatalogoComponent } from './catalogo.component';
import { DetalleItemComponent } from './detalle-item/detalle-item.component';
import { MinLongitudSinEspaciosDirective } from '../directives/min-longitud-sin-espacios.directive';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    CatalogoRoutingModule
  ],
  declarations: [
    CatalogoComponent,
    DetalleItemComponent,
    MinLongitudSinEspaciosDirective
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CatalogoModule {}
