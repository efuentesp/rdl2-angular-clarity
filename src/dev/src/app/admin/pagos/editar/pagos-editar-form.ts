/* PSG  Pagos Edita Ts */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Pagos } from '../pagos.psg.model';
import { PagosSend } from '../pagos.psg.model-send';
import { PagosService } from '../pagos.psg.service';

import { InstruccionService } from '../../instruccion/instruccion.psg.service';
import { Instruccion } from '../../instruccion/instruccion.psg.model';
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-pagos-editar',
  styleUrls: ['../pagos.psg.scss'],
  templateUrl: './pagos-editar.psg.html',
})
export class PagosEditarForm implements OnInit {
  public pagosForm: FormGroup;
  public submitted = false;
  public loading = false;
  public pagos: Pagos = new Pagos();
  public pagosSend: PagosSend = new PagosSend();
  public idPagos: string;
  public datePipe = new DatePipe('en-US');
  public id: number;

  public instruccionArray: Instruccion[];
  public instruccion: Instruccion;
  public fideicomisoArray: Fideicomiso[];
  public fideicomiso: Fideicomiso;
  public subfisoArray: Subfiso[];
  public subfiso: Subfiso;

  // Modal
  modalinstruccion: boolean = false;
  modalfideicomiso: boolean = false;
  modalsubfiso: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private instruccionService: InstruccionService,
    private fideicomisoService: FideicomisoService,
    private subfisoService: SubfisoService,
    private pagosService: PagosService
  ) {
    this.pagosForm = this.fb.group({
      instruccionId: new FormControl('', Validators.required),
      instruccionItem: new FormControl(''),
      fideicomisoId: new FormControl('', Validators.required),
      fideicomisoItem: new FormControl(''),
      importeinstruccion: new FormControl('', Validators.required),
      movimientos: new FormControl('', Validators.required),
      tipopersona: new FormControl('', Validators.required),
      conceptopago: new FormControl('', Validators.required),
      clave: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      formaliquidacion: new FormControl('', Validators.required),
      tipopago: new FormControl('', Validators.required),
      datosconcentradora: new FormControl('', Validators.required),
      descripcioncomplementaria: new FormControl('', Validators.required),
      subfisoId: new FormControl('', Validators.required),
      subfisoItem: new FormControl(''),
      importetotal: new FormControl('', Validators.required),
      estatusoperacion: new FormControl('', Validators.required),
      importe: new FormControl('', Validators.required),
      fechaliquidarAux: new FormControl('', Validators.required),
      estatus: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.recuperaPagos();

    this.cargaInstruccion();
    this.cargaFideicomiso();
    this.cargaSubfiso();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaPagos() {
    this.pagos = this.pagosService.getPagos();
    this.pagosForm.controls['instruccionId'].setValue(this.pagos.instruccionId);
    this.instruccionService.getRecuperaInstruccionPorId(this.pagos.instruccionId).subscribe(res => {
      if (res) {
        this.instruccion = res.json();
        this.pagosForm.controls['instruccionItem'].setValue(this.instruccion.folio);
      }
    });

    this.pagosForm.controls['fideicomisoId'].setValue(this.pagos.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.pagos.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.pagosForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });

    this.pagosForm.controls['importeinstruccion'].setValue(this.pagos.importeinstruccion);
    this.pagosForm.controls['movimientos'].setValue(this.pagos.movimientos);
    this.pagosForm.controls['tipopersona'].setValue(this.pagos.tipopersona);
    this.pagosForm.controls['conceptopago'].setValue(this.pagos.conceptopago);
    this.pagosForm.controls['clave'].setValue(this.pagos.clave);
    this.pagosForm.controls['nombre'].setValue(this.pagos.nombre);
    this.pagosForm.controls['formaliquidacion'].setValue(this.pagos.formaliquidacion);
    this.pagosForm.controls['tipopago'].setValue(this.pagos.tipopago);
    this.pagosForm.controls['datosconcentradora'].setValue(this.pagos.datosconcentradora);
    this.pagosForm.controls['descripcioncomplementaria'].setValue(this.pagos.descripcioncomplementaria);
    this.pagosForm.controls['subfisoId'].setValue(this.pagos.subfisoId);
    this.subfisoService.getRecuperaSubfisoPorId(this.pagos.subfisoId).subscribe(res => {
      if (res) {
        this.subfiso = res.json();
        this.pagosForm.controls['subfisoItem'].setValue(this.subfiso.numero);
      }
    });

    this.pagosForm.controls['importetotal'].setValue(this.pagos.importetotal);
    this.pagosForm.controls['estatusoperacion'].setValue(this.pagos.estatusoperacion);
    this.pagosForm.controls['importe'].setValue(this.pagos.importe);
    this.pagosForm.controls['fechaliquidarAux'].setValue(
      this.datePipe.transform(this.pagos.fechaliquidar, 'dd/MM/yyyy')
    );
    this.pagosForm.controls['estatus'].setValue(this.pagos.estatus);
  }

  editaPagos() {
    this.submitted = true;

    if (this.pagosForm.invalid) {
      swal('Error...', 'Pagos has fields to fill.', 'error');
    } else {
      this.route.params.subscribe(params => {
        this.idPagos = params['id'];
      });

      this.pagosSend.instruccionId = this.pagosForm.controls['instruccionId'].value;
      this.pagosSend.fideicomisoId = this.pagosForm.controls['fideicomisoId'].value;
      this.pagosSend.importeinstruccion = this.pagosForm.controls['importeinstruccion'].value;
      this.pagosSend.movimientos = this.pagosForm.controls['movimientos'].value;
      this.pagosSend.tipopersona = this.pagosForm.controls['tipopersona'].value;
      this.pagosSend.conceptopago = this.pagosForm.controls['conceptopago'].value;
      this.pagosSend.clave = this.pagosForm.controls['clave'].value;
      this.pagosSend.nombre = this.pagosForm.controls['nombre'].value;
      this.pagosSend.formaliquidacion = this.pagosForm.controls['formaliquidacion'].value;
      this.pagosSend.tipopago = this.pagosForm.controls['tipopago'].value;
      this.pagosSend.datosconcentradora = this.pagosForm.controls['datosconcentradora'].value;
      this.pagosSend.descripcioncomplementaria = this.pagosForm.controls['descripcioncomplementaria'].value;
      this.pagosSend.subfisoId = this.pagosForm.controls['subfisoId'].value;
      this.pagosSend.importetotal = this.pagosForm.controls['importetotal'].value;
      this.pagosSend.estatusoperacion = this.pagosForm.controls['estatusoperacion'].value;
      this.pagosSend.importe = this.pagosForm.controls['importe'].value;
      if (this.pagosForm.controls['fechaliquidarAux'].value !== null) {
        let fechaliquidarAuxtoArray = this.pagosForm.controls['fechaliquidarAux'].value.split('/');
        let fechaliquidarAuxDate = new Date(
          fechaliquidarAuxtoArray[1] + '/' + fechaliquidarAuxtoArray[0] + '/' + fechaliquidarAuxtoArray[2]
        );
        this.pagosSend.fechaliquidar = fechaliquidarAuxDate.getTime();
      } else {
        this.pagosSend.fechaliquidar = null;
      }
      this.pagosSend.estatus = this.pagosForm.controls['estatus'].value;

      this.pagosService.updateEditaPagos(this.pagosSend, this.idPagos).subscribe(res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            swal('Success...', 'Pagos save successfully.', 'success');
            this.location.back();
          } else {
            swal('Error...', 'Pagos has fields to fill.', 'error');
          }
        } else {
          swal('Error...', 'Pagos save unsuccessfully.', 'error');
        }
      });
    }
  }

  cargaInstruccion() {
    this.instruccionService.getRecuperaInstruccion().subscribe(
      res => {
        if (res) {
          this.instruccionArray = res.json();

          this.instruccionArray.forEach(element => {
            element.fechadocumetoAux = new Date(element.fechadocumeto);
            if (element.clasificacion == 'NOMON') {
              element.clasificacionItem = 'NO MONETARIAS';
            }
            if (element.clasificacion == 'MON') {
              element.clasificacionItem = 'MONETARIA';
            }
            if (element.clasificacion == 'ADMIN') {
              element.clasificacionItem = 'ADMINISTRATIVAS';
            }
            if (element.personalidadsolicitante == 'BEN') {
              element.personalidadsolicitanteItem = 'BENEFICIARIO';
            }
            if (element.personalidadsolicitante == 'COMITEC') {
              element.personalidadsolicitanteItem = 'COMITÉ TÉCNICO';
            }
            if (element.personalidadsolicitante == 'FIDEICOMITENTES') {
              element.personalidadsolicitanteItem = 'FIDEICOMITENTE(S)';
            }
            if (element.personalidadsolicitante == 'ASESOR') {
              element.personalidadsolicitanteItem = 'ASESOR DE INVERSIONES';
            }
            if (element.personalidadsolicitante == 'REPCOMUN') {
              element.personalidadsolicitanteItem = 'REPRESENTANTE COMÚN';
            }
            element.fechacambioestatusAux = new Date(element.fechacambioestatus);
            if (element.subtipoinstruccion == 'SUB1') {
              element.subtipoinstruccionItem = 'EN EFECTIVO';
            }
            if (element.subtipoinstruccion == 'SUB2') {
              element.subtipoinstruccionItem = 'OPERACIÓN INTERNA FIDUCIARIA';
            }
            if (element.subtipoinstruccion == 'SUB3') {
              element.subtipoinstruccionItem = 'PAGO DE HONORARIOS';
            }
            if (element.subtipoinstruccion == 'SUB4') {
              element.subtipoinstruccionItem = 'POR TRASPASO ENTRE SUBCUENTAS';
            }
            if (element.subtipoinstruccion == 'SUB5') {
              element.subtipoinstruccionItem = 'DE CONTRATOS EN SCOTIABANK';
            }
            if (element.subtipoinstruccion == 'SUB6') {
              element.subtipoinstruccionItem = 'DE CONTRATOS FUERA DE SCOTIABANK';
            }
            element.fechacompromisoAux = new Date(element.fechacompromiso);
            if (element.formarecepcion == 'CARTA') {
              element.formarecepcionItem = 'CARTA ORIGINAL';
            }
            if (element.formarecepcion == 'CORREO') {
              element.formarecepcionItem = 'CORREO ELECTRONICO';
            }
            if (element.formarecepcion == 'INSERTAS') {
              element.formarecepcionItem = 'INSERTAS EN EL CONTRATO';
            }
            if (element.formarecepcion == 'TELEFONICA') {
              element.formarecepcionItem = 'TELEFÓNICA (EXCLUSIVO BANDER)';
            }
            if (element.formarecepcion == 'INTERNET') {
              element.formarecepcionItem = 'INTERNET (EXCLUSIVO AFORE)';
            }
            if (element.estatusinstruccion == 'APLI') {
              element.estatusinstruccionItem = 'APLICADO';
            }
            if (element.estatusinstruccion == 'APLIPAR') {
              element.estatusinstruccionItem = 'APLICADO PARCIAL';
            }
            if (element.estatusinstruccion == 'CANC') {
              element.estatusinstruccionItem = 'CANCELADO';
            }
            if (element.estatusinstruccion == 'PROC') {
              element.estatusinstruccionItem = 'EN PROCESO';
            }
            if (element.estatusinstruccion == 'PEND') {
              element.estatusinstruccionItem = 'PENDIENTE';
            }
            if (element.tipoinstruccion == 'TIPO1') {
              element.tipoinstruccionItem = 'APORTACIONES CON BIENES Y DERECHOS';
            }
            if (element.tipoinstruccion == 'TIPO2') {
              element.tipoinstruccionItem = 'APORTACIONES CON FLUJO DE EFECTIVO';
            }
            if (element.tipoinstruccion == 'TIPO3') {
              element.tipoinstruccionItem = 'APORTACIÓN';
            }
            if (element.tipoinstruccion == 'TIPO4') {
              element.tipoinstruccionItem = 'DESINVERSIONES';
            }
            if (element.tipoinstruccion == 'TIPO5') {
              element.tipoinstruccionItem = 'DISPOSICIONES DE BIENES Y DERECHOS';
            }
            if (element.tipoinstruccion == 'TIPO6') {
              element.tipoinstruccionItem = 'PAGOS';
            }
            if (element.tipoinstruccion == 'TIPO7') {
              element.tipoinstruccionItem = 'PRESTAMOS';
            }
            if (element.tipoinstruccion == 'TIPO8') {
              element.tipoinstruccionItem = 'INVERSIONES';
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
          });
        }
      },
      error => {
        //swal('Error...', 'An error occurred while calling Instrucciones.', 'error');
      }
    );
  }

  setClickedRowInstruccion(index, instruccion) {
    instruccion.checked = !instruccion.checked;
    if (instruccion.checked) {
      this.instruccionService.setInstruccion(instruccion);

      this.pagosForm.controls['instruccionId'].setValue(instruccion.id);
      this.pagosForm.controls['instruccionItem'].setValue(instruccion.folio);
    } else {
      this.instruccionService.clear();
      this.pagosForm.controls['instruccionId'].setValue(null);
      this.pagosForm.controls['instruccionItem'].setValue('');
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

      this.pagosForm.controls['fideicomisoId'].setValue(fideicomiso.id);
      this.pagosForm.controls['fideicomisoItem'].setValue(fideicomiso.generalesnumero);
    } else {
      this.fideicomisoService.clear();
      this.pagosForm.controls['fideicomisoId'].setValue(null);
      this.pagosForm.controls['fideicomisoItem'].setValue('');
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

      this.pagosForm.controls['subfisoId'].setValue(subfiso.id);
      this.pagosForm.controls['subfisoItem'].setValue(subfiso.numero);
    } else {
      this.subfisoService.clear();
      this.pagosForm.controls['subfisoId'].setValue(null);
      this.pagosForm.controls['subfisoItem'].setValue('');
    }
  }

  regresaPagos() {
    this.location.back();
  }
}
