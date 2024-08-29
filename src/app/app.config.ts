import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { appRoutes } from './app.routes';
import { StateService } from './services/state.service';
import { LocalStorageService } from './services/local-storage.service';
import { AuthService } from './services/auth.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { errorInterceptor } from './interceptors/error.interceptor';
import { jwtInterceptor } from './interceptors/jwt.interceptor';


export function initializeApp(state:StateService, storage:LocalStorageService, auth:AuthService) {
  return (): Promise<unknown> => {
    const token = storage.getItem('token');
    if(token !== null){
      state.$token.set(token);
      auth.loadState();
    }
    return Promise.resolve();
  }
}


export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    ConfirmationService,
    DialogService,
    provideRouter(appRoutes, withViewTransitions()),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([jwtInterceptor, errorInterceptor]),
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [StateService, LocalStorageService, AuthService],
    },
  ],
};
