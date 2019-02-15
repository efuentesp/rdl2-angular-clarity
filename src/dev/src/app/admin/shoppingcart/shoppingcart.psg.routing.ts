/* PSG  Afiliado Routing */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingcartDemo } from './shoppingcart.psg';
import { Shoppingcart } from './shoppingcart/shoppingcart';

// import { AfiliadoDemo } from './afiliado.psg';
// import { AfiliadoAgregarDemo } from './agregar/afiliado-agregar';
// import { AfiliadoAgregarFormDemo } from './agregar/afiliado-agregar-form';
// import { AfiliadoAdministrarDemo } from './administrar/afiliado-administrar';
// import { AfiliadoEditarFormDemo } from './editar/afiliado-editar-form';
// import { AfiliadoEliminarFormDemo } from './eliminar/afiliado-eliminar-form';

// import { AfiliadoEditarDemo } from './editar/afiliado-editar';
// import { AfiliadoEliminarDemo } from './eliminar/afiliado-eliminar';

// import { BeneficiarioDetailsFormDemo } from './beneficiario-details/beneficiario-details';

const ROUTES: Routes = [
  {
    path: '',
    component: ShoppingcartDemo,
    children: [
      { path: '', redirectTo: 'shoppingcart', component: Shoppingcart },
      {
        path: 'shoppingcart',
        component: Shoppingcart,
      },
      // {
      //   path: 'agregar',
      //   component: AfiliadoAgregarFormDemo,
      // },
      // {
      //   path: 'editar/:id',
      //   component: AfiliadoEditarFormDemo,
      // },
      // {
      //   path: 'eliminar/:id',
      //   component: AfiliadoEliminarFormDemo,
      // },
      // {
      // 	path: 'Beneficiario-details/:id',
      // 	component: BeneficiarioDetailsFormDemo,
      // },
    ],
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
