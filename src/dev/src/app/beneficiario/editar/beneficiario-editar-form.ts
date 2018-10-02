import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../_validation/validation.service';
import { BeneficiarioService } from '../beneficiario.demo.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Beneficiario } from '../beneficiario.demo.model';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { AfiliadoService } from '../../afiliado/afiliado.demo.service';
import { Afiliado } from '../../afiliado/afiliado.demo.model';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../beneficiario.demo.scss'],
  templateUrl: './beneficiario-editar.demo.html',
})
export class BeneficiarioEditarFormDemo implements OnInit {
  beneficiarioForm: FormGroup;
  submitted = false;
  public beneficiario: Beneficiario = new Beneficiario();
  afiliados1Array: Afiliado[];

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
    this.recuperaBeneficiario();
  }

  recuperaBeneficiario() {
    this.beneficiario = this.beneficiarioService.getBeneficiario();

    this.beneficiarioForm.controls['curp'].setValue(this.beneficiario.curp);
    this.beneficiarioForm.controls['apellidomaterno'].setValue(this.beneficiario.apellidomaterno);
    this.beneficiarioForm.controls['apellidopaterno'].setValue(this.beneficiario.apellidopaterno);
    this.beneficiarioForm.controls['nombre'].setValue(this.beneficiario.nombre);
    this.beneficiarioForm.controls['fechanacimiento'].setValue(this.beneficiario.fechanacimiento);
    this.beneficiarioForm.controls['afiliado1Id'].setValue(this.beneficiario.afiliado1Id);
    this.beneficiarioForm.controls['afiliado1Item'].setValue(this.beneficiario.afiliado1Item);
  }

  editaBeneficiario() {
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
      this.beneficiarioForm.controls['afiliado1Id'].setValue(afiliado1.afiliado1Id);
      this.beneficiarioForm.controls['afiliado1Item'].setValue(afiliado1.nss);
    } else {
      this.afiliadoService.clear();
      this.beneficiarioForm.controls['afiliado1Id'].setValue(null);
      this.beneficiarioForm.controls['afiliado1Item'].setValue('');
    }
  }
}
