/* PSG  Pagos Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Pagos } from '../pagos.psg.model';
import { PagosService } from '../pagos.psg.service';

import { InstruccionService } from '../../instruccion/instruccion.psg.service';
import { Instruccion } from '../../instruccion/instruccion.psg.model';
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-pagos-eliminar',
  styleUrls: ['../pagos.psg.scss'],
  templateUrl: './pagos-eliminar.psg.html',
})
export class PagosEliminarForm {
  pagosForm: FormGroup;
  submitted = false;
  loading = false;
  public pagos: Pagos = new Pagos();
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
      instruccionId: new FormControl({ value: '', disabled: true }),
      instruccionItem: new FormControl({ value: '', disabled: true }),
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      importeinstruccion: new FormControl({ value: '', disabled: true }),
      movimientos: new FormControl({ value: '', disabled: true }),
      tipopersona: new FormControl({ value: '', disabled: true }),
      tipopersonaItem: new FormControl({ value: '', disabled: true }),
      conceptopago: new FormControl({ value: '', disabled: true }),
      conceptopagoItem: new FormControl({ value: '', disabled: true }),
      clave: new FormControl({ value: '', disabled: true }),
      nombre: new FormControl({ value: '', disabled: true }),
      formaliquidacion: new FormControl({ value: '', disabled: true }),
      tipopago: new FormControl({ value: '', disabled: true }),
      datosconcentradora: new FormControl({ value: '', disabled: true }),
      descripcioncomplementaria: new FormControl({ value: '', disabled: true }),
      subfisoId: new FormControl({ value: '', disabled: true }),
      subfisoItem: new FormControl({ value: '', disabled: true }),
      importetotal: new FormControl({ value: '', disabled: true }),
      estatusoperacion: new FormControl({ value: '', disabled: true }),
      estatusoperacionItem: new FormControl({ value: '', disabled: true }),
      importe: new FormControl({ value: '', disabled: true }),
      fechaliquidarAux: new FormControl({ value: '', disabled: true }),
      estatus: new FormControl({ value: '', disabled: true }),
      estatusItem: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Pagos eliminar()');

    this.recuperaPagos();

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

  eliminaPagos() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idPagos = params['id'];
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
        this.pagosService.deletePagos(this.idPagos).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Pagos item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Pagos save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal('Warning...', 'Pagos no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
            }
          }
        );
      } else {
        //swal("Cancelled", "Pagos deleted unsuccessfully", "error");
      }
    });
  }

  regresaPagos() {
    this.location.back();
  }
}
