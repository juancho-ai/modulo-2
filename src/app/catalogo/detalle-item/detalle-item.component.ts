import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Color, GestureEventData, View } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import * as Toast from 'nativescript-toast';
import { CatalogoDatosService, ProductoItem } from '../../services/catalogo-datos.service';

@Component({
  selector: 'ns-detalle-item',
  templateUrl: './detalle-item.component.html'
})
export class DetalleItemComponent implements OnInit {
  item: ProductoItem | undefined;
  @ViewChild('iconoDetalle', { static: false }) iconoDetalleRef: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private catalogoService: CatalogoDatosService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    const encontrado = this.catalogoService.obtenerItemPorId(id);
    if (encontrado) {
      this.item = { ...encontrado };
    }
  }

  guardarCambios(formValido: boolean): void {
    if (!formValido || !this.item) {
      Toast.makeText('Corrige los errores del formulario antes de guardar').show();
      return;
    }

    this.catalogoService.actualizarItem(this.item);
    this.animarIconoPrincipal();
    Toast.makeText('Cambios guardados correctamente').show();
  }

  // Requisito 8 y 9: Gesto doubleTap/longPress y animación en ícono
  onIconoDoubleTap(args: GestureEventData): void {
    this.animarIconoPrincipal();
    Toast.makeText('Animación activada por DoubleTap').show();
  }

  onIconoLongPress(args: GestureEventData): void {
    this.animarIconoPrincipal();
    Toast.makeText('Animación activada por LongPress').show();
  }

  animarIconoPrincipal(): void {
    const view: View = this.iconoDetalleRef?.nativeElement;
    if (!view) return;

    view
      .animate({
        rotate: 360,
        scale: { x: 1.25, y: 1.25 },
        backgroundColor: new Color('#dbeafe'),
        duration: 400
      })
      .then(() =>
        view.animate({
          rotate: 0,
          scale: { x: 1, y: 1 },
          backgroundColor: new Color('#ffffff'),
          duration: 250
        })
      );
  }

  volver(): void {
    this.routerExtensions.back();
  }
}
