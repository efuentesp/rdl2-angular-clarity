import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../../_validation/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { Examen } from '../examen.psg.model';
import { ExamenService } from '../examen.psg.service';

@Component({
  selector: 'clr-examen-angular',
  styleUrls: ['../examen.psg.scss'],
  templateUrl: './examen-eliminar.psg.html',
})
export class ExamenEliminarFormDemo {
  examenForm: FormGroup;
  submitted = false;
  public examen: Examen = new Examen();
  public idExamen: string;
  public datePipe = new DatePipe('en-US');

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute,
    private examenService: ExamenService
  ) {
    this.examenForm = this.fb.group({
      correspondeId: new FormControl({ value: '', disabled: true }),
      correspondeItem: new FormControl({ value: '', disabled: true }),
      nombreexamen: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    this.recuperaExamen();
  }

  recuperaExamen() {
    this.examen = this.examenService.getExamen();
    this.examenForm.controls['correspondeId'].setValue(this.examen.correspondeId);
    this.examenForm.controls['nombreexamen'].setValue(this.examen.nombreexamen);
  }

  eliminaExamen() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idExamen = params['id'];
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
        this.examenService.deleteExamen(this.idExamen).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Examen item has been deleted successfully.', 'success');
              this.router.navigate(['../../administrar'], { relativeTo: this.route });
            } else {
              swal('Error...', 'Examen save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal('Warning...', 'Examen no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
            }
          }
        );
      } else {
        //swal("Cancelled", "Ordensimplificada deleted unsuccessfully", "error");
      }
    });
  }

  regresaExamen() {
    this.router.navigate(['../../administrar'], { relativeTo: this.route });
  }
}
