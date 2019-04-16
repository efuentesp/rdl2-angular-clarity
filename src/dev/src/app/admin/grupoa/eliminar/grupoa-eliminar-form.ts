import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../../_validation/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { Grupoa } from '../grupoa.psg.model';
import { GrupoaService } from '../grupoa.psg.service';

@Component({
  selector: 'clr-grupoa-angular',
  styleUrls: ['../grupoa.psg.scss'],
  templateUrl: './grupoa-eliminar.psg.html',
})
export class GrupoaEliminarFormDemo {
  grupoaForm: FormGroup;
  submitted = false;
  public grupoa: Grupoa = new Grupoa();
  public idGrupoa: string;
  public datePipe = new DatePipe('en-US');

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute,
    private grupoaService: GrupoaService
  ) {
    this.grupoaForm = this.fb.group({
      nombregrupo: new FormControl({ value: '', disabled: true }),
      descripciongrupo: new FormControl({ value: '', disabled: true }),
      tipoestatus: new FormControl({ value: '', disabled: true }),
      tipoestatusItem: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    this.recuperaGrupoa();
  }

  recuperaGrupoa() {
    this.grupoa = this.grupoaService.getGrupoa();
    this.grupoaForm.controls['nombregrupo'].setValue(this.grupoa.nombregrupo);
    this.grupoaForm.controls['descripciongrupo'].setValue(this.grupoa.descripciongrupo);
    this.grupoaForm.controls['tipoestatus'].setValue(this.grupoa.tipoestatus);
  }

  eliminaGrupoa() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idGrupoa = params['id'];
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
        this.grupoaService.deleteGrupoa(this.idGrupoa).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Grupoa item has been deleted successfully.', 'success');
              this.router.navigate(['../../administrar'], { relativeTo: this.route });
            } else {
              swal('Error...', 'Grupoa save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal('Warning...', 'Grupoa no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
            }
          }
        );
      } else {
        //swal("Cancelled", "Ordensimplificada deleted unsuccessfully", "error");
      }
    });
  }

  regresaGrupoa() {
    this.router.navigate(['../../administrar'], { relativeTo: this.route });
  }
}
