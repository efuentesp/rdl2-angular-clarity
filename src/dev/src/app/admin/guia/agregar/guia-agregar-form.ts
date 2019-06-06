/* PSG  Guia Agregar Ts */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import swal from 'sweetalert2';

import { Guia } from '../guia.psg.model';
import { GuiaSend } from '../guia.psg.model-send';
import { GuiaService } from '../guia.psg.service';

import { TransaccionService } from '../../transaccion/transaccion.psg.service';
import { Transaccion } from '../../transaccion/transaccion.psg.model';

@Component({
  selector: 'clr-guia-agregar',
  styleUrls: ['../guia.psg.scss'],
  templateUrl: './guia-agregar.psg.html',
})
export class GuiaAgregarForm implements OnInit {
  guiaForm: FormGroup;
  submitted = false;
  loading = false;
  public guia: Guia = new Guia();
  public guiaSend: GuiaSend = new GuiaSend();
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
    private guiaService: GuiaService
  ) {
    this.guiaForm = this.fb.group({
      transaccionId: new FormControl('', Validators.required),
      transaccionItem: new FormControl(''),
      sec: new FormControl('', Validators.required),
      nombrecuenta: new FormControl('', Validators.required),
      ctamayor: new FormControl('', Validators.required),
      scta: new FormControl('', Validators.required),
      sscta: new FormControl('', Validators.required),
      sssctacopia: new FormControl('', Validators.required),
      sssscta: new FormControl('', Validators.required),
      auxiliar1: new FormControl('', Validators.required),
      auxiliar2: new FormControl('', Validators.required),
      auxiliar3: new FormControl('', Validators.required),
      aplicadato: new FormControl('', Validators.required),
      ca: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      estatus: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    console.log('Guia agregar()');

    this.cargaTransaccion();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (this.id !== undefined) {
      this.getRecuperaTransaccionPorId(this.id);
    }
  }

  guardaGuia() {
    this.submitted = true;

    if (this.guiaForm.invalid) {
      swal('Error...', 'Catálogo de guías has fields to fill.', 'error');
    } else {
      this.guiaSend.transaccionId = this.guiaForm.controls['transaccionId'].value;
      this.guiaSend.sec = this.guiaForm.controls['sec'].value;
      this.guiaSend.nombrecuenta = this.guiaForm.controls['nombrecuenta'].value;
      this.guiaSend.ctamayor = this.guiaForm.controls['ctamayor'].value;
      this.guiaSend.scta = this.guiaForm.controls['scta'].value;
      this.guiaSend.sscta = this.guiaForm.controls['sscta'].value;
      this.guiaSend.sssctacopia = this.guiaForm.controls['sssctacopia'].value;
      this.guiaSend.sssscta = this.guiaForm.controls['sssscta'].value;
      this.guiaSend.auxiliar1 = this.guiaForm.controls['auxiliar1'].value;
      this.guiaSend.auxiliar2 = this.guiaForm.controls['auxiliar2'].value;
      this.guiaSend.auxiliar3 = this.guiaForm.controls['auxiliar3'].value;
      this.guiaSend.aplicadato = this.guiaForm.controls['aplicadato'].value;
      this.guiaSend.ca = this.guiaForm.controls['ca'].value;
      this.guiaSend.descripcion = this.guiaForm.controls['descripcion'].value;
      this.guiaSend.estatus = this.guiaForm.controls['estatus'].value;

      this.guiaService.postGuardaGuia(this.guiaSend).subscribe(
        res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Catálogo de guías save successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Catálogo de guías has fields to fill.', 'error');
            }
          }
        },
        error => {
          swal('Error...', 'Catálogo de guías save unsuccessfully.', 'error');
        }
      );
    }
  }

  cargaTransaccion() {
    this.transaccionService.getRecuperaTransaccion().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.transaccionArray = res.json();

            this.transaccionArray.forEach(element => {
              this.llenaCamposTransaccion(this.transaccionArray);
            });
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Catálogo de transacciones.', 'error');
      }
    );
  }

  getRecuperaTransaccionPorId(id) {
    this.transaccionService.getRecuperaTransaccionPorId(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.transaccion = res.json();
            this.transaccionArray = [];
            this.transaccionArray.push(this.transaccion);
            this.llenaCamposTransaccion(this.transaccionArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Catálogo de transacciones', 'error');
      }
    );
  }

  llenaCamposTransaccion(array) {
    array.forEach(element => {
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

  setClickedRowTransaccion(index, transaccion) {
    transaccion.checked = !transaccion.checked;
    if (transaccion.checked) {
      this.transaccionService.setTransaccion(transaccion);

      this.guiaForm.controls['transaccionId'].setValue(transaccion.id);
      this.guiaForm.controls['transaccionItem'].setValue(transaccion.notransaccion);
    } else {
      this.transaccionService.clear();
      this.guiaForm.controls['transaccionId'].setValue(null);
      this.guiaForm.controls['transaccionItem'].setValue('');
    }
  }

  regresaGuia() {
    this.location.back();
  }
}
