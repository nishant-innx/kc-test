import { Routes } from '@angular/router';

export const routes: Routes = [
    
      {
        path :'postapi',
        loadComponent: () => {
          return import('./components/post-api/post-api.component').then((m) => m.PostApiComponent);
        },
      },
];
