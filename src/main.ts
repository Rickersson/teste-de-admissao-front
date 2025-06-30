import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { KeycloakService } from './app/services/keycloak.service';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  const keycloakService = new KeycloakService();
keycloakService.init().then(() => {
  console.log('Keycloak iniciado');
});