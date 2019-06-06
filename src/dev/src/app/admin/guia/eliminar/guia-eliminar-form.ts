/* PSG  Guia Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Guia } from '../guia.psg.model';
import { GuiaService } from '../guia.psg.service';

import { TransaccionService } from '../../transaccion/transaccion.psg.service';
import { Transaccion } from '../../transaccion/transaccion.psg.model';

@Component({
  selector: 'clr-guia-eliminar',
  styleUrls: ['../guia.psg.scss'],
  templateUrl: './guia-eliminar.psg.html',
})
export class GuiaEliminarForm {
  guiaForm: FormGroup;
  submitted = false;
  loading = false;
  public guia: Guia = new Guia();
  public idGuia: string;
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
    private guiaService: GuiaService
  ) {
    this.guiaForm = this.fb.group({
      transaccionId: new FormControl({ value: '', disabled: true }),
      transaccionItem: new FormControl({ value: '', disabled: true }),
      sec: new FormControl({ value: '', disabled: true }),
      nombrecuenta: new FormControl({ value: '', disabled: true }),
      ctamayor: new FormControl({ value: '', disabled: true }),
      scta: new FormControl({ value: '', disabled: true }),
      sscta: new FormControl({ value: '', disabled: true }),
      sssctacopia: new FormControl({ value: '', disabled: true }),
      sssscta: new FormControl({ value: '', disabled: true }),
      auxiliar1: new FormControl({ value: '', disabled: true }),
      auxiliar2: new FormControl({ value: '', disabled: true }),
      auxiliar3: new FormControl({ value: '', disabled: true }),
      aplicadato: new FormControl({ value: '', disabled: true }),
      aplicadatoItem: new FormControl({ value: '', disabled: true }),
      ca: new FormControl({ value: '', disabled: true }),
      caItem: new FormControl({ value: '', disabled: true }),
      descripcion: new FormControl({ value: '', disabled: true }),
      estatus: new FormControl({ value: '', disabled: true }),
      estatusItem: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Guia eliminar()');

    this.recuperaGuia();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaGuia() {
    this.guia = this.guiaService.getGuia();
    this.guiaForm.controls['transaccionId'].setValue(this.guia.transaccionId);
    this.transaccionService.getRecuperaTransaccionPorId(this.guia.transaccionId).subscribe(res => {
      if (res) {
        this.transaccion = res.json();
        this.guiaForm.controls['transaccionItem'].setValue(this.transaccion.notransaccion);
      }
    });
    this.guiaForm.controls['sec'].setValue(this.guia.sec);
    this.guiaForm.controls['nombrecuenta'].setValue(this.guia.nombrecuenta);
    this.guiaForm.controls['ctamayor'].setValue(this.guia.ctamayor);
    this.guiaForm.controls['scta'].setValue(this.guia.scta);
    this.guiaForm.controls['sscta'].setValue(this.guia.sscta);
    this.guiaForm.controls['sssctacopia'].setValue(this.guia.sssctacopia);
    this.guiaForm.controls['sssscta'].setValue(this.guia.sssscta);
    this.guiaForm.controls['auxiliar1'].setValue(this.guia.auxiliar1);
    this.guiaForm.controls['auxiliar2'].setValue(this.guia.auxiliar2);
    this.guiaForm.controls['auxiliar3'].setValue(this.guia.auxiliar3);
    this.guiaForm.controls['aplicadato'].setValue(this.guia.aplicadato);
    this.guiaForm.controls['ca'].setValue(this.guia.ca);
    this.guiaForm.controls['descripcion'].setValue(this.guia.descripcion);
    this.guiaForm.controls['estatus'].setValue(this.guia.estatus);
  }

  eliminaGuia() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idGuia = params['id'];
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
        this.guiaService.deleteGuia(this.idGuia).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Guia item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Catálogo de guías save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Catálogo de guías no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Catálogo de guías deleted unsuccessfully", "error");
      }
    });
  }

  regresaGuia() {
    this.location.back();
  }
}
