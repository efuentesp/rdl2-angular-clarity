/* PSG  Transaccion Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Transaccion } from '../transaccion.psg.model';
import { TransaccionService } from '../transaccion.psg.service';

@Component({
  selector: 'clr-transaccion-eliminar',
  styleUrls: ['../transaccion.psg.scss'],
  templateUrl: './transaccion-eliminar.psg.html',
})
export class TransaccionEliminarForm {
  transaccionForm: FormGroup;
  submitted = false;
  loading = false;
  public transaccion: Transaccion = new Transaccion();
  public idTransaccion: string;
  public datePipe = new DatePipe('en-US');
  public id: number;

  // Modal

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private transaccionService: TransaccionService
  ) {
    this.transaccionForm = this.fb.group({
      numoperacion: new FormControl({ value: '', disabled: true }),
      modulo: new FormControl({ value: '', disabled: true }),
      moduloItem: new FormControl({ value: '', disabled: true }),
      nombre: new FormControl({ value: '', disabled: true }),
      costoejecucion: new FormControl({ value: '', disabled: true }),
      estatustrans: new FormControl({ value: '', disabled: true }),
      estatustransItem: new FormControl({ value: '', disabled: true }),
      notransaccion: new FormControl({ value: '', disabled: true }),
      moneda: new FormControl({ value: '', disabled: true }),
      monedaItem: new FormControl({ value: '', disabled: true }),
      columedocuenta: new FormControl({ value: '', disabled: true }),
      columedocuentaItem: new FormControl({ value: '', disabled: true }),
      hora: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Transaccion eliminar()');

    this.recuperaTransaccion();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaTransaccion() {
    this.transaccion = this.transaccionService.getTransaccion();
    this.transaccionForm.controls['numoperacion'].setValue(this.transaccion.numoperacion);
    this.transaccionForm.controls['modulo'].setValue(this.transaccion.modulo);
    this.transaccionForm.controls['nombre'].setValue(this.transaccion.nombre);
    this.transaccionForm.controls['costoejecucion'].setValue(this.transaccion.costoejecucion);
    this.transaccionForm.controls['estatustrans'].setValue(this.transaccion.estatustrans);
    this.transaccionForm.controls['notransaccion'].setValue(this.transaccion.notransaccion);
    this.transaccionForm.controls['moneda'].setValue(this.transaccion.moneda);
    this.transaccionForm.controls['columedocuenta'].setValue(this.transaccion.columedocuenta);
    this.transaccionForm.controls['hora'].setValue(this.transaccion.hora);
  }

  eliminaTransaccion() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idTransaccion = params['id'];
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
        this.transaccionService.deleteTransaccion(this.idTransaccion).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Transaccion item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Catálogo de transacciones save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Catálogo de transacciones no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Catálogo de transacciones deleted unsuccessfully", "error");
      }
    });
  }

  regresaTransaccion() {
    this.location.back();
  }
}
