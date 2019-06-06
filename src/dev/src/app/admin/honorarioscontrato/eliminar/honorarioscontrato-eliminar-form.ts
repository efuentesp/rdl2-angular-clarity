/* PSG  Honorarioscontrato Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Honorarioscontrato } from '../honorarioscontrato.psg.model';
import { HonorarioscontratoService } from '../honorarioscontrato.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-honorarioscontrato-eliminar',
  styleUrls: ['../honorarioscontrato.psg.scss'],
  templateUrl: './honorarioscontrato-eliminar.psg.html',
})
export class HonorarioscontratoEliminarForm {
  honorarioscontratoForm: FormGroup;
  submitted = false;
  loading = false;
  public honorarioscontrato: Honorarioscontrato = new Honorarioscontrato();
  public idHonorarioscontrato: string;
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
    private honorarioscontratoService: HonorarioscontratoService
  ) {
    this.honorarioscontratoForm = this.fb.group({
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      subfisoId: new FormControl({ value: '', disabled: true }),
      subfisoItem: new FormControl({ value: '', disabled: true }),
      nombre: new FormControl({ value: '', disabled: true }),
      persona: new FormControl({ value: '', disabled: true }),
      comisiones: new FormControl({ value: '', disabled: true }),
      iva: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Honorarioscontrato eliminar()');

    this.recuperaHonorarioscontrato();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaHonorarioscontrato() {
    this.honorarioscontrato = this.honorarioscontratoService.getHonorarioscontrato();
    this.honorarioscontratoForm.controls['fideicomisoId'].setValue(this.honorarioscontrato.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.honorarioscontrato.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.honorarioscontratoForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.honorarioscontratoForm.controls['subfisoId'].setValue(this.honorarioscontrato.subfisoId);
    this.subfisoService.getRecuperaSubfisoPorId(this.honorarioscontrato.subfisoId).subscribe(res => {
      if (res) {
        this.subfiso = res.json();
        this.honorarioscontratoForm.controls['subfisoItem'].setValue(this.subfiso.numero);
      }
    });
    this.honorarioscontratoForm.controls['nombre'].setValue(this.honorarioscontrato.nombre);
    this.honorarioscontratoForm.controls['persona'].setValue(this.honorarioscontrato.persona);
    this.honorarioscontratoForm.controls['comisiones'].setValue(this.honorarioscontrato.comisiones);
    this.honorarioscontratoForm.controls['iva'].setValue(this.honorarioscontrato.iva);
  }

  eliminaHonorarioscontrato() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idHonorarioscontrato = params['id'];
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
        this.honorarioscontratoService.deleteHonorarioscontrato(this.idHonorarioscontrato).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Honorarioscontrato item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Cartera honorarios por contrato save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Cartera honorarios por contrato no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Cartera honorarios por contrato deleted unsuccessfully", "error");
      }
    });
  }

  regresaHonorarioscontrato() {
    this.location.back();
  }
}
