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
      nss: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellidopaterno: new FormControl('', Validators.required),
      apellidomaterno: new FormControl('', Validators.required),
      observaciones: new FormControl('', Validators.required),
      fechaafiliacion: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      semanascotizadas: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      genero1Id: new FormControl('', Validators.required),
      actanacimiento: new FormControl('', Validators.required),
      foto: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  guardaTipopension() {
    this.submitted = true;

    if (this.tipopensionForm.invalid) {
      return;
    } else {
      this.tipopension.nss = this.tipopensionForm.controls['nss'].value;
      this.tipopension.nombre = this.tipopensionForm.controls['nombre'].value;
      this.tipopension.apellidopaterno = this.tipopensionForm.controls['apellidopaterno'].value;
      this.tipopension.apellidomaterno = this.tipopensionForm.controls['apellidomaterno'].value;
      this.tipopension.observaciones = this.tipopensionForm.controls['observaciones'].value;
      this.tipopension.fechaafiliacion = this.tipopensionForm.controls['fechaafiliacion'].value;
      this.tipopension.correo = this.tipopensionForm.controls['correo'].value;
      this.tipopension.semanascotizadas = this.tipopensionForm.controls['semanascotizadas'].value;
      this.tipopension.numero = this.tipopensionForm.controls['numero'].value;
      this.tipopension.genero1Id = this.tipopensionForm.controls['genero1Id'].value;
      this.tipopension.actanacimiento = this.tipopensionForm.controls['actanacimiento'].value;
      this.tipopension.foto = this.tipopensionForm.controls['foto'].value;

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
