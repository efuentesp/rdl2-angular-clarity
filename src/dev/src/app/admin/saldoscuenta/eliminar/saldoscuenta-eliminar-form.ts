/* PSG  Saldoscuenta Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Saldoscuenta } from '../saldoscuenta.psg.model';
import { SaldoscuentaService } from '../saldoscuenta.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-saldoscuenta-eliminar',
  styleUrls: ['../saldoscuenta.psg.scss'],
  templateUrl: './saldoscuenta-eliminar.psg.html',
})
export class SaldoscuentaEliminarForm {
  saldoscuentaForm: FormGroup;
  submitted = false;
  loading = false;
  public saldoscuenta: Saldoscuenta = new Saldoscuenta();
  public idSaldoscuenta: string;
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
    private saldoscuentaService: SaldoscuentaService
  ) {
    this.saldoscuentaForm = this.fb.group({
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      subfisoId: new FormControl({ value: '', disabled: true }),
      subfisoItem: new FormControl({ value: '', disabled: true }),
      cuenta: new FormControl({ value: '', disabled: true }),
      sct: new FormControl({ value: '', disabled: true }),
      ssct: new FormControl({ value: '', disabled: true }),
      sssct: new FormControl({ value: '', disabled: true }),
      ssssct: new FormControl({ value: '', disabled: true }),
      moneda: new FormControl({ value: '', disabled: true }),
      monedaItem: new FormControl({ value: '', disabled: true }),
      auxiliar1: new FormControl({ value: '', disabled: true }),
      auxiliar2: new FormControl({ value: '', disabled: true }),
      auxiliar3: new FormControl({ value: '', disabled: true }),
      saldoinicial: new FormControl({ value: '', disabled: true }),
      cargos: new FormControl({ value: '', disabled: true }),
      abonos: new FormControl({ value: '', disabled: true }),
      saldoactual: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Saldoscuenta eliminar()');

    this.recuperaSaldoscuenta();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaSaldoscuenta() {
    this.saldoscuenta = this.saldoscuentaService.getSaldoscuenta();
    this.saldoscuentaForm.controls['fideicomisoId'].setValue(this.saldoscuenta.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.saldoscuenta.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.saldoscuentaForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.saldoscuentaForm.controls['subfisoId'].setValue(this.saldoscuenta.subfisoId);
    this.subfisoService.getRecuperaSubfisoPorId(this.saldoscuenta.subfisoId).subscribe(res => {
      if (res) {
        this.subfiso = res.json();
        this.saldoscuentaForm.controls['subfisoItem'].setValue(this.subfiso.numero);
      }
    });
    this.saldoscuentaForm.controls['cuenta'].setValue(this.saldoscuenta.cuenta);
    this.saldoscuentaForm.controls['sct'].setValue(this.saldoscuenta.sct);
    this.saldoscuentaForm.controls['ssct'].setValue(this.saldoscuenta.ssct);
    this.saldoscuentaForm.controls['sssct'].setValue(this.saldoscuenta.sssct);
    this.saldoscuentaForm.controls['ssssct'].setValue(this.saldoscuenta.ssssct);
    this.saldoscuentaForm.controls['moneda'].setValue(this.saldoscuenta.moneda);
    this.saldoscuentaForm.controls['auxiliar1'].setValue(this.saldoscuenta.auxiliar1);
    this.saldoscuentaForm.controls['auxiliar2'].setValue(this.saldoscuenta.auxiliar2);
    this.saldoscuentaForm.controls['auxiliar3'].setValue(this.saldoscuenta.auxiliar3);
    this.saldoscuentaForm.controls['saldoinicial'].setValue(this.saldoscuenta.saldoinicial);
    this.saldoscuentaForm.controls['cargos'].setValue(this.saldoscuenta.cargos);
    this.saldoscuentaForm.controls['abonos'].setValue(this.saldoscuenta.abonos);
    this.saldoscuentaForm.controls['saldoactual'].setValue(this.saldoscuenta.saldoactual);
  }

  eliminaSaldoscuenta() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idSaldoscuenta = params['id'];
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
        this.saldoscuentaService.deleteSaldoscuenta(this.idSaldoscuenta).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Saldoscuenta item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Saldos por cuenta save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Saldos por cuenta no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Saldos por cuenta deleted unsuccessfully", "error");
      }
    });
  }

  regresaSaldoscuenta() {
    this.location.back();
  }
}
