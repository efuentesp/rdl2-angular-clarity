import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Tipopension } from '../tipopension.demo.model';
import { ValidationService } from '../../../_validation/validation.service';
import { TipopensionService } from '../tipopension.demo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../tipopension.demo.scss'],
  templateUrl: './tipopension-eliminar.demo.html',
})
export class TipopensionEliminarFormDemo {
  tipopensionForm: FormGroup;
  submitted = false;
  public tipopension: Tipopension = new Tipopension();

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private tipopensionService: TipopensionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.tipopensionForm = this.fb.group({
      clave: new FormControl(''),
      nombre: new FormControl(''),
    });
  }

  ngOnInit() {
    this.recuperaTipopension();
  }

  recuperaTipopension() {
    this.tipopension = this.tipopensionService.getTipopension();
    this.tipopensionForm.controls['clave'].setValue(this.tipopension.clave);
    this.tipopensionForm.controls['nombre'].setValue(this.tipopension.nombre);
  }

  eliminaTipopension() {
    this.submitted = true;

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
        this.tipopensionService.deleteTipopension(this.tipopension).subscribe(
          res => {
            if (res.status == 201 || res.status == 200) {
              swal('Success...', 'Tipopension item has been deleted successfully.', 'success');
              this.router.navigate(['../../administrar'], { relativeTo: this.route });
            } else {
              swal('Error...', 'Tipopension save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Tipopension no se puede eliminar debido a que esta asociado con otra entidad.',
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
}
