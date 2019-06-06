/* PSG  Instruccion Edita Ts */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Instruccion } from '../instruccion.psg.model';
import { InstruccionSend } from '../instruccion.psg.model-send';
import { InstruccionService } from '../instruccion.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-instruccion-editar',
  styleUrls: ['../instruccion.psg.scss'],
  templateUrl: './instruccion-editar.psg.html',
})
export class InstruccionEditarForm implements OnInit {
  public instruccionForm: FormGroup;
  public submitted = false;
  public loading = false;
  public instruccion: Instruccion = new Instruccion();
  public instruccionSend: InstruccionSend = new InstruccionSend();
  public idInstruccion: string;
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
    private instruccionService: InstruccionService
  ) {
    this.instruccionForm = this.fb.group({
      fechahoracaptura: new FormControl('', Validators.required),
      fideicomisoId: new FormControl('', Validators.required),
      fideicomisoItem: new FormControl(''),
      subfisoId: new FormControl('', Validators.required),
      subfisoItem: new FormControl(''),
      folio: new FormControl(''),
      fechadocumetoAux: new FormControl(''),
      clasificacion: new FormControl('', Validators.required),
      personalidadsolicitante: new FormControl('', Validators.required),
      fechacambioestatusAux: new FormControl(''),
      subtipoinstruccion: new FormControl('', Validators.required),
      importe: new FormControl('', Validators.required),
      importeaplicado: new FormControl(''),
      nombrefideicomiso: new FormControl(''),
      nombresubfiso: new FormControl(''),
      titularfideicomiso: new FormControl(''),
      fechacompromisoAux: new FormControl(''),
      formarecepcion: new FormControl('', Validators.required),
      estatusinstruccion: new FormControl('', Validators.required),
      tipoinstruccion: new FormControl('', Validators.required),
      moneda: new FormControl('', Validators.required),
      noeventos: new FormControl('', Validators.required),
      noefectuados: new FormControl(''),
      infocomplementaria: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.recuperaInstruccion();

    this.cargaFideicomiso();
    this.cargaSubfiso();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaInstruccion() {
    this.instruccion = this.instruccionService.getInstruccion();
    this.instruccionForm.controls['fechahoracaptura'].setValue(this.instruccion.fechahoracaptura);
    this.instruccionForm.controls['fideicomisoId'].setValue(this.instruccion.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.instruccion.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.instruccionForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });

    this.instruccionForm.controls['subfisoId'].setValue(this.instruccion.subfisoId);
    this.subfisoService.getRecuperaSubfisoPorId(this.instruccion.subfisoId).subscribe(res => {
      if (res) {
        this.subfiso = res.json();
        this.instruccionForm.controls['subfisoItem'].setValue(this.subfiso.numero);
      }
    });

    this.instruccionForm.controls['folio'].setValue(this.instruccion.folio);
    this.instruccionForm.controls['fechadocumetoAux'].setValue(
      this.datePipe.transform(this.instruccion.fechadocumeto, 'dd/MM/yyyy')
    );
    this.instruccionForm.controls['clasificacion'].setValue(this.instruccion.clasificacion);
    this.instruccionForm.controls['personalidadsolicitante'].setValue(this.instruccion.personalidadsolicitante);
    this.instruccionForm.controls['fechacambioestatusAux'].setValue(
      this.datePipe.transform(this.instruccion.fechacambioestatus, 'dd/MM/yyyy')
    );
    this.instruccionForm.controls['subtipoinstruccion'].setValue(this.instruccion.subtipoinstruccion);
    this.instruccionForm.controls['importe'].setValue(this.instruccion.importe);
    this.instruccionForm.controls['importeaplicado'].setValue(this.instruccion.importeaplicado);
    this.instruccionForm.controls['nombrefideicomiso'].setValue(this.instruccion.nombrefideicomiso);
    this.instruccionForm.controls['nombresubfiso'].setValue(this.instruccion.nombresubfiso);
    this.instruccionForm.controls['titularfideicomiso'].setValue(this.instruccion.titularfideicomiso);
    this.instruccionForm.controls['fechacompromisoAux'].setValue(
      this.datePipe.transform(this.instruccion.fechacompromiso, 'dd/MM/yyyy')
    );
    this.instruccionForm.controls['formarecepcion'].setValue(this.instruccion.formarecepcion);
    this.instruccionForm.controls['estatusinstruccion'].setValue(this.instruccion.estatusinstruccion);
    this.instruccionForm.controls['tipoinstruccion'].setValue(this.instruccion.tipoinstruccion);
    this.instruccionForm.controls['moneda'].setValue(this.instruccion.moneda);
    this.instruccionForm.controls['noeventos'].setValue(this.instruccion.noeventos);
    this.instruccionForm.controls['noefectuados'].setValue(this.instruccion.noefectuados);
    this.instruccionForm.controls['infocomplementaria'].setValue(this.instruccion.infocomplementaria);
  }

  editaInstruccion() {
    this.submitted = true;

    if (this.instruccionForm.invalid) {
      swal('Error...', 'Instrucciones has fields to fill.', 'error');
    } else {
      this.route.params.subscribe(params => {
        this.idInstruccion = params['id'];
      });

      this.instruccionSend.fechahoracaptura = this.instruccionForm.controls['fechahoracaptura'].value;
      this.instruccionSend.fideicomisoId = this.instruccionForm.controls['fideicomisoId'].value;
      this.instruccionSend.subfisoId = this.instruccionForm.controls['subfisoId'].value;
      this.instruccionSend.folio = this.instruccionForm.controls['folio'].value;
      if (this.instruccionForm.controls['fechadocumetoAux'].value !== null) {
        let fechadocumetoAuxtoArray = this.instruccionForm.controls['fechadocumetoAux'].value.split('/');
        let fechadocumetoAuxDate = new Date(
          fechadocumetoAuxtoArray[1] + '/' + fechadocumetoAuxtoArray[0] + '/' + fechadocumetoAuxtoArray[2]
        );
        this.instruccionSend.fechadocumeto = fechadocumetoAuxDate.getTime();
      } else {
        this.instruccionSend.fechadocumeto = null;
      }
      this.instruccionSend.clasificacion = this.instruccionForm.controls['clasificacion'].value;
      this.instruccionSend.personalidadsolicitante = this.instruccionForm.controls['personalidadsolicitante'].value;
      if (this.instruccionForm.controls['fechacambioestatusAux'].value !== null) {
        let fechacambioestatusAuxtoArray = this.instruccionForm.controls['fechacambioestatusAux'].value.split('/');
        let fechacambioestatusAuxDate = new Date(
          fechacambioestatusAuxtoArray[1] +
            '/' +
            fechacambioestatusAuxtoArray[0] +
            '/' +
            fechacambioestatusAuxtoArray[2]
        );
        this.instruccionSend.fechacambioestatus = fechacambioestatusAuxDate.getTime();
      } else {
        this.instruccionSend.fechacambioestatus = null;
      }
      this.instruccionSend.subtipoinstruccion = this.instruccionForm.controls['subtipoinstruccion'].value;
      this.instruccionSend.importe = this.instruccionForm.controls['importe'].value;
      this.instruccionSend.importeaplicado = this.instruccionForm.controls['importeaplicado'].value;
      this.instruccionSend.nombrefideicomiso = this.instruccionForm.controls['nombrefideicomiso'].value;
      this.instruccionSend.nombresubfiso = this.instruccionForm.controls['nombresubfiso'].value;
      this.instruccionSend.titularfideicomiso = this.instruccionForm.controls['titularfideicomiso'].value;
      if (this.instruccionForm.controls['fechacompromisoAux'].value !== null) {
        let fechacompromisoAuxtoArray = this.instruccionForm.controls['fechacompromisoAux'].value.split('/');
        let fechacompromisoAuxDate = new Date(
          fechacompromisoAuxtoArray[1] + '/' + fechacompromisoAuxtoArray[0] + '/' + fechacompromisoAuxtoArray[2]
        );
        this.instruccionSend.fechacompromiso = fechacompromisoAuxDate.getTime();
      } else {
        this.instruccionSend.fechacompromiso = null;
      }
      this.instruccionSend.formarecepcion = this.instruccionForm.controls['formarecepcion'].value;
      this.instruccionSend.estatusinstruccion = this.instruccionForm.controls['estatusinstruccion'].value;
      this.instruccionSend.tipoinstruccion = this.instruccionForm.controls['tipoinstruccion'].value;
      this.instruccionSend.moneda = this.instruccionForm.controls['moneda'].value;
      this.instruccionSend.noeventos = this.instruccionForm.controls['noeventos'].value;
      this.instruccionSend.noefectuados = this.instruccionForm.controls['noefectuados'].value;
      this.instruccionSend.infocomplementaria = this.instruccionForm.controls['infocomplementaria'].value;

      this.instruccionService.updateEditaInstruccion(this.instruccionSend, this.idInstruccion).subscribe(res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            swal('Success...', 'Instrucciones save successfully.', 'success');
            this.location.back();
          } else {
            swal('Error...', 'Instrucciones has fields to fill.', 'error');
          }
        } else {
          swal('Error...', 'Instrucciones save unsuccessfully.', 'error');
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

      this.instruccionForm.controls['fideicomisoId'].setValue(fideicomiso.id);
      this.instruccionForm.controls['fideicomisoItem'].setValue(fideicomiso.generalesnumero);
    } else {
      this.fideicomisoService.clear();
      this.instruccionForm.controls['fideicomisoId'].setValue(null);
      this.instruccionForm.controls['fideicomisoItem'].setValue('');
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

      this.instruccionForm.controls['subfisoId'].setValue(subfiso.id);
      this.instruccionForm.controls['subfisoItem'].setValue(subfiso.numero);
    } else {
      this.subfisoService.clear();
      this.instruccionForm.controls['subfisoId'].setValue(null);
      this.instruccionForm.controls['subfisoItem'].setValue('');
    }
  }

  regresaInstruccion() {
    this.location.back();
  }
}
