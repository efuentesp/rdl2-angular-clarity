/* PSG  Transaccion Agregar Ts */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import swal from 'sweetalert2';

import { Transaccion } from '../transaccion.psg.model';
import { TransaccionSend } from '../transaccion.psg.model-send';
import { TransaccionService } from '../transaccion.psg.service';

@Component({
  selector: 'clr-transaccion-agregar',
  styleUrls: ['../transaccion.psg.scss'],
  templateUrl: './transaccion-agregar.psg.html',
})
export class TransaccionAgregarForm implements OnInit {
  transaccionForm: FormGroup;
  submitted = false;
  loading = false;
  public transaccion: Transaccion = new Transaccion();
  public transaccionSend: TransaccionSend = new TransaccionSend();
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
      numoperacion: new FormControl('', Validators.required),
      modulo: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      costoejecucion: new FormControl('', Validators.required),
      estatustrans: new FormControl('', Validators.required),
      notransaccion: new FormControl('', Validators.required),
      moneda: new FormControl('', Validators.required),
      columedocuenta: new FormControl('', Validators.required),
      hora: new FormControl(''),
    });
  }

  ngOnInit() {
    console.log('Transaccion agregar()');

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  guardaTransaccion() {
    this.submitted = true;

    if (this.transaccionForm.invalid) {
      swal('Error...', 'Catálogo de transacciones has fields to fill.', 'error');
    } else {
      this.transaccionSend.numoperacion = this.transaccionForm.controls['numoperacion'].value;
      this.transaccionSend.modulo = this.transaccionForm.controls['modulo'].value;
      this.transaccionSend.nombre = this.transaccionForm.controls['nombre'].value;
      this.transaccionSend.costoejecucion = this.transaccionForm.controls['costoejecucion'].value;
      this.transaccionSend.estatustrans = this.transaccionForm.controls['estatustrans'].value;
      this.transaccionSend.notransaccion = this.transaccionForm.controls['notransaccion'].value;
      this.transaccionSend.moneda = this.transaccionForm.controls['moneda'].value;
      this.transaccionSend.columedocuenta = this.transaccionForm.controls['columedocuenta'].value;
      this.transaccionSend.hora = this.transaccionForm.controls['hora'].value;

      this.transaccionService.postGuardaTransaccion(this.transaccionSend).subscribe(
        res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Catálogo de transacciones save successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Catálogo de transacciones has fields to fill.', 'error');
            }
          }
        },
        error => {
          swal('Error...', 'Catálogo de transacciones save unsuccessfully.', 'error');
        }
      );
    }
  }

  regresaTransaccion() {
    this.location.back();
  }
}
