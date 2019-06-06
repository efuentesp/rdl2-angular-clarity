/* PSG  Cuentacheques Agregar Ts */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import swal from 'sweetalert2';

import { Cuentacheques } from '../cuentacheques.psg.model';
import { CuentachequesSend } from '../cuentacheques.psg.model-send';
import { CuentachequesService } from '../cuentacheques.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { FideicomitenteService } from '../../fideicomitente/fideicomitente.psg.service';
import { Fideicomitente } from '../../fideicomitente/fideicomitente.psg.model';

@Component({
  selector: 'clr-cuentacheques-agregar',
  styleUrls: ['../cuentacheques.psg.scss'],
  templateUrl: './cuentacheques-agregar.psg.html',
})
export class CuentachequesAgregarForm implements OnInit {
  cuentachequesForm: FormGroup;
  submitted = false;
  loading = false;
  public cuentacheques: Cuentacheques = new Cuentacheques();
  public cuentachequesSend: CuentachequesSend = new CuentachequesSend();
  public id: number;

  public fideicomisoArray: Fideicomiso[];
  public fideicomiso: Fideicomiso;
  public fideicomitenteArray: Fideicomitente[];
  public fideicomitente: Fideicomitente;

  // Modal
  modalfideicomiso: boolean = false;
  modalfideicomitente: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private fideicomitenteService: FideicomitenteService,
    private cuentachequesService: CuentachequesService
  ) {
    this.cuentachequesForm = this.fb.group({
      fideicomisoId: new FormControl('', Validators.required),
      fideicomisoItem: new FormControl(''),
      tipopersona: new FormControl('', Validators.required),
      fideicomitenteId: new FormControl('', Validators.required),
      fideicomitenteItem: new FormControl(''),
      tipocuenta: new FormControl('', Validators.required),
      tipopago: new FormControl(''),
      bancospei: new FormControl(''),
      banco: new FormControl(''),
      dombanco: new FormControl(''),
      moneda: new FormControl(''),
      clavevostro: new FormControl(''),
      numcuenta: new FormControl(''),
      dombeneficiario: new FormControl(''),
      plazainternacional: new FormControl(''),
      pais: new FormControl(''),
      clavesiacinst: new FormControl(''),
      conveniociedie: new FormControl(''),
      estatus: new FormControl(''),
      clabe: new FormControl(''),
      cuentachequera: new FormControl('', Validators.required),
      fechavence: new FormControl(''),
      numabbasswift: new FormControl(''),
      conceptosiac: new FormControl(''),
      refciedie: new FormControl(''),
      autorizacion: new FormControl(''),
    });
  }

  ngOnInit() {
    console.log('Cuentacheques agregar()');

    this.cargaFideicomiso();
    this.cargaFideicomitente();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (this.id !== undefined) {
      this.getRecuperaFideicomisoPorId(this.id);
    }
    if (this.id !== undefined) {
      this.getRecuperaFideicomitentePorId(this.id);
    }
  }

  guardaCuentacheques() {
    this.submitted = true;

    if (this.cuentachequesForm.invalid) {
      swal('Error...', 'Cuenta de cheques has fields to fill.', 'error');
    } else {
      this.cuentachequesSend.fideicomisoId = this.cuentachequesForm.controls['fideicomisoId'].value;
      this.cuentachequesSend.tipopersona = this.cuentachequesForm.controls['tipopersona'].value;
      this.cuentachequesSend.fideicomitenteId = this.cuentachequesForm.controls['fideicomitenteId'].value;
      this.cuentachequesSend.tipocuenta = this.cuentachequesForm.controls['tipocuenta'].value;
      this.cuentachequesSend.tipopago = this.cuentachequesForm.controls['tipopago'].value;
      this.cuentachequesSend.bancospei = this.cuentachequesForm.controls['bancospei'].value;
      this.cuentachequesSend.banco = this.cuentachequesForm.controls['banco'].value;
      this.cuentachequesSend.dombanco = this.cuentachequesForm.controls['dombanco'].value;
      this.cuentachequesSend.moneda = this.cuentachequesForm.controls['moneda'].value;
      this.cuentachequesSend.clavevostro = this.cuentachequesForm.controls['clavevostro'].value;
      this.cuentachequesSend.numcuenta = this.cuentachequesForm.controls['numcuenta'].value;
      this.cuentachequesSend.dombeneficiario = this.cuentachequesForm.controls['dombeneficiario'].value;
      this.cuentachequesSend.plazainternacional = this.cuentachequesForm.controls['plazainternacional'].value;
      this.cuentachequesSend.pais = this.cuentachequesForm.controls['pais'].value;
      this.cuentachequesSend.clavesiacinst = this.cuentachequesForm.controls['clavesiacinst'].value;
      this.cuentachequesSend.conveniociedie = this.cuentachequesForm.controls['conveniociedie'].value;
      this.cuentachequesSend.estatus = this.cuentachequesForm.controls['estatus'].value;
      this.cuentachequesSend.clabe = this.cuentachequesForm.controls['clabe'].value;
      this.cuentachequesSend.cuentachequera = this.cuentachequesForm.controls['cuentachequera'].value;
      this.cuentachequesSend.fechavence = this.cuentachequesForm.controls['fechavence'].value;
      this.cuentachequesSend.numabbasswift = this.cuentachequesForm.controls['numabbasswift'].value;
      this.cuentachequesSend.conceptosiac = this.cuentachequesForm.controls['conceptosiac'].value;
      this.cuentachequesSend.refciedie = this.cuentachequesForm.controls['refciedie'].value;
      this.cuentachequesSend.autorizacion = this.cuentachequesForm.controls['autorizacion'].value;

      this.cuentachequesService.postGuardaCuentacheques(this.cuentachequesSend).subscribe(
        res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Cuenta de cheques save successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Cuenta de cheques has fields to fill.', 'error');
            }
          }
        },
        error => {
          swal('Error...', 'Cuenta de cheques save unsuccessfully.', 'error');
        }
      );
    }
  }

  cargaFideicomiso() {
    this.fideicomisoService.getRecuperaFideicomiso().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.fideicomisoArray = res.json();

            this.fideicomisoArray.forEach(element => {
              this.llenaCamposFideicomiso(this.fideicomisoArray);
            });
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Prospecto.', 'error');
      }
    );
  }

  getRecuperaFideicomisoPorId(id) {
    this.fideicomisoService.getRecuperaFideicomisoPorId(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.fideicomiso = res.json();
            this.fideicomisoArray = [];
            this.fideicomisoArray.push(this.fideicomiso);
            this.llenaCamposFideicomiso(this.fideicomisoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Prospecto', 'error');
      }
    );
  }

  llenaCamposFideicomiso(array) {
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

  setClickedRowFideicomiso(index, fideicomiso) {
    fideicomiso.checked = !fideicomiso.checked;
    if (fideicomiso.checked) {
      this.fideicomisoService.setFideicomiso(fideicomiso);

      this.cuentachequesForm.controls['fideicomisoId'].setValue(fideicomiso.id);
      this.cuentachequesForm.controls['fideicomisoItem'].setValue(fideicomiso.generalesnumero);
    } else {
      this.fideicomisoService.clear();
      this.cuentachequesForm.controls['fideicomisoId'].setValue(null);
      this.cuentachequesForm.controls['fideicomisoItem'].setValue('');
    }
  }
  cargaFideicomitente() {
    this.fideicomitenteService.getRecuperaFideicomitente().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.fideicomitenteArray = res.json();

            this.fideicomitenteArray.forEach(element => {
              this.llenaCamposFideicomitente(this.fideicomitenteArray);
            });
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Fideicomitente.', 'error');
      }
    );
  }

  getRecuperaFideicomitentePorId(id) {
    this.fideicomitenteService.getRecuperaFideicomitentePorId(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.fideicomitente = res.json();
            this.fideicomitenteArray = [];
            this.fideicomitenteArray.push(this.fideicomitente);
            this.llenaCamposFideicomitente(this.fideicomitenteArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Fideicomitente', 'error');
      }
    );
  }

  llenaCamposFideicomitente(array) {
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

  setClickedRowFideicomitente(index, fideicomitente) {
    fideicomitente.checked = !fideicomitente.checked;
    if (fideicomitente.checked) {
      this.fideicomitenteService.setFideicomitente(fideicomitente);

      this.cuentachequesForm.controls['fideicomitenteId'].setValue(fideicomitente.id);
      this.cuentachequesForm.controls['fideicomitenteItem'].setValue(fideicomitente.numerofideicomitente);
    } else {
      this.fideicomitenteService.clear();
      this.cuentachequesForm.controls['fideicomitenteId'].setValue(null);
      this.cuentachequesForm.controls['fideicomitenteItem'].setValue('');
    }
  }

  regresaCuentacheques() {
    this.location.back();
  }
}
