import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../../../_validation/validation.service';
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
  afiliados1Array: Afiliado[];

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
      fechanacimiento: new FormControl('', Validators.required),
      afiliado1Id: new FormControl(''),
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
      this.beneficiario.fechanacimiento = this.beneficiarioForm.controls['fechanacimiento'].value;
      this.beneficiario.afiliado1Id = this.beneficiarioForm.controls['afiliado1Id'].value;
      this.beneficiario.afiliado1Item = this.beneficiarioForm.controls['afiliado1Item'].value;

      this.beneficiarioService.postGuardaBeneficiario(this.beneficiario).subscribe(res => {
        if (res) {
          swal('Success...', 'Etiquetaasignada save successfully.', 'success');
          this.router.navigate(['../administrar'], { relativeTo: this.route });
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
          this.afiliados1Array = res;
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

  setClickedRowAfiliado1(index, afiliado1) {
    afiliado1.checked = !afiliado1.checked;
    if (afiliado1.checked) {
      this.afiliadoService.setAfiliado(afiliado1);
      // this.beneficiario.afiliado1Id = afiliado1.afiliado1Id;
      // this.beneficiario.afiliado1Item = afiliado1.nss;
      this.beneficiarioForm.controls['afiliado1Id'].setValue(afiliado1.afiliado1Id);
      this.beneficiarioForm.controls['afiliado1Item'].setValue(afiliado1.nss);
    } else {
      this.afiliadoService.clear();
      // this.beneficiario.afiliado1Id = null;
      // this.beneficiario.afiliado1Item = '';
      this.beneficiarioForm.controls['afiliado1Id'].setValue(null);
      this.beneficiarioForm.controls['afiliado1Item'].setValue('');
    }
  }
}
