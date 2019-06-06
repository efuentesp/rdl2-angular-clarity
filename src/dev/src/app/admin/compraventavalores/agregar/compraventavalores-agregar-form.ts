/* PSG  Compraventavalores Agregar Ts */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import swal from 'sweetalert2';

import { Compraventavalores } from '../compraventavalores.psg.model';
import { CompraventavaloresSend } from '../compraventavalores.psg.model-send';
import { CompraventavaloresService } from '../compraventavalores.psg.service';

import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';
import { ContratoinversionService } from '../../contratoinversion/contratoinversion.psg.service';
import { Contratoinversion } from '../../contratoinversion/contratoinversion.psg.model';
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-compraventavalores-agregar',
  styleUrls: ['../compraventavalores.psg.scss'],
  templateUrl: './compraventavalores-agregar.psg.html',
})
export class CompraventavaloresAgregarForm implements OnInit {
  compraventavaloresForm: FormGroup;
  submitted = false;
  loading = false;
  public compraventavalores: Compraventavalores = new Compraventavalores();
  public compraventavaloresSend: CompraventavaloresSend = new CompraventavaloresSend();
  public id: number;

  public subfisoArray: Subfiso[];
  public subfiso: Subfiso;
  public contratoinversionArray: Contratoinversion[];
  public contratoinversion: Contratoinversion;
  public fideicomisoArray: Fideicomiso[];
  public fideicomiso: Fideicomiso;

