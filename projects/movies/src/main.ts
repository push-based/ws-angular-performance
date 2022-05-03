import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Exercise 2: Wrap platformBrowserDynamic into setTimeout
platformBrowserDynamic()
  // Exercise 5: Add {ngZone: 'noop'} as second argument
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
