import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../../_validation/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { Opcion } from '../opcion.psg.model';
import { OpcionService } from '../opcion.psg.service';

@Component({
  selector: 'clr-opcion-angular',
  styleUrls: ['../opcion.psg.scss'],
  templateUrl: './opcion-eliminar.psg.html',
})
export class OpcionEliminarFormDemo {
  opcionForm: FormGroup;
  submitted = false;
  public opcion: Opcion = new Opcion();
  public idOpcion: string;
  public datePipe = new DatePipe('en-US');

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute,
    private opcionService: OpcionService
  ) {
    this.opcionForm = this.fb.group({
      paraId: new FormControl({ value: '', disabled: true }),
      paraItem: new FormControl({ value: '', disabled: true }),
      descipcionopcion: new FormControl({ value: '', disabled: true }),
      puntos: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    this.recuperaOpcion();
  }

  recuperaOpcion() {
    this.opcion = this.opcionService.getOpcion();
    this.opcionForm.controls['paraId'].setValue(this.opcion.paraId);
    this.opcionForm.controls['descipcionopcion'].setValue(this.opcion.descipcionopcion);
    this.opcionForm.controls['puntos'].setValue(this.opcion.puntos);
  }

  eliminaOpcion() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idOpcion = params['id'];
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
        this.opcionService.deleteOpcion(this.idOpcion).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Opcion item has been deleted successfully.', 'success');
              this.router.navigate(['../../administrar'], { relativeTo: this.route });
            } else {
              swal('Error...', 'Opcion save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal('Warning...', 'Opcion no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
            }
          }
        );
      } else {
        //swal("Cancelled", "Ordensimplificada deleted unsuccessfully", "error");
      }
    });
  }

  regresaOpcion() {
    this.router.navigate(['../../administrar'], { relativeTo: this.route });
  }
}
