import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../../_validation/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { Estudiante } from '../estudiante.psg.model';
import { EstudianteService } from '../estudiante.psg.service';

@Component({
  selector: 'clr-estudiante-angular',
  styleUrls: ['../estudiante.psg.scss'],
  templateUrl: './estudiante-eliminar.psg.html',
})
export class EstudianteEliminarFormDemo {
  estudianteForm: FormGroup;
  submitted = false;
  public estudiante: Estudiante = new Estudiante();
  public idEstudiante: string;
  public datePipe = new DatePipe('en-US');

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute,
    private estudianteService: EstudianteService
  ) {
    this.estudianteForm = this.fb.group({
      concierneporId: new FormControl({ value: '', disabled: true }),
      concierneporItem: new FormControl({ value: '', disabled: true }),
      matricula: new FormControl({ value: '', disabled: true }),
      nombreestudiante: new FormControl({ value: '', disabled: true }),
      apellidopaterno: new FormControl({ value: '', disabled: true }),
      fechanacimientoAux: new FormControl({ value: '', disabled: true }),
      genero: new FormControl({ value: '', disabled: true }),
      generoItem: new FormControl({ value: '', disabled: true }),
      tiponivel: new FormControl({ value: '', disabled: true }),
      tiponivelItem: new FormControl({ value: '', disabled: true }),
      tipoarea: new FormControl({ value: '', disabled: true }),
      tipoareaItem: new FormControl({ value: '', disabled: true }),
      correoest: new FormControl({ value: '', disabled: true }),
      telefono: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    this.recuperaEstudiante();
  }

  recuperaEstudiante() {
    this.estudiante = this.estudianteService.getEstudiante();
    this.estudianteForm.controls['concierneporId'].setValue(this.estudiante.concierneporId);
    this.estudianteForm.controls['matricula'].setValue(this.estudiante.matricula);
    this.estudianteForm.controls['nombreestudiante'].setValue(this.estudiante.nombreestudiante);
    this.estudianteForm.controls['apellidopaterno'].setValue(this.estudiante.apellidopaterno);
    this.estudianteForm.controls['fechanacimientoAux'].setValue(
      this.datePipe.transform(this.estudiante.fechanacimiento, 'dd/MM/yyyy')
    );
    this.estudianteForm.controls['genero'].setValue(this.estudiante.genero);
    this.estudianteForm.controls['tiponivel'].setValue(this.estudiante.tiponivel);
    this.estudianteForm.controls['tipoarea'].setValue(this.estudiante.tipoarea);
    this.estudianteForm.controls['correoest'].setValue(this.estudiante.correoest);
    this.estudianteForm.controls['telefono'].setValue(this.estudiante.telefono);
  }

  eliminaEstudiante() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idEstudiante = params['id'];
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
        this.estudianteService.deleteEstudiante(this.idEstudiante).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Estudiante item has been deleted successfully.', 'success');
              this.router.navigate(['../../administrar'], { relativeTo: this.route });
            } else {
              swal('Error...', 'Estudiante save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Estudiante no se puede eliminar debido a que esta asociado con otra entidad.',
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

  regresaEstudiante() {
    this.router.navigate(['../../administrar'], { relativeTo: this.route });
  }
}
