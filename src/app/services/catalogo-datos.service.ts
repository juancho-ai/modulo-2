import { Injectable } from '@angular/core';

export interface ProductoItem {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  descripcion: string;
  favorito: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CatalogoDatosService {
  private items: ProductoItem[] = [
    {
      id: 1,
      nombre: 'Arquitectura Multiplataforma',
      categoria: 'Mobile & Web',
      precio: 120,
      descripcion: 'Configuración compartida entre NativeScript y Angular Web mediante módulos desacoplados.',
      favorito: true
    },
    {
      id: 2,
      nombre: 'Navegación RadSideDrawer',
      categoria: 'UI / UX',
      precio: 85,
      descripcion: 'Menú lateral modularizado con carga diferida (Lazy Loading) de features.',
      favorito: false
    },
    {
      id: 3,
      nombre: 'Estilos Nativos por Plataforma',
      categoria: 'Android / iOS',
      precio: 95,
      descripcion: 'Sobrecarga de hojas de estilo (.android.css y .ios.css) para personalizar cada sistema operativo.',
      favorito: false
    },
    {
      id: 4,
      nombre: 'Formularios y Animaciones',
      categoria: 'Core SDK',
      precio: 110,
      descripcion: 'Two-way binding, directivas de validación personalizada y animaciones fluidas.',
      favorito: true
    }
  ];

  private readonly poolAleatorios: Array<Omit<ProductoItem, 'id' | 'favorito'>> = [
    {
      nombre: 'PullToRefresh Nativo',
      categoria: 'Plugins',
      precio: 75,
      descripcion: 'Actualización gestual deslizando hacia abajo en listados dinámicos.'
    },
    {
      nombre: 'Diálogos Action y Toasts',
      categoria: 'UI / UX',
      precio: 60,
      descripcion: 'Selección rápida de categorías y notificaciones no intrusivas al usuario.'
    },
    {
      nombre: 'Detección de Gestos',
      categoria: 'Interacción',
      precio: 90,
      descripcion: 'Respuesta a doubleTap y longPress sobre componentes visuales.'
    },
    {
      nombre: 'Splash Screen Vectorial',
      categoria: 'Android / iOS',
      precio: 105,
      descripcion: 'Pantalla de bienvenida personalizada en drawable-nodpi/splash_screen.xml.'
    }
  ];

  obtenerItems(): ProductoItem[] {
    return this.items;
  }

  obtenerItemPorId(id: number): ProductoItem | undefined {
    return this.items.find((item) => item.id === id);
  }

  agregarElementoAleatorio(): ProductoItem {
    const indice = Math.floor(Math.random() * this.poolAleatorios.length);
    const plantilla = this.poolAleatorios[indice];
    const nuevoId = this.items.length > 0 ? Math.max(...this.items.map((i) => i.id)) + 1 : 1;

    const nuevoItem: ProductoItem = {
      id: nuevoId,
      nombre: `${plantilla.nombre} #${nuevoId}`,
      categoria: plantilla.categoria,
      precio: plantilla.precio + Math.floor(Math.random() * 25),
      descripcion: plantilla.descripcion,
      favorito: false
    };

    this.items = [nuevoItem, ...this.items];
    return nuevoItem;
  }

  actualizarItem(itemActualizado: ProductoItem): void {
    const idx = this.items.findIndex((i) => i.id === itemActualizado.id);
    if (idx !== -1) {
      this.items[idx] = { ...itemActualizado };
    }
  }
}
