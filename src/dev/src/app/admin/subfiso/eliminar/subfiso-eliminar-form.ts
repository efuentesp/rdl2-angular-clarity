/* PSG  Subfiso Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Subfiso } from '../subfiso.psg.model';
import { SubfisoService } from '../subfiso.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-subfiso-eliminar',
  styleUrls: ['../subfiso.psg.scss'],
  templateUrl: './subfiso-eliminar.psg.html',
})
export class SubfisoEliminarForm {
  subfisoForm: FormGroup;
  submitted = false;
  loading = false;
  public subfiso: Subfiso = new Subfiso();
  public idSubfiso: string;
  public datePipe = new DatePipe('en-US');
  public id: number;

  public fideicomisoArray: Fideicomiso[];
  public fideicomiso: Fideicomiso;

  // Modal
  modalfideicomiso: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private subfisoService: SubfisoService
  ) {
    this.subfisoForm = this.fb.group({
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      numero: new FormControl({ value: '', disabled: true }),
      nombre: new FormControl({ value: '', disabled: true }),
      estatus: new FormControl({ value: '', disabled: true }),
      estatusItem: new FormControl({ value: '', disabled: true }),
      fecharegistroAux: new FormControl({ value: '', disabled: true }),
      identificador: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Subfiso eliminar()');

    this.recuperaSubfiso();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaSubfiso() {
    this.subfiso = this.subfisoService.getSubfiso();
    this.subfisoForm.controls['fideicomisoId'].setValue(this.subfiso.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.subfiso.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.subfisoForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.subfisoForm.controls['numero'].setValue(this.subfiso.numero);
    this.subfisoForm.controls['nombre'].setValue(this.subfiso.nombre);
    this.subfisoForm.controls['estatus'].setValue(this.subfiso.estatus);
    this.subfisoForm.controls['fecharegistroAux'].setValue(
      this.datePipe.transform(this.subfiso.fecharegistro, 'dd/MM/yyyy')
    );
    this.subfisoForm.controls['identificador'].setValue(this.subfiso.identificador);
  }

  eliminaSubfiso() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idSubfiso = params['id'];
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
        this.subfisoService.deleteSubfiso(this.idSubfiso).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Subfiso item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Sub fiso save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Sub fiso no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Sub fiso deleted unsuccessfully", "error");
      }
    });
  }

  regresaSubfiso() {
    this.location.back();
  }
}
