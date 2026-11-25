import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppWebComponent } from './app.web.component';

const webRoutes: Routes = [
  { path: '', redirectTo: '/catalogo', pathMatch: 'full' },
  {
    path: 'catalogo',
    loadChildren: () => import('./catalogo/catalogo.web.module').then((m) => m.CatalogoWebModule)
  }
];

@NgModule({
  declarations: [AppWebComponent],
  imports: [BrowserModule, RouterModule.forRoot(webRoutes)],
  bootstrap: [AppWebComponent]
})
export class AppWebModule {}
