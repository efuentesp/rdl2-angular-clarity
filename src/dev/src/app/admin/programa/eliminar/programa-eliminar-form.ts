import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../../_validation/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { Programa } from '../programa.psg.model';
import { ProgramaService } from '../programa.psg.service';

@Component({
  selector: 'clr-programa-angular',
  styleUrls: ['../programa.psg.scss'],
  templateUrl: './programa-eliminar.psg.html',
})
export class ProgramaEliminarFormDemo {
  programaForm: FormGroup;
  submitted = false;
  public programa: Programa = new Programa();
  public idPrograma: string;
  public datePipe = new DatePipe('en-US');

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute,
    private programaService: ProgramaService
  ) {
    this.programaForm = this.fb.group({
      clave: new FormControl({ value: '', disabled: true }),
      nombreprograma: new FormControl({ value: '', disabled: true }),
      tipoestatus: new FormControl({ value: '', disabled: true }),
      tipoestatusItem: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    this.recuperaPrograma();
  }

  recuperaPrograma() {
    this.programa = this.programaService.getPrograma();
    this.programaForm.controls['clave'].setValue(this.programa.clave);
    this.programaForm.controls['nombreprograma'].setValue(this.programa.nombreprograma);
    this.programaForm.controls['tipoestatus'].setValue(this.programa.tipoestatus);
  }

  eliminaPrograma() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idPrograma = params['id'];
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
        this.programaService.deletePrograma(this.idPrograma).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Programa item has been deleted successfully.', 'success');
              this.router.navigate(['../../administrar'], { relativeTo: this.route });
            } else {
              swal('Error...', 'Programa save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Programa no se puede eliminar debido a que esta asociado con otra entidad.',
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

  regresaPrograma() {
    this.router.navigate(['../../administrar'], { relativeTo: this.route });
  }
}
