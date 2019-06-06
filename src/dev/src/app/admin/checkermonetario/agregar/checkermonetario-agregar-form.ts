/* PSG  Checkermonetario Agregar Ts */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import swal from 'sweetalert2';

import { Checkermonetario } from '../checkermonetario.psg.model';
import { CheckermonetarioSend } from '../checkermonetario.psg.model-send';
import { CheckermonetarioService } from '../checkermonetario.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';
import { InstruccionService } from '../../instruccion/instruccion.psg.service';
import { Instruccion } from '../../instruccion/instruccion.psg.model';
import { TransaccionService } from '../../transaccion/transaccion.psg.service';
import { Transaccion } from '../../transaccion/transaccion.psg.model';

@Component({
  selector: 'clr-checkermonetario-agregar',
  styleUrls: ['../checkermonetario.psg.scss'],
  templateUrl: './checkermonetario-agregar.psg.html',
})
export class CheckermonetarioAgregarForm implements OnInit {
  checkermonetarioForm: FormGroup;
  submitted = false;
  loading = false;
  public checkermonetario: Checkermonetario = new Checkermonetario();
  public checkermonetarioSend: CheckermonetarioSend = new CheckermonetarioSend();
  public id: number;

  public fideicomisoArray: Fideicomiso[];
  public fideicomiso: Fideicomiso;
  public subfisoArray: Subfiso[];
  public subfiso: Subfiso;
  public instruccionArray: Instruccion[];
  public instruccion: Instruccion;
  public transaccionArray: Transaccion[];
  public transaccion: Transaccion;

