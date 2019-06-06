/* PSG  Fideicomiso Administrar Ts */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import swal from 'sweetalert2';

import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Fideicomiso } from '../fideicomiso.psg.model';
import { FideicomisoService } from '../fideicomiso.psg.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FideicomisoSend } from '../fideicomiso.psg.model-send';

// Detalles

@Component({
  selector: 'clr-fideicomiso',
  styleUrls: ['../fideicomiso.psg.scss'],
  templateUrl: './fideicomiso-administrar.psg.html',
})
export class FideicomisoAdministrar {
  fideicomisoArray: Fideicomiso[];
  fideicomiso: Fideicomiso;
  idFideicomiso: number;
  loading = false;

  // Detalles

  // Modal

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  fideicomiso_update: boolean = false;
  fideicomiso_delete: boolean = false;
  fideicomiso_create: boolean = false;
  fideicomiso_read: boolean = false;

  // Child Entities *
  private fideicomisario_read: boolean = false;
  private fideicomisario_update: boolean = false;
  private fideicomisario_delete: boolean = false;
  private fideicomisario_create: boolean = false;
  private tercero_read: boolean = false;
  private tercero_update: boolean = false;
  private tercero_delete: boolean = false;
  private tercero_create: boolean = false;
  private subfiso_read: boolean = false;
  private subfiso_update: boolean = false;
  private subfiso_delete: boolean = false;
  private subfiso_create: boolean = false;
  private contratoinversion_read: boolean = false;
  private contratoinversion_update: boolean = false;
  private contratoinversion_delete: boolean = false;
  private contratoinversion_create: boolean = false;
  private cuentacheques_read: boolean = false;
  private cuentacheques_update: boolean = false;
  private cuentacheques_delete: boolean = false;
  private cuentacheques_create: boolean = false;

  toggleField: string = 'searchMode';

  fideicomisoAddForm: FormGroup;
  fideicomisoEditForm: FormGroup;

