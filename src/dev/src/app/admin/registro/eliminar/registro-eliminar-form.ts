import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../../_validation/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { Registro } from '../registro.psg.model';
import { RegistroService } from '../registro.psg.service';

@Component({
  selector: 'clr-registro-angular',
  styleUrls: ['../registro.psg.scss'],
  templateUrl: './registro-eliminar.psg.html',
})
export class RegistroEliminarFormDemo {
  registroForm: FormGroup;
  submitted = false;
  public registro: Registro = new Registro();
  public idRegistro: string;
  public datePipe = new DatePipe('en-US');

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute,
    private registroService: RegistroService
  ) {
    this.registroForm = this.fb.group({
      confirmadoId: new FormControl({ value: '', disabled: true }),
      confirmadoItem: new FormControl({ value: '', disabled: true }),
      inscritoporId: new FormControl({ value: '', disabled: true }),
      inscritoporItem: new FormControl({ value: '', disabled: true }),
      numconfirmacion: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    this.recuperaRegistro();
  }

  recuperaRegistro() {
    this.registro = this.registroService.getRegistro();
    this.registroForm.controls['confirmadoId'].setValue(this.registro.confirmadoId);
    this.registroForm.controls['inscritoporId'].setValue(this.registro.inscritoporId);
    this.registroForm.controls['numconfirmacion'].setValue(this.registro.numconfirmacion);
  }

  eliminaRegistro() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idRegistro = params['id'];
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
        this.registroService.deleteRegistro(this.idRegistro).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Registro item has been deleted successfully.', 'success');
              this.router.navigate(['../../administrar'], { relativeTo: this.route });
            } else {
              swal('Error...', 'Registro save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Registro no se puede eliminar debido a que esta asociado con otra entidad.',
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

  regresaRegistro() {
    this.router.navigate(['../../administrar'], { relativeTo: this.route });
  }
}
