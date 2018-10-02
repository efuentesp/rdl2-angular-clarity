import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../_validation/validation.service';
import { TipopensionService } from '../tipopension.demo.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Tipopension } from '../tipopension.demo.model';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../tipopension.demo.scss'],
  templateUrl: './tipopension-editar.demo.html',
})
export class TipopensionEditarFormDemo implements OnInit {
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

  ngOnInit() {
    this.recuperaTipopension();
  }

  recuperaTipopension() {
    this.tipopension = this.tipopensionService.getTipopension();

    this.tipopensionForm.controls['clave'].setValue(this.tipopension.clave);
    this.tipopensionForm.controls['nombre'].setValue(this.tipopension.nombre);
  }

  editaTipopension() {
    this.submitted = true;

    if (this.tipopensionForm.invalid) {
      return;
    } else {
      this.tipopension.clave = this.tipopensionForm.controls['clave'].value;
      this.tipopension.nombre = this.tipopensionForm.controls['nombre'].value;

      console.log('Tipopension:', this.tipopension);
      this.tipopensionService.updateEditaTipopension(this.tipopension).subscribe(res => {
        if (res.status == 201 || res.status == 200) {
          swal('Success...', 'Tipopension save successfully.', 'success');
          this.router.navigate(['../../administrar'], { relativeTo: this.route });
        } else {
          swal('Error...', 'Tipopension save unsuccessfully.', 'error');
        }
      });
    }
  }
}
