import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../../_validation/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { Profesor } from '../profesor.psg.model';
import { ProfesorService } from '../profesor.psg.service';

@Component({
  selector: 'clr-profesor-angular',
  styleUrls: ['../profesor.psg.scss'],
  templateUrl: './profesor-eliminar.psg.html',
})
export class ProfesorEliminarFormDemo {
  profesorForm: FormGroup;
  submitted = false;
  public profesor: Profesor = new Profesor();
  public idProfesor: string;
  public datePipe = new DatePipe('en-US');

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute,
    private profesorService: ProfesorService
  ) {
    this.profesorForm = this.fb.group({
      noempleado: new FormControl({ value: '', disabled: true }),
      nombreprofesor: new FormControl({ value: '', disabled: true }),
      apellidopaterno: new FormControl({ value: '', disabled: true }),
      rfc: new FormControl({ value: '', disabled: true }),
      correopro: new FormControl({ value: '', disabled: true }),
      telefono: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    this.recuperaProfesor();
  }

  recuperaProfesor() {
    this.profesor = this.profesorService.getProfesor();
    this.profesorForm.controls['noempleado'].setValue(this.profesor.noempleado);
    this.profesorForm.controls['nombreprofesor'].setValue(this.profesor.nombreprofesor);
    this.profesorForm.controls['apellidopaterno'].setValue(this.profesor.apellidopaterno);
    this.profesorForm.controls['rfc'].setValue(this.profesor.rfc);
    this.profesorForm.controls['correopro'].setValue(this.profesor.correopro);
    this.profesorForm.controls['telefono'].setValue(this.profesor.telefono);
  }

  eliminaProfesor() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idProfesor = params['id'];
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
        this.profesorService.deleteProfesor(this.idProfesor).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Profesor item has been deleted successfully.', 'success');
              this.router.navigate(['../../administrar'], { relativeTo: this.route });
            } else {
              swal('Error...', 'Profesor save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Profesor no se puede eliminar debido a que esta asociado con otra entidad.',
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

  regresaProfesor() {
    this.router.navigate(['../../administrar'], { relativeTo: this.route });
  }
}
