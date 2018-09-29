import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../../_validation/validation.service';
import { BeneficiarioService } from '../beneficiario.demo.service';
import { Beneficiario } from '../beneficiario.demo.model';
import { User } from '../inventory/user';
import swal from 'sweetalert2';
import { AfiliadoService } from '../../afiliado/afiliado.demo.service';
import { Afiliado } from '../../afiliado/afiliado.demo.model';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../beneficiario.demo.scss'],
  templateUrl: './beneficiario-agregar.demo.html',
})
export class BeneficiarioAgregarFormDemo implements OnInit {
  beneficiarioForm: FormGroup;
  submitted = false;
  afiliadosArray: Afiliado[];

  public beneficiario: Beneficiario = new Beneficiario();

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private beneficiarioService: BeneficiarioService,
    private router: Router,
    private route: ActivatedRoute,
    private afiliadoService: AfiliadoService
  ) {
    this.beneficiarioForm = this.fb.group({
      curp: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellidopaterno: new FormControl('', Validators.required),
      apellidomaterno: new FormControl('', Validators.required),
      observaciones: new FormControl('', Validators.required),
      fechanacimiento: new FormControl('', Validators.required),
      afiliado1Id: new FormControl('', Validators.required),
      afiliado1Item: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.cargaAfiliados();
  }

  guardaBeneficiario() {
    this.submitted = true;

    if (this.beneficiarioForm.invalid) {
      return;
    } else {
      this.beneficiario.curp = this.beneficiarioForm.controls['curp'].value;
      this.beneficiario.nombre = this.beneficiarioForm.controls['nombre'].value;
      this.beneficiario.apellidopaterno = this.beneficiarioForm.controls['apellidopaterno'].value;
      this.beneficiario.apellidomaterno = this.beneficiarioForm.controls['apellidomaterno'].value;

      this.beneficiarioService.postGuardaBeneficiario(this.beneficiario).subscribe(res => {
        if (res.status == 201 || res.status == 200) {
          swal('Success...', 'Etiquetaasignada save successfully.', 'success');
          this.router.navigate(['../../administrar'], { relativeTo: this.route });
        } else {
          swal('Error...', 'Etiquetaasignada save unsuccessfully.', 'error');
        }
      });
    }
  }

  cargaAfiliados() {
    this.afiliadoService.getRecuperaAfiliados().subscribe(
      res => {
        if (res) {
          console.log('Afiliados: OK ', res);
          this.afiliadosArray = res;
        }
      },
      error => {
        // swal({
        //   title: 'Error...',
        //   text: 'An error occurred while calling the afiliados.',
        //   type: 'error',
        //   confirmButtonText: 'OK',
        // });

        swal('Error...', 'An error occurred while calling the afiliados.', 'error');
      }
    );
  }
}
