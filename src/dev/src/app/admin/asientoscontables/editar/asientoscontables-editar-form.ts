/* PSG  Asientoscontables Edita Ts */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Asientoscontables } from '../asientoscontables.psg.model';
import { AsientoscontablesSend } from '../asientoscontables.psg.model-send';
import { AsientoscontablesService } from '../asientoscontables.psg.service';

import { TransaccionService } from '../../transaccion/transaccion.psg.service';
import { Transaccion } from '../../transaccion/transaccion.psg.model';

@Component({
  selector: 'clr-asientoscontables-editar',
  styleUrls: ['../asientoscontables.psg.scss'],
  templateUrl: './asientoscontables-editar.psg.html',
})
export class AsientoscontablesEditarForm implements OnInit {
  public asientoscontablesForm: FormGroup;
  public submitted = false;
  public loading = false;
  public asientoscontables: Asientoscontables = new Asientoscontables();
  public asientoscontablesSend: AsientoscontablesSend = new AsientoscontablesSend();
  public idAsientoscontables: string;
  public datePipe = new DatePipe('en-US');
  public id: number;

  public transaccionArray: Transaccion[];
  public transaccion: Transaccion;

  // Modal
  modaltransaccion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private transaccionService: TransaccionService,
    private asientoscontablesService: AsientoscontablesService
  ) {
    this.asientoscontablesForm = this.fb.group({
      folio: new FormControl('', Validators.required),
      operacion: new FormControl('', Validators.required),
      fechaalta: new FormControl('', Validators.required),
      transaccionId: new FormControl('', Validators.required),
      transaccionItem: new FormControl(''),
      fechacontable: new FormControl('', Validators.required),
      cuenta: new FormControl('', Validators.required),
      sct: new FormControl('', Validators.required),
      ssct: new FormControl('', Validators.required),
      sssct: new FormControl('', Validators.required),
      ssssct: new FormControl('', Validators.required),
      descripcioncta: new FormControl('', Validators.required),
      moneda: new FormControl('', Validators.required),
      aux1: new FormControl('', Validators.required),
      aux2: new FormControl('', Validators.required),
      aux3: new FormControl(''),
      cargoabono: new FormControl('', Validators.required),
      importe: new FormControl('', Validators.required),
      descripcion: new FormControl(''),
    });
  }

  ngOnInit() {
    this.recuperaAsientoscontables();

    this.cargaTransaccion();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaAsientoscontables() {
    this.asientoscontables = this.asientoscontablesService.getAsientoscontables();
    this.asientoscontablesForm.controls['folio'].setValue(this.asientoscontables.folio);
    this.asientoscontablesForm.controls['operacion'].setValue(this.asientoscontables.operacion);
    this.asientoscontablesForm.controls['fechaalta'].setValue(this.asientoscontables.fechaalta);
    this.asientoscontablesForm.controls['transaccionId'].setValue(this.asientoscontables.transaccionId);
    this.transaccionService.getRecuperaTransaccionPorId(this.asientoscontables.transaccionId).subscribe(res => {
      if (res) {
        this.transaccion = res.json();
        this.asientoscontablesForm.controls['transaccionItem'].setValue(this.transaccion.notransaccion);
      }
    });

    this.asientoscontablesForm.controls['fechacontable'].setValue(this.asientoscontables.fechacontable);
    this.asientoscontablesForm.controls['cuenta'].setValue(this.asientoscontables.cuenta);
    this.asientoscontablesForm.controls['sct'].setValue(this.asientoscontables.sct);
    this.asientoscontablesForm.controls['ssct'].setValue(this.asientoscontables.ssct);
    this.asientoscontablesForm.controls['sssct'].setValue(this.asientoscontables.sssct);
    this.asientoscontablesForm.controls['ssssct'].setValue(this.asientoscontables.ssssct);
    this.asientoscontablesForm.controls['descripcioncta'].setValue(this.asientoscontables.descripcioncta);
    this.asientoscontablesForm.controls['moneda'].setValue(this.asientoscontables.moneda);
    this.asientoscontablesForm.controls['aux1'].setValue(this.asientoscontables.aux1);
    this.asientoscontablesForm.controls['aux2'].setValue(this.asientoscontables.aux2);
    this.asientoscontablesForm.controls['aux3'].setValue(this.asientoscontables.aux3);
    this.asientoscontablesForm.controls['cargoabono'].setValue(this.asientoscontables.cargoabono);
    this.asientoscontablesForm.controls['importe'].setValue(this.asientoscontables.importe);
    this.asientoscontablesForm.controls['descripcion'].setValue(this.asientoscontables.descripcion);
  }

  editaAsientoscontables() {
    this.submitted = true;

    if (this.asientoscontablesForm.invalid) {
      swal('Error...', 'Asientos contables has fields to fill.', 'error');
    } else {
      this.route.params.subscribe(params => {
        this.idAsientoscontables = params['id'];
      });

      this.asientoscontablesSend.folio = this.asientoscontablesForm.controls['folio'].value;
      this.asientoscontablesSend.operacion = this.asientoscontablesForm.controls['operacion'].value;
      this.asientoscontablesSend.fechaalta = this.asientoscontablesForm.controls['fechaalta'].value;
      this.asientoscontablesSend.transaccionId = this.asientoscontablesForm.controls['transaccionId'].value;
      this.asientoscontablesSend.fechacontable = this.asientoscontablesForm.controls['fechacontable'].value;
      this.asientoscontablesSend.cuenta = this.asientoscontablesForm.controls['cuenta'].value;
      this.asientoscontablesSend.sct = this.asientoscontablesForm.controls['sct'].value;
      this.asientoscontablesSend.ssct = this.asientoscontablesForm.controls['ssct'].value;
      this.asientoscontablesSend.sssct = this.asientoscontablesForm.controls['sssct'].value;
      this.asientoscontablesSend.ssssct = this.asientoscontablesForm.controls['ssssct'].value;
      this.asientoscontablesSend.descripcioncta = this.asientoscontablesForm.controls['descripcioncta'].value;
      this.asientoscontablesSend.moneda = this.asientoscontablesForm.controls['moneda'].value;
      this.asientoscontablesSend.aux1 = this.asientoscontablesForm.controls['aux1'].value;
      this.asientoscontablesSend.aux2 = this.asientoscontablesForm.controls['aux2'].value;
      this.asientoscontablesSend.aux3 = this.asientoscontablesForm.controls['aux3'].value;
      this.asientoscontablesSend.cargoabono = this.asientoscontablesForm.controls['cargoabono'].value;
      this.asientoscontablesSend.importe = this.asientoscontablesForm.controls['importe'].value;
      this.asientoscontablesSend.descripcion = this.asientoscontablesForm.controls['descripcion'].value;

      this.asientoscontablesService
        .updateEditaAsientoscontables(this.asientoscontablesSend, this.idAsientoscontables)
        .subscribe(res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Asientos contables save successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Asientos contables has fields to fill.', 'error');
            }
          } else {
            swal('Error...', 'Asientos contables save unsuccessfully.', 'error');
          }
        });
    }
  }

  cargaTransaccion() {
    this.transaccionService.getRecuperaTransaccion().subscribe(
      res => {
        if (res) {
          this.transaccionArray = res.json();

          this.transaccionArray.forEach(element => {
            if (element.modulo == 'MOD1') {
              element.moduloItem = 'OPERACIÓN FIDUCIARIA';
            }
            if (element.modulo == 'MOD2') {
              element.moduloItem = 'HONORARIOS';
            }
            if (element.modulo == 'MOD3') {
              element.moduloItem = 'INVERSIONES';
            }
            if (element.modulo == 'MOD4') {
              element.moduloItem = 'ADMINISTRACIÓN';
            }
            if (element.modulo == 'MOD5') {
              element.moduloItem = 'INMUEBLES';
            }
            if (element.estatustrans == 'ACTIVO') {
              element.estatustransItem = 'ACTIVO';
            }
            if (element.estatustrans == 'CANCELADO') {
              element.estatustransItem = 'CANCELADO';
            }
            if (element.estatustrans == 'SUSPENDIDO') {
              element.estatustransItem = 'SUSPENDIDO';
            }
            if (element.estatustrans == 'BAJA') {
              element.estatustransItem = 'BAJA';
            }
            if (element.moneda == 'DLS') {
              element.monedaItem = 'DLS. U.S.A.';
            }
            if (element.moneda == 'EURO') {
              element.monedaItem = 'EUROS';
            }
            if (element.moneda == 'NACIONAL') {
              element.monedaItem = 'MONEDA NACIONAL';
            }
            if (element.columedocuenta == 'ABONO') {
              element.columedocuentaItem = 'ABONO';
            }
            if (element.columedocuenta == 'CARGO') {
              element.columedocuentaItem = 'CARGO';
            }
            if (element.columedocuenta == 'COMPRA') {
              element.columedocuentaItem = 'COMPRA';
            }
            if (element.columedocuenta == 'VENTA') {
              element.columedocuentaItem = 'VENTA';
            }
            if (element.columedocuenta == 'CONTABILIZA') {
              element.columedocuentaItem = 'CONTABILIZA';
            }
            if (element.columedocuenta == 'POLIZA') {
              element.columedocuentaItem = 'PÓLIZA';
            }
            if (element.columedocuenta == 'CORRECCION') {
              element.columedocuentaItem = 'CORRECCIÓN';
            }
          });
        }
      },
      error => {
        //swal('Error...', 'An error occurred while calling Catálogo de transacciones.', 'error');
      }
    );
  }

  setClickedRowTransaccion(index, transaccion) {
    transaccion.checked = !transaccion.checked;
    if (transaccion.checked) {
      this.transaccionService.setTransaccion(transaccion);

      this.asientoscontablesForm.controls['transaccionId'].setValue(transaccion.id);
      this.asientoscontablesForm.controls['transaccionItem'].setValue(transaccion.notransaccion);
    } else {
      this.transaccionService.clear();
      this.asientoscontablesForm.controls['transaccionId'].setValue(null);
      this.asientoscontablesForm.controls['transaccionItem'].setValue('');
    }
  }

  regresaAsientoscontables() {
    this.location.back();
  }
}
