/* PSG  Fideicomiso Routing */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FideicomisoAdministrar } from './administrar/fideicomiso-administrar';

const routes: Routes = [
  {
    path: '',
    component: FideicomisoAdministrar,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FideicomisoRoutingModule {}
