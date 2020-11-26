import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../core/auth/auth-guard.service';

import { VistaPrincipalComponent } from './vista-principal/vista-principal/vista-principal.component';

//import { VistaMapaComponent } from './vista-mapa/vista-mapa/vista-mapa.component';

//import { VistaAdministrativoComponent } from './vista-administrativo/vista-administrativo/vista-administrativo.component';

import { VistaLoginComponent } from './vista-login/vista-login/vista-login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full'
  },
  {
    path: 'principal',
    component: VistaPrincipalComponent,
    canActivate: [AuthGuardService]
  },
  /*{
    path: 'mapa',
    component: VistaMapaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'administrativo',
    component: VistaAdministrativoComponent,
    canActivate: [AuthGuardService]
  },*/
  {
    path: 'login',
    component: VistaLoginComponent
  },
  {
    path: '**',
    redirectTo: 'principal'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {}
