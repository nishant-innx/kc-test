import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import {
  AuthConfig,
  OAuthService,
  provideOAuthClient,
} from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:8081/realms/first_test',
  tokenEndpoint:
    'http://localhost:8081/realms/first_test/protocol/openid-connect/token',
  redirectUri: window.location.origin,
  clientId: 'web-app-client',
  responseType: 'code',
  scope: 'openid profile',
};
function initializeOAuth(oauthService: OAuthService): Promise<void> {
  return new Promise((resolve) => {
    oauthService.configure(authCodeFlowConfig);
    oauthService.setupAutomaticSilentRefresh();
    oauthService.loadDiscoveryDocumentAndLogin().then(() => resolve());
  });
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideOAuthClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (oauthService: OAuthService) => {
        return () => {
          initializeOAuth(oauthService);
        };
      },
      multi: true,
      deps: [OAuthService],
    },
  ],
};


// import {
//   ApplicationConfig,
//   provideZoneChangeDetection,
//   inject,
// } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { provideHttpClient } from '@angular/common/http';
// import {
//   AuthConfig,
//   OAuthService,
//   provideOAuthClient,
// } from 'angular-oauth2-oidc';
// import { provideAppInitializer } from '@angular/core';

// export const authCodeFlowConfig: AuthConfig = {
//   issuer: 'http://localhost:8081/realms/first_test',
//   tokenEndpoint:
//     'http://localhost:8081/realms/first_test/protocol/openid-connect/token',
//   redirectUri: window.location.origin,
//   clientId: 'web-app-client',
//   responseType: 'code',
//   scope: 'openid profile',
// };

// function initializeOAuth(oauthService: OAuthService): Promise<void> {
//   return new Promise((resolve) => {
//     oauthService.configure(authCodeFlowConfig);
//     oauthService.setupAutomaticSilentRefresh();
//     oauthService.loadDiscoveryDocumentAndLogin().then(() => resolve());
//   });
// }

// const initializeAppFn = () => {
//   const oauthService = inject(OAuthService);
//   console.log('Initializing OAuth service');
//   return initializeOAuth(oauthService);
// };

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     provideHttpClient(),
//     provideOAuthClient(),
//     provideAppInitializer(initializeAppFn),
//   ],
// };


