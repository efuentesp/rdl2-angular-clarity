/* PSG  Fideicomisario Edita Ts */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Fideicomisario } from '../fideicomisario.psg.model';
import { FideicomisarioSend } from '../fideicomisario.psg.model-send';
import { FideicomisarioService } from '../fideicomisario.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-fideicomisario-editar',
  styleUrls: ['../fideicomisario.psg.scss'],
  templateUrl: './fideicomisario-editar.psg.html',
})
export class FideicomisarioEditarForm implements OnInit {
  public fideicomisarioForm: FormGroup;
  public submitted = false;
  public loading = false;
  public fideicomisario: Fideicomisario = new Fideicomisario();
  public fideicomisarioSend: FideicomisarioSend = new FideicomisarioSend();
  public idFideicomisario: string;
  public datePipe = new DatePipe('en-US');
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
    private fideicomisarioService: FideicomisarioService
  ) {
    this.fideicomisarioForm = this.fb.group({
      numerofideicomisario: new FormControl('', Validators.required),
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
    this.recuperaFideicomisario();

    this.cargaFideicomiso();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaFideicomisario() {
    this.fideicomisario = this.fideicomisarioService.getFideicomisario();
    this.fideicomisarioForm.controls['numerofideicomisario'].setValue(this.fideicomisario.numerofideicomisario);
    this.fideicomisarioForm.controls['tipopersona'].setValue(this.fideicomisario.tipopersona);
    this.fideicomisarioForm.controls['participante'].setValue(this.fideicomisario.participante);
    this.fideicomisarioForm.controls['fideicomisoId'].setValue(this.fideicomisario.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.fideicomisario.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.fideicomisarioForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });

    this.fideicomisarioForm.controls['regimenfiscal'].setValue(this.fideicomisario.regimenfiscal);
    this.fideicomisarioForm.controls['generalescontroladorfideicomiso'].setValue(
      this.fideicomisario.generalescontroladorfideicomiso
    );
    this.fideicomisarioForm.controls['generalesnacionalidad'].setValue(this.fideicomisario.generalesnacionalidad);
    this.fideicomisarioForm.controls['generalespaisorigen'].setValue(this.fideicomisario.generalespaisorigen);
    this.fideicomisarioForm.controls['generalesactividad'].setValue(this.fideicomisario.generalesactividad);
    this.fideicomisarioForm.controls['generalesaportarecursos'].setValue(this.fideicomisario.generalesaportarecursos);
    this.fideicomisarioForm.controls['generalespaisresidencia'].setValue(this.fideicomisario.generalespaisresidencia);
    this.fideicomisarioForm.controls['generalesclientescotiabank'].setValue(
      this.fideicomisario.generalesclientescotiabank
    );
    this.fideicomisarioForm.controls['generalespep'].setValue(this.fideicomisario.generalespep);
    this.fideicomisarioForm.controls['generalesestatus'].setValue(this.fideicomisario.generalesestatus);
    this.fideicomisarioForm.controls['generalesgrupofilial'].setValue(this.fideicomisario.generalesgrupofilial);
    this.fideicomisarioForm.controls['generalescalidadmigratoria'].setValue(
      this.fideicomisario.generalescalidadmigratoria
    );
    this.fideicomisarioForm.controls['generaleslugaroperacion'].setValue(this.fideicomisario.generaleslugaroperacion);
    this.fideicomisarioForm.controls['generalesoperacuentaterceros'].setValue(
      this.fideicomisario.generalesoperacuentaterceros
    );
    this.fideicomisarioForm.controls['generalesnivelparticipante'].setValue(
      this.fideicomisario.generalesnivelparticipante
    );
    this.fideicomisarioForm.controls['generalesclienterelacionpep'].setValue(
      this.fideicomisario.generalesclienterelacionpep
    );
    this.fideicomisarioForm.controls['generalesgrado'].setValue(this.fideicomisario.generalesgrado);
    this.fideicomisarioForm.controls['infopldkychonorarios'].setValue(this.fideicomisario.infopldkychonorarios);
    this.fideicomisarioForm.controls['infopldkyccomisiones'].setValue(this.fideicomisario.infopldkyccomisiones);
    this.fideicomisarioForm.controls['infopldkycotros'].setValue(this.fideicomisario.infopldkycotros);
    this.fideicomisarioForm.controls['infopldkycsueldos'].setValue(this.fideicomisario.infopldkycsueldos);
    this.fideicomisarioForm.controls['infopldkycventa'].setValue(this.fideicomisario.infopldkycventa);
    this.fideicomisarioForm.controls['infopldkycinversiones'].setValue(this.fideicomisario.infopldkycinversiones);
    this.fideicomisarioForm.controls['infopldkycarrendamiento'].setValue(this.fideicomisario.infopldkycarrendamiento);
    this.fideicomisarioForm.controls['infopldkyctipopatrimonio'].setValue(this.fideicomisario.infopldkyctipopatrimonio);
    this.fideicomisarioForm.controls['infopldkycinstrumento'].setValue(this.fideicomisario.infopldkycinstrumento);
    this.fideicomisarioForm.controls['infopldkycrazonapertura'].setValue(this.fideicomisario.infopldkycrazonapertura);
    this.fideicomisarioForm.controls['infopldkyccomentarios'].setValue(this.fideicomisario.infopldkyccomentarios);
    this.fideicomisarioForm.controls['infopldkycnivelriesgo'].setValue(this.fideicomisario.infopldkycnivelriesgo);
    this.fideicomisarioForm.controls['infopldkycestatuscalculopld'].setValue(
      this.fideicomisario.infopldkycestatuscalculopld
    );
    this.fideicomisarioForm.controls['infopldkycfechaveriffircosoftAux'].setValue(
      this.datePipe.transform(this.fideicomisario.infopldkycfechaveriffircosoft, 'dd/MM/yyyy')
    );
    this.fideicomisarioForm.controls['identificacionrfc'].setValue(this.fideicomisario.identificacionrfc);
    this.fideicomisarioForm.controls['identificacioncurp'].setValue(this.fideicomisario.identificacioncurp);
    this.fideicomisarioForm.controls['identificacionnoserieefirma'].setValue(
      this.fideicomisario.identificacionnoserieefirma
    );
    this.fideicomisarioForm.controls['identificacionpaisresidfisc1'].setValue(
      this.fideicomisario.identificacionpaisresidfisc1
    );
    this.fideicomisarioForm.controls['identificacionpaisresidfisc2'].setValue(
      this.fideicomisario.identificacionpaisresidfisc2
    );
    this.fideicomisarioForm.controls['identificacionemail'].setValue(this.fideicomisario.identificacionemail);
    this.fideicomisarioForm.controls['identificacionfechaconstitucionAux'].setValue(
      this.datePipe.transform(this.fideicomisario.identificacionfechaconstitucion, 'dd/MM/yyyy')
    );
    this.fideicomisarioForm.controls['identificacionsexo'].setValue(this.fideicomisario.identificacionsexo);
    this.fideicomisarioForm.controls['identificacionpaiscasa'].setValue(this.fideicomisario.identificacionpaiscasa);
    this.fideicomisarioForm.controls['identificacionpaisoficina'].setValue(
      this.fideicomisario.identificacionpaisoficina
    );
    this.fideicomisarioForm.controls['identificacionpaiscelular'].setValue(
      this.fideicomisario.identificacionpaiscelular
    );
    this.fideicomisarioForm.controls['identificacionfechainiciorelnegAux'].setValue(
      this.datePipe.transform(this.fideicomisario.identificacionfechainiciorelneg, 'dd/MM/yyyy')
    );
    this.fideicomisarioForm.controls['identificacionnoidentificacion'].setValue(
      this.fideicomisario.identificacionnoidentificacion
    );
    this.fideicomisarioForm.controls['identificacioncomprobaciondomicilio'].setValue(
      this.fideicomisario.identificacioncomprobaciondomicilio
    );
    this.fideicomisarioForm.controls['identificacionactividadempresarial'].setValue(
      this.fideicomisario.identificacionactividadempresarial
    );
    this.fideicomisarioForm.controls['identificacionnoidentfisc1'].setValue(
      this.fideicomisario.identificacionnoidentfisc1
    );
    this.fideicomisarioForm.controls['identificacionnoidentfisc2'].setValue(
      this.fideicomisario.identificacionnoidentfisc2
    );
    this.fideicomisarioForm.controls['identificacionclasificacionfatca'].setValue(
      this.fideicomisario.identificacionclasificacionfatca
    );
    this.fideicomisarioForm.controls['identificacionladacasa'].setValue(this.fideicomisario.identificacionladacasa);
    this.fideicomisarioForm.controls['identificacionladaoficina'].setValue(
      this.fideicomisario.identificacionladaoficina
    );
    this.fideicomisarioForm.controls['identificacionladacelular'].setValue(
      this.fideicomisario.identificacionladacelular
    );
    this.fideicomisarioForm.controls['identificacionnumerocasa'].setValue(this.fideicomisario.identificacionnumerocasa);
    this.fideicomisarioForm.controls['identificacionnumerooficina'].setValue(
      this.fideicomisario.identificacionnumerooficina
    );
    this.fideicomisarioForm.controls['identificacionnumerocelular'].setValue(
      this.fideicomisario.identificacionnumerocelular
    );
    this.fideicomisarioForm.controls['identificacionextoficina'].setValue(this.fideicomisario.identificacionextoficina);
    this.fideicomisarioForm.controls['identificacionextcelular'].setValue(this.fideicomisario.identificacionextcelular);
    this.fideicomisarioForm.controls['identificacionidentoficialvig'].setValue(
      this.fideicomisario.identificacionidentoficialvig
    );
    this.fideicomisarioForm.controls['identificacionvigencia'].setValue(this.fideicomisario.identificacionvigencia);
    this.fideicomisarioForm.controls['escrituranoescritura'].setValue(this.fideicomisario.escrituranoescritura);
    this.fideicomisarioForm.controls['escrituranotario'].setValue(this.fideicomisario.escrituranotario);
    this.fideicomisarioForm.controls['escrituranonotaria'].setValue(this.fideicomisario.escrituranonotaria);
    this.fideicomisarioForm.controls['escrituraciudad'].setValue(this.fideicomisario.escrituraciudad);
    this.fideicomisarioForm.controls['escrituratelefono'].setValue(this.fideicomisario.escrituratelefono);
    this.fideicomisarioForm.controls['escrituraemail'].setValue(this.fideicomisario.escrituraemail);
    this.fideicomisarioForm.controls['escriturafechaAux'].setValue(
      this.datePipe.transform(this.fideicomisario.escriturafecha, 'dd/MM/yyyy')
    );
    this.fideicomisarioForm.controls['escrituraestado'].setValue(this.fideicomisario.escrituraestado);
    this.fideicomisarioForm.controls['cuentaskycnocuenta1'].setValue(this.fideicomisario.cuentaskycnocuenta1);
    this.fideicomisarioForm.controls['cuentaskyctipocuenta1'].setValue(this.fideicomisario.cuentaskyctipocuenta1);
    this.fideicomisarioForm.controls['cuentaskycnocuenta2'].setValue(this.fideicomisario.cuentaskycnocuenta2);
    this.fideicomisarioForm.controls['cuentaskyctipocuenta2'].setValue(this.fideicomisario.cuentaskyctipocuenta2);
    this.fideicomisarioForm.controls['cuentaskycnocuenta3'].setValue(this.fideicomisario.cuentaskycnocuenta3);
    this.fideicomisarioForm.controls['cuentaskyctipocuenta3'].setValue(this.fideicomisario.cuentaskyctipocuenta3);
    this.fideicomisarioForm.controls['cuentaskycnocuenta4'].setValue(this.fideicomisario.cuentaskycnocuenta4);
    this.fideicomisarioForm.controls['cuentaskyctipocuenta4'].setValue(this.fideicomisario.cuentaskyctipocuenta4);
  }

  editaFideicomisario() {
    this.submitted = true;

    if (this.fideicomisarioForm.invalid) {
      swal('Error...', 'Fideicomisario has fields to fill.', 'error');
    } else {
      this.route.params.subscribe(params => {
        this.idFideicomisario = params['id'];
      });

      this.fideicomisarioSend.numerofideicomisario = this.fideicomisarioForm.controls['numerofideicomisario'].value;
      this.fideicomisarioSend.tipopersona = this.fideicomisarioForm.controls['tipopersona'].value;
      this.fideicomisarioSend.participante = this.fideicomisarioForm.controls['participante'].value;
      this.fideicomisarioSend.fideicomisoId = this.fideicomisarioForm.controls['fideicomisoId'].value;
      this.fideicomisarioSend.regimenfiscal = this.fideicomisarioForm.controls['regimenfiscal'].value;
      this.fideicomisarioSend.generalescontroladorfideicomiso = this.fideicomisarioForm.controls[
        'generalescontroladorfideicomiso'
      ].value;
      this.fideicomisarioSend.generalesnacionalidad = this.fideicomisarioForm.controls['generalesnacionalidad'].value;
      this.fideicomisarioSend.generalespaisorigen = this.fideicomisarioForm.controls['generalespaisorigen'].value;
      this.fideicomisarioSend.generalesactividad = this.fideicomisarioForm.controls['generalesactividad'].value;
      this.fideicomisarioSend.generalesaportarecursos = this.fideicomisarioForm.controls[
        'generalesaportarecursos'
      ].value;
      this.fideicomisarioSend.generalespaisresidencia = this.fideicomisarioForm.controls[
        'generalespaisresidencia'
      ].value;
      this.fideicomisarioSend.generalesclientescotiabank = this.fideicomisarioForm.controls[
        'generalesclientescotiabank'
      ].value;
      this.fideicomisarioSend.generalespep = this.fideicomisarioForm.controls['generalespep'].value;
      this.fideicomisarioSend.generalesestatus = this.fideicomisarioForm.controls['generalesestatus'].value;
      this.fideicomisarioSend.generalesgrupofilial = this.fideicomisarioForm.controls['generalesgrupofilial'].value;
      this.fideicomisarioSend.generalescalidadmigratoria = this.fideicomisarioForm.controls[
        'generalescalidadmigratoria'
      ].value;
      this.fideicomisarioSend.generaleslugaroperacion = this.fideicomisarioForm.controls[
        'generaleslugaroperacion'
      ].value;
      this.fideicomisarioSend.generalesoperacuentaterceros = this.fideicomisarioForm.controls[
        'generalesoperacuentaterceros'
      ].value;
      this.fideicomisarioSend.generalesnivelparticipante = this.fideicomisarioForm.controls[
        'generalesnivelparticipante'
      ].value;
      this.fideicomisarioSend.generalesclienterelacionpep = this.fideicomisarioForm.controls[
        'generalesclienterelacionpep'
      ].value;
      this.fideicomisarioSend.generalesgrado = this.fideicomisarioForm.controls['generalesgrado'].value;
      this.fideicomisarioSend.infopldkychonorarios = this.fideicomisarioForm.controls['infopldkychonorarios'].value;
      this.fideicomisarioSend.infopldkyccomisiones = this.fideicomisarioForm.controls['infopldkyccomisiones'].value;
      this.fideicomisarioSend.infopldkycotros = this.fideicomisarioForm.controls['infopldkycotros'].value;
      this.fideicomisarioSend.infopldkycsueldos = this.fideicomisarioForm.controls['infopldkycsueldos'].value;
      this.fideicomisarioSend.infopldkycventa = this.fideicomisarioForm.controls['infopldkycventa'].value;
      this.fideicomisarioSend.infopldkycinversiones = this.fideicomisarioForm.controls['infopldkycinversiones'].value;
      this.fideicomisarioSend.infopldkycarrendamiento = this.fideicomisarioForm.controls[
        'infopldkycarrendamiento'
      ].value;
      this.fideicomisarioSend.infopldkyctipopatrimonio = this.fideicomisarioForm.controls[
        'infopldkyctipopatrimonio'
      ].value;
      this.fideicomisarioSend.infopldkycinstrumento = this.fideicomisarioForm.controls['infopldkycinstrumento'].value;
      this.fideicomisarioSend.infopldkycrazonapertura = this.fideicomisarioForm.controls[
        'infopldkycrazonapertura'
      ].value;
      this.fideicomisarioSend.infopldkyccomentarios = this.fideicomisarioForm.controls['infopldkyccomentarios'].value;
      this.fideicomisarioSend.infopldkycnivelriesgo = this.fideicomisarioForm.controls['infopldkycnivelriesgo'].value;
      this.fideicomisarioSend.infopldkycestatuscalculopld = this.fideicomisarioForm.controls[
        'infopldkycestatuscalculopld'
      ].value;
      if (this.fideicomisarioForm.controls['infopldkycfechaveriffircosoftAux'].value !== null) {
        let infopldkycfechaveriffircosoftAuxtoArray = this.fideicomisarioForm.controls[
          'infopldkycfechaveriffircosoftAux'
        ].value.split('/');
        let infopldkycfechaveriffircosoftAuxDate = new Date(
          infopldkycfechaveriffircosoftAuxtoArray[1] +
            '/' +
            infopldkycfechaveriffircosoftAuxtoArray[0] +
            '/' +
            infopldkycfechaveriffircosoftAuxtoArray[2]
        );
        this.fideicomisarioSend.infopldkycfechaveriffircosoft = infopldkycfechaveriffircosoftAuxDate.getTime();
      } else {
        this.fideicomisarioSend.infopldkycfechaveriffircosoft = null;
      }
      this.fideicomisarioSend.identificacionrfc = this.fideicomisarioForm.controls['identificacionrfc'].value;
      this.fideicomisarioSend.identificacioncurp = this.fideicomisarioForm.controls['identificacioncurp'].value;
      this.fideicomisarioSend.identificacionnoserieefirma = this.fideicomisarioForm.controls[
        'identificacionnoserieefirma'
      ].value;
      this.fideicomisarioSend.identificacionpaisresidfisc1 = this.fideicomisarioForm.controls[
        'identificacionpaisresidfisc1'
      ].value;
      this.fideicomisarioSend.identificacionpaisresidfisc2 = this.fideicomisarioForm.controls[
        'identificacionpaisresidfisc2'
      ].value;
      this.fideicomisarioSend.identificacionemail = this.fideicomisarioForm.controls['identificacionemail'].value;
      if (this.fideicomisarioForm.controls['identificacionfechaconstitucionAux'].value !== null) {
        let identificacionfechaconstitucionAuxtoArray = this.fideicomisarioForm.controls[
          'identificacionfechaconstitucionAux'
        ].value.split('/');
        let identificacionfechaconstitucionAuxDate = new Date(
          identificacionfechaconstitucionAuxtoArray[1] +
            '/' +
            identificacionfechaconstitucionAuxtoArray[0] +
            '/' +
            identificacionfechaconstitucionAuxtoArray[2]
        );
        this.fideicomisarioSend.identificacionfechaconstitucion = identificacionfechaconstitucionAuxDate.getTime();
      } else {
        this.fideicomisarioSend.identificacionfechaconstitucion = null;
      }
      this.fideicomisarioSend.identificacionsexo = this.fideicomisarioForm.controls['identificacionsexo'].value;
      this.fideicomisarioSend.identificacionpaiscasa = this.fideicomisarioForm.controls['identificacionpaiscasa'].value;
      this.fideicomisarioSend.identificacionpaisoficina = this.fideicomisarioForm.controls[
        'identificacionpaisoficina'
      ].value;
      this.fideicomisarioSend.identificacionpaiscelular = this.fideicomisarioForm.controls[
        'identificacionpaiscelular'
      ].value;
      if (this.fideicomisarioForm.controls['identificacionfechainiciorelnegAux'].value !== null) {
        let identificacionfechainiciorelnegAuxtoArray = this.fideicomisarioForm.controls[
          'identificacionfechainiciorelnegAux'
        ].value.split('/');
        let identificacionfechainiciorelnegAuxDate = new Date(
          identificacionfechainiciorelnegAuxtoArray[1] +
            '/' +
            identificacionfechainiciorelnegAuxtoArray[0] +
            '/' +
            identificacionfechainiciorelnegAuxtoArray[2]
        );
        this.fideicomisarioSend.identificacionfechainiciorelneg = identificacionfechainiciorelnegAuxDate.getTime();
      } else {
        this.fideicomisarioSend.identificacionfechainiciorelneg = null;
      }
      this.fideicomisarioSend.identificacionnoidentificacion = this.fideicomisarioForm.controls[
        'identificacionnoidentificacion'
      ].value;
      this.fideicomisarioSend.identificacioncomprobaciondomicilio = this.fideicomisarioForm.controls[
        'identificacioncomprobaciondomicilio'
      ].value;
      this.fideicomisarioSend.identificacionactividadempresarial = this.fideicomisarioForm.controls[
        'identificacionactividadempresarial'
      ].value;
      this.fideicomisarioSend.identificacionnoidentfisc1 = this.fideicomisarioForm.controls[
        'identificacionnoidentfisc1'
      ].value;
      this.fideicomisarioSend.identificacionnoidentfisc2 = this.fideicomisarioForm.controls[
        'identificacionnoidentfisc2'
      ].value;
      this.fideicomisarioSend.identificacionclasificacionfatca = this.fideicomisarioForm.controls[
        'identificacionclasificacionfatca'
      ].value;
      this.fideicomisarioSend.identificacionladacasa = this.fideicomisarioForm.controls['identificacionladacasa'].value;
      this.fideicomisarioSend.identificacionladaoficina = this.fideicomisarioForm.controls[
        'identificacionladaoficina'
      ].value;
      this.fideicomisarioSend.identificacionladacelular = this.fideicomisarioForm.controls[
        'identificacionladacelular'
      ].value;
      this.fideicomisarioSend.identificacionnumerocasa = this.fideicomisarioForm.controls[
        'identificacionnumerocasa'
      ].value;
      this.fideicomisarioSend.identificacionnumerooficina = this.fideicomisarioForm.controls[
        'identificacionnumerooficina'
      ].value;
      this.fideicomisarioSend.identificacionnumerocelular = this.fideicomisarioForm.controls[
        'identificacionnumerocelular'
      ].value;
      this.fideicomisarioSend.identificacionextoficina = this.fideicomisarioForm.controls[
        'identificacionextoficina'
      ].value;
      this.fideicomisarioSend.identificacionextcelular = this.fideicomisarioForm.controls[
        'identificacionextcelular'
      ].value;
      this.fideicomisarioSend.identificacionidentoficialvig = this.fideicomisarioForm.controls[
        'identificacionidentoficialvig'
      ].value;
      this.fideicomisarioSend.identificacionvigencia = this.fideicomisarioForm.controls['identificacionvigencia'].value;
      this.fideicomisarioSend.escrituranoescritura = this.fideicomisarioForm.controls['escrituranoescritura'].value;
      this.fideicomisarioSend.escrituranotario = this.fideicomisarioForm.controls['escrituranotario'].value;
      this.fideicomisarioSend.escrituranonotaria = this.fideicomisarioForm.controls['escrituranonotaria'].value;
      this.fideicomisarioSend.escrituraciudad = this.fideicomisarioForm.controls['escrituraciudad'].value;
      this.fideicomisarioSend.escrituratelefono = this.fideicomisarioForm.controls['escrituratelefono'].value;
      this.fideicomisarioSend.escrituraemail = this.fideicomisarioForm.controls['escrituraemail'].value;
      if (this.fideicomisarioForm.controls['escriturafechaAux'].value !== null) {
        let escriturafechaAuxtoArray = this.fideicomisarioForm.controls['escriturafechaAux'].value.split('/');
        let escriturafechaAuxDate = new Date(
          escriturafechaAuxtoArray[1] + '/' + escriturafechaAuxtoArray[0] + '/' + escriturafechaAuxtoArray[2]
        );
        this.fideicomisarioSend.escriturafecha = escriturafechaAuxDate.getTime();
      } else {
        this.fideicomisarioSend.escriturafecha = null;
      }
      this.fideicomisarioSend.escrituraestado = this.fideicomisarioForm.controls['escrituraestado'].value;
      this.fideicomisarioSend.cuentaskycnocuenta1 = this.fideicomisarioForm.controls['cuentaskycnocuenta1'].value;
      this.fideicomisarioSend.cuentaskyctipocuenta1 = this.fideicomisarioForm.controls['cuentaskyctipocuenta1'].value;
      this.fideicomisarioSend.cuentaskycnocuenta2 = this.fideicomisarioForm.controls['cuentaskycnocuenta2'].value;
      this.fideicomisarioSend.cuentaskyctipocuenta2 = this.fideicomisarioForm.controls['cuentaskyctipocuenta2'].value;
      this.fideicomisarioSend.cuentaskycnocuenta3 = this.fideicomisarioForm.controls['cuentaskycnocuenta3'].value;
      this.fideicomisarioSend.cuentaskyctipocuenta3 = this.fideicomisarioForm.controls['cuentaskyctipocuenta3'].value;
      this.fideicomisarioSend.cuentaskycnocuenta4 = this.fideicomisarioForm.controls['cuentaskycnocuenta4'].value;
      this.fideicomisarioSend.cuentaskyctipocuenta4 = this.fideicomisarioForm.controls['cuentaskyctipocuenta4'].value;

      this.fideicomisarioService
        .updateEditaFideicomisario(this.fideicomisarioSend, this.idFideicomisario)
        .subscribe(res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Fideicomisario save successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Fideicomisario has fields to fill.', 'error');
            }
          } else {
            swal('Error...', 'Fideicomisario save unsuccessfully.', 'error');
          }
        });
    }
  }

  cargaFideicomiso() {
    this.fideicomisoService.getRecuperaFideicomiso().subscribe(
      res => {
        if (res) {
          this.fideicomisoArray = res.json();

          this.fideicomisoArray.forEach(element => {
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
      },
      error => {
        //swal('Error...', 'An error occurred while calling Prospecto.', 'error');
      }
    );
  }

  setClickedRowFideicomiso(index, fideicomiso) {
    fideicomiso.checked = !fideicomiso.checked;
    if (fideicomiso.checked) {
      this.fideicomisoService.setFideicomiso(fideicomiso);

      this.fideicomisarioForm.controls['fideicomisoId'].setValue(fideicomiso.id);
      this.fideicomisarioForm.controls['fideicomisoItem'].setValue(fideicomiso.generalesnumero);
    } else {
      this.fideicomisoService.clear();
      this.fideicomisarioForm.controls['fideicomisoId'].setValue(null);
      this.fideicomisarioForm.controls['fideicomisoItem'].setValue('');
    }
  }

  regresaFideicomisario() {
    this.location.back();
  }
}
