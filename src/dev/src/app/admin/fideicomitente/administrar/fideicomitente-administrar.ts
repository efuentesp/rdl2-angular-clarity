/* PSG  Fideicomitente Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Fideicomitente } from '../fideicomitente.psg.model';
import { FideicomitenteService } from '../fideicomitente.psg.service';

// Detalles
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-fideicomitente',
  styleUrls: ['../fideicomitente.psg.scss'],
  templateUrl: './fideicomitente-administrar.psg.html',
})
export class FideicomitenteAdministrar {
  fideicomitenteArray: Fideicomitente[];
  fideicomitente: Fideicomitente;
  idFideicomitente: number;
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

  fideicomitente_update: boolean = false;
  fideicomitente_delete: boolean = false;
  fideicomitente_create: boolean = false;
  fideicomitente_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private fideicomitenteService: FideicomitenteService
  ) {}

  ngOnInit() {
    console.log('Fideicomitente administrar()');

    this.getUser();
    this.setButtons();
    this.cargaFideicomitente();

    this.route.params.subscribe(params => {
      this.idFideicomitente = params['id'];
    });

    if (this.idFideicomitente !== undefined) {
      this.getRecuperaFideicomitentePorFideicomiso(this.idFideicomitente);
    }
  }

  cargaFideicomitente() {
    this.fideicomitenteService.getRecuperaFideicomitente().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.fideicomitenteArray = res.json();
            this.llenaCampos(this.fideicomitenteArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Fideicomitente.', 'error');
      }
    );
  }

  getRecuperaFideicomitentePorFideicomiso(id) {
    this.fideicomitenteService.getRecuperaFideicomitentePorFideicomiso(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.fideicomitenteArray = res.json();
            this.llenaCampos(this.fideicomitenteArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the fideicomitente.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      if (element.tipopersona == 'FISICA') {
        element.tipopersonaItem = 'FISICA';
      }
      if (element.tipopersona == 'GOBIERNO') {
        element.tipopersonaItem = 'GOBIERNO';
      }
      if (element.tipopersona == 'MORAL') {
        element.tipopersonaItem = 'MORAL';
      }
      this.fideicomisoService.getRecuperaFideicomisoPorId(element.fideicomisoId).subscribe(res => {
        this.fideicomiso = res.json();
        element.fideicomisoItem = this.fideicomiso.generalesnumero + '';
      });
      if (element.regimenfiscal == 'NO') {
        element.regimenfiscalItem = 'NO';
      }
      if (element.regimenfiscal == 'SI') {
        element.regimenfiscalItem = 'SI';
      }
      if (element.generalescontroladorfideicomiso == 'NO') {
        element.generalescontroladorfideicomisoItem = 'NO';
      }
      if (element.generalescontroladorfideicomiso == 'SI') {
        element.generalescontroladorfideicomisoItem = 'SI';
      }
      if (element.generalesnacionalidad == 'MEXICANO') {
        element.generalesnacionalidadItem = 'MEXICANO';
      }
      if (element.generalesnacionalidad == 'NORTAM') {
        element.generalesnacionalidadItem = 'ESTADOUNIDENSE';
      }
      if (element.generalespaisorigen == 'MEX') {
        element.generalespaisorigenItem = 'MEXICO';
      }
      if (element.generalespaisorigen == 'USA') {
        element.generalespaisorigenItem = 'ESTADOS UNIDOS';
      }
      if (element.generalesactividad == 'DESC') {
        element.generalesactividadItem = 'INGENIERO';
      }
      if (element.generalesactividad == 'INM') {
        element.generalesactividadItem = 'AGENTES INMOBILIARIOS';
      }
      if (element.generalesactividad == 'ARQ') {
        element.generalesactividadItem = 'ARQUITECTO';
      }
      if (element.generalesaportarecursos == 'NO') {
        element.generalesaportarecursosItem = 'NO';
      }
      if (element.generalesaportarecursos == 'SI') {
        element.generalesaportarecursosItem = 'SI';
      }
      if (element.generalespaisresidencia == 'MEX') {
        element.generalespaisresidenciaItem = 'MEXICO';
      }
      if (element.generalespaisresidencia == 'USA') {
        element.generalespaisresidenciaItem = 'ESTADOS UNIDOS';
      }
      if (element.generalesclientescotiabank == 'SIN') {
        element.generalesclientescotiabankItem = 'SIN ANTIGUEDAD';
      }
      if (element.generalesclientescotiabank == 'MENOSUNO') {
        element.generalesclientescotiabankItem = 'MENOS DE UN AÑO';
      }
      if (element.generalesclientescotiabank == 'UNOTRES') {
        element.generalesclientescotiabankItem = 'ENTRE UNO Y TRES';
      }
      if (element.generalespep == 'NO') {
        element.generalespepItem = 'NO';
      }
      if (element.generalespep == 'SI') {
        element.generalespepItem = 'SI';
      }
      if (element.generalesestatus == 'ACTIVO') {
        element.generalesestatusItem = 'ACTIVO';
      }
      if (element.generalesestatus == 'CANCELADO') {
        element.generalesestatusItem = 'CANCELADO';
      }
      if (element.generalesestatus == 'SUSPENDIDO') {
        element.generalesestatusItem = 'SUSPENDIDO';
      }
      if (element.generalesestatus == 'BAJA') {
        element.generalesestatusItem = 'BAJA';
      }
      if (element.generalescalidadmigratoria == 'EXRANJERA') {
        element.generalescalidadmigratoriaItem = 'EXRANJERA';
      }
      if (element.generalescalidadmigratoria == 'INDISTINTA') {
        element.generalescalidadmigratoriaItem = 'INDISTINTA';
      }
      if (element.generalescalidadmigratoria == 'INMIGRANTE') {
        element.generalescalidadmigratoriaItem = 'INMIGRANTE';
      }
      if (element.generalescalidadmigratoria == 'INMIGRADO') {
        element.generalescalidadmigratoriaItem = 'INMIGRADO';
      }
      if (element.generalescalidadmigratoria == 'NACIONAL') {
        element.generalescalidadmigratoriaItem = 'NACIONAL';
      }
      if (element.generaleslugaroperacion == 'CDMX') {
        element.generaleslugaroperacionItem = 'CUIDAD DE MEXICO';
      }
      if (element.generaleslugaroperacion == 'EDOMEX') {
        element.generaleslugaroperacionItem = 'ESTADO DE MEXICO';
      }
      if (element.generaleslugaroperacion == 'AGU') {
        element.generaleslugaroperacionItem = 'AGUASCALIENTES';
      }
      if (element.generaleslugaroperacion == 'BJ') {
        element.generaleslugaroperacionItem = 'BAJA CALIFORNIA';
      }
      if (element.generaleslugaroperacion == 'BJS') {
        element.generaleslugaroperacionItem = 'BAJA CALIFORNIA SUR';
      }
      if (element.generaleslugaroperacion == 'CM') {
        element.generaleslugaroperacionItem = 'CAMPECHE';
      }
      if (element.generaleslugaroperacion == 'GR') {
        element.generaleslugaroperacionItem = 'GUERRERO';
      }
      if (element.generaleslugaroperacion == 'HD') {
        element.generaleslugaroperacionItem = 'HIDALGO';
      }
      if (element.generaleslugaroperacion == 'JL') {
        element.generaleslugaroperacionItem = 'JALISCO';
      }
      if (element.generalesoperacuentaterceros == 'NO') {
        element.generalesoperacuentatercerosItem = 'NO';
      }
      if (element.generalesoperacuentaterceros == 'SI') {
        element.generalesoperacuentatercerosItem = 'SI';
      }
      if (element.generalesnivelparticipante == 'A') {
        element.generalesnivelparticipanteItem = 'A o 1';
      }
      if (element.generalesnivelparticipante == 'B') {
        element.generalesnivelparticipanteItem = 'B o 2';
      }
      if (element.generalesclienterelacionpep == 'NO') {
        element.generalesclienterelacionpepItem = 'NO';
      }
      if (element.generalesclienterelacionpep == 'SI') {
        element.generalesclienterelacionpepItem = 'SI';
      }
      if (element.infopldkyccomisiones == 'NO') {
        element.infopldkyccomisionesItem = 'NO';
      }
      if (element.infopldkyccomisiones == 'SI') {
        element.infopldkyccomisionesItem = 'SI';
      }
      if (element.infopldkycotros == 'NO') {
        element.infopldkycotrosItem = 'NO';
      }
      if (element.infopldkycotros == 'SI') {
        element.infopldkycotrosItem = 'SI';
      }
      if (element.infopldkycsueldos == 'NO') {
        element.infopldkycsueldosItem = 'NO';
      }
      if (element.infopldkycsueldos == 'SI') {
        element.infopldkycsueldosItem = 'SI';
      }
      if (element.infopldkycventa == 'NO') {
        element.infopldkycventaItem = 'NO';
      }
      if (element.infopldkycventa == 'SI') {
        element.infopldkycventaItem = 'SI';
      }
      if (element.infopldkycinversiones == 'NO') {
        element.infopldkycinversionesItem = 'NO';
      }
      if (element.infopldkycinversiones == 'SI') {
        element.infopldkycinversionesItem = 'SI';
      }
      if (element.infopldkycarrendamiento == 'NO') {
        element.infopldkycarrendamientoItem = 'NO';
      }
      if (element.infopldkycarrendamiento == 'SI') {
        element.infopldkycarrendamientoItem = 'SI';
      }
      if (element.infopldkycinstrumento == 'INT1') {
        element.infopldkycinstrumentoItem = 'Trans Nac => 100,000 <= 500,000 mn -PF-';
      }
      if (element.infopldkycinstrumento == 'INT2') {
        element.infopldkycinstrumentoItem = 'Trans o Inst Mont Unicamente Pago Honorarios PF/PM';
      }
      if (element.infopldkycinstrumento == 'INT3') {
        element.infopldkycinstrumentoItem = 'Trans Nac 0 < 99,000 MN -PF-';
      }
      if (element.infopldkycinstrumento == 'INT4') {
        element.infopldkycinstrumentoItem = 'Tans Nac > 100,000 mn -PF-';
      }
      if (element.infopldkycinstrumento == 'INT5') {
        element.infopldkycinstrumentoItem = 'Trans Int < 99,000 mn -PF-';
      }
      if (element.infopldkycinstrumento == 'INT6') {
        element.infopldkycinstrumentoItem = 'Trans Int => 100,000 <= 500,000 mn -PF-';
      }
      if (element.infopldkycinstrumento == 'INT7') {
        element.infopldkycinstrumentoItem = 'Trans Int > 1,000,000 mn -PF-';
      }
      if (element.infopldkycinstrumento == 'INT8') {
        element.infopldkycinstrumentoItem = 'Inst Mon < 99,000 mn -PF-';
      }
      if (element.infopldkycinstrumento == 'INT9') {
        element.infopldkycinstrumentoItem = 'Inst Mon => 100,000 <= 500,000 mn -PF-';
      }
      if (element.infopldkycinstrumento == 'INT10') {
        element.infopldkycinstrumentoItem = 'Ints Mon > 1,000,000 mn -PF-';
      }
      if (element.infopldkycinstrumento == 'INT11') {
        element.infopldkycinstrumentoItem = 'Trans Nac => 250,000 <= 500,000 mn -PM-';
      }
      if (element.infopldkycinstrumento == 'INT12') {
        element.infopldkycinstrumentoItem = 'Trans Nac > 5,000,000 <= 1,000,000 mn -PM-';
      }
      if (element.infopldkycinstrumento == 'INT13') {
        element.infopldkycinstrumentoItem = 'Trans Nac > 1,000,000 mn -PM-';
      }
      if (element.infopldkycinstrumento == 'INT14') {
        element.infopldkycinstrumentoItem = 'Trans Int => 250,000 <= 5,000,000 mn -PM-';
      }
      if (element.infopldkycinstrumento == 'INT15') {
        element.infopldkycinstrumentoItem = 'Trans Int > 5,000,000 = 1,000,000 mn -PM-';
      }
      if (element.infopldkycnivelriesgo == 'NO') {
        element.infopldkycnivelriesgoItem = 'NO';
      }
      if (element.infopldkycnivelriesgo == 'SI') {
        element.infopldkycnivelriesgoItem = 'SI';
      }
      element.infopldkycfechaveriffircosoftAux = new Date(element.infopldkycfechaveriffircosoft);
      if (element.identificacionpaisresidfisc1 == 'MEX') {
        element.identificacionpaisresidfisc1Item = 'MEXICO';
      }
      if (element.identificacionpaisresidfisc1 == 'USA') {
        element.identificacionpaisresidfisc1Item = 'ESTADOS UNIDOS';
      }
      if (element.identificacionpaisresidfisc2 == 'MEX') {
        element.identificacionpaisresidfisc2Item = 'MEXICO';
      }
      if (element.identificacionpaisresidfisc2 == 'USA') {
        element.identificacionpaisresidfisc2Item = 'ESTADOS UNIDOS';
      }
      element.identificacionfechaconstitucionAux = new Date(element.identificacionfechaconstitucion);
      if (element.identificacionsexo == 'M') {
        element.identificacionsexoItem = 'Masculino';
      }
      if (element.identificacionsexo == 'f') {
        element.identificacionsexoItem = 'Femenino';
      }
      if (element.identificacionpaiscasa == 'MEX') {
        element.identificacionpaiscasaItem = 'MEXICO';
      }
      if (element.identificacionpaiscasa == 'USA') {
        element.identificacionpaiscasaItem = 'ESTADOS UNIDOS';
      }
      if (element.identificacionpaisoficina == 'MEX') {
        element.identificacionpaisoficinaItem = 'MEXICO';
      }
      if (element.identificacionpaisoficina == 'USA') {
        element.identificacionpaisoficinaItem = 'ESTADOS UNIDOS';
      }
      if (element.identificacionpaiscelular == 'MEX') {
        element.identificacionpaiscelularItem = 'MEXICO';
      }
      if (element.identificacionpaiscelular == 'USA') {
        element.identificacionpaiscelularItem = 'ESTADOS UNIDOS';
      }
      element.identificacionfechainiciorelnegAux = new Date(element.identificacionfechainiciorelneg);
      if (element.identificacionactividadempresarial == 'NO') {
        element.identificacionactividadempresarialItem = 'NO';
      }
      if (element.identificacionactividadempresarial == 'SI') {
        element.identificacionactividadempresarialItem = 'SI';
      }
      if (element.escrituranotario == 'NOTARIO01') {
        element.escrituranotarioItem = 'NOTARIO 01';
      }
      if (element.escrituranotario == 'NOTARIO02') {
        element.escrituranotarioItem = 'NOTARIO 02';
      }
      if (element.escrituranotario == 'NOTARIO03') {
        element.escrituranotarioItem = 'NOTARIO 03';
      }
      element.escriturafechaAux = new Date(element.escriturafecha);
    });
  }

  setClickedRowEditaFideicomitente(index, fideicomitente) {
    this.fideicomitenteService.setFideicomitente(fideicomitente);
    if (this.idFideicomitente === undefined) {
      this.router.navigate(['editar', fideicomitente.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', fideicomitente.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaFideicomitente(index, fideicomitente) {
    this.fideicomitenteService.setFideicomitente(fideicomitente);
    if (this.idFideicomitente === undefined) {
      this.router.navigate(['eliminar', fideicomitente.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', fideicomitente.id], { relativeTo: this.route });
    }
  }

  getFideicomitente() {
    if (this.idFideicomitente === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idFideicomitente], { relativeTo: this.route });
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
        this.fideicomitente_create = true;
        this.fideicomitente_delete = true;
        this.fideicomitente_update = true;
        this.fideicomitente_read = true;
      }

      if (element.code == 'FIDEICOMITENTE:UPDATE') {
        this.fideicomitente_update = true;
      }

      if (element.code == 'FIDEICOMITENTE:DELETE') {
        this.fideicomitente_delete = true;
      }

      if (element.code == 'FIDEICOMITENTE:READ') {
        this.fideicomitente_read = true;
      }

      if (element.code == 'FIDEICOMITENTE:CREATE') {
        this.fideicomitente_create = true;
      }

      if (element.code == 'FIDEICOMITENTE:*') {
        this.fideicomitente_update = true;
        this.fideicomitente_create = true;
        this.fideicomitente_delete = true;
        this.fideicomitente_read = true;
      }
    });
  }
}
