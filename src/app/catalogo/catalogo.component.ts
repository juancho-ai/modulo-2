import { Component, OnInit } from '@angular/core';
import { Application, isAndroid } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { RouterExtensions } from '@nativescript/angular';
import { CatalogoDatosService, ProductoItem } from '../services/catalogo-datos.service';

@Component({
  selector: 'ns-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  listaItems: ProductoItem[] = [];
  mensajePlataforma: string = 'Entorno estándar multiplataforma';
  esEntornoAndroid: boolean = false;

  constructor(
    private catalogoService: CatalogoDatosService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.listaItems = this.catalogoService.obtenerItems();

    if (isAndroid) {
      this.esEntornoAndroid = true;
      this.mensajePlataforma = 'Ejecutando en Android: Estilos Material Design y Splash Screen activos';
    }
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  verDetalle(id: number): void {
    this.routerExtensions.navigate(['/catalogo/detalle', id]);
  }
}
