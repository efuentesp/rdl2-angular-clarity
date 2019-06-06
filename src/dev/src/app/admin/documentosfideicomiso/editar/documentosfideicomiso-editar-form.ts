/* PSG  Documentosfideicomiso Edita Ts */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Documentosfideicomiso } from '../documentosfideicomiso.psg.model';
import { DocumentosfideicomisoSend } from '../documentosfideicomiso.psg.model-send';
import { DocumentosfideicomisoService } from '../documentosfideicomiso.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-documentosfideicomiso-editar',
  styleUrls: ['../documentosfideicomiso.psg.scss'],
  templateUrl: './documentosfideicomiso-editar.psg.html',
})
export class DocumentosfideicomisoEditarForm implements OnInit {
  public documentosfideicomisoForm: FormGroup;
  public submitted = false;
  public loading = false;
  public documentosfideicomiso: Documentosfideicomiso = new Documentosfideicomiso();
  public documentosfideicomisoSend: DocumentosfideicomisoSend = new DocumentosfideicomisoSend();
  public idDocumentosfideicomiso: string;
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
    private documentosfideicomisoService: DocumentosfideicomisoService
  ) {
    this.documentosfideicomisoForm = this.fb.group({
      campo: new FormControl(''),
      fideicomisoId: new FormControl('', Validators.required),
      fideicomisoItem: new FormControl(''),
      contratofideicomiso: new FormControl('', Validators.required),
      actasconstitutivas: new FormControl('', Validators.required),
      cedulafiscal: new FormControl('', Validators.required),
      poderes: new FormControl('', Validators.required),
      identificadores: new FormControl('', Validators.required),
      comprobantesdomicilio: new FormControl('', Validators.required),
      formatoskyc: new FormControl('', Validators.required),
      formatoevaluacionriesgo: new FormControl('', Validators.required),
      worldcheck: new FormControl('', Validators.required),
      formatoinformacion: new FormControl('', Validators.required),
      autorizacioncomite: new FormControl('', Validators.required),
      firmascomite: new FormControl('', Validators.required),
      curp: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.recuperaDocumentosfideicomiso();

    this.cargaFideicomiso();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaDocumentosfideicomiso() {
    this.documentosfideicomiso = this.documentosfideicomisoService.getDocumentosfideicomiso();
    this.documentosfideicomisoForm.controls['campo'].setValue(this.documentosfideicomiso.campo);
    this.documentosfideicomisoForm.controls['fideicomisoId'].setValue(this.documentosfideicomiso.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.documentosfideicomiso.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.documentosfideicomisoForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });

    this.documentosfideicomisoForm.controls['contratofideicomiso'].setValue(
      this.documentosfideicomiso.contratofideicomiso
    );
    this.documentosfideicomisoForm.controls['actasconstitutivas'].setValue(
      this.documentosfideicomiso.actasconstitutivas
    );
    this.documentosfideicomisoForm.controls['cedulafiscal'].setValue(this.documentosfideicomiso.cedulafiscal);
    this.documentosfideicomisoForm.controls['poderes'].setValue(this.documentosfideicomiso.poderes);
    this.documentosfideicomisoForm.controls['identificadores'].setValue(this.documentosfideicomiso.identificadores);
    this.documentosfideicomisoForm.controls['comprobantesdomicilio'].setValue(
      this.documentosfideicomiso.comprobantesdomicilio
    );
    this.documentosfideicomisoForm.controls['formatoskyc'].setValue(this.documentosfideicomiso.formatoskyc);
    this.documentosfideicomisoForm.controls['formatoevaluacionriesgo'].setValue(
      this.documentosfideicomiso.formatoevaluacionriesgo
    );
    this.documentosfideicomisoForm.controls['worldcheck'].setValue(this.documentosfideicomiso.worldcheck);
    this.documentosfideicomisoForm.controls['formatoinformacion'].setValue(
      this.documentosfideicomiso.formatoinformacion
    );
    this.documentosfideicomisoForm.controls['autorizacioncomite'].setValue(
      this.documentosfideicomiso.autorizacioncomite
    );
    this.documentosfideicomisoForm.controls['firmascomite'].setValue(this.documentosfideicomiso.firmascomite);
    this.documentosfideicomisoForm.controls['curp'].setValue(this.documentosfideicomiso.curp);
  }

  editaDocumentosfideicomiso() {
    this.submitted = true;

    if (this.documentosfideicomisoForm.invalid) {
      swal('Error...', 'Check list de documentos del fideicomiso has fields to fill.', 'error');
    } else {
      this.route.params.subscribe(params => {
        this.idDocumentosfideicomiso = params['id'];
      });

      this.documentosfideicomisoSend.campo = this.documentosfideicomisoForm.controls['campo'].value;
      this.documentosfideicomisoSend.fideicomisoId = this.documentosfideicomisoForm.controls['fideicomisoId'].value;
      this.documentosfideicomisoSend.contratofideicomiso = this.documentosfideicomisoForm.controls[
        'contratofideicomiso'
      ].value;
      this.documentosfideicomisoSend.actasconstitutivas = this.documentosfideicomisoForm.controls[
        'actasconstitutivas'
      ].value;
      this.documentosfideicomisoSend.cedulafiscal = this.documentosfideicomisoForm.controls['cedulafiscal'].value;
      this.documentosfideicomisoSend.poderes = this.documentosfideicomisoForm.controls['poderes'].value;
      this.documentosfideicomisoSend.identificadores = this.documentosfideicomisoForm.controls['identificadores'].value;
      this.documentosfideicomisoSend.comprobantesdomicilio = this.documentosfideicomisoForm.controls[
        'comprobantesdomicilio'
      ].value;
      this.documentosfideicomisoSend.formatoskyc = this.documentosfideicomisoForm.controls['formatoskyc'].value;
      this.documentosfideicomisoSend.formatoevaluacionriesgo = this.documentosfideicomisoForm.controls[
        'formatoevaluacionriesgo'
      ].value;
      this.documentosfideicomisoSend.worldcheck = this.documentosfideicomisoForm.controls['worldcheck'].value;
      this.documentosfideicomisoSend.formatoinformacion = this.documentosfideicomisoForm.controls[
        'formatoinformacion'
      ].value;
      this.documentosfideicomisoSend.autorizacioncomite = this.documentosfideicomisoForm.controls[
        'autorizacioncomite'
      ].value;
      this.documentosfideicomisoSend.firmascomite = this.documentosfideicomisoForm.controls['firmascomite'].value;
      this.documentosfideicomisoSend.curp = this.documentosfideicomisoForm.controls['curp'].value;

      this.documentosfideicomisoService
        .updateEditaDocumentosfideicomiso(this.documentosfideicomisoSend, this.idDocumentosfideicomiso)
        .subscribe(res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Check list de documentos del fideicomiso save successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Check list de documentos del fideicomiso has fields to fill.', 'error');
            }
          } else {
            swal('Error...', 'Check list de documentos del fideicomiso save unsuccessfully.', 'error');
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

      this.documentosfideicomisoForm.controls['fideicomisoId'].setValue(fideicomiso.id);
      this.documentosfideicomisoForm.controls['fideicomisoItem'].setValue(fideicomiso.generalesnumero);
    } else {
      this.fideicomisoService.clear();
      this.documentosfideicomisoForm.controls['fideicomisoId'].setValue(null);
      this.documentosfideicomisoForm.controls['fideicomisoItem'].setValue('');
    }
  }

  regresaDocumentosfideicomiso() {
    this.location.back();
  }
}
