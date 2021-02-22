import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'features',
    pathMatch: 'full'
  },
  {
    path: 'features',
    loadChildren: () =>
      import('./features/features.module').then(m => m.FeaturesModule)
  },
  {
    path: 'reune',
    redirectTo: 'https://200.40.237.40/reunetest/inicio.aspx'
  },  
  {
    path: '**',
    redirectTo: 'features'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
