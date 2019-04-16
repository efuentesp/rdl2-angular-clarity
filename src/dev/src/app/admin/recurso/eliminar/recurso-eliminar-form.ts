import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../../_validation/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { Recurso } from '../recurso.psg.model';
import { RecursoService } from '../recurso.psg.service';

@Component({
  selector: 'clr-recurso-angular',
  styleUrls: ['../recurso.psg.scss'],
  templateUrl: './recurso-eliminar.psg.html',
})
export class RecursoEliminarFormDemo {
  recursoForm: FormGroup;
  submitted = false;
  public recurso: Recurso = new Recurso();
  public idRecurso: string;
  public datePipe = new DatePipe('en-US');

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute,
    private recursoService: RecursoService
  ) {
    this.recursoForm = this.fb.group({
      relacionaId: new FormControl({ value: '', disabled: true }),
      relacionaItem: new FormControl({ value: '', disabled: true }),
      descripcionrecurso: new FormControl({ value: '', disabled: true }),
      ruta: new FormControl({ value: '', disabled: true }),
      tiporecurso: new FormControl({ value: '', disabled: true }),
      tiporecursoItem: new FormControl({ value: '', disabled: true }),
      tamano: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    this.recuperaRecurso();
  }

  recuperaRecurso() {
    this.recurso = this.recursoService.getRecurso();
    this.recursoForm.controls['relacionaId'].setValue(this.recurso.relacionaId);
    this.recursoForm.controls['descripcionrecurso'].setValue(this.recurso.descripcionrecurso);
    this.recursoForm.controls['ruta'].setValue(this.recurso.ruta);
    this.recursoForm.controls['tiporecurso'].setValue(this.recurso.tiporecurso);
    this.recursoForm.controls['tamano'].setValue(this.recurso.tamano);
  }

  eliminaRecurso() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idRecurso = params['id'];
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
        this.recursoService.deleteRecurso(this.idRecurso).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Recurso item has been deleted successfully.', 'success');
              this.router.navigate(['../../administrar'], { relativeTo: this.route });
            } else {
              swal('Error...', 'Recurso save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Recurso no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Ordensimplificada deleted unsuccessfully", "error");
      }
    });
  }

  regresaRecurso() {
    this.router.navigate(['../../administrar'], { relativeTo: this.route });
  }
}
