/* PSG  Transaccion Edita Ts */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Transaccion } from '../transaccion.psg.model';
import { TransaccionSend } from '../transaccion.psg.model-send';
import { TransaccionService } from '../transaccion.psg.service';

@Component({
  selector: 'clr-transaccion-editar',
  styleUrls: ['../transaccion.psg.scss'],
  templateUrl: './transaccion-editar.psg.html',
})
export class TransaccionEditarForm implements OnInit {
  public transaccionForm: FormGroup;
  public submitted = false;
  public loading = false;
  public transaccion: Transaccion = new Transaccion();
  public transaccionSend: TransaccionSend = new TransaccionSend();
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

  editaTransaccion() {
    this.submitted = true;

    if (this.transaccionForm.invalid) {
      swal('Error...', 'Catálogo de transacciones has fields to fill.', 'error');
    } else {
      this.route.params.subscribe(params => {
        this.idTransaccion = params['id'];
      });

      this.transaccionSend.numoperacion = this.transaccionForm.controls['numoperacion'].value;
      this.transaccionSend.modulo = this.transaccionForm.controls['modulo'].value;
      this.transaccionSend.nombre = this.transaccionForm.controls['nombre'].value;
      this.transaccionSend.costoejecucion = this.transaccionForm.controls['costoejecucion'].value;
      this.transaccionSend.estatustrans = this.transaccionForm.controls['estatustrans'].value;
      this.transaccionSend.notransaccion = this.transaccionForm.controls['notransaccion'].value;
      this.transaccionSend.moneda = this.transaccionForm.controls['moneda'].value;
      this.transaccionSend.columedocuenta = this.transaccionForm.controls['columedocuenta'].value;
      this.transaccionSend.hora = this.transaccionForm.controls['hora'].value;

      this.transaccionService.updateEditaTransaccion(this.transaccionSend, this.idTransaccion).subscribe(res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            swal('Success...', 'Catálogo de transacciones save successfully.', 'success');
            this.location.back();
          } else {
            swal('Error...', 'Catálogo de transacciones has fields to fill.', 'error');
          }
        } else {
          swal('Error...', 'Catálogo de transacciones save unsuccessfully.', 'error');
        }
      });
    }
  }

  regresaTransaccion() {
    this.location.back();
  }
}
