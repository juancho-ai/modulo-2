import { Component, OnInit } from '@angular/core';
import { Application, Color, Dialogs, GestureEventData, View } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as Toast from 'nativescript-toast';
import { CatalogoDatosService, ProductoItem } from '../services/catalogo-datos.service';

@Component({
  selector: 'Search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  terminoBusqueda: string = '';
  itemsOriginales: ProductoItem[] = [];
  itemsFiltrados: ProductoItem[] = [];

  constructor(
    private catalogoService: CatalogoDatosService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.itemsOriginales = this.catalogoService.obtenerItems();
    this.filtrarItems();
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  // Requisito 6: Two-way binding [(ngModel)] en búsqueda
  filtrarItems(): void {
    const filtro = this.terminoBusqueda.trim().toLowerCase();
    if (!filtro) {
      this.itemsFiltrados = [...this.itemsOriginales];
    } else {
      this.itemsFiltrados = this.itemsOriginales.filter(
        (item) =>
          item.nombre.toLowerCase().includes(filtro) ||
          item.categoria.toLowerCase().includes(filtro)
      );
    }
  }

  onBuscarTap(): void {
    this.filtrarItems();
    // Requisito 5: Toast informativo
    Toast.makeText(`Resultados encontrados: ${this.itemsFiltrados.length}`).show();
  }

  // Requisito 2: Navegación desde el listado a la vista de detalle con RouterExtensions.navigate
  onItemTap(args: any): void {
    const itemSeleccionado = this.itemsFiltrados[args.index];
    if (itemSeleccionado) {
      this.routerExtensions.navigate(['/catalogo/detalle', itemSeleccionado.id], {
        transition: { name: 'slide' }
      });
    }
  }

  // Requisito 3: Pull to refresh agregando elementos aleatorios del servicio
  onPullToRefresh(args: any): void {
    const pullRefresh = args.object;
    setTimeout(() => {
      const nuevo = this.catalogoService.agregarElementoAleatorio();
      this.cargarDatos();
      pullRefresh.refreshing = false;
      Toast.makeText(`Nuevo elemento agregado: ${nuevo.nombre}`).show();
    }, 600);
  }

  // Requisito 4: Diálogo de tipo "action" que modifica un atributo del objeto subyacente
  cambiarCategoria(item: ProductoItem, args: any): void {
    Dialogs.action({
      title: 'Seleccionar Categoría',
      message: `Elige una nueva categoría para "${item.nombre}"`,
      cancelButtonText: 'Cancelar',
      actions: ['Mobile & Web', 'UI / UX', 'Android / iOS', 'Core SDK', 'Plugins']
    }).then((categoriaSeleccionada) => {
      if (categoriaSeleccionada && categoriaSeleccionada !== 'Cancelar') {
        item.categoria = categoriaSeleccionada;
        this.catalogoService.actualizarItem(item);
        Toast.makeText(`Categoría actualizada a: ${categoriaSeleccionada}`).show();
      }
    });
  }

  // Requisito 8 y 9: Detección de gestos (doubleTap / longPress) y animación en ícono
  onFavoritoDoubleTap(item: ProductoItem, args: GestureEventData): void {
    item.favorito = !item.favorito;
    this.catalogoService.actualizarItem(item);
    this.animarIcono(args.view, item.favorito);
    Toast.makeText(
      item.favorito ? `Marcado como favorito (DoubleTap)` : `Quitado de favoritos`
    ).show();
  }

  onFavoritoLongPress(item: ProductoItem, args: GestureEventData): void {
    this.animarIcono(args.view, true);
    Toast.makeText(`LongPress detectado en: ${item.nombre} ($${item.precio})`).show();
  }

  private animarIcono(view: View, activo: boolean): void {
    if (!view) return;
    view
      .animate({
        rotate: 360,
        scale: { x: 1.35, y: 1.35 },
        backgroundColor: activo ? new Color('#fef08a') : new Color('#e2e8f0'),
        duration: 300
      })
      .then(() =>
        view.animate({
          rotate: 0,
          scale: { x: 1, y: 1 },
          duration: 200
        })
      );
  }
}
