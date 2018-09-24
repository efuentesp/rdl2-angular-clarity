import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../_validation/validation.service';
import { AfiliadoService } from '../afiliado.demo.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Afiliado } from '../afiliado.demo.model';

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
    private afiliadoService: AfiliadoService
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

  editaAfiliado() {
    this.submitted = true;

    if (this.afiliadoForm.invalid) {
      console.log('Es invalido');
      return;
    } else {
      console.log('Valido: ', this.afiliadoForm);
      this.afiliadoService.updateEditaAfiliado(this.afiliado).subscribe(res => {
        console.log('Valido');
      });
    }
  }
}
