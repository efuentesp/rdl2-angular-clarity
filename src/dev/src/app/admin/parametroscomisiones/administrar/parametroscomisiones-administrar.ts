/* PSG  Parametroscomisiones Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Parametroscomisiones } from '../parametroscomisiones.psg.model';
import { ParametroscomisionesService } from '../parametroscomisiones.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-parametroscomisiones',
  styleUrls: ['../parametroscomisiones.psg.scss'],
  templateUrl: './parametroscomisiones-administrar.psg.html',
})
export class ParametroscomisionesAdministrar {
  parametroscomisionesArray: Parametroscomisiones[];
  parametroscomisiones: Parametroscomisiones;
  idParametroscomisiones: number;
  loading = false;

  public fideicomiso: Fideicomiso;

  // Detalles
  idFideicomiso: number;

  // Modal
  modalfideicomiso: boolean = false;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  parametroscomisiones_update: boolean = false;
  parametroscomisiones_delete: boolean = false;
  parametroscomisiones_create: boolean = false;
  parametroscomisiones_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private parametroscomisionesService: ParametroscomisionesService
  ) {}

  ngOnInit() {
    console.log('Parametroscomisiones administrar()');

    this.getUser();
    this.setButtons();
    this.cargaParametroscomisiones();

    this.route.params.subscribe(params => {
      this.idParametroscomisiones = params['id'];
    });

    if (this.idParametroscomisiones !== undefined) {
      this.getRecuperaParametroscomisionesPorFideicomiso(this.idParametroscomisiones);
    }
  }

  cargaParametroscomisiones() {
    this.parametroscomisionesService.getRecuperaParametroscomisiones().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.parametroscomisionesArray = res.json();
            this.llenaCampos(this.parametroscomisionesArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Parámetros de comisiones.', 'error');
      }
    );
  }

  getRecuperaParametroscomisionesPorFideicomiso(id) {
    this.parametroscomisionesService.getRecuperaParametroscomisionesPorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.parametroscomisionesArray = res.json();
            this.llenaCampos(this.parametroscomisionesArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the parametroscomisiones.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      this.fideicomisoService.getRecuperaFideicomisoPorId(element.fideicomisoId).subscribe(res => {
        this.fideicomiso = res.json();
        element.fideicomisoItem = this.fideicomiso.generalesnumero + '';
      });
      if (element.tipocalculo == 'TIPO1') {
        element.tipocalculoItem = '% Pactado';
      }
      if (element.tipocalculo == 'TIPO2') {
        element.tipocalculoItem = '% al millar';
      }
      if (element.tipocalculo == 'TIPO3') {
        element.tipocalculoItem = 'Exento';
      }
      if (element.tipocalculo == 'TIPO4') {
        element.tipocalculoItem = 'Importe Fijo';
      }
      if (element.tipocalculo == 'TIPO5') {
        element.tipocalculoItem = 'Importe Fijo + % Pactado';
      }
      if (element.tipocalculo == 'TIPO10') {
        element.tipocalculoItem = 'Número de Salarios Mínimos';
      }
      if (element.tipocalculo == 'TIPO6') {
        element.tipocalculoItem = 'No Aplica';
      }
      if (element.tipocalculo == 'TIPO7') {
        element.tipocalculoItem = 'No Automatizado';
      }
      if (element.tipocalculo == 'TIPO8') {
        element.tipocalculoItem = 'Pago Único';
      }
      if (element.tipocalculo == 'TIPO9') {
        element.tipocalculoItem = 'Tabla de cálculo';
      }
      if (element.aquiensecobra == 'COB1') {
        element.aquiensecobraItem = 'CARGO AL EFECTIVO';
      }
      if (element.aquiensecobra == 'COB2') {
        element.aquiensecobraItem = 'CARGO AL FONDO';
      }
      if (element.aquiensecobra == 'COB3') {
        element.aquiensecobraItem = 'FIDEICOMITENTE';
      }
      if (element.aquiensecobra == 'COB4') {
        element.aquiensecobraItem = 'FIDEICOMISARIO';
      }
      if (element.aquiensecobra == 'COB5') {
        element.aquiensecobraItem = 'TERCERO';
      }
      if (element.aquiensecobra == 'COB6') {
        element.aquiensecobraItem = 'VIA GESTION';
      }
      if (element.periodicidad == 'PERIOD1') {
        element.periodicidadItem = 'MENSUAL ADENLANTADA';
      }
      if (element.periodicidad == 'PERIOD2') {
        element.periodicidadItem = 'TRIMESTRAL ADELANTADA';
      }
      if (element.periodicidad == 'PERIOD3') {
        element.periodicidadItem = 'SEMESTRAL ADELANTADA';
      }
      if (element.periodicidad == 'PERIOD4') {
        element.periodicidadItem = 'ANUAL ADELANTADA';
      }
      if (element.periodicidad == 'PERIOD5') {
        element.periodicidadItem = 'MENSUAL VENCIDA';
      }
      if (element.periodicidad == 'PERIOD6') {
        element.periodicidadItem = 'TRIMESTRAL VENCIDA';
      }
      if (element.periodicidad == 'PERIOD7') {
        element.periodicidadItem = 'SEMESTRAL VENCIDA';
      }
      if (element.periodicidad == 'PERIOD8') {
        element.periodicidadItem = 'ANUAL VENCIDA';
      }
      if (element.periodicidad == 'PERIOD9') {
        element.periodicidadItem = 'CUATRIMESTRAL ADELANTADA';
      }
      if (element.periodicidad == 'PERIOD10') {
        element.periodicidadItem = 'CUATRIMESTRAL VENCIDA';
      }
      if (element.calculoaldiaprimero == 'NO') {
        element.calculoaldiaprimeroItem = 'NO';
      }
      if (element.calculoaldiaprimero == 'SI') {
        element.calculoaldiaprimeroItem = 'SI';
      }
      if (element.reevaluacion == 'REEVAL1') {
        element.reevaluacionItem = 'INFLACION USA';
      }
      if (element.reevaluacion == 'REEVAL2') {
        element.reevaluacionItem = 'REVALUCACION AUTOMATICA x INPC';
      }
      if (element.reevaluacion == 'REEVAL3') {
        element.reevaluacionItem = 'REVALUCACION MANUAL';
      }
      if (element.reevaluacion == 'REEVAL4') {
        element.reevaluacionItem = 'REVISAR EN CONTRATO (10% CADA 2 AÑOS)';
      }
      if (element.reevaluacion == 'REEVAL5') {
        element.reevaluacionItem = 'REVISAR EN CONTRATO (10% CADA 3 AÑOS)';
      }
      if (element.reevaluacion == 'REEVAL6') {
        element.reevaluacionItem = 'REVISAR EN CONTRATO (10% CADA 4 AÑOS)';
      }
      if (element.reevaluacion == 'REEVAL7') {
        element.reevaluacionItem = 'REVISAR EN CONTRATO (10% CADA 5 AÑOS)';
      }
      if (element.reevaluacion == 'REEVAL8') {
        element.reevaluacionItem = 'REVISAR EN CONTRATO (2% ANUAL)';
      }
      if (element.reevaluacion == 'REEVAL9') {
        element.reevaluacionItem = 'REVISAR EN CONTRATO (2% CADA 2 AÑOS)';
      }
      if (element.reevaluacion == 'REEVAL10') {
        element.reevaluacionItem = 'REVISAR EN CONTRATO (2% CADA 3 AÑOS)';
      }
      if (element.reevaluacion == 'REEVAL11') {
        element.reevaluacionItem = 'REVISAR EN CONTRATO (3% ANUAL)';
      }
      if (element.reevaluacion == 'REEVAL12') {
        element.reevaluacionItem = 'REVISAR EN CONTRATO (4% ANUAL)';
      }
      element.fechaconstitucionAux = new Date(element.fechaconstitucion);
      element.fechapivoteAux = new Date(element.fechapivote);
      element.fechaproxcalculoAux = new Date(element.fechaproxcalculo);
      if (element.estatus == 'ESTCOM1') {
        element.estatusItem = 'A PARTIR DEL 2o. AÑO';
      }
      if (element.estatus == 'ESTCOM2') {
        element.estatusItem = 'ACTIVO';
      }
      if (element.estatus == 'ESTCOM3') {
        element.estatusItem = 'ANORMAL';
      }
      if (element.estatus == 'ESTCOM4') {
        element.estatusItem = 'EN TRAMITE DE EXTINCION';
      }
      if (element.estatus == 'ESTCOM5') {
        element.estatusItem = 'EXENTO';
      }
      if (element.estatus == 'ESTCOM6') {
        element.estatusItem = 'RECONOCIM. VIA GESTION';
      }
      if (element.estatus == 'ESTCOM7') {
        element.estatusItem = 'SUSPENDIDO';
      }
      if (element.estatus == 'ESTCOM8') {
        element.estatusItem = 'SUSPENDIDO CON INMUEBLES';
      }
      if (element.penasconvencionales == 'NO') {
        element.penasconvencionalesItem = 'NO';
      }
      if (element.penasconvencionales == 'SI') {
        element.penasconvencionalesItem = 'SI';
      }
      if (element.moneda == 'DLS') {
        element.monedaItem = 'DLS. U.S.A.';
      }
      if (element.moneda == 'EURO') {
        element.monedaItem = 'EUROS';
      }
      if (element.moneda == 'NACIONAL') {
        element.monedaItem = 'MONEDA NACIONAL';
      }
      if (element.interes == 'PORINT29') {
        element.interesItem = 'TIIE * 1.5 MENSUAL';
      }
      if (element.interes == 'PORINT30') {
        element.interesItem = 'TIIE * 2 MENSUAL';
      }
      if (element.interes == 'PORINT31') {
        element.interesItem = 'TIIE * 2.5 MENSUAL';
      }
      if (element.interes == 'PORINT32') {
        element.interesItem = 'TIIE * 3 MENSUAL';
      }
      if (element.interes == 'PORINT33') {
        element.interesItem = 'TIIE + 1.5 MENSUAL';
      }
      if (element.interes == 'PORINT34') {
        element.interesItem = 'TIIE + 2 MENSUAL';
      }
      if (element.interes == 'PORINT35') {
        element.interesItem = 'TIIE + 3 MENSUAL';
      }
      if (element.interes == 'PORINT36') {
        element.interesItem = 'TIIE + 4 MENSUAL';
      }
      if (element.interes == 'PORINT37') {
        element.interesItem = 'TIIE + 6 MENSUAL';
      }
      if (element.interes == 'PORINT38') {
        element.interesItem = 'TIIE MENSUAL';
      }
      if (element.interes == 'PORINT1') {
        element.interesItem = 'CPP * 1.5 MENSUAL';
      }
      if (element.interes == 'PORINT2') {
        element.interesItem = 'CPP * 2 MENSUAL';
      }
      if (element.interes == 'PORINT3') {
        element.interesItem = 'CPP * 3 MENSUAL';
      }
      if (element.interes == 'PORINT4') {
        element.interesItem = 'CPP + 10 MENSUAL';
      }
      if (element.interes == 'PORINT5') {
        element.interesItem = 'CPP + 10 MENSUAL 1.5%';
      }
      if (element.interes == 'PORINT6') {
        element.interesItem = 'CPP + 2 MENSUAL';
      }
      if (element.interes == 'PORINT7') {
        element.interesItem = 'CPP MENSUAL';
      }
      if (element.interes == 'PORINT8') {
        element.interesItem = 'CPP MENSUAL 1.5%';
      }
      if (element.interes == 'PORINT9') {
        element.interesItem = 'CPP MENSUAL 2%';
      }
      if (element.interes == 'PORINT10') {
        element.interesItem = 'CPP MENSUAL 3.5%';
      }
      if (element.interes == 'PORINT11') {
        element.interesItem = 'INTERES ANUAL 12%';
      }
      if (element.interes == 'PORINT12') {
        element.interesItem = 'INTERES ANUAL 2%';
      }
      if (element.interes == 'PORINT13') {
        element.interesItem = 'INTERES ANUAL 24%';
      }
      if (element.interes == 'PORINT14') {
        element.interesItem = 'INTERES ANUAL 36.98%';
      }
      if (element.interes == 'PORINT15') {
        element.interesItem = 'INTERES ANUAL 5.3%';
      }
      if (element.interes == 'PORINT16') {
        element.interesItem = 'INTERES ANUAL 7.9%';
      }
      if (element.interes == 'PORINT17') {
        element.interesItem = 'INTERES MENSUAL 0.7%';
      }
      if (element.interes == 'PORINT18') {
        element.interesItem = 'INTERES MENSUAL 1%';
      }
      if (element.interes == 'PORINT19') {
        element.interesItem = 'INTERES MENSUAL 1.5%';
      }
      if (element.interes == 'PORINT20') {
        element.interesItem = 'INTERES MENSUAL 2%';
      }
      if (element.interes == 'PORINT21') {
        element.interesItem = 'INTERES MENSUAL 3%';
      }
      if (element.interes == 'PORINT22') {
        element.interesItem = 'INTERES MENSUAL 3.5%';
      }
      if (element.interes == 'PORINT23') {
        element.interesItem = 'INTERES MENSUAL 4%';
      }
      if (element.interes == 'PORINT24') {
        element.interesItem = 'INTERES MENSUAL 5%';
      }
      if (element.interes == 'PORINT25') {
        element.interesItem = 'INTERES MENSUAL 6%';
      }
      if (element.interes == 'PORINT26') {
        element.interesItem = 'INTERES MENSUAL 8%';
      }
      if (element.interes == 'PORINT27') {
        element.interesItem = 'INTERES MENSUAL 9%';
      }
      if (element.interes == 'PORINT28') {
        element.interesItem = 'LIBOR * 2';
      }
      if (element.tipoiva == 'IVA0') {
        element.tipoivaItem = 'IVA AL 0%';
      }
      if (element.tipoiva == 'IVA11') {
        element.tipoivaItem = 'IVA AL 11% (FRONTERIZO)';
      }
      if (element.tipoiva == 'IVA16') {
        element.tipoivaItem = 'IVA AL 16%';
      }
      element.fechaprimercalculoAux = new Date(element.fechaprimercalculo);
      element.fechaultimocalculoAux = new Date(element.fechaultimocalculo);
      if (element.situacionmorosidad == 'MOROSIDAD1') {
        element.situacionmorosidadItem = 'CLIENTE ILOCALIZABLE CON PATRIMONIO';
      }
      if (element.situacionmorosidad == 'MOROSIDAD2') {
        element.situacionmorosidadItem = 'CLIENTE ILICALIZABLE SIN PATRIMONIO';
      }
      if (element.situacionmorosidad == 'MOROSIDAD3') {
        element.situacionmorosidadItem = 'CONTRATO SIN EXPEDIENTE';
      }
      if (element.situacionmorosidad == 'MOROSIDAD4') {
        element.situacionmorosidadItem = 'EN EJECUCION';
      }
      if (element.situacionmorosidad == 'MOROSIDAD5') {
        element.situacionmorosidadItem = 'EN JUICIO';
      }
      if (element.situacionmorosidad == 'MOROSIDAD6') {
        element.situacionmorosidadItem = 'EN PROCESO DE EXTINCION';
      }
      if (element.situacionmorosidad == 'MOROSIDAD7') {
        element.situacionmorosidadItem = 'NEGATIVA DE PAGO';
      }
      if (element.situacionmorosidad == 'MOROSIDAD8') {
        element.situacionmorosidadItem = 'POR INACTIVIDAD';
      }
      if (element.situacionmorosidad == 'MOROSIDAD9') {
        element.situacionmorosidadItem = 'NEGATIVA DE PAGO POR FALLECIMIENTO DEL CLIENTE';
      }
    });
  }

  setClickedRowEditaParametroscomisiones(index, parametroscomisiones) {
    this.parametroscomisionesService.setParametroscomisiones(parametroscomisiones);
    if (this.idParametroscomisiones === undefined) {
      this.router.navigate(['editar', parametroscomisiones.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', parametroscomisiones.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaParametroscomisiones(index, parametroscomisiones) {
    this.parametroscomisionesService.setParametroscomisiones(parametroscomisiones);
    if (this.idParametroscomisiones === undefined) {
      this.router.navigate(['eliminar', parametroscomisiones.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', parametroscomisiones.id], { relativeTo: this.route });
    }
  }

  getParametroscomisiones() {
    if (this.idParametroscomisiones === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idParametroscomisiones], { relativeTo: this.route });
    }
  }

  getUser() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['access_token'];
    this.permissions = obj['permissions'];
    this.user = obj['user'];
  }

  setButtons() {
    this.permissions.forEach(element => {
      if (element.code == '*:*') {
        this.parametroscomisiones_create = true;
        this.parametroscomisiones_delete = true;
        this.parametroscomisiones_update = true;
        this.parametroscomisiones_read = true;
      }

      if (element.code == 'PARAMETROSCOMISIONES:UPDATE') {
        this.parametroscomisiones_update = true;
      }

      if (element.code == 'PARAMETROSCOMISIONES:DELETE') {
        this.parametroscomisiones_delete = true;
      }

      if (element.code == 'PARAMETROSCOMISIONES:READ') {
        this.parametroscomisiones_read = true;
      }

      if (element.code == 'PARAMETROSCOMISIONES:CREATE') {
        this.parametroscomisiones_create = true;
      }

      if (element.code == 'PARAMETROSCOMISIONES:*') {
        this.parametroscomisiones_update = true;
        this.parametroscomisiones_create = true;
        this.parametroscomisiones_delete = true;
        this.parametroscomisiones_read = true;
      }
    });
  }
}
