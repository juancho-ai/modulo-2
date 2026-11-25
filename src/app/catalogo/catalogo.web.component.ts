import { Component, OnInit } from '@angular/core';
import { CatalogoDatosService, ProductoItem } from '../services/catalogo-datos.service';

@Component({
  selector: 'ns-catalogo-web',
  template: `
    <h2>Catálogo de Funcionalidades (Versión Web)</h2>
    <p>Consumiendo el mismo servicio global <strong>CatalogoDatosService</strong>:</p>
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(240px, 1fr)); gap:16px; margin-top:16px;">
      <div *ngFor="let item of listaItems" style="background:#fff; padding:16px; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.08);">
        <span style="font-size:12px; color:#2563eb; font-weight:bold;">{{ item.categoria }}</span>
        <h3 style="margin:8px 0;">{{ item.nombre }}</h3>
        <p style="font-size:14px; color:#4b5563;">{{ item.descripcion }}</p>
        <strong>$ {{ item.precio }} USD</strong>
      </div>
    </div>
  `
})
export class CatalogoWebComponent implements OnInit {
  listaItems: ProductoItem[] = [];

  constructor(private catalogoService: CatalogoDatosService) {}

  ngOnInit(): void {
    this.listaItems = this.catalogoService.obtenerItems();
  }
}