  // Modal
  modalsubfiso: boolean = false;
  modalcontratoinversion: boolean = false;
  modalfideicomiso: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private subfisoService: SubfisoService,
    private contratoinversionService: ContratoinversionService,
    private fideicomisoService: FideicomisoService,
    private compraventavaloresService: CompraventavaloresService
  ) {
    this.compraventavaloresForm = this.fb.group({
      fechaoperacionAux: new FormControl('', Validators.required),
      generooperacion: new FormControl('', Validators.required),
      subfisoId: new FormControl('', Validators.required),
      subfisoItem: new FormControl(''),
      contratoinversionId: new FormControl('', Validators.required),
      contratoinversionItem: new FormControl(''),
      descripcionoperacion: new FormControl('', Validators.required),
      operacion: new FormControl('', Validators.required),
      montooperacion: new FormControl('', Validators.required),
      intermediario: new FormControl('', Validators.required),
      fideicomisoId: new FormControl('', Validators.required),
      fideicomisoItem: new FormControl(''),
      descripcionfideicomiso: new FormControl('', Validators.required),
      politicainversion: new FormControl('', Validators.required),
      moneda: new FormControl('', Validators.required),
      emergente: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    console.log('Compraventavalores agregar()');

    this.cargaSubfiso();
    this.cargaContratoinversion();
    this.cargaFideicomiso();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (this.id !== undefined) {
      this.getRecuperaSubfisoPorId(this.id);
    }
    if (this.id !== undefined) {
      this.getRecuperaContratoinversionPorId(this.id);
    }
    if (this.id !== undefined) {
      this.getRecuperaFideicomisoPorId(this.id);
    }
  }

  guardaCompraventavalores() {
    this.submitted = true;

    if (this.compraventavaloresForm.invalid) {
      swal('Error...', 'Solicitud compra - venta de valores has fields to fill.', 'error');
    } else {
      let fechaoperacionAuxtoArray = this.compraventavaloresForm.controls['fechaoperacionAux'].value.split('/');
      let fechaoperacionAuxDate = new Date(
        fechaoperacionAuxtoArray[1] + '/' + fechaoperacionAuxtoArray[0] + '/' + fechaoperacionAuxtoArray[2]
      );
      this.compraventavaloresSend.fechaoperacion = fechaoperacionAuxDate.getTime();
      this.compraventavaloresSend.generooperacion = this.compraventavaloresForm.controls['generooperacion'].value;
      this.compraventavaloresSend.subfisoId = this.compraventavaloresForm.controls['subfisoId'].value;
      this.compraventavaloresSend.contratoinversionId = this.compraventavaloresForm.controls[
        'contratoinversionId'
      ].value;
      this.compraventavaloresSend.descripcionoperacion = this.compraventavaloresForm.controls[
        'descripcionoperacion'
      ].value;
      this.compraventavaloresSend.operacion = this.compraventavaloresForm.controls['operacion'].value;
      this.compraventavaloresSend.montooperacion = this.compraventavaloresForm.controls['montooperacion'].value;
      this.compraventavaloresSend.intermediario = this.compraventavaloresForm.controls['intermediario'].value;
      this.compraventavaloresSend.fideicomisoId = this.compraventavaloresForm.controls['fideicomisoId'].value;
      this.compraventavaloresSend.descripcionfideicomiso = this.compraventavaloresForm.controls[
        'descripcionfideicomiso'
      ].value;
      this.compraventavaloresSend.politicainversion = this.compraventavaloresForm.controls['politicainversion'].value;
      this.compraventavaloresSend.moneda = this.compraventavaloresForm.controls['moneda'].value;
      this.compraventavaloresSend.emergente = this.compraventavaloresForm.controls['emergente'].value;

      this.compraventavaloresService.postGuardaCompraventavalores(this.compraventavaloresSend).subscribe(
        res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Solicitud compra - venta de valores save successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Solicitud compra - venta de valores has fields to fill.', 'error');
            }
          }
        },
        error => {
          swal('Error...', 'Solicitud compra - venta de valores save unsuccessfully.', 'error');
        }
      );
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

      this.compraventavaloresForm.controls['subfisoId'].setValue(subfiso.id);
      this.compraventavaloresForm.controls['subfisoItem'].setValue(subfiso.numero);
    } else {
      this.subfisoService.clear();
      this.compraventavaloresForm.controls['subfisoId'].setValue(null);
      this.compraventavaloresForm.controls['subfisoItem'].setValue('');
    }
  }
  cargaContratoinversion() {
    this.contratoinversionService.getRecuperaContratoinversion().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.contratoinversionArray = res.json();

            this.contratoinversionArray.forEach(element => {
              this.llenaCamposContratoinversion(this.contratoinversionArray);
            });
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Contratos de inversión.', 'error');
      }
    );
  }

  getRecuperaContratoinversionPorId(id) {
    this.contratoinversionService.getRecuperaContratoinversionPorId(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.contratoinversion = res.json();
            this.contratoinversionArray = [];
            this.contratoinversionArray.push(this.contratoinversion);
            this.llenaCamposContratoinversion(this.contratoinversionArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Contratos de inversión', 'error');
      }
    );
  }

  llenaCamposContratoinversion(array) {
    array.forEach(element => {
      if (element.tipocontrato == 'CONTRATO1') {
        element.tipocontratoItem = 'CUENTA DE CHEQUES SCOTIABANK';
      }
      if (element.tipocontrato == 'CONTRATO2') {
        element.tipocontratoItem = 'CUENTA DE CHEQUES SCOTIABANK PATRIMONIAL';
      }
      if (element.tipocontrato == 'CONTRATO3') {
        element.tipocontratoItem = 'CUENTA DE CHEQUES OTRA INSTITUCION';
      }
      if (element.tipocontrato == 'CONTRATO4') {
        element.tipocontratoItem = 'INVERSION C/INTERFASE';
      }
      if (element.tipocontrato == 'CONTRATO5') {
        element.tipocontratoItem = 'INVERSION S/INTERFASE';
      }
      if (element.intermediario == 'INTERMEDIARIO2') {
        element.intermediarioItem = 'BANCO INBURSA S.A.';
      }
      if (element.intermediario == 'INTERMEDIARIO3') {
        element.intermediarioItem = 'BANSI, S.A.';
      }
      if (element.intermediario == 'INTERMEDIARIO4') {
        element.intermediarioItem = 'BANAMEX, S.A.';
      }
      if (element.intermediario == 'INTERMEDIARIO5') {
        element.intermediarioItem = 'HSBC MEXICO S.A.';
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
      if (element.resparamliq == 'NO') {
        element.resparamliqItem = 'NO';
      }
      if (element.resparamliq == 'SI') {
        element.resparamliqItem = 'SI';
      }
      if (element.enviorecursosinv == 'ENV1') {
        element.enviorecursosinvItem = 'FIDEICOMISARIO';
      }
      if (element.enviorecursosinv == 'ENV2') {
        element.enviorecursosinvItem = 'FIDEICOMITENTE';
      }
      if (element.enviorecursosinv == 'ENV3') {
        element.enviorecursosinvItem = 'TERCERO';
      }
      if (element.transferenciarecdesinver == 'RECEP1') {
        element.transferenciarecdesinverItem = 'CUENTA CONCENTRADORA';
      }
      if (element.transferenciarecdesinver == 'RECEP2') {
        element.transferenciarecdesinverItem = 'CUENTA CONCENTRADORA GENERAL';
      }
      if (element.transferenciarecdesinver == 'RECEP3') {
        element.transferenciarecdesinverItem = 'CUENTA CONCENTRADORA INDIVIDUAL';
      }
      if (element.transferenciarecdesinver == 'RECEP4') {
        element.transferenciarecdesinverItem = 'CUENTA PARTICULAR (SCOTIABANK)';
      }
      if (element.retenerisr == 'NO') {
        element.retenerisrItem = 'NO';
      }
      if (element.retenerisr == 'SI') {
        element.retenerisrItem = 'SI';
      }
      element.fechavencimientoAux = new Date(element.fechavencimiento);
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
      if (element.traspasoentresubfiso == 'NO') {
        element.traspasoentresubfisoItem = 'NO';
      }
      if (element.traspasoentresubfiso == 'SI') {
        element.traspasoentresubfisoItem = 'SI';
      }
      element.fechaaperturaAux = new Date(element.fechaapertura);
      if (element.origenrecursos == 'ORIGEN1') {
        element.origenrecursosItem = 'APORTACIONES SOLIDARIOS';
      }
      if (element.origenrecursos == 'ORIGEN2') {
        element.origenrecursosItem = 'CLIENTES MEXDER';
      }
      if (element.origenrecursos == 'ORIGEN3') {
        element.origenrecursosItem = 'FIDEICOMITENTE A';
      }
      if (element.origenrecursos == 'ORIGEN4') {
        element.origenrecursosItem = 'GOBIERNO ESTATAL';
      }
      if (element.origenrecursos == 'ORIGEN5') {
        element.origenrecursosItem = 'GOBIERNO FEDERAL';
      }
      if (element.origenrecursos == 'ORIGEN6') {
        element.origenrecursosItem = 'GOBIERNO MUNICIPAL';
      }
      if (element.origenrecursos == 'ORIGEN7') {
        element.origenrecursosItem = 'PARTICULARES';
      }
      if (element.origenrecursos == 'ORIGEN8') {
        element.origenrecursosItem = 'RECURSOS DEL CONTRATO';
      }
    });
  }

  setClickedRowContratoinversion(index, contratoinversion) {
    contratoinversion.checked = !contratoinversion.checked;
    if (contratoinversion.checked) {
      this.contratoinversionService.setContratoinversion(contratoinversion);

      this.compraventavaloresForm.controls['contratoinversionId'].setValue(contratoinversion.id);
      this.compraventavaloresForm.controls['contratoinversionItem'].setValue(contratoinversion.contratoiversion);
    } else {
      this.contratoinversionService.clear();
      this.compraventavaloresForm.controls['contratoinversionId'].setValue(null);
      this.compraventavaloresForm.controls['contratoinversionItem'].setValue('');
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

      this.compraventavaloresForm.controls['fideicomisoId'].setValue(fideicomiso.id);
      this.compraventavaloresForm.controls['fideicomisoItem'].setValue(fideicomiso.generalesnumero);
    } else {
      this.fideicomisoService.clear();
      this.compraventavaloresForm.controls['fideicomisoId'].setValue(null);
      this.compraventavaloresForm.controls['fideicomisoItem'].setValue('');
    }
  }

  regresaCompraventavalores() {
    this.location.back();
  }
}
