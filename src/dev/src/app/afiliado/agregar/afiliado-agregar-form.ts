import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../../_validation/validation.service';
import { AfiliadoService } from '../afiliado.demo.service';
import { Afiliado } from '../afiliado.demo.model';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../afiliado.demo.scss'],
  templateUrl: './afiliado-agregar.demo.html',
})
export class AfiliadoAgregarFormDemo {

    afiliadoForm: FormGroup;
    submitted = false;
    public afiliado: Afiliado = new Afiliado();
 
    constructor(private fb: FormBuilder, private validationService: ValidationService, private afiliadoService: AfiliadoService) { 

      let nss = new FormControl('', [Validators.required]);
      let nombre = new FormControl('', [Validators.required]);
      let apellidopaterno = new FormControl('', [Validators.required]);
      let apellidomaterno = new FormControl('', [Validators.required]);
      let observaciones = new FormControl('');
      let fechaafiliacion= new FormControl('', [Validators.required]);
      let foto = new FormControl('', [Validators.required]);
      let actanacimiento= new FormControl('', [Validators.required]);
      let correo = new FormControl('', [Validators.required]);
      let semanascotizadas = new FormControl('', [Validators.required]);
      let numero = new FormControl('', [Validators.required]);
  
      this.afiliadoForm = this.fb.group({  
        nss: nss,
        nombre:nombre,
        apellidopaterno:apellidopaterno,
        apellidomaterno:apellidomaterno,
        observaciones: observaciones,
        fechaafiliacion: fechaafiliacion,
        foto:foto,
        actanacimiento: actanacimiento,
        correo: correo,
        semanascotizadas: semanascotizadas,
        numero: numero
      });

    }
    
    ngOnInit() {
 
    }
 
    onSubmit() {

        this.submitted = true;
 
        //if (this.afiliadoForm.invalid) {
        //    return;
        //}else{

            this.afiliado.actanacimiento = this.afiliadoForm.controls.actanacimiento.value;
            this.afiliado.apellidomaterno = this.afiliadoForm.controls.apellidomaterno.value;
            this.afiliado.apellidopaterno = this.afiliadoForm.controls.apellidopaterno.value;
            this.afiliado.correo = this.afiliadoForm.controls.correo.value;
            this.afiliado.fechaafiliacion = this.afiliadoForm.controls.fechaafiliacion.value;
            this.afiliado.foto = this.afiliadoForm.controls.foto.value;
            this.afiliado.nombre = this.afiliadoForm.controls.nombre.value;
            this.afiliado.nss = this.afiliadoForm.controls.nss.value;
            this.afiliado.numero = this.afiliadoForm.controls.numero.value;
            this.afiliado.observaciones = this.afiliadoForm.controls.observaciones.value;
            this.afiliado.semanascotizadas = this.afiliadoForm.controls.semanascotizadas.value;

            this.afiliadoService.postGuardarAfiliado(this.afiliado).subscribe(res => {

                console.log("El resultado es: ", res);

            });
     
    }

}
