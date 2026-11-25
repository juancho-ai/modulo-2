# Proyecto NativeScript + Angular (Formularios, Animaciones, Gestos y Splash Screen)

Continuación del proyecto modularizado sobre `template-drawer-navigation-ng`, incorporando formularios interactivos, validaciones personalizadas, animaciones nativas, gestos, Pull-to-Refresh, diálogos Action, Toasts y Splash Screen personalizado en Android.

## Cumplimiento de requerimientos del módulo

1. **Página de búsqueda con `ListView` y plantilla anidada con `FlexboxLayout`**:
   - Implementada en `src/app/search/search.component.html` y `src/app/search/search.component.ts`.
2. **Navegación de listado a vista de detalle usando `RouterExtensions.navigate()`**:
   - Al hacer `tap` sobre cualquier elemento del listado en `SearchComponent` (`verDetalle(item.id)`) o en `CatalogoComponent`, redirige mediante `this.routerExtensions.navigate(['/catalogo/detalle', id])` hacia `DetalleItemComponent`.
3. **Plugin `PullToRefresh` en `ListView` agregando elementos aleatorios desde el servicio**:
   - Implementado en `src/app/search/search.component.html` (`<PullToRefresh (refresh)="onPullToRefresh($event)">`) llamando a `CatalogoDatosService.agregarElementoAleatorio()`.
4. **Diálogo tipo `action` (`Dialogs.action`) modificando atributo del objeto**:
   - Botón/ícono de categoría en cada ítem de `src/app/search/search.component.html` (`cambiarCategoria(item, $event)`) que abre `Dialogs.action` y actualiza `item.categoria` en el objeto subyacente.
5. **Notificación `Toast`**:
   - Implementada mediante `Toast.makeText(...).show()` (plugin `nativescript-toast`) al filtrar, actualizar con Pull-to-Refresh, cambiar categoría, guardar ediciones o activar gestos.
6. **Sintaxis `[()]` (*Two-Way Binding*) para formulario de búsqueda y edición**:
   - Campo de búsqueda reactiva `[(ngModel)]="terminoBusqueda"` en `src/app/search/search.component.html`.
   - Formulario interactivo de edición `[(ngModel)]="item.nombre"`, `[(ngModel)]="item.precio"` y `[(ngModel)]="item.descripcion"` en `src/app/catalogo/detalle-item/detalle-item.component.html`.
7. **Validador personalizado mediante Directiva de Angular**:
   - Directiva `MinLongitudSinEspaciosDirective` (`selector: '[nsMinLongitudSinEspacios]'`) en `src/app/directives/min-longitud-sin-espacios.directive.ts`, aplicada en el formulario de edición de `DetalleItemComponent`.
8. **Ícono o botón con detección de gestos (`doubleTap` y `longPress`)**:
   - Ícono de favorito/destacado en `src/app/search/search.component.html` y botón interactivo en `src/app/catalogo/detalle-item/detalle-item.component.html` con eventos `(doubleTap)` y `(longPress)`.
9. **Animación en ícono o botón (`animate` con rotación, escala y color)**:
   - Animación nativa usando `view.animate({ rotate: 360, scale: { x: 1.3, y: 1.3 }, backgroundColor: ... })` al interactuar con el ícono/botón en `SearchComponent` y `DetalleItemComponent`.
10. **Splash Screen personalizado para Android**:
    - Configurado en `App_Resources/Android/src/main/res/drawable-nodpi/splash_screen.xml` con fondo personalizado, formas vectoriales (`layer-list`) e ícono `ic_catalogo_custom.png`, además de estilos en `App_Resources/Android/src/main/res/values/styles.xml`.
