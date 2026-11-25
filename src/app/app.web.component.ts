import { Component } from '@angular/core';

@Component({
  selector: 'ns-root',
  template: `
    <div style="display:flex; min-height:100vh;">
      <aside style="width:240px; background:#1e3a8a; color:#fff; padding:20px;">
        <h2>App Multiplataforma</h2>
        <p style="font-size:12px; opacity:0.8;">Coexistencia Web + Mobile</p>
        <nav style="margin-top:24px; display:flex; flex-direction:column; gap:12px;">
          <a routerLink="/catalogo" style="color:#fff; text-decoration:none; font-weight:bold;">Catálogo (Nuevo Módulo)</a>
        </nav>
      </aside>
      <main style="flex:1; padding:24px;">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppWebComponent {}
