import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../../_validation/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { Unidad } from '../unidad.psg.model';
import { UnidadService } from '../unidad.psg.service';

@Component({
  selector: 'clr-unidad-angular',
  styleUrls: ['../unidad.psg.scss'],
  templateUrl: './unidad-eliminar.psg.html',
})
export class UnidadEliminarFormDemo {
  unidadForm: FormGroup;
  submitted = false;
  public unidad: Unidad = new Unidad();
  public idUnidad: string;
  public datePipe = new DatePipe('en-US');

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute,
    private unidadService: UnidadService
  ) {
    this.unidadForm = this.fb.group({
      competeId: new FormControl({ value: '', disabled: true }),
      competeItem: new FormControl({ value: '', disabled: true }),
      nombreunidad: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    this.recuperaUnidad();
  }

  recuperaUnidad() {
    this.unidad = this.unidadService.getUnidad();
    this.unidadForm.controls['competeId'].setValue(this.unidad.competeId);
    this.unidadForm.controls['nombreunidad'].setValue(this.unidad.nombreunidad);
  }

  eliminaUnidad() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idUnidad = params['id'];
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
        this.unidadService.deleteUnidad(this.idUnidad).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Unidad item has been deleted successfully.', 'success');
              this.router.navigate(['../../administrar'], { relativeTo: this.route });
            } else {
              swal('Error...', 'Unidad save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal('Warning...', 'Unidad no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
            }
          }
        );
      } else {
        //swal("Cancelled", "Ordensimplificada deleted unsuccessfully", "error");
      }
    });
  }

  regresaUnidad() {
    this.router.navigate(['../../administrar'], { relativeTo: this.route });
  }
}
