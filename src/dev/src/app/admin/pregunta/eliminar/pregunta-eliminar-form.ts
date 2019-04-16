import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../../_validation/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { Pregunta } from '../pregunta.psg.model';
import { PreguntaService } from '../pregunta.psg.service';

@Component({
  selector: 'clr-pregunta-angular',
  styleUrls: ['../pregunta.psg.scss'],
  templateUrl: './pregunta-eliminar.psg.html',
})
export class PreguntaEliminarFormDemo {
  preguntaForm: FormGroup;
  submitted = false;
  public pregunta: Pregunta = new Pregunta();
  public idPregunta: string;
  public datePipe = new DatePipe('en-US');

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute,
    private preguntaService: PreguntaService
  ) {
    this.preguntaForm = this.fb.group({
      peterneceId: new FormControl({ value: '', disabled: true }),
      peterneceItem: new FormControl({ value: '', disabled: true }),
      descipcionpregunta: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    this.recuperaPregunta();
  }

  recuperaPregunta() {
    this.pregunta = this.preguntaService.getPregunta();
    this.preguntaForm.controls['peterneceId'].setValue(this.pregunta.peterneceId);
    this.preguntaForm.controls['descipcionpregunta'].setValue(this.pregunta.descipcionpregunta);
  }

  eliminaPregunta() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idPregunta = params['id'];
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
        this.preguntaService.deletePregunta(this.idPregunta).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Pregunta item has been deleted successfully.', 'success');
              this.router.navigate(['../../administrar'], { relativeTo: this.route });
            } else {
              swal('Error...', 'Pregunta save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Pregunta no se puede eliminar debido a que esta asociado con otra entidad.',
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

  regresaPregunta() {
    this.router.navigate(['../../administrar'], { relativeTo: this.route });
  }
}
