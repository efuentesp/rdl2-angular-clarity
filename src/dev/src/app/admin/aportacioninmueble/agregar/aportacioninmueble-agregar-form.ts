/* PSG  Aportacioninmueble Agregar Ts */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import swal from 'sweetalert2';

import { Aportacioninmueble } from '../aportacioninmueble.psg.model';
import { AportacioninmuebleSend } from '../aportacioninmueble.psg.model-send';
import { AportacioninmuebleService } from '../aportacioninmueble.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-aportacioninmueble-agregar',
  styleUrls: ['../aportacioninmueble.psg.scss'],
  templateUrl: './aportacioninmueble-agregar.psg.html',
})
export class AportacioninmuebleAgregarForm implements OnInit {
  aportacioninmuebleForm: FormGroup;
  submitted = false;
  loading = false;
  public aportacioninmueble: Aportacioninmueble = new Aportacioninmueble();
  public aportacioninmuebleSend: AportacioninmuebleSend = new AportacioninmuebleSend();
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
    console.log('Aportacioninmueble agregar()');

    this.cargaFideicomiso();
    this.cargaSubfiso();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (this.id !== undefined) {
      this.getRecuperaFideicomisoPorId(this.id);
    }
    if (this.id !== undefined) {
      this.getRecuperaSubfisoPorId(this.id);
    }
  }

  guardaAportacioninmueble() {
    this.submitted = true;

    if (this.aportacioninmuebleForm.invalid) {
      swal('Error...', 'Aportación del inmueble has fields to fill.', 'error');
    } else {
      this.aportacioninmuebleSend.fideicomisoId = this.aportacioninmuebleForm.controls['fideicomisoId'].value;
      this.aportacioninmuebleSend.subfisoId = this.aportacioninmuebleForm.controls['subfisoId'].value;
      this.aportacioninmuebleSend.tiponegocio = this.aportacioninmuebleForm.controls['tiponegocio'].value;
      this.aportacioninmuebleSend.producto = this.aportacioninmuebleForm.controls['producto'].value;
      this.aportacioninmuebleSend.idinmueble = this.aportacioninmuebleForm.controls['idinmueble'].value;
      let fechaaltaAuxtoArray = this.aportacioninmuebleForm.controls['fechaaltaAux'].value.split('/');
      let fechaaltaAuxDate = new Date(
        fechaaltaAuxtoArray[1] + '/' + fechaaltaAuxtoArray[0] + '/' + fechaaltaAuxtoArray[2]
      );
      this.aportacioninmuebleSend.fechaalta = fechaaltaAuxDate.getTime();
      this.aportacioninmuebleSend.tipoinmueble = this.aportacioninmuebleForm.controls['tipoinmueble'].value;
      this.aportacioninmuebleSend.arbol = this.aportacioninmuebleForm.controls['arbol'].value;
      let fecharegistroAuxtoArray = this.aportacioninmuebleForm.controls['fecharegistroAux'].value.split('/');
      let fecharegistroAuxDate = new Date(
        fecharegistroAuxtoArray[1] + '/' + fecharegistroAuxtoArray[0] + '/' + fecharegistroAuxtoArray[2]
      );
      this.aportacioninmuebleSend.fecharegistro = fecharegistroAuxDate.getTime();
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

      this.aportacioninmuebleService.postGuardaAportacioninmueble(this.aportacioninmuebleSend).subscribe(
        res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Aportación del inmueble save successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Aportación del inmueble has fields to fill.', 'error');
            }
          }
        },
        error => {
          swal('Error...', 'Aportación del inmueble save unsuccessfully.', 'error');
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
          if (res.status === 201 || res.status === 200) {
            this.subfisoArray = res.json();

            this.subfisoArray.forEach(element => {
              this.llenaCamposSubfiso(this.subfisoArray);
            });
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Sub fiso.', 'error');
      }
    );
  }

  getRecuperaSubfisoPorId(id) {
    this.subfisoService.getRecuperaSubfisoPorId(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.subfiso = res.json();
            this.subfisoArray = [];
            this.subfisoArray.push(this.subfiso);
            this.llenaCamposSubfiso(this.subfisoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Sub fiso', 'error');
      }
    );
  }

  llenaCamposSubfiso(array) {
    array.forEach(element => {
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
