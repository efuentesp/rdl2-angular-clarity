/* PSG  Documentosfideicomiso Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Documentosfideicomiso } from '../documentosfideicomiso.psg.model';
import { DocumentosfideicomisoService } from '../documentosfideicomiso.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-documentosfideicomiso-eliminar',
  styleUrls: ['../documentosfideicomiso.psg.scss'],
  templateUrl: './documentosfideicomiso-eliminar.psg.html',
})
export class DocumentosfideicomisoEliminarForm {
  documentosfideicomisoForm: FormGroup;
  submitted = false;
  loading = false;
  public documentosfideicomiso: Documentosfideicomiso = new Documentosfideicomiso();
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
      campo: new FormControl({ value: '', disabled: true }),
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      contratofideicomiso: new FormControl({ value: '', disabled: true }),
      contratofideicomisoItem: new FormControl({ value: '', disabled: true }),
      actasconstitutivas: new FormControl({ value: '', disabled: true }),
      actasconstitutivasItem: new FormControl({ value: '', disabled: true }),
      cedulafiscal: new FormControl({ value: '', disabled: true }),
      cedulafiscalItem: new FormControl({ value: '', disabled: true }),
      poderes: new FormControl({ value: '', disabled: true }),
      poderesItem: new FormControl({ value: '', disabled: true }),
      identificadores: new FormControl({ value: '', disabled: true }),
      identificadoresItem: new FormControl({ value: '', disabled: true }),
      comprobantesdomicilio: new FormControl({ value: '', disabled: true }),
      comprobantesdomicilioItem: new FormControl({ value: '', disabled: true }),
      formatoskyc: new FormControl({ value: '', disabled: true }),
      formatoskycItem: new FormControl({ value: '', disabled: true }),
      formatoevaluacionriesgo: new FormControl({ value: '', disabled: true }),
      formatoevaluacionriesgoItem: new FormControl({ value: '', disabled: true }),
      worldcheck: new FormControl({ value: '', disabled: true }),
      worldcheckItem: new FormControl({ value: '', disabled: true }),
      formatoinformacion: new FormControl({ value: '', disabled: true }),
      formatoinformacionItem: new FormControl({ value: '', disabled: true }),
      autorizacioncomite: new FormControl({ value: '', disabled: true }),
      autorizacioncomiteItem: new FormControl({ value: '', disabled: true }),
      firmascomite: new FormControl({ value: '', disabled: true }),
      firmascomiteItem: new FormControl({ value: '', disabled: true }),
      curp: new FormControl({ value: '', disabled: true }),
      curpItem: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Documentosfideicomiso eliminar()');

    this.recuperaDocumentosfideicomiso();

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

  eliminaDocumentosfideicomiso() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idDocumentosfideicomiso = params['id'];
    });

    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this ordensimplificada!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(isConfirm => {
      if (isConfirm.value) {
        this.documentosfideicomisoService.deleteDocumentosfideicomiso(this.idDocumentosfideicomiso).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Documentosfideicomiso item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Check list de documentos del fideicomiso save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Check list de documentos del fideicomiso no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Check list de documentos del fideicomiso deleted unsuccessfully", "error");
      }
    });
  }

  regresaDocumentosfideicomiso() {
    this.location.back();
  }
}
