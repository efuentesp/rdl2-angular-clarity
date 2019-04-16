import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../../_validation/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { Institucion } from '../institucion.psg.model';
import { InstitucionService } from '../institucion.psg.service';

@Component({
  selector: 'clr-institucion-angular',
  styleUrls: ['../institucion.psg.scss'],
  templateUrl: './institucion-eliminar.psg.html',
})
export class InstitucionEliminarFormDemo {
  institucionForm: FormGroup;
  submitted = false;
  public institucion: Institucion = new Institucion();
  public idInstitucion: string;
  public datePipe = new DatePipe('en-US');

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute,
    private institucionService: InstitucionService
  ) {
    this.institucionForm = this.fb.group({
      claveinstitucion: new FormControl({ value: '', disabled: true }),
      nombreinstitucion: new FormControl({ value: '', disabled: true }),
      representante: new FormControl({ value: '', disabled: true }),
      paginaweb: new FormControl({ value: '', disabled: true }),
      telefono: new FormControl({ value: '', disabled: true }),
      tipoestatus: new FormControl({ value: '', disabled: true }),
      tipoestatusItem: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    this.recuperaInstitucion();
  }

  recuperaInstitucion() {
    this.institucion = this.institucionService.getInstitucion();
    this.institucionForm.controls['claveinstitucion'].setValue(this.institucion.claveinstitucion);
    this.institucionForm.controls['nombreinstitucion'].setValue(this.institucion.nombreinstitucion);
    this.institucionForm.controls['representante'].setValue(this.institucion.representante);
    this.institucionForm.controls['paginaweb'].setValue(this.institucion.paginaweb);
    this.institucionForm.controls['telefono'].setValue(this.institucion.telefono);
    this.institucionForm.controls['tipoestatus'].setValue(this.institucion.tipoestatus);
  }

  eliminaInstitucion() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idInstitucion = params['id'];
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
        this.institucionService.deleteInstitucion(this.idInstitucion).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Institucion item has been deleted successfully.', 'success');
              this.router.navigate(['../../administrar'], { relativeTo: this.route });
            } else {
              swal('Error...', 'Institucion save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Institucion no se puede eliminar debido a que esta asociado con otra entidad.',
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

  regresaInstitucion() {
    this.router.navigate(['../../administrar'], { relativeTo: this.route });
  }
}
