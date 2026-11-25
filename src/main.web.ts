import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppWebModule } from './app/app.web.module';

platformBrowserDynamic()
  .bootstrapModule(AppWebModule)
  .catch((err) => console.error(err));
