import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Afiliado } from '../afiliado.demo.model';
import { ValidationService } from '../../_validation/validation.service';
import { AfiliadoService } from '../afiliado.demo.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../afiliado.demo.scss'],
  templateUrl: './afiliado-eliminar.demo.html',
})
export class AfiliadoEliminarFormDemo {
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
  }

  eliminaAfiliado() {
    this.submitted = true;

    this.afiliado.nss = this.afiliadoForm.controls['nss'].value;
    this.afiliado.nombre = this.afiliadoForm.controls['nombre'].value;
    this.afiliado.numero = this.afiliadoForm.controls['numero'].value;
    this.afiliado.observaciones = this.afiliadoForm.controls['observaciones'].value;
    this.afiliado.semanascotizadas = this.afiliadoForm.controls['semanascotizadas'].value;
    this.afiliado.apellidomaterno = this.afiliadoForm.controls['apellidomaterno'].value;
    this.afiliado.apellidopaterno = this.afiliadoForm.controls['apellidopaterno'].value;
    this.afiliado.correo = this.afiliadoForm.controls['correo'].value;
    this.afiliado.fechaafiliacion = this.afiliadoForm.controls['fechaafiliacion'].value;

    this.afiliadoService.deleteAfiliado(this.afiliado).subscribe(res => {
      this.router.navigate(['../../administrar'], { relativeTo: this.route });
    });
  }
}