  submitted = false;
  // loading = false;
  fideicomisoSend: FideicomisoSend = new FideicomisoSend();
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private fb: FormBuilder,
    private location: Location
  ) {}

  ngOnInit() {
    console.log('Fideicomiso administrar()');

    this.getUser();
    this.setButtons();
    this.cargaFideicomiso();

    this.route.params.subscribe(params => {
      this.idFideicomiso = params['id'];
    });

    this.fideicomisoAddForm = this.fb.group({
      generalesnumero: new FormControl('', Validators.required),
      generalesnombre: new FormControl('', Validators.required),
      generalesadministrador: new FormControl('', Validators.required),
      generalespromotor: new FormControl('', Validators.required),
      caracteristicasformamanejo: new FormControl('', Validators.required),
      caracteristicastiponegocio: new FormControl('', Validators.required),
      caracteristicasproducto: new FormControl('', Validators.required),
      caracteristicasvalfatca: new FormControl('', Validators.required),
      caracteristicasmontoapertura: new FormControl(''),
      caracteristicasmanejosubfisos: new FormControl(''),
      caracteristicassujetoart151: new FormControl(''),
      caracteristicascerrado: new FormControl(''),
      caracteristicasrevocable: new FormControl(''),
      caracteristicasescontratoeje: new FormControl(''),
      caracteristicascomitetecnico: new FormControl(''),
      caracteristicasofibanxico: new FormControl(''),
      caracteristicasmanejamonext: new FormControl(''),
      caracteristicasivafronterizo: new FormControl(''),
      caracteristicasfechaaltaAux: new FormControl(''),
      caracteristicasfechaconstitucionAux: new FormControl(''),
      caracteristicasfechaaprobacionAux: new FormControl(''),
      caracteristicasestado: new FormControl('', Validators.required),
      adicionalestipo: new FormControl(''),
      adicionalestipopersona: new FormControl('', Validators.required),
      adicionalesconactividadempresarial: new FormControl(''),
      adicionalespermisosre: new FormControl(''),
      adicionalesfechapermisosreAux: new FormControl(''),
      adicionalesprovsustfiduciaria: new FormControl(''),
      adicionalesfondosinterfaseafore: new FormControl(''),
      adicionalesregnalinvext: new FormControl(''),
      adicionalesfechainscripcionAux: new FormControl(''),
      adicionalesformalizacioncontrato: new FormControl(''),
      adicionalesnoescritura: new FormControl(''),
      adicionalesfechaescrituraAux: new FormControl(''),
      adicionalesnombrenotario: new FormControl(''),
      adicionalesnonotario: new FormControl(''),
      adicionalesciudadnotario: new FormControl(''),
      adicionalesestadonotario: new FormControl(''),
      adicionalespaisnotario: new FormControl(''),
      adicionalesfolioregistropublico: new FormControl(''),
      adicionalesfechainscripcionregpublicoAux: new FormControl(''),
      adicionalesadministracion: new FormControl('', Validators.required),
      adicionalescontabilidaddelegada: new FormControl('', Validators.required),
      datosbanxicoactividadeconomica: new FormControl(''),
      datosbanxicofiducuario: new FormControl(''),
      datosbanxicosectorbancario: new FormControl(''),
      datosbanxicolocalidad: new FormControl(''),
      datosbanxicocentroresp: new FormControl(''),
      datosbanxiconocr: new FormControl(''),
      datosbanxicorfccontrato: new FormControl(''),
      datosbanxiconumerocliente: new FormControl(''),
    });

    this.fideicomisoEditForm = this.fb.group({
      generalesnumero: new FormControl('', Validators.required),
      generalesnombre: new FormControl('', Validators.required),
      generalesadministrador: new FormControl('', Validators.required),
      generalespromotor: new FormControl('', Validators.required),
      caracteristicasformamanejo: new FormControl('', Validators.required),
      caracteristicastiponegocio: new FormControl('', Validators.required),
      caracteristicasproducto: new FormControl('', Validators.required),
      caracteristicasvalfatca: new FormControl('', Validators.required),
      caracteristicasmontoapertura: new FormControl(''),
      caracteristicasmanejosubfisos: new FormControl(''),
      caracteristicassujetoart151: new FormControl(''),
      caracteristicascerrado: new FormControl(''),
      caracteristicasrevocable: new FormControl(''),
      caracteristicasescontratoeje: new FormControl(''),
      caracteristicascomitetecnico: new FormControl(''),
      caracteristicasofibanxico: new FormControl(''),
      caracteristicasmanejamonext: new FormControl(''),
      caracteristicasivafronterizo: new FormControl(''),
      caracteristicasfechaaltaAux: new FormControl(''),
      caracteristicasfechaconstitucionAux: new FormControl(''),
      caracteristicasfechaaprobacionAux: new FormControl(''),
      caracteristicasestado: new FormControl('', Validators.required),
      adicionalestipo: new FormControl(''),
      adicionalestipopersona: new FormControl('', Validators.required),
      adicionalesconactividadempresarial: new FormControl(''),
      adicionalespermisosre: new FormControl(''),
      adicionalesfechapermisosreAux: new FormControl(''),
      adicionalesprovsustfiduciaria: new FormControl(''),
      adicionalesfondosinterfaseafore: new FormControl(''),
      adicionalesregnalinvext: new FormControl(''),
      adicionalesfechainscripcionAux: new FormControl(''),
      adicionalesformalizacioncontrato: new FormControl(''),
      adicionalesnoescritura: new FormControl(''),
      adicionalesfechaescrituraAux: new FormControl(''),
      adicionalesnombrenotario: new FormControl(''),
      adicionalesnonotario: new FormControl(''),
      adicionalesciudadnotario: new FormControl(''),
      adicionalesestadonotario: new FormControl(''),
      adicionalespaisnotario: new FormControl(''),
      adicionalesfolioregistropublico: new FormControl(''),
      adicionalesfechainscripcionregpublicoAux: new FormControl(''),
      adicionalesadministracion: new FormControl('', Validators.required),
      adicionalescontabilidaddelegada: new FormControl('', Validators.required),
      datosbanxicoactividadeconomica: new FormControl(''),
      datosbanxicofiducuario: new FormControl(''),
      datosbanxicosectorbancario: new FormControl(''),
      datosbanxicolocalidad: new FormControl(''),
      datosbanxicocentroresp: new FormControl(''),
      datosbanxiconocr: new FormControl(''),
      datosbanxicorfccontrato: new FormControl(''),
      datosbanxiconumerocliente: new FormControl(''),
    });
  }

  toggle(filter?) {
    if (!filter) {
      filter = 'searchMode';
    } else {
      filter = filter;
    }
    this.toggleField = filter;
  }

  cargaFideicomiso() {
    this.fideicomisoService.getRecuperaFideicomiso().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.fideicomisoArray = res.json();
            this.llenaCampos(this.fideicomisoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Prospecto.', 'error');
      }
    );
  }

  llenaCampos(array) {
    array.forEach(element => {
      if (element.generalesadministrador == 'ADMIN1002') {
        element.generalesadministradorItem = 'ADMINISTRADOR 1002';
      }
      if (element.generalesadministrador == 'ADMIN1003') {
        element.generalesadministradorItem = 'ADMINISTRADOR 1003';
      }
      if (element.generalesadministrador == 'ADMIN1004') {
        element.generalesadministradorItem = 'ADMINISTRADOR 1004';
      }
      if (element.generalesadministrador == 'ADMIN1005') {
        element.generalesadministradorItem = 'ADMINISTRADOR 1005';
      }
      if (element.generalesadministrador == 'ADMIN1006') {
        element.generalesadministradorItem = 'ADMINISTRADOR 1006';
      }
      if (element.generalespromotor == 'PROMOTOR1002') {
        element.generalespromotorItem = 'PROMOTOR 1002';
      }
      if (element.generalespromotor == 'PROMOTOR1003') {
        element.generalespromotorItem = 'PROMOTOR 1003';
      }
      if (element.generalespromotor == 'PROMOTOR1004') {
        element.generalespromotorItem = 'PROMOTOR 1004';
      }
      if (element.generalespromotor == 'PROMOTOR1005') {
        element.generalespromotorItem = 'PROMOTOR 1005';
      }
      if (element.generalespromotor == 'PROMOTOR1006') {
        element.generalespromotorItem = 'PROMOTOR 1006';
      }
      if (element.caracteristicasformamanejo == 'DISCRESTR') {
        element.caracteristicasformamanejoItem = 'DISCRECIONAL RESTRINGIDO';
      }
      if (element.caracteristicasformamanejo == 'NODISCR') {
        element.caracteristicasformamanejoItem = 'NO DISCRECIONAL';
      }
      if (element.caracteristicasformamanejo == 'SINMANEJO') {
        element.caracteristicasformamanejoItem = 'SIN MANEJO DE INVERSION';
      }
      if (element.caracteristicastiponegocio == 'TIPO1') {
        element.caracteristicastiponegocioItem = 'FIDEICOMISO';
      }
      if (element.caracteristicastiponegocio == 'TIPO2') {
        element.caracteristicastiponegocioItem = 'MANDATO';
      }
      if (element.caracteristicastiponegocio == 'TIPO3') {
        element.caracteristicastiponegocioItem = 'COMISIÓN MERCANTIL';
      }
      if (element.caracteristicastiponegocio == 'TIPO4') {
        element.caracteristicastiponegocioItem = 'DEPÓSITO CONDICIONAL';
      }
      if (element.caracteristicastiponegocio == 'TIPO5') {
        element.caracteristicastiponegocioItem = 'REPRESENTACIÓN COMÚN';
      }
      if (element.caracteristicasproducto == 'PROD1') {
        element.caracteristicasproductoItem = 'PLANEACIÓN PATRIMONIAL TESTAMENTARIA';
      }
      if (element.caracteristicasproducto == 'PROD2') {
        element.caracteristicasproductoItem = 'ADMINISTRACIÓN DE RECURSOS';
      }
      if (element.caracteristicasproducto == 'PROD3') {
        element.caracteristicasproductoItem = 'GARANTÍA';
      }
      if (element.caracteristicasproducto == 'PROD4') {
        element.caracteristicasproductoItem = 'FUENTE DE PAGO';
      }
      if (element.caracteristicasproducto == 'PROD5') {
        element.caracteristicasproductoItem = 'ZONA RESTRINGIDA';
      }
      if (element.caracteristicasproducto == 'PROD6') {
        element.caracteristicasproductoItem = 'MANDATO';
      }
      if (element.caracteristicasproducto == 'PROD7') {
        element.caracteristicasproductoItem = 'PENSIONES Y JUBILACIONES';
      }
      if (element.caracteristicasproducto == 'PROD8') {
        element.caracteristicasproductoItem = 'DESARROLLO INMOBILIARIO';
      }
      if (element.caracteristicasproducto == 'PROD9') {
        element.caracteristicasproductoItem = 'INFRAESTRUCTURA';
      }
      if (element.caracteristicasproducto == 'PROD10') {
        element.caracteristicasproductoItem = 'REPRESENTACIÓN COMÚN';
      }
      if (element.caracteristicasproducto == 'PROD11') {
        element.caracteristicasproductoItem = 'DEPÓSITO CONDICIONAL (Escrow)';
      }
      if (element.caracteristicasvalfatca == 'NO') {
        element.caracteristicasvalfatcaItem = 'NO';
      }
      if (element.caracteristicasvalfatca == 'SI') {
        element.caracteristicasvalfatcaItem = 'SI';
      }
      if (element.caracteristicasmanejosubfisos == 'NO') {
        element.caracteristicasmanejosubfisosItem = 'NO';
      }
      if (element.caracteristicasmanejosubfisos == 'SI') {
        element.caracteristicasmanejosubfisosItem = 'SI';
      }
      if (element.caracteristicassujetoart151 == 'NO') {
        element.caracteristicassujetoart151Item = 'NO';
      }
      if (element.caracteristicassujetoart151 == 'SI') {
        element.caracteristicassujetoart151Item = 'SI';
      }
      if (element.caracteristicascerrado == 'NO') {
        element.caracteristicascerradoItem = 'NO';
      }
      if (element.caracteristicascerrado == 'SI') {
        element.caracteristicascerradoItem = 'SI';
      }
      if (element.caracteristicasrevocable == 'NO') {
        element.caracteristicasrevocableItem = 'NO';
      }
      if (element.caracteristicasrevocable == 'SI') {
        element.caracteristicasrevocableItem = 'SI';
      }
      if (element.caracteristicasescontratoeje == 'NO') {
        element.caracteristicasescontratoejeItem = 'NO';
      }
      if (element.caracteristicasescontratoeje == 'SI') {
        element.caracteristicasescontratoejeItem = 'SI';
      }
      if (element.caracteristicascomitetecnico == 'NO') {
        element.caracteristicascomitetecnicoItem = 'NO';
      }
      if (element.caracteristicascomitetecnico == 'SI') {
        element.caracteristicascomitetecnicoItem = 'SI';
      }
      if (element.caracteristicasmanejamonext == 'NO') {
        element.caracteristicasmanejamonextItem = 'NO';
      }
      if (element.caracteristicasmanejamonext == 'SI') {
        element.caracteristicasmanejamonextItem = 'SI';
      }
      if (element.caracteristicasivafronterizo == 'NO') {
        element.caracteristicasivafronterizoItem = 'NO';
      }
      if (element.caracteristicasivafronterizo == 'SI') {
        element.caracteristicasivafronterizoItem = 'SI';
      }
      element.caracteristicasfechaaltaAux = new Date(element.caracteristicasfechaalta);
      element.caracteristicasfechaconstitucionAux = new Date(element.caracteristicasfechaconstitucion);
      element.caracteristicasfechaaprobacionAux = new Date(element.caracteristicasfechaaprobacion);
      if (element.caracteristicasestado == 'ACTIVO') {
        element.caracteristicasestadoItem = 'ACTIVO';
      }
      if (element.caracteristicasestado == 'CANCELADO') {
        element.caracteristicasestadoItem = 'CANCELADO';
      }
      if (element.caracteristicasestado == 'CONSTITUIDO') {
        element.caracteristicasestadoItem = 'CONSTITUIDO';
      }
      if (element.caracteristicasestado == 'ENVRESULTADOS') {
        element.caracteristicasestadoItem = 'ENV. A RESULTADOS';
      }
      if (element.caracteristicasestado == 'SUSPENDIDO') {
        element.caracteristicasestadoItem = 'SUSPENDIDO';
      }
      if (element.caracteristicasestado == 'ANTEPROYECTO') {
        element.caracteristicasestadoItem = 'ANTEPROYECTO';
      }
      if (element.adicionalestipo == 'PUBLICO') {
        element.adicionalestipoItem = 'PUBLICO';
      }
      if (element.adicionalestipo == 'PRIVADO') {
        element.adicionalestipoItem = 'PRIVADO';
      }
      if (element.adicionalestipopersona == 'FISICA') {
        element.adicionalestipopersonaItem = 'FISICA';
      }
      if (element.adicionalestipopersona == 'GOBIERNO') {
        element.adicionalestipopersonaItem = 'GOBIERNO';
      }
      if (element.adicionalestipopersona == 'MORAL') {
        element.adicionalestipopersonaItem = 'MORAL';
      }
      if (element.adicionalesconactividadempresarial == 'NO') {
        element.adicionalesconactividadempresarialItem = 'NO';
      }
      if (element.adicionalesconactividadempresarial == 'SI') {
        element.adicionalesconactividadempresarialItem = 'SI';
      }
      element.adicionalesfechapermisosreAux = new Date(element.adicionalesfechapermisosre);
      if (element.adicionalesprovsustfiduciaria == 'NO') {
        element.adicionalesprovsustfiduciariaItem = 'NO';
      }
      if (element.adicionalesprovsustfiduciaria == 'SI') {
        element.adicionalesprovsustfiduciariaItem = 'SI';
      }
      if (element.adicionalesfondosinterfaseafore == 'NO') {
        element.adicionalesfondosinterfaseaforeItem = 'NO';
      }
      if (element.adicionalesfondosinterfaseafore == 'SI') {
        element.adicionalesfondosinterfaseaforeItem = 'SI';
      }
      element.adicionalesfechainscripcionAux = new Date(element.adicionalesfechainscripcion);
      if (element.adicionalesformalizacioncontrato == 'PRIVADO') {
        element.adicionalesformalizacioncontratoItem = 'Contrato Privado';
      }
      if (element.adicionalesformalizacioncontrato == 'ESCPUB') {
        element.adicionalesformalizacioncontratoItem = 'Escritura Pública';
      }
      element.adicionalesfechaescrituraAux = new Date(element.adicionalesfechaescritura);
      if (element.adicionalesnombrenotario == 'NOTARIO01') {
        element.adicionalesnombrenotarioItem = 'NOTARIO 01';
      }
      if (element.adicionalesnombrenotario == 'NOTARIO02') {
        element.adicionalesnombrenotarioItem = 'NOTARIO 02';
      }
      if (element.adicionalesnombrenotario == 'NOTARIO03') {
        element.adicionalesnombrenotarioItem = 'NOTARIO 03';
      }
      element.adicionalesfechainscripcionregpublicoAux = new Date(element.adicionalesfechainscripcionregpublico);
      if (element.adicionalesadministracion == 'DELEGADA') {
        element.adicionalesadministracionItem = 'ADMINISTRACION DELEGADA';
      }
      if (element.adicionalesadministracion == 'FIDUCIARIA') {
        element.adicionalesadministracionItem = 'ADMINISTRACION FIDUCIARIA';
      }
      if (element.adicionalescontabilidaddelegada == 'NO') {
        element.adicionalescontabilidaddelegadaItem = 'NO';
      }
      if (element.adicionalescontabilidaddelegada == 'SI') {
        element.adicionalescontabilidaddelegadaItem = 'SI';
      }
    });
  }

  setClickedRowEditaFideicomiso(index, fideicomiso) {
    this.fideicomisoService.setFideicomiso(fideicomiso);
    if (this.idFideicomiso === undefined) {
      this.router.navigate(['editar', fideicomiso.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../editar', fideicomiso.id], { relativeTo: this.route });
    }
  }

  setClickedRowEliminaFideicomiso(index, fideicomiso) {
    this.fideicomisoService.setFideicomiso(fideicomiso);
    if (this.idFideicomiso === undefined) {
      this.router.navigate(['eliminar', fideicomiso.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../eliminar', fideicomiso.id], { relativeTo: this.route });
    }
  }

  getFideicomiso() {
    if (this.idFideicomiso === undefined) {
      this.router.navigate(['agregar'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../agregar', this.idFideicomiso], { relativeTo: this.route });
    }
  }

  setClickedRowConsultaFideicomisario(index, fideicomiso) {
    this.fideicomisoService.setFideicomiso(fideicomiso);
    if (this.idFideicomiso === undefined) {
      this.router.navigate(['../fideicomisario/administrar', fideicomiso.id], { relativeTo: this.route });
    }
  }
  setClickedRowConsultaTercero(index, fideicomiso) {
    this.fideicomisoService.setFideicomiso(fideicomiso);
    if (this.idFideicomiso === undefined) {
      this.router.navigate(['../tercero/administrar', fideicomiso.id], { relativeTo: this.route });
    }
  }
  setClickedRowConsultaSubfiso(index, fideicomiso) {
    this.fideicomisoService.setFideicomiso(fideicomiso);
    if (this.idFideicomiso === undefined) {
      this.router.navigate(['../subfiso/administrar', fideicomiso.id], { relativeTo: this.route });
    }
  }
  setClickedRowConsultaContratoinversion(index, fideicomiso) {
    this.fideicomisoService.setFideicomiso(fideicomiso);
    if (this.idFideicomiso === undefined) {
      this.router.navigate(['../contratoinversion/administrar', fideicomiso.id], { relativeTo: this.route });
    }
  }
  setClickedRowConsultaCuentacheques(index, fideicomiso) {
    this.fideicomisoService.setFideicomiso(fideicomiso);
    if (this.idFideicomiso === undefined) {
      this.router.navigate(['../cuentacheques/administrar', fideicomiso.id], { relativeTo: this.route });
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
        this.fideicomiso_create = true;
        this.fideicomiso_delete = true;
        this.fideicomiso_update = true;
        this.fideicomiso_read = true;

        this.fideicomisario_create = true;
        this.fideicomisario_update = true;
        this.fideicomisario_delete = true;
        this.fideicomisario_read = true;
        this.tercero_create = true;
        this.tercero_update = true;
        this.tercero_delete = true;
        this.tercero_read = true;
        this.subfiso_create = true;
        this.subfiso_update = true;
        this.subfiso_delete = true;
        this.subfiso_read = true;
        this.contratoinversion_create = true;
        this.contratoinversion_update = true;
        this.contratoinversion_delete = true;
        this.contratoinversion_read = true;
        this.cuentacheques_create = true;
        this.cuentacheques_update = true;
        this.cuentacheques_delete = true;
        this.cuentacheques_read = true;
      }

      if (element.code == 'FIDEICOMISO:UPDATE') {
        this.fideicomiso_update = true;
      }

      if (element.code == 'FIDEICOMISO:DELETE') {
        this.fideicomiso_delete = true;
      }

      if (element.code == 'FIDEICOMISO:READ') {
        this.fideicomiso_read = true;
      }

      if (element.code == 'FIDEICOMISO:CREATE') {
        this.fideicomiso_create = true;
      }

      if (element.code == 'FIDEICOMISO:*') {
        this.fideicomiso_update = true;
        this.fideicomiso_create = true;
        this.fideicomiso_delete = true;
        this.fideicomiso_read = true;
      }

      // Child Entities
      if (element.code == 'FIDEICOMISARIO:READ') {
        this.fideicomisario_read = true;
      }

      if (element.code == 'FIDEICOMISARIO:*') {
        this.fideicomisario_read = true;
        this.fideicomisario_update = true;
        this.fideicomisario_create = true;
        this.fideicomisario_delete = true;
      }
      // Child Entities
      if (element.code == 'TERCERO:READ') {
        this.tercero_read = true;
      }

      if (element.code == 'TERCERO:*') {
        this.tercero_read = true;
        this.tercero_update = true;
        this.tercero_create = true;
        this.tercero_delete = true;
      }
      // Child Entities
      if (element.code == 'SUBFISO:READ') {
        this.subfiso_read = true;
      }

      if (element.code == 'SUBFISO:*') {
        this.subfiso_read = true;
        this.subfiso_update = true;
        this.subfiso_create = true;
        this.subfiso_delete = true;
      }
      // Child Entities
      if (element.code == 'CONTRATOINVERSION:READ') {
        this.contratoinversion_read = true;
      }

      if (element.code == 'CONTRATOINVERSION:*') {
        this.contratoinversion_read = true;
        this.contratoinversion_update = true;
        this.contratoinversion_create = true;
        this.contratoinversion_delete = true;
      }
      // Child Entities
      if (element.code == 'CUENTACHEQUES:READ') {
        this.cuentacheques_read = true;
      }

      if (element.code == 'CUENTACHEQUES:*') {
        this.cuentacheques_read = true;
        this.cuentacheques_update = true;
        this.cuentacheques_create = true;
        this.cuentacheques_delete = true;
      }
    });
  }

  guardaFideicomiso() {
    this.submitted = true;

    if (this.fideicomisoAddForm.invalid) {
      swal('Error...', 'Prospecto has fields to fill.', 'error');
    } else {
      this.fideicomisoSend.generalesnumero = this.fideicomisoAddForm.controls['generalesnumero'].value;
      this.fideicomisoSend.generalesnombre = this.fideicomisoAddForm.controls['generalesnombre'].value;
      this.fideicomisoSend.generalesadministrador = this.fideicomisoAddForm.controls['generalesadministrador'].value;
      this.fideicomisoSend.generalespromotor = this.fideicomisoAddForm.controls['generalespromotor'].value;
      this.fideicomisoSend.caracteristicasformamanejo = this.fideicomisoAddForm.controls[
        'caracteristicasformamanejo'
      ].value;
      this.fideicomisoSend.caracteristicastiponegocio = this.fideicomisoAddForm.controls[
        'caracteristicastiponegocio'
      ].value;
      this.fideicomisoSend.caracteristicasproducto = this.fideicomisoAddForm.controls['caracteristicasproducto'].value;
      this.fideicomisoSend.caracteristicasvalfatca = this.fideicomisoAddForm.controls['caracteristicasvalfatca'].value;
      this.fideicomisoSend.caracteristicasmontoapertura = this.fideicomisoAddForm.controls[
        'caracteristicasmontoapertura'
      ].value;
      this.fideicomisoSend.caracteristicasmanejosubfisos = this.fideicomisoAddForm.controls[
        'caracteristicasmanejosubfisos'
      ].value;
      this.fideicomisoSend.caracteristicassujetoart151 = this.fideicomisoAddForm.controls[
        'caracteristicassujetoart151'
      ].value;
      this.fideicomisoSend.caracteristicascerrado = this.fideicomisoAddForm.controls['caracteristicascerrado'].value;
      this.fideicomisoSend.caracteristicasrevocable = this.fideicomisoAddForm.controls[
        'caracteristicasrevocable'
      ].value;
      this.fideicomisoSend.caracteristicasescontratoeje = this.fideicomisoAddForm.controls[
        'caracteristicasescontratoeje'
      ].value;
      this.fideicomisoSend.caracteristicascomitetecnico = this.fideicomisoAddForm.controls[
        'caracteristicascomitetecnico'
      ].value;
      this.fideicomisoSend.caracteristicasofibanxico = this.fideicomisoAddForm.controls[
        'caracteristicasofibanxico'
      ].value;
      this.fideicomisoSend.caracteristicasmanejamonext = this.fideicomisoAddForm.controls[
        'caracteristicasmanejamonext'
      ].value;
      this.fideicomisoSend.caracteristicasivafronterizo = this.fideicomisoAddForm.controls[
        'caracteristicasivafronterizo'
      ].value;
      let caracteristicasfechaaltaAuxtoArray = this.fideicomisoAddForm.controls[
        'caracteristicasfechaaltaAux'
      ].value.split('/');
      let caracteristicasfechaaltaAuxDate = new Date(
        caracteristicasfechaaltaAuxtoArray[1] +
          '/' +
          caracteristicasfechaaltaAuxtoArray[0] +
          '/' +
          caracteristicasfechaaltaAuxtoArray[2]
      );
      this.fideicomisoSend.caracteristicasfechaalta = caracteristicasfechaaltaAuxDate.getTime();
      let caracteristicasfechaconstitucionAuxtoArray = this.fideicomisoAddForm.controls[
        'caracteristicasfechaconstitucionAux'
      ].value.split('/');
      let caracteristicasfechaconstitucionAuxDate = new Date(
        caracteristicasfechaconstitucionAuxtoArray[1] +
          '/' +
          caracteristicasfechaconstitucionAuxtoArray[0] +
          '/' +
          caracteristicasfechaconstitucionAuxtoArray[2]
      );
      this.fideicomisoSend.caracteristicasfechaconstitucion = caracteristicasfechaconstitucionAuxDate.getTime();
      let caracteristicasfechaaprobacionAuxtoArray = this.fideicomisoAddForm.controls[
        'caracteristicasfechaaprobacionAux'
      ].value.split('/');
      let caracteristicasfechaaprobacionAuxDate = new Date(
        caracteristicasfechaaprobacionAuxtoArray[1] +
          '/' +
          caracteristicasfechaaprobacionAuxtoArray[0] +
          '/' +
          caracteristicasfechaaprobacionAuxtoArray[2]
      );
      this.fideicomisoSend.caracteristicasfechaaprobacion = caracteristicasfechaaprobacionAuxDate.getTime();
      this.fideicomisoSend.caracteristicasestado = this.fideicomisoAddForm.controls['caracteristicasestado'].value;
      this.fideicomisoSend.adicionalestipo = this.fideicomisoAddForm.controls['adicionalestipo'].value;
      this.fideicomisoSend.adicionalestipopersona = this.fideicomisoAddForm.controls['adicionalestipopersona'].value;
      this.fideicomisoSend.adicionalesconactividadempresarial = this.fideicomisoAddForm.controls[
        'adicionalesconactividadempresarial'
      ].value;
      this.fideicomisoSend.adicionalespermisosre = this.fideicomisoAddForm.controls['adicionalespermisosre'].value;
      let adicionalesfechapermisosreAuxtoArray = this.fideicomisoAddForm.controls[
        'adicionalesfechapermisosreAux'
      ].value.split('/');
      let adicionalesfechapermisosreAuxDate = new Date(
        adicionalesfechapermisosreAuxtoArray[1] +
          '/' +
          adicionalesfechapermisosreAuxtoArray[0] +
          '/' +
          adicionalesfechapermisosreAuxtoArray[2]
      );
      this.fideicomisoSend.adicionalesfechapermisosre = adicionalesfechapermisosreAuxDate.getTime();
      this.fideicomisoSend.adicionalesprovsustfiduciaria = this.fideicomisoAddForm.controls[
        'adicionalesprovsustfiduciaria'
      ].value;
      this.fideicomisoSend.adicionalesfondosinterfaseafore = this.fideicomisoAddForm.controls[
        'adicionalesfondosinterfaseafore'
      ].value;
      this.fideicomisoSend.adicionalesregnalinvext = this.fideicomisoAddForm.controls['adicionalesregnalinvext'].value;
      let adicionalesfechainscripcionAuxtoArray = this.fideicomisoAddForm.controls[
        'adicionalesfechainscripcionAux'
      ].value.split('/');
      let adicionalesfechainscripcionAuxDate = new Date(
        adicionalesfechainscripcionAuxtoArray[1] +
          '/' +
          adicionalesfechainscripcionAuxtoArray[0] +
          '/' +
          adicionalesfechainscripcionAuxtoArray[2]
      );
      this.fideicomisoSend.adicionalesfechainscripcion = adicionalesfechainscripcionAuxDate.getTime();
      this.fideicomisoSend.adicionalesformalizacioncontrato = this.fideicomisoAddForm.controls[
        'adicionalesformalizacioncontrato'
      ].value;
      this.fideicomisoSend.adicionalesnoescritura = this.fideicomisoAddForm.controls['adicionalesnoescritura'].value;
      let adicionalesfechaescrituraAuxtoArray = this.fideicomisoAddForm.controls[
        'adicionalesfechaescrituraAux'
      ].value.split('/');
      let adicionalesfechaescrituraAuxDate = new Date(
        adicionalesfechaescrituraAuxtoArray[1] +
          '/' +
          adicionalesfechaescrituraAuxtoArray[0] +
          '/' +
          adicionalesfechaescrituraAuxtoArray[2]
      );
      this.fideicomisoSend.adicionalesfechaescritura = adicionalesfechaescrituraAuxDate.getTime();
      this.fideicomisoSend.adicionalesnombrenotario = this.fideicomisoAddForm.controls[
        'adicionalesnombrenotario'
      ].value;
      this.fideicomisoSend.adicionalesnonotario = this.fideicomisoAddForm.controls['adicionalesnonotario'].value;
      this.fideicomisoSend.adicionalesciudadnotario = this.fideicomisoAddForm.controls[
        'adicionalesciudadnotario'
      ].value;
      this.fideicomisoSend.adicionalesestadonotario = this.fideicomisoAddForm.controls[
        'adicionalesestadonotario'
      ].value;
      this.fideicomisoSend.adicionalespaisnotario = this.fideicomisoAddForm.controls['adicionalespaisnotario'].value;
      this.fideicomisoSend.adicionalesfolioregistropublico = this.fideicomisoAddForm.controls[
        'adicionalesfolioregistropublico'
      ].value;
      let adicionalesfechainscripcionregpublicoAuxtoArray = this.fideicomisoAddForm.controls[
        'adicionalesfechainscripcionregpublicoAux'
      ].value.split('/');
      let adicionalesfechainscripcionregpublicoAuxDate = new Date(
        adicionalesfechainscripcionregpublicoAuxtoArray[1] +
          '/' +
          adicionalesfechainscripcionregpublicoAuxtoArray[0] +
          '/' +
          adicionalesfechainscripcionregpublicoAuxtoArray[2]
      );
      this.fideicomisoSend.adicionalesfechainscripcionregpublico = adicionalesfechainscripcionregpublicoAuxDate.getTime();
      this.fideicomisoSend.adicionalesadministracion = this.fideicomisoAddForm.controls[
        'adicionalesadministracion'
      ].value;
      this.fideicomisoSend.adicionalescontabilidaddelegada = this.fideicomisoAddForm.controls[
        'adicionalescontabilidaddelegada'
      ].value;
      this.fideicomisoSend.datosbanxicoactividadeconomica = this.fideicomisoAddForm.controls[
        'datosbanxicoactividadeconomica'
      ].value;
      this.fideicomisoSend.datosbanxicofiducuario = this.fideicomisoAddForm.controls['datosbanxicofiducuario'].value;
      this.fideicomisoSend.datosbanxicosectorbancario = this.fideicomisoAddForm.controls[
        'datosbanxicosectorbancario'
      ].value;
      this.fideicomisoSend.datosbanxicolocalidad = this.fideicomisoAddForm.controls['datosbanxicolocalidad'].value;
      this.fideicomisoSend.datosbanxicocentroresp = this.fideicomisoAddForm.controls['datosbanxicocentroresp'].value;
      this.fideicomisoSend.datosbanxiconocr = this.fideicomisoAddForm.controls['datosbanxiconocr'].value;
      this.fideicomisoSend.datosbanxicorfccontrato = this.fideicomisoAddForm.controls['datosbanxicorfccontrato'].value;
      this.fideicomisoSend.datosbanxiconumerocliente = this.fideicomisoAddForm.controls[
        'datosbanxiconumerocliente'
      ].value;

      this.fideicomisoService.postGuardaFideicomiso(this.fideicomisoSend).subscribe(
        res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Prospecto save successfully.', 'success');

              //this.location.back();
            } else {
              swal('Error...', 'Prospecto has fields to fill.', 'error');
            }
          }
        },
        error => {
          swal('Error...', 'Prospecto save unsuccessfully.', 'error');
        }
      );
    }
  }

  regresaFideicomiso() {
    //this.router.navigate(['administracion']);
    //this.location.back();
  }
}
