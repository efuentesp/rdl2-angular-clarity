/* PSG  Movimiento Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Movimiento } from '../movimiento.psg.model';
import { MovimientoService } from '../movimiento.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-movimiento-eliminar',
  styleUrls: ['../movimiento.psg.scss'],
  templateUrl: './movimiento-eliminar.psg.html',
})
export class MovimientoEliminarForm {
  movimientoForm: FormGroup;
  submitted = false;
  loading = false;
  public movimiento: Movimiento = new Movimiento();
  public idMovimiento: string;
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
    private movimientoService: MovimientoService
  ) {
    this.movimientoForm = this.fb.group({
      fechacontable: new FormControl({ value: '', disabled: true }),
      fechaalta: new FormControl({ value: '', disabled: true }),
      operacion: new FormControl({ value: '', disabled: true }),
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      subfisoId: new FormControl({ value: '', disabled: true }),
      subfisoItem: new FormControl({ value: '', disabled: true }),
      folio: new FormControl({ value: '', disabled: true }),
      transaccion: new FormControl({ value: '', disabled: true }),
      descripcion: new FormControl({ value: '', disabled: true }),
      importe: new FormControl({ value: '', disabled: true }),
      usuario: new FormControl({ value: '', disabled: true }),
      estatus: new FormControl({ value: '', disabled: true }),
      estatusItem: new FormControl({ value: '', disabled: true }),
      factura: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Movimiento eliminar()');

    this.recuperaMovimiento();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaMovimiento() {
    this.movimiento = this.movimientoService.getMovimiento();
    this.movimientoForm.controls['fechacontable'].setValue(this.movimiento.fechacontable);
    this.movimientoForm.controls['fechaalta'].setValue(this.movimiento.fechaalta);
    this.movimientoForm.controls['operacion'].setValue(this.movimiento.operacion);
    this.movimientoForm.controls['fideicomisoId'].setValue(this.movimiento.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.movimiento.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.movimientoForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.movimientoForm.controls['subfisoId'].setValue(this.movimiento.subfisoId);
    this.subfisoService.getRecuperaSubfisoPorId(this.movimiento.subfisoId).subscribe(res => {
      if (res) {
        this.subfiso = res.json();
        this.movimientoForm.controls['subfisoItem'].setValue(this.subfiso.numero);
      }
    });
    this.movimientoForm.controls['folio'].setValue(this.movimiento.folio);
    this.movimientoForm.controls['transaccion'].setValue(this.movimiento.transaccion);
    this.movimientoForm.controls['descripcion'].setValue(this.movimiento.descripcion);
    this.movimientoForm.controls['importe'].setValue(this.movimiento.importe);
    this.movimientoForm.controls['usuario'].setValue(this.movimiento.usuario);
    this.movimientoForm.controls['estatus'].setValue(this.movimiento.estatus);
    this.movimientoForm.controls['factura'].setValue(this.movimiento.factura);
  }

  eliminaMovimiento() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idMovimiento = params['id'];
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
        this.movimientoService.deleteMovimiento(this.idMovimiento).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Movimiento item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Movimientos save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Movimientos no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Movimientos deleted unsuccessfully", "error");
      }
    });
  }

  regresaMovimiento() {
    this.location.back();
  }
}
