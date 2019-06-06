/* PSG  Monitoreochekermonerario Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitoreochekermonerarioAdministrar } from './administrar/monitoreochekermonerario-administrar';
import { MonitoreochekermonerarioAgregarForm } from './agregar/monitoreochekermonerario-agregar-form';
import { MonitoreochekermonerarioEditarForm } from './editar/monitoreochekermonerario-editar-form';
import { MonitoreochekermonerarioEliminarForm } from './eliminar/monitoreochekermonerario-eliminar-form';

const routes: Routes = [
  {
    path: '',
    component: MonitoreochekermonerarioAdministrar,
  },
  {
    path: 'administrar/:id',
    component: MonitoreochekermonerarioAdministrar,
  },
  {
    path: 'agregar',
    component: MonitoreochekermonerarioAgregarForm,
  },
  {
    path: 'agregar/:id',
    component: MonitoreochekermonerarioAgregarForm,
  },
  {
    path: 'editar/:id',
    component: MonitoreochekermonerarioEditarForm,
  },
  {
    path: 'eliminar/:id',
    component: MonitoreochekermonerarioEliminarForm,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitoreochekermonerarioRoutingModule {}
