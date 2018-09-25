import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../../_validation/validation.service';
import { AfiliadoService } from '../afiliado.demo.service';
import { Afiliado } from '../afiliado.demo.model';
import { User } from '../inventory/user';
import swal from 'sweetalert2';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../afiliado.demo.scss'],
  templateUrl: './afiliado-agregar.demo.html',
})
export class AfiliadoAgregarFormDemo implements OnInit {
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

  ngOnInit() {}

  guardaAfiliado() {
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

      this.afiliadoService.postGuardaAfiliado(this.afiliado).subscribe(res => {
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
