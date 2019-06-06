/* PSG  Contratoinversion Edita Ts */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Contratoinversion } from '../contratoinversion.psg.model';
import { ContratoinversionSend } from '../contratoinversion.psg.model-send';
import { ContratoinversionService } from '../contratoinversion.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-contratoinversion-editar',
  styleUrls: ['../contratoinversion.psg.scss'],
  templateUrl: './contratoinversion-editar.psg.html',
})
export class ContratoinversionEditarForm implements OnInit {
  public contratoinversionForm: FormGroup;
  public submitted = false;
  public loading = false;
  public contratoinversion: Contratoinversion = new Contratoinversion();
  public contratoinversionSend: ContratoinversionSend = new ContratoinversionSend();
  public idContratoinversion: string;
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
    private contratoinversionService: ContratoinversionService
  ) {
    this.contratoinversionForm = this.fb.group({
      fideicomisoId: new FormControl('', Validators.required),
      fideicomisoItem: new FormControl(''),
      tipocontrato: new FormControl(''),
      intermediario: new FormControl(''),
      moneda: new FormControl(''),
      nombrecontacto1: new FormControl(''),
      nombrecontacto2: new FormControl(''),
      resparamliq: new FormControl(''),
      enviorecursosinv: new FormControl(''),
      transferenciarecdesinver: new FormControl(''),
      retenerisr: new FormControl(''),
      subfisoId: new FormControl(''),
      subfisoItem: new FormControl(''),
      fechavencimientoAux: new FormControl(''),
      estatus: new FormControl(''),
      contratoiversion: new FormControl(''),
      contratootrasinst: new FormControl(''),
      contacto1lada: new FormControl(''),
      contacto1telefono: new FormControl(''),
      contacto1ext: new FormControl(''),
      contacto2lada: new FormControl(''),
      contacto2telefono: new FormControl(''),
      contacto2ext: new FormControl(''),
      nombre: new FormControl(''),
      cuenta: new FormControl(''),
      traspasoentresubfiso: new FormControl(''),
      fechaaperturaAux: new FormControl(''),
      origenrecursos: new FormControl(''),
    });
  }

  ngOnInit() {
    this.recuperaContratoinversion();

    this.cargaFideicomiso();
    this.cargaSubfiso();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaContratoinversion() {
    this.contratoinversion = this.contratoinversionService.getContratoinversion();
    this.contratoinversionForm.controls['fideicomisoId'].setValue(this.contratoinversion.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.contratoinversion.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.contratoinversionForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });

    this.contratoinversionForm.controls['tipocontrato'].setValue(this.contratoinversion.tipocontrato);
    this.contratoinversionForm.controls['intermediario'].setValue(this.contratoinversion.intermediario);
    this.contratoinversionForm.controls['moneda'].setValue(this.contratoinversion.moneda);
    this.contratoinversionForm.controls['nombrecontacto1'].setValue(this.contratoinversion.nombrecontacto1);
    this.contratoinversionForm.controls['nombrecontacto2'].setValue(this.contratoinversion.nombrecontacto2);
    this.contratoinversionForm.controls['resparamliq'].setValue(this.contratoinversion.resparamliq);
    this.contratoinversionForm.controls['enviorecursosinv'].setValue(this.contratoinversion.enviorecursosinv);
    this.contratoinversionForm.controls['transferenciarecdesinver'].setValue(
      this.contratoinversion.transferenciarecdesinver
    );
    this.contratoinversionForm.controls['retenerisr'].setValue(this.contratoinversion.retenerisr);
    this.contratoinversionForm.controls['subfisoId'].setValue(this.contratoinversion.subfisoId);
    this.subfisoService.getRecuperaSubfisoPorId(this.contratoinversion.subfisoId).subscribe(res => {
      if (res) {
        this.subfiso = res.json();
        this.contratoinversionForm.controls['subfisoItem'].setValue(this.subfiso.numero);
      }
    });

    this.contratoinversionForm.controls['fechavencimientoAux'].setValue(
      this.datePipe.transform(this.contratoinversion.fechavencimiento, 'dd/MM/yyyy')
    );
    this.contratoinversionForm.controls['estatus'].setValue(this.contratoinversion.estatus);
    this.contratoinversionForm.controls['contratoiversion'].setValue(this.contratoinversion.contratoiversion);
    this.contratoinversionForm.controls['contratootrasinst'].setValue(this.contratoinversion.contratootrasinst);
    this.contratoinversionForm.controls['contacto1lada'].setValue(this.contratoinversion.contacto1lada);
    this.contratoinversionForm.controls['contacto1telefono'].setValue(this.contratoinversion.contacto1telefono);
    this.contratoinversionForm.controls['contacto1ext'].setValue(this.contratoinversion.contacto1ext);
    this.contratoinversionForm.controls['contacto2lada'].setValue(this.contratoinversion.contacto2lada);
    this.contratoinversionForm.controls['contacto2telefono'].setValue(this.contratoinversion.contacto2telefono);
    this.contratoinversionForm.controls['contacto2ext'].setValue(this.contratoinversion.contacto2ext);
    this.contratoinversionForm.controls['nombre'].setValue(this.contratoinversion.nombre);
    this.contratoinversionForm.controls['cuenta'].setValue(this.contratoinversion.cuenta);
    this.contratoinversionForm.controls['traspasoentresubfiso'].setValue(this.contratoinversion.traspasoentresubfiso);
    this.contratoinversionForm.controls['fechaaperturaAux'].setValue(
      this.datePipe.transform(this.contratoinversion.fechaapertura, 'dd/MM/yyyy')
    );
    this.contratoinversionForm.controls['origenrecursos'].setValue(this.contratoinversion.origenrecursos);
  }

  editaContratoinversion() {
    this.submitted = true;

    if (this.contratoinversionForm.invalid) {
      swal('Error...', 'Contratos de inversión has fields to fill.', 'error');
    } else {
      this.route.params.subscribe(params => {
        this.idContratoinversion = params['id'];
      });

      this.contratoinversionSend.fideicomisoId = this.contratoinversionForm.controls['fideicomisoId'].value;
      this.contratoinversionSend.tipocontrato = this.contratoinversionForm.controls['tipocontrato'].value;
      this.contratoinversionSend.intermediario = this.contratoinversionForm.controls['intermediario'].value;
      this.contratoinversionSend.moneda = this.contratoinversionForm.controls['moneda'].value;
      this.contratoinversionSend.nombrecontacto1 = this.contratoinversionForm.controls['nombrecontacto1'].value;
      this.contratoinversionSend.nombrecontacto2 = this.contratoinversionForm.controls['nombrecontacto2'].value;
      this.contratoinversionSend.resparamliq = this.contratoinversionForm.controls['resparamliq'].value;
      this.contratoinversionSend.enviorecursosinv = this.contratoinversionForm.controls['enviorecursosinv'].value;
      this.contratoinversionSend.transferenciarecdesinver = this.contratoinversionForm.controls[
        'transferenciarecdesinver'
      ].value;
      this.contratoinversionSend.retenerisr = this.contratoinversionForm.controls['retenerisr'].value;
      this.contratoinversionSend.subfisoId = this.contratoinversionForm.controls['subfisoId'].value;
      if (this.contratoinversionForm.controls['fechavencimientoAux'].value !== null) {
        let fechavencimientoAuxtoArray = this.contratoinversionForm.controls['fechavencimientoAux'].value.split('/');
        let fechavencimientoAuxDate = new Date(
          fechavencimientoAuxtoArray[1] + '/' + fechavencimientoAuxtoArray[0] + '/' + fechavencimientoAuxtoArray[2]
        );
        this.contratoinversionSend.fechavencimiento = fechavencimientoAuxDate.getTime();
      } else {
        this.contratoinversionSend.fechavencimiento = null;
      }
      this.contratoinversionSend.estatus = this.contratoinversionForm.controls['estatus'].value;
      this.contratoinversionSend.contratoiversion = this.contratoinversionForm.controls['contratoiversion'].value;
      this.contratoinversionSend.contratootrasinst = this.contratoinversionForm.controls['contratootrasinst'].value;
      this.contratoinversionSend.contacto1lada = this.contratoinversionForm.controls['contacto1lada'].value;
      this.contratoinversionSend.contacto1telefono = this.contratoinversionForm.controls['contacto1telefono'].value;
      this.contratoinversionSend.contacto1ext = this.contratoinversionForm.controls['contacto1ext'].value;
      this.contratoinversionSend.contacto2lada = this.contratoinversionForm.controls['contacto2lada'].value;
      this.contratoinversionSend.contacto2telefono = this.contratoinversionForm.controls['contacto2telefono'].value;
      this.contratoinversionSend.contacto2ext = this.contratoinversionForm.controls['contacto2ext'].value;
      this.contratoinversionSend.nombre = this.contratoinversionForm.controls['nombre'].value;
      this.contratoinversionSend.cuenta = this.contratoinversionForm.controls['cuenta'].value;
      this.contratoinversionSend.traspasoentresubfiso = this.contratoinversionForm.controls[
        'traspasoentresubfiso'
      ].value;
      if (this.contratoinversionForm.controls['fechaaperturaAux'].value !== null) {
        let fechaaperturaAuxtoArray = this.contratoinversionForm.controls['fechaaperturaAux'].value.split('/');
        let fechaaperturaAuxDate = new Date(
          fechaaperturaAuxtoArray[1] + '/' + fechaaperturaAuxtoArray[0] + '/' + fechaaperturaAuxtoArray[2]
        );
        this.contratoinversionSend.fechaapertura = fechaaperturaAuxDate.getTime();
      } else {
        this.contratoinversionSend.fechaapertura = null;
      }
      this.contratoinversionSend.origenrecursos = this.contratoinversionForm.controls['origenrecursos'].value;

      this.contratoinversionService
        .updateEditaContratoinversion(this.contratoinversionSend, this.idContratoinversion)
        .subscribe(res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Contratos de inversión save successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Contratos de inversión has fields to fill.', 'error');
            }
          } else {
            swal('Error...', 'Contratos de inversión save unsuccessfully.', 'error');
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

      this.contratoinversionForm.controls['fideicomisoId'].setValue(fideicomiso.id);
      this.contratoinversionForm.controls['fideicomisoItem'].setValue(fideicomiso.generalesnumero);
    } else {
      this.fideicomisoService.clear();
      this.contratoinversionForm.controls['fideicomisoId'].setValue(null);
      this.contratoinversionForm.controls['fideicomisoItem'].setValue('');
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

      this.contratoinversionForm.controls['subfisoId'].setValue(subfiso.id);
      this.contratoinversionForm.controls['subfisoItem'].setValue(subfiso.numero);
    } else {
      this.subfisoService.clear();
      this.contratoinversionForm.controls['subfisoId'].setValue(null);
      this.contratoinversionForm.controls['subfisoItem'].setValue('');
    }
  }

  regresaContratoinversion() {
    this.location.back();
  }
}
