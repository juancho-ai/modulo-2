import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoWebComponent } from './catalogo.web.component';

const routes: Routes = [
  { path: '', component: CatalogoWebComponent }
];

@NgModule({
  declarations: [CatalogoWebComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class CatalogoWebModule {}
