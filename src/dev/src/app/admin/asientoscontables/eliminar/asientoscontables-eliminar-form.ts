/* PSG  Asientoscontables Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Asientoscontables } from '../asientoscontables.psg.model';
import { AsientoscontablesService } from '../asientoscontables.psg.service';

import { TransaccionService } from '../../transaccion/transaccion.psg.service';
import { Transaccion } from '../../transaccion/transaccion.psg.model';

@Component({
  selector: 'clr-asientoscontables-eliminar',
  styleUrls: ['../asientoscontables.psg.scss'],
  templateUrl: './asientoscontables-eliminar.psg.html',
})
export class AsientoscontablesEliminarForm {
  asientoscontablesForm: FormGroup;
  submitted = false;
  loading = false;
  public asientoscontables: Asientoscontables = new Asientoscontables();
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
      folio: new FormControl({ value: '', disabled: true }),
      operacion: new FormControl({ value: '', disabled: true }),
      fechaalta: new FormControl({ value: '', disabled: true }),
      transaccionId: new FormControl({ value: '', disabled: true }),
      transaccionItem: new FormControl({ value: '', disabled: true }),
      fechacontable: new FormControl({ value: '', disabled: true }),
      cuenta: new FormControl({ value: '', disabled: true }),
      sct: new FormControl({ value: '', disabled: true }),
      ssct: new FormControl({ value: '', disabled: true }),
      sssct: new FormControl({ value: '', disabled: true }),
      ssssct: new FormControl({ value: '', disabled: true }),
      descripcioncta: new FormControl({ value: '', disabled: true }),
      moneda: new FormControl({ value: '', disabled: true }),
      monedaItem: new FormControl({ value: '', disabled: true }),
      aux1: new FormControl({ value: '', disabled: true }),
      aux2: new FormControl({ value: '', disabled: true }),
      aux3: new FormControl({ value: '', disabled: true }),
      cargoabono: new FormControl({ value: '', disabled: true }),
      cargoabonoItem: new FormControl({ value: '', disabled: true }),
      importe: new FormControl({ value: '', disabled: true }),
      descripcion: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Asientoscontables eliminar()');

    this.recuperaAsientoscontables();

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

  eliminaAsientoscontables() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idAsientoscontables = params['id'];
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
        this.asientoscontablesService.deleteAsientoscontables(this.idAsientoscontables).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Asientoscontables item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Asientos contables save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Asientos contables no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Asientos contables deleted unsuccessfully", "error");
      }
    });
  }

  regresaAsientoscontables() {
    this.location.back();
  }
}
