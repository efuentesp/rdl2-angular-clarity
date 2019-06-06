/** PSG Admin Routing **/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';

/* Security */
import { AdministracionDemoModule } from './administracion/administracion.psg.module';
import { UserDemoModule } from './user/user.psg.module';
import { RolDemoModule } from './rol/rol.psg.module';

/* Components */
import { FideicomisoModule } from './fideicomiso/fideicomiso.psg.module';
import { FideicomitenteModule } from './fideicomitente/fideicomitente.psg.module';
import { FideicomisarioModule } from './fideicomisario/fideicomisario.psg.module';
import { TerceroModule } from './tercero/tercero.psg.module';
import { ComitetecnicoModule } from './comitetecnico/comitetecnico.psg.module';
import { SubfisoModule } from './subfiso/subfiso.psg.module';
import { ParametroscomisionesModule } from './parametroscomisiones/parametroscomisiones.psg.module';
import { ContratoinversionModule } from './contratoinversion/contratoinversion.psg.module';
import { KycModule } from './kyc/kyc.psg.module';
import { CuentachequesModule } from './cuentacheques/cuentacheques.psg.module';
import { InstruccionModule } from './instruccion/instruccion.psg.module';
import { MovimientoModule } from './movimiento/movimiento.psg.module';
import { TransaccionModule } from './transaccion/transaccion.psg.module';
import { GuiaModule } from './guia/guia.psg.module';
import { CompraventavaloresModule } from './compraventavalores/compraventavalores.psg.module';
import { VentadirectoModule } from './ventadirecto/ventadirecto.psg.module';
import { CompradirectoModule } from './compradirecto/compradirecto.psg.module';
import { DeclaracionsatModule } from './declaracionsat/declaracionsat.psg.module';
import { HonorarioscontratoModule } from './honorarioscontrato/honorarioscontrato.psg.module';
import { CarteraadeudoModule } from './carteraadeudo/carteraadeudo.psg.module';
import { AportacioninmuebleModule } from './aportacioninmueble/aportacioninmueble.psg.module';
import { AsientoscontablesModule } from './asientoscontables/asientoscontables.psg.module';
import { CheckermonetarioModule } from './checkermonetario/checkermonetario.psg.module';
import { MonitoreochekermonerarioModule } from './monitoreochekermonerario/monitoreochekermonerario.psg.module';
import { RetiroModule } from './retiro/retiro.psg.module';
import { SaldoscuentaModule } from './saldoscuenta/saldoscuenta.psg.module';
import { AgendaModule } from './agenda/agenda.psg.module';
import { EvaluacionriesgosModule } from './evaluacionriesgos/evaluacionriesgos.psg.module';
import { DocumentosfideicomisoModule } from './documentosfideicomiso/documentosfideicomiso.psg.module';
import { HonorarioadministracionModule } from './honorarioadministracion/honorarioadministracion.psg.module';
import { AccionistaModule } from './accionista/accionista.psg.module';
import { FormasliquidacionModule } from './formasliquidacion/formasliquidacion.psg.module';
import { AutodeclaracioncrsModule } from './autodeclaracioncrs/autodeclaracioncrs.psg.module';
import { AportacionesModule } from './aportaciones/aportaciones.psg.module';
import { PagosModule } from './pagos/pagos.psg.module';
import { FideicomisospendientesliberarModule } from './fideicomisospendientesliberar/fideicomisospendientesliberar.psg.module';
import { AplicacionpagoscontroladosModule } from './aplicacionpagoscontrolados/aplicacionpagoscontrolados.psg.module';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'fideicomiso',
        loadChildren: () => FideicomisoModule,
      },
      {
        path: 'fideicomitente',
        loadChildren: () => FideicomitenteModule,
      },
      {
        path: 'fideicomisario',
        loadChildren: () => FideicomisarioModule,
      },
      {
        path: 'tercero',
        loadChildren: () => TerceroModule,
      },
      {
        path: 'comitetecnico',
        loadChildren: () => ComitetecnicoModule,
      },
      {
        path: 'subfiso',
        loadChildren: () => SubfisoModule,
      },
      {
        path: 'parametroscomisiones',
        loadChildren: () => ParametroscomisionesModule,
      },
      {
        path: 'contratoinversion',
        loadChildren: () => ContratoinversionModule,
      },
      {
        path: 'kyc',
        loadChildren: () => KycModule,
      },
      {
        path: 'cuentacheques',
        loadChildren: () => CuentachequesModule,
      },
      {
        path: 'instruccion',
        loadChildren: () => InstruccionModule,
      },
      {
        path: 'movimiento',
        loadChildren: () => MovimientoModule,
      },
      {
        path: 'transaccion',
        loadChildren: () => TransaccionModule,
      },
      {
        path: 'guia',
        loadChildren: () => GuiaModule,
      },
      {
        path: 'compraventavalores',
        loadChildren: () => CompraventavaloresModule,
      },
      {
        path: 'ventadirecto',
        loadChildren: () => VentadirectoModule,
      },
      {
        path: 'compradirecto',
        loadChildren: () => CompradirectoModule,
      },
      {
        path: 'declaracionsat',
        loadChildren: () => DeclaracionsatModule,
      },
      {
        path: 'honorarioscontrato',
        loadChildren: () => HonorarioscontratoModule,
      },
      {
        path: 'carteraadeudo',
        loadChildren: () => CarteraadeudoModule,
      },
      {
        path: 'aportacioninmueble',
        loadChildren: () => AportacioninmuebleModule,
      },
      {
        path: 'asientoscontables',
        loadChildren: () => AsientoscontablesModule,
      },
      {
        path: 'checkermonetario',
        loadChildren: () => CheckermonetarioModule,
      },
      {
        path: 'monitoreochekermonerario',
        loadChildren: () => MonitoreochekermonerarioModule,
      },
      {
        path: 'retiro',
        loadChildren: () => RetiroModule,
      },
      {
        path: 'saldoscuenta',
        loadChildren: () => SaldoscuentaModule,
      },
      {
        path: 'agenda',
        loadChildren: () => AgendaModule,
      },
      {
        path: 'evaluacionriesgos',
        loadChildren: () => EvaluacionriesgosModule,
      },
      {
        path: 'documentosfideicomiso',
        loadChildren: () => DocumentosfideicomisoModule,
      },
      {
        path: 'honorarioadministracion',
        loadChildren: () => HonorarioadministracionModule,
      },
      {
        path: 'accionista',
        loadChildren: () => AccionistaModule,
      },
      {
        path: 'formasliquidacion',
        loadChildren: () => FormasliquidacionModule,
      },
      {
        path: 'autodeclaracioncrs',
        loadChildren: () => AutodeclaracioncrsModule,
      },
      {
        path: 'aportaciones',
        loadChildren: () => AportacionesModule,
      },
      {
        path: 'pagos',
        loadChildren: () => PagosModule,
      },
      {
        path: 'fideicomisospendientesliberar',
        loadChildren: () => FideicomisospendientesliberarModule,
      },
      {
        path: 'aplicacionpagoscontrolados',
        loadChildren: () => AplicacionpagoscontroladosModule,
      },
      {
        path: 'administracion',
        loadChildren: () => AdministracionDemoModule,
      },
      {
        path: 'user',
        loadChildren: () => UserDemoModule,
      },
      {
        path: 'rol',
        loadChildren: () => RolDemoModule,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
