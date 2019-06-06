/* PSG  Aportacioninmueble Edita Ts */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Aportacioninmueble } from '../aportacioninmueble.psg.model';
import { AportacioninmuebleSend } from '../aportacioninmueble.psg.model-send';
import { AportacioninmuebleService } from '../aportacioninmueble.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-aportacioninmueble-editar',
  styleUrls: ['../aportacioninmueble.psg.scss'],
  templateUrl: './aportacioninmueble-editar.psg.html',
})
export class AportacioninmuebleEditarForm implements OnInit {
  public aportacioninmuebleForm: FormGroup;
  public submitted = false;
  public loading = false;
  public aportacioninmueble: Aportacioninmueble = new Aportacioninmueble();
  public aportacioninmuebleSend: AportacioninmuebleSend = new AportacioninmuebleSend();
  public idAportacioninmueble: string;
  public datePipe = new DatePipe('en-US');
  public id: number;

  public fideicomisoArray: Fideicomiso[];
  public fideicomiso: Fideicomiso;
  public subfisoArray: Subfiso[];
  public subfiso: Subfiso;

  // Modal
  modalfideicomiso: boolean = false;
  modalsubfiso: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private subfisoService: SubfisoService,
    private aportacioninmuebleService: AportacioninmuebleService
  ) {
    this.aportacioninmuebleForm = this.fb.group({
      fideicomisoId: new FormControl('', Validators.required),
      fideicomisoItem: new FormControl(''),
      subfisoId: new FormControl('', Validators.required),
      subfisoItem: new FormControl(''),
      tiponegocio: new FormControl('', Validators.required),
      producto: new FormControl('', Validators.required),
      idinmueble: new FormControl('', Validators.required),
      fechaaltaAux: new FormControl(''),
      tipoinmueble: new FormControl('', Validators.required),
      arbol: new FormControl(''),
      fecharegistroAux: new FormControl(''),
      tipofraccion: new FormControl(''),
      descripcion: new FormControl('', Validators.required),
      inmueblevalorinicial: new FormControl('', Validators.required),
      inmuebleubicacion: new FormControl('', Validators.required),
      inmuebleestado: new FormControl('', Validators.required),
      inmueblesuperficie: new FormControl(''),
      inmuebleindivisos: new FormControl(''),
      inmuebledias: new FormControl(''),
      inmuebleproyectoejecutivo: new FormControl(''),
      inmueblevaloractual: new FormControl(''),
      inmuebleciudad: new FormControl('', Validators.required),
      inmueblesuperficieconstruida: new FormControl('', Validators.required),
      inmueblefraccionamientounidad: new FormControl(''),
      inmuebleclavecatastral: new FormControl(''),
      inmueblevalor: new FormControl(''),
      inmuebleestatus: new FormControl('', Validators.required),
      datosconstitucionescritura: new FormControl(''),
      datosconstitucionnumescritura: new FormControl(''),
      datosconstitucionnombrenotario: new FormControl('', Validators.required),
      datosconstitucionestadonotario: new FormControl(''),
      datosconstituciontelefononotario: new FormControl(''),
      datosconstitucionfecharppAux: new FormControl('', Validators.required),
      datosconstitucionfechaescrituraAux: new FormControl(''),
      datosconstitucionnumnotaria: new FormControl('', Validators.required),
      datosconstitucionciudadnotario: new FormControl(''),
      datosconstitucionemailnotario: new FormControl(''),
      datosconstitucionnumrpp: new FormControl(''),
    });
  }

  ngOnInit() {
    this.recuperaAportacioninmueble();

    this.cargaFideicomiso();
    this.cargaSubfiso();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaAportacioninmueble() {
    this.aportacioninmueble = this.aportacioninmuebleService.getAportacioninmueble();
    this.aportacioninmuebleForm.controls['fideicomisoId'].setValue(this.aportacioninmueble.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.aportacioninmueble.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.aportacioninmuebleForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });

    this.aportacioninmuebleForm.controls['subfisoId'].setValue(this.aportacioninmueble.subfisoId);
    this.subfisoService.getRecuperaSubfisoPorId(this.aportacioninmueble.subfisoId).subscribe(res => {
      if (res) {
        this.subfiso = res.json();
        this.aportacioninmuebleForm.controls['subfisoItem'].setValue(this.subfiso.numero);
      }
    });

    this.aportacioninmuebleForm.controls['tiponegocio'].setValue(this.aportacioninmueble.tiponegocio);
    this.aportacioninmuebleForm.controls['producto'].setValue(this.aportacioninmueble.producto);
    this.aportacioninmuebleForm.controls['idinmueble'].setValue(this.aportacioninmueble.idinmueble);
    this.aportacioninmuebleForm.controls['fechaaltaAux'].setValue(
      this.datePipe.transform(this.aportacioninmueble.fechaalta, 'dd/MM/yyyy')
    );
    this.aportacioninmuebleForm.controls['tipoinmueble'].setValue(this.aportacioninmueble.tipoinmueble);
    this.aportacioninmuebleForm.controls['arbol'].setValue(this.aportacioninmueble.arbol);
    this.aportacioninmuebleForm.controls['fecharegistroAux'].setValue(
      this.datePipe.transform(this.aportacioninmueble.fecharegistro, 'dd/MM/yyyy')
    );
    this.aportacioninmuebleForm.controls['tipofraccion'].setValue(this.aportacioninmueble.tipofraccion);
    this.aportacioninmuebleForm.controls['descripcion'].setValue(this.aportacioninmueble.descripcion);
    this.aportacioninmuebleForm.controls['inmueblevalorinicial'].setValue(this.aportacioninmueble.inmueblevalorinicial);
    this.aportacioninmuebleForm.controls['inmuebleubicacion'].setValue(this.aportacioninmueble.inmuebleubicacion);
    this.aportacioninmuebleForm.controls['inmuebleestado'].setValue(this.aportacioninmueble.inmuebleestado);
    this.aportacioninmuebleForm.controls['inmueblesuperficie'].setValue(this.aportacioninmueble.inmueblesuperficie);
    this.aportacioninmuebleForm.controls['inmuebleindivisos'].setValue(this.aportacioninmueble.inmuebleindivisos);
    this.aportacioninmuebleForm.controls['inmuebledias'].setValue(this.aportacioninmueble.inmuebledias);
    this.aportacioninmuebleForm.controls['inmuebleproyectoejecutivo'].setValue(
      this.aportacioninmueble.inmuebleproyectoejecutivo
    );
    this.aportacioninmuebleForm.controls['inmueblevaloractual'].setValue(this.aportacioninmueble.inmueblevaloractual);
    this.aportacioninmuebleForm.controls['inmuebleciudad'].setValue(this.aportacioninmueble.inmuebleciudad);
    this.aportacioninmuebleForm.controls['inmueblesuperficieconstruida'].setValue(
      this.aportacioninmueble.inmueblesuperficieconstruida
    );
    this.aportacioninmuebleForm.controls['inmueblefraccionamientounidad'].setValue(
      this.aportacioninmueble.inmueblefraccionamientounidad
    );
    this.aportacioninmuebleForm.controls['inmuebleclavecatastral'].setValue(
      this.aportacioninmueble.inmuebleclavecatastral
    );
    this.aportacioninmuebleForm.controls['inmueblevalor'].setValue(this.aportacioninmueble.inmueblevalor);
    this.aportacioninmuebleForm.controls['inmuebleestatus'].setValue(this.aportacioninmueble.inmuebleestatus);
    this.aportacioninmuebleForm.controls['datosconstitucionescritura'].setValue(
      this.aportacioninmueble.datosconstitucionescritura
    );
    this.aportacioninmuebleForm.controls['datosconstitucionnumescritura'].setValue(
      this.aportacioninmueble.datosconstitucionnumescritura
    );
    this.aportacioninmuebleForm.controls['datosconstitucionnombrenotario'].setValue(
      this.aportacioninmueble.datosconstitucionnombrenotario
    );
    this.aportacioninmuebleForm.controls['datosconstitucionestadonotario'].setValue(
      this.aportacioninmueble.datosconstitucionestadonotario
    );
    this.aportacioninmuebleForm.controls['datosconstituciontelefononotario'].setValue(
      this.aportacioninmueble.datosconstituciontelefononotario
    );
    this.aportacioninmuebleForm.controls['datosconstitucionfecharppAux'].setValue(
      this.datePipe.transform(this.aportacioninmueble.datosconstitucionfecharpp, 'dd/MM/yyyy')
    );
    this.aportacioninmuebleForm.controls['datosconstitucionfechaescrituraAux'].setValue(
      this.datePipe.transform(this.aportacioninmueble.datosconstitucionfechaescritura, 'dd/MM/yyyy')
    );
    this.aportacioninmuebleForm.controls['datosconstitucionnumnotaria'].setValue(
      this.aportacioninmueble.datosconstitucionnumnotaria
    );
    this.aportacioninmuebleForm.controls['datosconstitucionciudadnotario'].setValue(
      this.aportacioninmueble.datosconstitucionciudadnotario
    );
    this.aportacioninmuebleForm.controls['datosconstitucionemailnotario'].setValue(
      this.aportacioninmueble.datosconstitucionemailnotario
    );
    this.aportacioninmuebleForm.controls['datosconstitucionnumrpp'].setValue(
      this.aportacioninmueble.datosconstitucionnumrpp
    );
  }

  editaAportacioninmueble() {
    this.submitted = true;

    if (this.aportacioninmuebleForm.invalid) {
      swal('Error...', 'Aportación del inmueble has fields to fill.', 'error');
    } else {
      this.route.params.subscribe(params => {
        this.idAportacioninmueble = params['id'];
      });

      this.aportacioninmuebleSend.fideicomisoId = this.aportacioninmuebleForm.controls['fideicomisoId'].value;
      this.aportacioninmuebleSend.subfisoId = this.aportacioninmuebleForm.controls['subfisoId'].value;
      this.aportacioninmuebleSend.tiponegocio = this.aportacioninmuebleForm.controls['tiponegocio'].value;
      this.aportacioninmuebleSend.producto = this.aportacioninmuebleForm.controls['producto'].value;
      this.aportacioninmuebleSend.idinmueble = this.aportacioninmuebleForm.controls['idinmueble'].value;
      if (this.aportacioninmuebleForm.controls['fechaaltaAux'].value !== null) {
        let fechaaltaAuxtoArray = this.aportacioninmuebleForm.controls['fechaaltaAux'].value.split('/');
        let fechaaltaAuxDate = new Date(
          fechaaltaAuxtoArray[1] + '/' + fechaaltaAuxtoArray[0] + '/' + fechaaltaAuxtoArray[2]
        );
        this.aportacioninmuebleSend.fechaalta = fechaaltaAuxDate.getTime();
      } else {
        this.aportacioninmuebleSend.fechaalta = null;
      }
      this.aportacioninmuebleSend.tipoinmueble = this.aportacioninmuebleForm.controls['tipoinmueble'].value;
      this.aportacioninmuebleSend.arbol = this.aportacioninmuebleForm.controls['arbol'].value;
      if (this.aportacioninmuebleForm.controls['fecharegistroAux'].value !== null) {
        let fecharegistroAuxtoArray = this.aportacioninmuebleForm.controls['fecharegistroAux'].value.split('/');
        let fecharegistroAuxDate = new Date(
          fecharegistroAuxtoArray[1] + '/' + fecharegistroAuxtoArray[0] + '/' + fecharegistroAuxtoArray[2]
        );
        this.aportacioninmuebleSend.fecharegistro = fecharegistroAuxDate.getTime();
      } else {
        this.aportacioninmuebleSend.fecharegistro = null;
      }
      this.aportacioninmuebleSend.tipofraccion = this.aportacioninmuebleForm.controls['tipofraccion'].value;
      this.aportacioninmuebleSend.descripcion = this.aportacioninmuebleForm.controls['descripcion'].value;
      this.aportacioninmuebleSend.inmueblevalorinicial = this.aportacioninmuebleForm.controls[
        'inmueblevalorinicial'
      ].value;
      this.aportacioninmuebleSend.inmuebleubicacion = this.aportacioninmuebleForm.controls['inmuebleubicacion'].value;
      this.aportacioninmuebleSend.inmuebleestado = this.aportacioninmuebleForm.controls['inmuebleestado'].value;
      this.aportacioninmuebleSend.inmueblesuperficie = this.aportacioninmuebleForm.controls['inmueblesuperficie'].value;
      this.aportacioninmuebleSend.inmuebleindivisos = this.aportacioninmuebleForm.controls['inmuebleindivisos'].value;
      this.aportacioninmuebleSend.inmuebledias = this.aportacioninmuebleForm.controls['inmuebledias'].value;
      this.aportacioninmuebleSend.inmuebleproyectoejecutivo = this.aportacioninmuebleForm.controls[
        'inmuebleproyectoejecutivo'
      ].value;
      this.aportacioninmuebleSend.inmueblevaloractual = this.aportacioninmuebleForm.controls[
        'inmueblevaloractual'
      ].value;
      this.aportacioninmuebleSend.inmuebleciudad = this.aportacioninmuebleForm.controls['inmuebleciudad'].value;
      this.aportacioninmuebleSend.inmueblesuperficieconstruida = this.aportacioninmuebleForm.controls[
        'inmueblesuperficieconstruida'
      ].value;
      this.aportacioninmuebleSend.inmueblefraccionamientounidad = this.aportacioninmuebleForm.controls[
        'inmueblefraccionamientounidad'
      ].value;
      this.aportacioninmuebleSend.inmuebleclavecatastral = this.aportacioninmuebleForm.controls[
        'inmuebleclavecatastral'
      ].value;
      this.aportacioninmuebleSend.inmueblevalor = this.aportacioninmuebleForm.controls['inmueblevalor'].value;
      this.aportacioninmuebleSend.inmuebleestatus = this.aportacioninmuebleForm.controls['inmuebleestatus'].value;
      this.aportacioninmuebleSend.datosconstitucionescritura = this.aportacioninmuebleForm.controls[
        'datosconstitucionescritura'
      ].value;
      this.aportacioninmuebleSend.datosconstitucionnumescritura = this.aportacioninmuebleForm.controls[
        'datosconstitucionnumescritura'
      ].value;
      this.aportacioninmuebleSend.datosconstitucionnombrenotario = this.aportacioninmuebleForm.controls[
        'datosconstitucionnombrenotario'
      ].value;
      this.aportacioninmuebleSend.datosconstitucionestadonotario = this.aportacioninmuebleForm.controls[
        'datosconstitucionestadonotario'
      ].value;
      this.aportacioninmuebleSend.datosconstituciontelefononotario = this.aportacioninmuebleForm.controls[
        'datosconstituciontelefononotario'
      ].value;
      if (this.aportacioninmuebleForm.controls['datosconstitucionfecharppAux'].value !== null) {
        let datosconstitucionfecharppAuxtoArray = this.aportacioninmuebleForm.controls[
          'datosconstitucionfecharppAux'
        ].value.split('/');
        let datosconstitucionfecharppAuxDate = new Date(
          datosconstitucionfecharppAuxtoArray[1] +
            '/' +
            datosconstitucionfecharppAuxtoArray[0] +
            '/' +
            datosconstitucionfecharppAuxtoArray[2]
        );
        this.aportacioninmuebleSend.datosconstitucionfecharpp = datosconstitucionfecharppAuxDate.getTime();
      } else {
        this.aportacioninmuebleSend.datosconstitucionfecharpp = null;
      }
      if (this.aportacioninmuebleForm.controls['datosconstitucionfechaescrituraAux'].value !== null) {
        let datosconstitucionfechaescrituraAuxtoArray = this.aportacioninmuebleForm.controls[
          'datosconstitucionfechaescrituraAux'
        ].value.split('/');
        let datosconstitucionfechaescrituraAuxDate = new Date(
          datosconstitucionfechaescrituraAuxtoArray[1] +
            '/' +
            datosconstitucionfechaescrituraAuxtoArray[0] +
            '/' +
            datosconstitucionfechaescrituraAuxtoArray[2]
        );
        this.aportacioninmuebleSend.datosconstitucionfechaescritura = datosconstitucionfechaescrituraAuxDate.getTime();
      } else {
        this.aportacioninmuebleSend.datosconstitucionfechaescritura = null;
      }
      this.aportacioninmuebleSend.datosconstitucionnumnotaria = this.aportacioninmuebleForm.controls[
        'datosconstitucionnumnotaria'
      ].value;
      this.aportacioninmuebleSend.datosconstitucionciudadnotario = this.aportacioninmuebleForm.controls[
        'datosconstitucionciudadnotario'
      ].value;
      this.aportacioninmuebleSend.datosconstitucionemailnotario = this.aportacioninmuebleForm.controls[
        'datosconstitucionemailnotario'
      ].value;
      this.aportacioninmuebleSend.datosconstitucionnumrpp = this.aportacioninmuebleForm.controls[
        'datosconstitucionnumrpp'
      ].value;

      this.aportacioninmuebleService
        .updateEditaAportacioninmueble(this.aportacioninmuebleSend, this.idAportacioninmueble)
        .subscribe(res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Aportación del inmueble save successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Aportación del inmueble has fields to fill.', 'error');
            }
          } else {
            swal('Error...', 'Aportación del inmueble save unsuccessfully.', 'error');
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

      this.aportacioninmuebleForm.controls['fideicomisoId'].setValue(fideicomiso.id);
      this.aportacioninmuebleForm.controls['fideicomisoItem'].setValue(fideicomiso.generalesnumero);
    } else {
      this.fideicomisoService.clear();
      this.aportacioninmuebleForm.controls['fideicomisoId'].setValue(null);
      this.aportacioninmuebleForm.controls['fideicomisoItem'].setValue('');
    }
  }
  cargaSubfiso() {
    this.subfisoService.getRecuperaSubfiso().subscribe(
      res => {
        if (res) {
          this.subfisoArray = res.json();

          this.subfisoArray.forEach(element => {
            if (element.estatus == 'ACTIVO') {
              element.estatusItem = 'ACTIVO';
            }
            if (element.estatus == 'CANCELADO') {
              element.estatusItem = 'CANCELADO';
            }
            if (element.estatus == 'SUSPENDIDO') {
              element.estatusItem = 'SUSPENDIDO';
            }
            if (element.estatus == 'BAJA') {
              element.estatusItem = 'BAJA';
            }
            element.fecharegistroAux = new Date(element.fecharegistro);
          });
        }
      },
      error => {
        //swal('Error...', 'An error occurred while calling Sub fiso.', 'error');
      }
    );
  }

  setClickedRowSubfiso(index, subfiso) {
    subfiso.checked = !subfiso.checked;
    if (subfiso.checked) {
      this.subfisoService.setSubfiso(subfiso);

      this.aportacioninmuebleForm.controls['subfisoId'].setValue(subfiso.id);
      this.aportacioninmuebleForm.controls['subfisoItem'].setValue(subfiso.numero);
    } else {
      this.subfisoService.clear();
      this.aportacioninmuebleForm.controls['subfisoId'].setValue(null);
      this.aportacioninmuebleForm.controls['subfisoItem'].setValue('');
    }
  }

  regresaAportacioninmueble() {
    this.location.back();
  }
}
