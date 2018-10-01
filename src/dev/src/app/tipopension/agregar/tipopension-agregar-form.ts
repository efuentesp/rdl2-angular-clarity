import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../../_validation/validation.service';
import { TipopensionService } from '../tipopension.demo.service';
import { Tipopension } from '../tipopension.demo.model';
import { User } from '../inventory/user';
import swal from 'sweetalert2';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../tipopension.demo.scss'],
  templateUrl: './tipopension-agregar.demo.html',
})
export class TipopensionAgregarFormDemo implements OnInit {
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
      clave: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  guardaTipopension() {
    this.submitted = true;

    if (this.tipopensionForm.invalid) {
      return;
    } else {
      this.tipopension.clave = this.tipopensionForm.controls['clave'].value;
      this.tipopension.nombre = this.tipopensionForm.controls['nombre'].value;

      this.tipopensionService.postGuardaTipopension(this.tipopension).subscribe(res => {
        if (res.status == 201 || res.status == 200) {
          swal('Success...', 'Etiquetaasignada save successfully.', 'success');
          this.router.navigate(['../../administrar'], { relativeTo: this.route });
        } else {
          swal('Error...', 'Etiquetaasignada save unsuccessfully.', 'error');
        }
      });
    }
  }
}
