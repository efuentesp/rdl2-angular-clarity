import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../../_validation/validation.service';
import { AfiliadoService } from '../afiliado.demo.service';
import { Afiliado } from '../afiliado.demo.model';
import { User } from '../inventory/user';

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
      correo: new FormControl('', Validators.required),
      semanascotizadas: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
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
      this.afiliado.numero = this.afiliadoForm.controls['numero'].value;
      this.afiliado.observaciones = this.afiliadoForm.controls['observaciones'].value;
      this.afiliado.semanascotizadas = this.afiliadoForm.controls['semanascotizadas'].value;
      this.afiliado.apellidomaterno = this.afiliadoForm.controls['apellidomaterno'].value;
      this.afiliado.apellidopaterno = this.afiliadoForm.controls['apellidopaterno'].value;
      this.afiliado.correo = this.afiliadoForm.controls['correo'].value;
      this.afiliado.fechaafiliacion = this.afiliadoForm.controls['fechaafiliacion'].value;

      this.afiliadoService.postGuardaAfiliado(this.afiliado).subscribe(res => {
        this.router.navigate(['../../administrar'], { relativeTo: this.route });
      });
    }
  }
}
