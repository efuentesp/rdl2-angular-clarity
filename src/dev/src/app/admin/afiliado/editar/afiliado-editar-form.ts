import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../_validation/validation.service';
import { AfiliadoService } from '../afiliado.demo.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ValidatorFn } from '@angular/forms';
import { Afiliado } from '../afiliado.demo.model';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../afiliado.demo.scss'],
  templateUrl: './afiliado-editar.demo.html',
})
export class AfiliadoEditarFormDemo implements OnInit {
  afiliadoForm: FormGroup;
  submitted = false;
  public afiliado: Afiliado = new Afiliado();

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private afiliadoService: AfiliadoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.afiliadoForm = this.fb.group({
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

  ngOnInit() {
    this.recuperaAfiliado();
  }

  recuperaAfiliado() {
    this.afiliado = this.afiliadoService.getAfiliado();

    this.afiliadoForm.controls['nss'].setValue(this.afiliado.nss);
    this.afiliadoForm.controls['apellidomaterno'].setValue(this.afiliado.apellidomaterno);
    this.afiliadoForm.controls['apellidopaterno'].setValue(this.afiliado.apellidopaterno);
    this.afiliadoForm.controls['nombre'].setValue(this.afiliado.nombre);
    this.afiliadoForm.controls['numero'].setValue(this.afiliado.numero);
    this.afiliadoForm.controls['observaciones'].setValue(this.afiliado.observaciones);
    this.afiliadoForm.controls['genero1Id'].setValue(this.afiliado.genero1Id);
    this.afiliadoForm.controls['fechaafiliacion'].setValue(this.afiliado.fechaafiliacion);
    // this.afiliadoForm.controls['foto'].setValue(this.afiliado.foto);
    // this.afiliadoForm.controls['actanacimiento'].setValue(this.afiliado.actanacimiento);
    this.afiliadoForm.controls['correo'].setValue(this.afiliado.correo);
    this.afiliadoForm.controls['semanascotizadas'].setValue(this.afiliado.semanascotizadas);
  }

  editaAfiliado() {
    this.submitted = true;

    if (this.afiliadoForm.invalid) {
      return;
    } else {
      this.afiliado.nss = this.afiliadoForm.controls['nss'].value;
      this.afiliado.nombre = this.afiliadoForm.controls['nombre'].value;
      this.afiliado.apellidopaterno = this.afiliadoForm.controls['apellidopaterno'].value;
      this.afiliado.apellidomaterno = this.afiliadoForm.controls['apellidomaterno'].value;
      this.afiliado.observaciones = this.afiliadoForm.controls['observaciones'].value;
      this.afiliado.fechaafiliacion = this.afiliadoForm.controls['fechaafiliacion'].value;
      this.afiliado.correo = this.afiliadoForm.controls['correo'].value;
      this.afiliado.semanascotizadas = this.afiliadoForm.controls['semanascotizadas'].value;
      this.afiliado.numero = this.afiliadoForm.controls['numero'].value;
      this.afiliado.genero1Id = this.afiliadoForm.controls['genero1Id'].value;
      this.afiliado.actanacimiento = this.afiliadoForm.controls['actanacimiento'].value;
      this.afiliado.foto = this.afiliadoForm.controls['foto'].value;

      console.log('Afiliado:', this.afiliado);
      this.afiliadoService.updateEditaAfiliado(this.afiliado).subscribe(res => {
        if (res.status == 201 || res.status == 200) {
          swal('Success...', 'Afiliado save successfully.', 'success');
          this.router.navigate(['../../administrar'], { relativeTo: this.route });
        } else {
          swal('Error...', 'Afiliado save unsuccessfully.', 'error');
        }
      });
    }
  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => (next ? prev + next : prev), 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }
}
