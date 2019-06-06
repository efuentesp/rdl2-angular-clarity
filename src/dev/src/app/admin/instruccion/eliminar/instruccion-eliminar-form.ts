/* PSG  Instruccion Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Instruccion } from '../instruccion.psg.model';
import { InstruccionService } from '../instruccion.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-instruccion-eliminar',
  styleUrls: ['../instruccion.psg.scss'],
  templateUrl: './instruccion-eliminar.psg.html',
})
export class InstruccionEliminarForm {
  instruccionForm: FormGroup;
  submitted = false;
  loading = false;
  public instruccion: Instruccion = new Instruccion();
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
      fechahoracaptura: new FormControl({ value: '', disabled: true }),
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      subfisoId: new FormControl({ value: '', disabled: true }),
      subfisoItem: new FormControl({ value: '', disabled: true }),
      folio: new FormControl({ value: '', disabled: true }),
      fechadocumetoAux: new FormControl({ value: '', disabled: true }),
      clasificacion: new FormControl({ value: '', disabled: true }),
      clasificacionItem: new FormControl({ value: '', disabled: true }),
      personalidadsolicitante: new FormControl({ value: '', disabled: true }),
      personalidadsolicitanteItem: new FormControl({ value: '', disabled: true }),
      fechacambioestatusAux: new FormControl({ value: '', disabled: true }),
      subtipoinstruccion: new FormControl({ value: '', disabled: true }),
      subtipoinstruccionItem: new FormControl({ value: '', disabled: true }),
      importe: new FormControl({ value: '', disabled: true }),
      importeaplicado: new FormControl({ value: '', disabled: true }),
      nombrefideicomiso: new FormControl({ value: '', disabled: true }),
      nombresubfiso: new FormControl({ value: '', disabled: true }),
      titularfideicomiso: new FormControl({ value: '', disabled: true }),
      fechacompromisoAux: new FormControl({ value: '', disabled: true }),
      formarecepcion: new FormControl({ value: '', disabled: true }),
      formarecepcionItem: new FormControl({ value: '', disabled: true }),
      estatusinstruccion: new FormControl({ value: '', disabled: true }),
      estatusinstruccionItem: new FormControl({ value: '', disabled: true }),
      tipoinstruccion: new FormControl({ value: '', disabled: true }),
      tipoinstruccionItem: new FormControl({ value: '', disabled: true }),
      moneda: new FormControl({ value: '', disabled: true }),
      monedaItem: new FormControl({ value: '', disabled: true }),
      noeventos: new FormControl({ value: '', disabled: true }),
      noefectuados: new FormControl({ value: '', disabled: true }),
      infocomplementaria: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Instruccion eliminar()');

    this.recuperaInstruccion();

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

  eliminaInstruccion() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idInstruccion = params['id'];
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
        this.instruccionService.deleteInstruccion(this.idInstruccion).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Instruccion item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Instrucciones save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Instrucciones no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Instrucciones deleted unsuccessfully", "error");
      }
    });
  }

  regresaInstruccion() {
    this.location.back();
  }
}
