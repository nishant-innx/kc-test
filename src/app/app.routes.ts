import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
          return import('./app.component').then((m) => m.AppComponent);
        },
      },
      {
        path :'postapi',
        loadComponent: () => {
          return import('./components/post-api/post-api.component').then((m) => m.PostApiComponent);
        },
      },
];
