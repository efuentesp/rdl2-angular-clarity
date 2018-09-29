import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../_validation/validation.service';
import { BeneficiarioService } from '../beneficiario.demo.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Beneficiario } from '../beneficiario.demo.model';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../beneficiario.demo.scss'],
  templateUrl: './beneficiario-editar.demo.html',
})
export class BeneficiarioEditarFormDemo implements OnInit {
  beneficiarioForm: FormGroup;
  submitted = false;
  public beneficiario: Beneficiario = new Beneficiario();

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private beneficiarioService: BeneficiarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.beneficiarioForm = this.fb.group({
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
    this.recuperaBeneficiario();
  }

  recuperaBeneficiario() {
    this.beneficiario = this.beneficiarioService.getBeneficiario();

    this.beneficiarioForm.controls['nss'].setValue(this.beneficiario.nss);
    this.beneficiarioForm.controls['apellidomaterno'].setValue(this.beneficiario.apellidomaterno);
    this.beneficiarioForm.controls['apellidopaterno'].setValue(this.beneficiario.apellidopaterno);
    this.beneficiarioForm.controls['nombre'].setValue(this.beneficiario.nombre);
    this.beneficiarioForm.controls['numero'].setValue(this.beneficiario.numero);
    this.beneficiarioForm.controls['observaciones'].setValue(this.beneficiario.observaciones);
    this.beneficiarioForm.controls['genero1Id'].setValue(this.beneficiario.genero1Id);
    // this.beneficiarioForm.controls['genero1Item'].setValue(this.beneficiario.genero1Item);
    this.beneficiarioForm.controls['fechaafiliacion'].setValue(this.beneficiario.fechaafiliacion);
    // this.beneficiarioForm.controls['foto'].setValue(this.beneficiario.foto);
    // this.beneficiarioForm.controls['actanacimiento'].setValue(this.beneficiario.actanacimiento);
    this.beneficiarioForm.controls['correo'].setValue(this.beneficiario.correo);
    this.beneficiarioForm.controls['semanascotizadas'].setValue(this.beneficiario.semanascotizadas);
  }

  editaBeneficiario() {
    this.submitted = true;

    if (this.beneficiarioForm.invalid) {
      return;
    } else {
      this.beneficiario.nss = this.beneficiarioForm.controls['nss'].value;
      this.beneficiario.nombre = this.beneficiarioForm.controls['nombre'].value;
      this.beneficiario.apellidopaterno = this.beneficiarioForm.controls['apellidopaterno'].value;
      this.beneficiario.apellidomaterno = this.beneficiarioForm.controls['apellidomaterno'].value;
      this.beneficiario.observaciones = this.beneficiarioForm.controls['observaciones'].value;
      this.beneficiario.fechaafiliacion = this.beneficiarioForm.controls['fechaafiliacion'].value;
      this.beneficiario.correo = this.beneficiarioForm.controls['correo'].value;
      this.beneficiario.semanascotizadas = this.beneficiarioForm.controls['semanascotizadas'].value;
      this.beneficiario.numero = this.beneficiarioForm.controls['numero'].value;
      this.beneficiario.genero1Id = this.beneficiarioForm.controls['genero1Id'].value;
      this.beneficiario.actanacimiento = this.beneficiarioForm.controls['actanacimiento'].value;
      this.beneficiario.foto = this.beneficiarioForm.controls['foto'].value;

      console.log('Beneficiario:', this.beneficiario);
      this.beneficiarioService.updateEditaBeneficiario(this.beneficiario).subscribe(res => {
        if (res.status == 201 || res.status == 200) {
          swal('Success...', 'Beneficiario save successfully.', 'success');
          this.router.navigate(['../../administrar'], { relativeTo: this.route });
        } else {
          swal('Error...', 'Beneficiario save unsuccessfully.', 'error');
        }
      });
    }
  }
}
