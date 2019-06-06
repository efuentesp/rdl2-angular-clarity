/* PSG  Aportaciones Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Aportaciones } from '../aportaciones.psg.model';
import { AportacionesService } from '../aportaciones.psg.service';

import { InstruccionService } from '../../instruccion/instruccion.psg.service';
import { Instruccion } from '../../instruccion/instruccion.psg.model';
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-aportaciones-eliminar',
  styleUrls: ['../aportaciones.psg.scss'],
  templateUrl: './aportaciones-eliminar.psg.html',
})
export class AportacionesEliminarForm {
  aportacionesForm: FormGroup;
  submitted = false;
  loading = false;
  public aportaciones: Aportaciones = new Aportaciones();
  public idAportaciones: string;
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
    private aportacionesService: AportacionesService
  ) {
    this.aportacionesForm = this.fb.group({
      instruccionId: new FormControl({ value: '', disabled: true }),
      instruccionItem: new FormControl({ value: '', disabled: true }),
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      subfisoId: new FormControl({ value: '', disabled: true }),
      subfisoItem: new FormControl({ value: '', disabled: true }),
      totalimporte: new FormControl({ value: '', disabled: true }),
      destinorecepcion: new FormControl({ value: '', disabled: true }),
      destinorecepcionItem: new FormControl({ value: '', disabled: true }),
      estatus: new FormControl({ value: '', disabled: true }),
      estatusItem: new FormControl({ value: '', disabled: true }),
      moneda: new FormControl({ value: '', disabled: true }),
      monedaItem: new FormControl({ value: '', disabled: true }),
      formarecepcion: new FormControl({ value: '', disabled: true }),
      formarecepcionItem: new FormControl({ value: '', disabled: true }),
      estatusoperacion: new FormControl({ value: '', disabled: true }),
      estatusoperacionItem: new FormControl({ value: '', disabled: true }),
      tipopersona: new FormControl({ value: '', disabled: true }),
      tipopersonaItem: new FormControl({ value: '', disabled: true }),
      fechacontabilizacionAux: new FormControl({ value: '', disabled: true }),
      nombre: new FormControl({ value: '', disabled: true }),
      descripcioncomplementaria: new FormControl({ value: '', disabled: true }),
      nombrefideicomiso: new FormControl({ value: '', disabled: true }),
      eventos: new FormControl({ value: '', disabled: true }),
      totalaplicado: new FormControl({ value: '', disabled: true }),
      importerecepcion: new FormControl({ value: '', disabled: true }),
      origenrecursos: new FormControl({ value: '', disabled: true }),
      origenrecursosItem: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Aportaciones eliminar()');

    this.recuperaAportaciones();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaAportaciones() {
    this.aportaciones = this.aportacionesService.getAportaciones();
    this.aportacionesForm.controls['instruccionId'].setValue(this.aportaciones.instruccionId);
    this.instruccionService.getRecuperaInstruccionPorId(this.aportaciones.instruccionId).subscribe(res => {
      if (res) {
        this.instruccion = res.json();
        this.aportacionesForm.controls['instruccionItem'].setValue(this.instruccion.folio);
      }
    });
    this.aportacionesForm.controls['fideicomisoId'].setValue(this.aportaciones.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.aportaciones.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.aportacionesForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.aportacionesForm.controls['subfisoId'].setValue(this.aportaciones.subfisoId);
    this.subfisoService.getRecuperaSubfisoPorId(this.aportaciones.subfisoId).subscribe(res => {
      if (res) {
        this.subfiso = res.json();
        this.aportacionesForm.controls['subfisoItem'].setValue(this.subfiso.numero);
      }
    });
    this.aportacionesForm.controls['totalimporte'].setValue(this.aportaciones.totalimporte);
    this.aportacionesForm.controls['destinorecepcion'].setValue(this.aportaciones.destinorecepcion);
    this.aportacionesForm.controls['estatus'].setValue(this.aportaciones.estatus);
    this.aportacionesForm.controls['moneda'].setValue(this.aportaciones.moneda);
    this.aportacionesForm.controls['formarecepcion'].setValue(this.aportaciones.formarecepcion);
    this.aportacionesForm.controls['estatusoperacion'].setValue(this.aportaciones.estatusoperacion);
    this.aportacionesForm.controls['tipopersona'].setValue(this.aportaciones.tipopersona);
    this.aportacionesForm.controls['fechacontabilizacionAux'].setValue(
      this.datePipe.transform(this.aportaciones.fechacontabilizacion, 'dd/MM/yyyy')
    );
    this.aportacionesForm.controls['nombre'].setValue(this.aportaciones.nombre);
    this.aportacionesForm.controls['descripcioncomplementaria'].setValue(this.aportaciones.descripcioncomplementaria);
    this.aportacionesForm.controls['nombrefideicomiso'].setValue(this.aportaciones.nombrefideicomiso);
    this.aportacionesForm.controls['eventos'].setValue(this.aportaciones.eventos);
    this.aportacionesForm.controls['totalaplicado'].setValue(this.aportaciones.totalaplicado);
    this.aportacionesForm.controls['importerecepcion'].setValue(this.aportaciones.importerecepcion);
    this.aportacionesForm.controls['origenrecursos'].setValue(this.aportaciones.origenrecursos);
  }

  eliminaAportaciones() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idAportaciones = params['id'];
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
        this.aportacionesService.deleteAportaciones(this.idAportaciones).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Aportaciones item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Aportaciones save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Aportaciones no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Aportaciones deleted unsuccessfully", "error");
      }
    });
  }

  regresaAportaciones() {
    this.location.back();
  }
}
