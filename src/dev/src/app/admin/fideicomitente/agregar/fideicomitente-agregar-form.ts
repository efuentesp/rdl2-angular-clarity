/* PSG  Fideicomitente Agregar Ts */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import swal from 'sweetalert2';

import { Fideicomitente } from '../fideicomitente.psg.model';
import { FideicomitenteSend } from '../fideicomitente.psg.model-send';
import { FideicomitenteService } from '../fideicomitente.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-fideicomitente-agregar',
  styleUrls: ['../fideicomitente.psg.scss'],
  templateUrl: './fideicomitente-agregar.psg.html',
})
export class FideicomitenteAgregarForm implements OnInit {
  fideicomitenteForm: FormGroup;
  submitted = false;
  loading = false;
  public fideicomitente: Fideicomitente = new Fideicomitente();
  public fideicomitenteSend: FideicomitenteSend = new FideicomitenteSend();
  public id: number;

  public fideicomisoArray: Fideicomiso[];
  public fideicomiso: Fideicomiso;

  // Modal
  modalfideicomiso: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private fideicomitenteService: FideicomitenteService
  ) {
    this.fideicomitenteForm = this.fb.group({
      numerofideicomitente: new FormControl('', Validators.required),
      tipopersona: new FormControl('', Validators.required),
      participante: new FormControl('', Validators.required),
      fideicomisoId: new FormControl('', Validators.required),
      fideicomisoItem: new FormControl(''),
      regimenfiscal: new FormControl('', Validators.required),
      generalescontroladorfideicomiso: new FormControl(''),
      generalesnacionalidad: new FormControl(''),
      generalespaisorigen: new FormControl(''),
      generalesactividad: new FormControl(''),
      generalesaportarecursos: new FormControl(''),
      generalespaisresidencia: new FormControl(''),
      generalesclientescotiabank: new FormControl(''),
      generalespep: new FormControl(''),
      generalesestatus: new FormControl(''),
      generalesgrupofilial: new FormControl(''),
      generalescalidadmigratoria: new FormControl(''),
      generaleslugaroperacion: new FormControl(''),
      generalesoperacuentaterceros: new FormControl(''),
      generalesnivelparticipante: new FormControl(''),
      generalesclienterelacionpep: new FormControl(''),
      generalesgrado: new FormControl(''),
      infopldkychonorarios: new FormControl(''),
      infopldkyccomisiones: new FormControl(''),
      infopldkycotros: new FormControl(''),
      infopldkycsueldos: new FormControl(''),
      infopldkycventa: new FormControl(''),
      infopldkycinversiones: new FormControl(''),
      infopldkycarrendamiento: new FormControl(''),
      infopldkyctipopatrimonio: new FormControl(''),
      infopldkycinstrumento: new FormControl(''),
      infopldkycrazonapertura: new FormControl(''),
      infopldkyccomentarios: new FormControl(''),
      infopldkycnivelriesgo: new FormControl(''),
      infopldkycestatuscalculopld: new FormControl(''),
      infopldkycfechaveriffircosoftAux: new FormControl(''),
      identificacionrfc: new FormControl(''),
      identificacioncurp: new FormControl(''),
      identificacionnoserieefirma: new FormControl(''),
      identificacionpaisresidfisc1: new FormControl(''),
      identificacionpaisresidfisc2: new FormControl(''),
      identificacionemail: new FormControl(''),
      identificacionfechaconstitucionAux: new FormControl(''),
      identificacionsexo: new FormControl(''),
      identificacionpaiscasa: new FormControl(''),
      identificacionpaisoficina: new FormControl(''),
      identificacionpaiscelular: new FormControl(''),
      identificacionfechainiciorelnegAux: new FormControl(''),
      identificacionnoidentificacion: new FormControl(''),
      identificacioncomprobaciondomicilio: new FormControl(''),
      identificacionactividadempresarial: new FormControl(''),
      identificacionnoidentfisc1: new FormControl(''),
      identificacionnoidentfisc2: new FormControl(''),
      identificacionclasificacionfatca: new FormControl(''),
      identificacionladacasa: new FormControl(''),
      identificacionladaoficina: new FormControl(''),
      identificacionladacelular: new FormControl(''),
      identificacionnumerocasa: new FormControl(''),
      identificacionnumerooficina: new FormControl(''),
      identificacionnumerocelular: new FormControl(''),
      identificacionextoficina: new FormControl(''),
      identificacionextcelular: new FormControl(''),
      identificacionidentoficialvig: new FormControl(''),
      identificacionvigencia: new FormControl(''),
      escrituranoescritura: new FormControl(''),
      escrituranotario: new FormControl(''),
      escrituranonotaria: new FormControl(''),
      escrituraciudad: new FormControl(''),
      escrituratelefono: new FormControl(''),
      escrituraemail: new FormControl(''),
      escriturafechaAux: new FormControl(''),
      escrituraestado: new FormControl(''),
      cuentaskycnocuenta1: new FormControl(''),
      cuentaskyctipocuenta1: new FormControl(''),
      cuentaskycnocuenta2: new FormControl(''),
      cuentaskyctipocuenta2: new FormControl(''),
      cuentaskycnocuenta3: new FormControl(''),
      cuentaskyctipocuenta3: new FormControl(''),
      cuentaskycnocuenta4: new FormControl(''),
      cuentaskyctipocuenta4: new FormControl(''),
    });
  }

  ngOnInit() {
    console.log('Fideicomitente agregar()');

    this.cargaFideicomiso();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (this.id !== undefined) {
      this.getRecuperaFideicomisoPorId(this.id);
    }
  }

  guardaFideicomitente() {
    this.submitted = true;

    if (this.fideicomitenteForm.invalid) {
      swal('Error...', 'Fideicomitente has fields to fill.', 'error');
    } else {
      this.fideicomitenteSend.numerofideicomitente = this.fideicomitenteForm.controls['numerofideicomitente'].value;
      this.fideicomitenteSend.tipopersona = this.fideicomitenteForm.controls['tipopersona'].value;
      this.fideicomitenteSend.participante = this.fideicomitenteForm.controls['participante'].value;
      this.fideicomitenteSend.fideicomisoId = this.fideicomitenteForm.controls['fideicomisoId'].value;
      this.fideicomitenteSend.regimenfiscal = this.fideicomitenteForm.controls['regimenfiscal'].value;
      this.fideicomitenteSend.generalescontroladorfideicomiso = this.fideicomitenteForm.controls[
        'generalescontroladorfideicomiso'
      ].value;
      this.fideicomitenteSend.generalesnacionalidad = this.fideicomitenteForm.controls['generalesnacionalidad'].value;
      this.fideicomitenteSend.generalespaisorigen = this.fideicomitenteForm.controls['generalespaisorigen'].value;
      this.fideicomitenteSend.generalesactividad = this.fideicomitenteForm.controls['generalesactividad'].value;
      this.fideicomitenteSend.generalesaportarecursos = this.fideicomitenteForm.controls[
        'generalesaportarecursos'
      ].value;
      this.fideicomitenteSend.generalespaisresidencia = this.fideicomitenteForm.controls[
        'generalespaisresidencia'
      ].value;
      this.fideicomitenteSend.generalesclientescotiabank = this.fideicomitenteForm.controls[
        'generalesclientescotiabank'
      ].value;
      this.fideicomitenteSend.generalespep = this.fideicomitenteForm.controls['generalespep'].value;
      this.fideicomitenteSend.generalesestatus = this.fideicomitenteForm.controls['generalesestatus'].value;
      this.fideicomitenteSend.generalesgrupofilial = this.fideicomitenteForm.controls['generalesgrupofilial'].value;
      this.fideicomitenteSend.generalescalidadmigratoria = this.fideicomitenteForm.controls[
        'generalescalidadmigratoria'
      ].value;
      this.fideicomitenteSend.generaleslugaroperacion = this.fideicomitenteForm.controls[
        'generaleslugaroperacion'
      ].value;
      this.fideicomitenteSend.generalesoperacuentaterceros = this.fideicomitenteForm.controls[
        'generalesoperacuentaterceros'
      ].value;
      this.fideicomitenteSend.generalesnivelparticipante = this.fideicomitenteForm.controls[
        'generalesnivelparticipante'
      ].value;
      this.fideicomitenteSend.generalesclienterelacionpep = this.fideicomitenteForm.controls[
        'generalesclienterelacionpep'
      ].value;
      this.fideicomitenteSend.generalesgrado = this.fideicomitenteForm.controls['generalesgrado'].value;
      this.fideicomitenteSend.infopldkychonorarios = this.fideicomitenteForm.controls['infopldkychonorarios'].value;
      this.fideicomitenteSend.infopldkyccomisiones = this.fideicomitenteForm.controls['infopldkyccomisiones'].value;
      this.fideicomitenteSend.infopldkycotros = this.fideicomitenteForm.controls['infopldkycotros'].value;
      this.fideicomitenteSend.infopldkycsueldos = this.fideicomitenteForm.controls['infopldkycsueldos'].value;
      this.fideicomitenteSend.infopldkycventa = this.fideicomitenteForm.controls['infopldkycventa'].value;
      this.fideicomitenteSend.infopldkycinversiones = this.fideicomitenteForm.controls['infopldkycinversiones'].value;
      this.fideicomitenteSend.infopldkycarrendamiento = this.fideicomitenteForm.controls[
        'infopldkycarrendamiento'
      ].value;
      this.fideicomitenteSend.infopldkyctipopatrimonio = this.fideicomitenteForm.controls[
        'infopldkyctipopatrimonio'
      ].value;
      this.fideicomitenteSend.infopldkycinstrumento = this.fideicomitenteForm.controls['infopldkycinstrumento'].value;
      this.fideicomitenteSend.infopldkycrazonapertura = this.fideicomitenteForm.controls[
        'infopldkycrazonapertura'
      ].value;
      this.fideicomitenteSend.infopldkyccomentarios = this.fideicomitenteForm.controls['infopldkyccomentarios'].value;
      this.fideicomitenteSend.infopldkycnivelriesgo = this.fideicomitenteForm.controls['infopldkycnivelriesgo'].value;
      this.fideicomitenteSend.infopldkycestatuscalculopld = this.fideicomitenteForm.controls[
        'infopldkycestatuscalculopld'
      ].value;
      let infopldkycfechaveriffircosoftAuxtoArray = this.fideicomitenteForm.controls[
        'infopldkycfechaveriffircosoftAux'
      ].value.split('/');
      let infopldkycfechaveriffircosoftAuxDate = new Date(
        infopldkycfechaveriffircosoftAuxtoArray[1] +
          '/' +
          infopldkycfechaveriffircosoftAuxtoArray[0] +
          '/' +
          infopldkycfechaveriffircosoftAuxtoArray[2]
      );
      this.fideicomitenteSend.infopldkycfechaveriffircosoft = infopldkycfechaveriffircosoftAuxDate.getTime();
      this.fideicomitenteSend.identificacionrfc = this.fideicomitenteForm.controls['identificacionrfc'].value;
      this.fideicomitenteSend.identificacioncurp = this.fideicomitenteForm.controls['identificacioncurp'].value;
      this.fideicomitenteSend.identificacionnoserieefirma = this.fideicomitenteForm.controls[
        'identificacionnoserieefirma'
      ].value;
      this.fideicomitenteSend.identificacionpaisresidfisc1 = this.fideicomitenteForm.controls[
        'identificacionpaisresidfisc1'
      ].value;
      this.fideicomitenteSend.identificacionpaisresidfisc2 = this.fideicomitenteForm.controls[
        'identificacionpaisresidfisc2'
      ].value;
      this.fideicomitenteSend.identificacionemail = this.fideicomitenteForm.controls['identificacionemail'].value;
      let identificacionfechaconstitucionAuxtoArray = this.fideicomitenteForm.controls[
        'identificacionfechaconstitucionAux'
      ].value.split('/');
      let identificacionfechaconstitucionAuxDate = new Date(
        identificacionfechaconstitucionAuxtoArray[1] +
          '/' +
          identificacionfechaconstitucionAuxtoArray[0] +
          '/' +
          identificacionfechaconstitucionAuxtoArray[2]
      );
      this.fideicomitenteSend.identificacionfechaconstitucion = identificacionfechaconstitucionAuxDate.getTime();
      this.fideicomitenteSend.identificacionsexo = this.fideicomitenteForm.controls['identificacionsexo'].value;
      this.fideicomitenteSend.identificacionpaiscasa = this.fideicomitenteForm.controls['identificacionpaiscasa'].value;
      this.fideicomitenteSend.identificacionpaisoficina = this.fideicomitenteForm.controls[
        'identificacionpaisoficina'
      ].value;
      this.fideicomitenteSend.identificacionpaiscelular = this.fideicomitenteForm.controls[
        'identificacionpaiscelular'
      ].value;
      let identificacionfechainiciorelnegAuxtoArray = this.fideicomitenteForm.controls[
        'identificacionfechainiciorelnegAux'
      ].value.split('/');
      let identificacionfechainiciorelnegAuxDate = new Date(
        identificacionfechainiciorelnegAuxtoArray[1] +
          '/' +
          identificacionfechainiciorelnegAuxtoArray[0] +
          '/' +
          identificacionfechainiciorelnegAuxtoArray[2]
      );
      this.fideicomitenteSend.identificacionfechainiciorelneg = identificacionfechainiciorelnegAuxDate.getTime();
      this.fideicomitenteSend.identificacionnoidentificacion = this.fideicomitenteForm.controls[
        'identificacionnoidentificacion'
      ].value;
      this.fideicomitenteSend.identificacioncomprobaciondomicilio = this.fideicomitenteForm.controls[
        'identificacioncomprobaciondomicilio'
      ].value;
      this.fideicomitenteSend.identificacionactividadempresarial = this.fideicomitenteForm.controls[
        'identificacionactividadempresarial'
      ].value;
      this.fideicomitenteSend.identificacionnoidentfisc1 = this.fideicomitenteForm.controls[
        'identificacionnoidentfisc1'
      ].value;
      this.fideicomitenteSend.identificacionnoidentfisc2 = this.fideicomitenteForm.controls[
        'identificacionnoidentfisc2'
      ].value;
      this.fideicomitenteSend.identificacionclasificacionfatca = this.fideicomitenteForm.controls[
        'identificacionclasificacionfatca'
      ].value;
      this.fideicomitenteSend.identificacionladacasa = this.fideicomitenteForm.controls['identificacionladacasa'].value;
      this.fideicomitenteSend.identificacionladaoficina = this.fideicomitenteForm.controls[
        'identificacionladaoficina'
      ].value;
      this.fideicomitenteSend.identificacionladacelular = this.fideicomitenteForm.controls[
        'identificacionladacelular'
      ].value;
      this.fideicomitenteSend.identificacionnumerocasa = this.fideicomitenteForm.controls[
        'identificacionnumerocasa'
      ].value;
      this.fideicomitenteSend.identificacionnumerooficina = this.fideicomitenteForm.controls[
        'identificacionnumerooficina'
      ].value;
      this.fideicomitenteSend.identificacionnumerocelular = this.fideicomitenteForm.controls[
        'identificacionnumerocelular'
      ].value;
      this.fideicomitenteSend.identificacionextoficina = this.fideicomitenteForm.controls[
        'identificacionextoficina'
      ].value;
      this.fideicomitenteSend.identificacionextcelular = this.fideicomitenteForm.controls[
        'identificacionextcelular'
      ].value;
      this.fideicomitenteSend.identificacionidentoficialvig = this.fideicomitenteForm.controls[
        'identificacionidentoficialvig'
      ].value;
      this.fideicomitenteSend.identificacionvigencia = this.fideicomitenteForm.controls['identificacionvigencia'].value;
      this.fideicomitenteSend.escrituranoescritura = this.fideicomitenteForm.controls['escrituranoescritura'].value;
      this.fideicomitenteSend.escrituranotario = this.fideicomitenteForm.controls['escrituranotario'].value;
      this.fideicomitenteSend.escrituranonotaria = this.fideicomitenteForm.controls['escrituranonotaria'].value;
      this.fideicomitenteSend.escrituraciudad = this.fideicomitenteForm.controls['escrituraciudad'].value;
      this.fideicomitenteSend.escrituratelefono = this.fideicomitenteForm.controls['escrituratelefono'].value;
      this.fideicomitenteSend.escrituraemail = this.fideicomitenteForm.controls['escrituraemail'].value;
      let escriturafechaAuxtoArray = this.fideicomitenteForm.controls['escriturafechaAux'].value.split('/');
      let escriturafechaAuxDate = new Date(
        escriturafechaAuxtoArray[1] + '/' + escriturafechaAuxtoArray[0] + '/' + escriturafechaAuxtoArray[2]
      );
      this.fideicomitenteSend.escriturafecha = escriturafechaAuxDate.getTime();
      this.fideicomitenteSend.escrituraestado = this.fideicomitenteForm.controls['escrituraestado'].value;
      this.fideicomitenteSend.cuentaskycnocuenta1 = this.fideicomitenteForm.controls['cuentaskycnocuenta1'].value;
      this.fideicomitenteSend.cuentaskyctipocuenta1 = this.fideicomitenteForm.controls['cuentaskyctipocuenta1'].value;
      this.fideicomitenteSend.cuentaskycnocuenta2 = this.fideicomitenteForm.controls['cuentaskycnocuenta2'].value;
      this.fideicomitenteSend.cuentaskyctipocuenta2 = this.fideicomitenteForm.controls['cuentaskyctipocuenta2'].value;
      this.fideicomitenteSend.cuentaskycnocuenta3 = this.fideicomitenteForm.controls['cuentaskycnocuenta3'].value;
      this.fideicomitenteSend.cuentaskyctipocuenta3 = this.fideicomitenteForm.controls['cuentaskyctipocuenta3'].value;
      this.fideicomitenteSend.cuentaskycnocuenta4 = this.fideicomitenteForm.controls['cuentaskycnocuenta4'].value;
      this.fideicomitenteSend.cuentaskyctipocuenta4 = this.fideicomitenteForm.controls['cuentaskyctipocuenta4'].value;

      this.fideicomitenteService.postGuardaFideicomitente(this.fideicomitenteSend).subscribe(
        res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Fideicomitente save successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Fideicomitente has fields to fill.', 'error');
            }
          }
        },
        error => {
          swal('Error...', 'Fideicomitente save unsuccessfully.', 'error');
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

      this.fideicomitenteForm.controls['fideicomisoId'].setValue(fideicomiso.id);
      this.fideicomitenteForm.controls['fideicomisoItem'].setValue(fideicomiso.generalesnumero);
    } else {
      this.fideicomisoService.clear();
      this.fideicomitenteForm.controls['fideicomisoId'].setValue(null);
      this.fideicomitenteForm.controls['fideicomisoItem'].setValue('');
    }
  }

  regresaFideicomitente() {
    this.location.back();
  }
}