  // Modal
  modalfideicomiso: boolean = false;
  modalsubfiso: boolean = false;
  modalinstruccion: boolean = false;
  modaltransaccion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private subfisoService: SubfisoService,
    private instruccionService: InstruccionService,
    private transaccionService: TransaccionService,
    private checkermonetarioService: CheckermonetarioService
  ) {
    this.checkermonetarioForm = this.fb.group({
      foliooperacion: new FormControl('', Validators.required),
      operador: new FormControl('', Validators.required),
      tipoliquidacion: new FormControl('', Validators.required),
      fideicomisoId: new FormControl('', Validators.required),
      fideicomisoItem: new FormControl(''),
      subfisoId: new FormControl('', Validators.required),
      subfisoItem: new FormControl(''),
      instruccionId: new FormControl('', Validators.required),
      instruccionItem: new FormControl(''),
      importe: new FormControl('', Validators.required),
      fechapago: new FormControl('', Validators.required),
      numeroliquidaciones: new FormControl('', Validators.required),
      transaccionId: new FormControl('', Validators.required),
      transaccionItem: new FormControl(''),
      moneda: new FormControl('', Validators.required),
      estatus: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
      operado: new FormControl('', Validators.required),
      autorizo: new FormControl('', Validators.required),
      fechaautorizado: new FormControl('', Validators.required),
      numerofirma: new FormControl('', Validators.required),
      nombrefirma: new FormControl('', Validators.required),
      fechafirma: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    console.log('Checkermonetario agregar()');

    this.cargaFideicomiso();
    this.cargaSubfiso();
    this.cargaInstruccion();
    this.cargaTransaccion();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (this.id !== undefined) {
      this.getRecuperaFideicomisoPorId(this.id);
    }
    if (this.id !== undefined) {
      this.getRecuperaSubfisoPorId(this.id);
    }
    if (this.id !== undefined) {
      this.getRecuperaInstruccionPorId(this.id);
    }
    if (this.id !== undefined) {
      this.getRecuperaTransaccionPorId(this.id);
    }
  }

  guardaCheckermonetario() {
    this.submitted = true;

    if (this.checkermonetarioForm.invalid) {
      swal('Error...', 'Monetario has fields to fill.', 'error');
    } else {
      this.checkermonetarioSend.foliooperacion = this.checkermonetarioForm.controls['foliooperacion'].value;
      this.checkermonetarioSend.operador = this.checkermonetarioForm.controls['operador'].value;
      this.checkermonetarioSend.tipoliquidacion = this.checkermonetarioForm.controls['tipoliquidacion'].value;
      this.checkermonetarioSend.fideicomisoId = this.checkermonetarioForm.controls['fideicomisoId'].value;
      this.checkermonetarioSend.subfisoId = this.checkermonetarioForm.controls['subfisoId'].value;
      this.checkermonetarioSend.instruccionId = this.checkermonetarioForm.controls['instruccionId'].value;
      this.checkermonetarioSend.importe = this.checkermonetarioForm.controls['importe'].value;
      this.checkermonetarioSend.fechapago = this.checkermonetarioForm.controls['fechapago'].value;
      this.checkermonetarioSend.numeroliquidaciones = this.checkermonetarioForm.controls['numeroliquidaciones'].value;
      this.checkermonetarioSend.transaccionId = this.checkermonetarioForm.controls['transaccionId'].value;
      this.checkermonetarioSend.moneda = this.checkermonetarioForm.controls['moneda'].value;
      this.checkermonetarioSend.estatus = this.checkermonetarioForm.controls['estatus'].value;
      this.checkermonetarioSend.fecha = this.checkermonetarioForm.controls['fecha'].value;
      this.checkermonetarioSend.operado = this.checkermonetarioForm.controls['operado'].value;
      this.checkermonetarioSend.autorizo = this.checkermonetarioForm.controls['autorizo'].value;
      this.checkermonetarioSend.fechaautorizado = this.checkermonetarioForm.controls['fechaautorizado'].value;
      this.checkermonetarioSend.numerofirma = this.checkermonetarioForm.controls['numerofirma'].value;
      this.checkermonetarioSend.nombrefirma = this.checkermonetarioForm.controls['nombrefirma'].value;
      this.checkermonetarioSend.fechafirma = this.checkermonetarioForm.controls['fechafirma'].value;

      this.checkermonetarioService.postGuardaCheckermonetario(this.checkermonetarioSend).subscribe(
        res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Monetario save successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Monetario has fields to fill.', 'error');
            }
          }
        },
        error => {
          swal('Error...', 'Monetario save unsuccessfully.', 'error');
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

      this.checkermonetarioForm.controls['fideicomisoId'].setValue(fideicomiso.id);
      this.checkermonetarioForm.controls['fideicomisoItem'].setValue(fideicomiso.generalesnumero);
    } else {
      this.fideicomisoService.clear();
      this.checkermonetarioForm.controls['fideicomisoId'].setValue(null);
      this.checkermonetarioForm.controls['fideicomisoItem'].setValue('');
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

      this.checkermonetarioForm.controls['subfisoId'].setValue(subfiso.id);
      this.checkermonetarioForm.controls['subfisoItem'].setValue(subfiso.numero);
    } else {
      this.subfisoService.clear();
      this.checkermonetarioForm.controls['subfisoId'].setValue(null);
      this.checkermonetarioForm.controls['subfisoItem'].setValue('');
    }
  }
  cargaInstruccion() {
    this.instruccionService.getRecuperaInstruccion().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.instruccionArray = res.json();

            this.instruccionArray.forEach(element => {
              this.llenaCamposInstruccion(this.instruccionArray);
            });
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Instrucciones.', 'error');
      }
    );
  }

  getRecuperaInstruccionPorId(id) {
    this.instruccionService.getRecuperaInstruccionPorId(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.instruccion = res.json();
            this.instruccionArray = [];
            this.instruccionArray.push(this.instruccion);
            this.llenaCamposInstruccion(this.instruccionArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Instrucciones', 'error');
      }
    );
  }

  llenaCamposInstruccion(array) {
    array.forEach(element => {
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

  setClickedRowInstruccion(index, instruccion) {
    instruccion.checked = !instruccion.checked;
    if (instruccion.checked) {
      this.instruccionService.setInstruccion(instruccion);

      this.checkermonetarioForm.controls['instruccionId'].setValue(instruccion.id);
      this.checkermonetarioForm.controls['instruccionItem'].setValue(instruccion.folio);
    } else {
      this.instruccionService.clear();
      this.checkermonetarioForm.controls['instruccionId'].setValue(null);
      this.checkermonetarioForm.controls['instruccionItem'].setValue('');
    }
  }
  cargaTransaccion() {
    this.transaccionService.getRecuperaTransaccion().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.transaccionArray = res.json();

            this.transaccionArray.forEach(element => {
              this.llenaCamposTransaccion(this.transaccionArray);
            });
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Catálogo de transacciones.', 'error');
      }
    );
  }

  getRecuperaTransaccionPorId(id) {
    this.transaccionService.getRecuperaTransaccionPorId(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.transaccion = res.json();
            this.transaccionArray = [];
            this.transaccionArray.push(this.transaccion);
            this.llenaCamposTransaccion(this.transaccionArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Catálogo de transacciones', 'error');
      }
    );
  }

  llenaCamposTransaccion(array) {
    array.forEach(element => {
      if (element.modulo == 'MOD1') {
        element.moduloItem = 'OPERACIÓN FIDUCIARIA';
      }
      if (element.modulo == 'MOD2') {
        element.moduloItem = 'HONORARIOS';
      }
      if (element.modulo == 'MOD3') {
        element.moduloItem = 'INVERSIONES';
      }
      if (element.modulo == 'MOD4') {
        element.moduloItem = 'ADMINISTRACIÓN';
      }
      if (element.modulo == 'MOD5') {
        element.moduloItem = 'INMUEBLES';
      }
      if (element.estatustrans == 'ACTIVO') {
        element.estatustransItem = 'ACTIVO';
      }
      if (element.estatustrans == 'CANCELADO') {
        element.estatustransItem = 'CANCELADO';
      }
      if (element.estatustrans == 'SUSPENDIDO') {
        element.estatustransItem = 'SUSPENDIDO';
      }
      if (element.estatustrans == 'BAJA') {
        element.estatustransItem = 'BAJA';
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
      if (element.columedocuenta == 'ABONO') {
        element.columedocuentaItem = 'ABONO';
      }
      if (element.columedocuenta == 'CARGO') {
        element.columedocuentaItem = 'CARGO';
      }
      if (element.columedocuenta == 'COMPRA') {
        element.columedocuentaItem = 'COMPRA';
      }
      if (element.columedocuenta == 'VENTA') {
        element.columedocuentaItem = 'VENTA';
      }
      if (element.columedocuenta == 'CONTABILIZA') {
        element.columedocuentaItem = 'CONTABILIZA';
      }
      if (element.columedocuenta == 'POLIZA') {
        element.columedocuentaItem = 'PÓLIZA';
      }
      if (element.columedocuenta == 'CORRECCION') {
        element.columedocuentaItem = 'CORRECCIÓN';
      }
    });
  }

  setClickedRowTransaccion(index, transaccion) {
    transaccion.checked = !transaccion.checked;
    if (transaccion.checked) {
      this.transaccionService.setTransaccion(transaccion);

      this.checkermonetarioForm.controls['transaccionId'].setValue(transaccion.id);
      this.checkermonetarioForm.controls['transaccionItem'].setValue(transaccion.notransaccion);
    } else {
      this.transaccionService.clear();
      this.checkermonetarioForm.controls['transaccionId'].setValue(null);
      this.checkermonetarioForm.controls['transaccionItem'].setValue('');
    }
  }

  regresaCheckermonetario() {
    this.location.back();
  }
}
