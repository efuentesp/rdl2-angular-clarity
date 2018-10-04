import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Beneficiario } from '../beneficiario.demo.model';
import { ValidationService } from '../../../_validation/validation.service';
import { BeneficiarioService } from '../beneficiario.demo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { AfiliadoService } from '../../afiliado/afiliado.demo.service';
import { Afiliado } from '../../afiliado/afiliado.demo.model';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../beneficiario.demo.scss'],
  templateUrl: './beneficiario-eliminar.demo.html',
})
export class BeneficiarioEliminarFormDemo {
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

  eliminaBeneficiario() {
    this.submitted = true;

    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this ordensimplificada!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(isConfirm => {
      if (isConfirm.value) {
        this.beneficiarioService.deleteBeneficiario(this.beneficiario).subscribe(
          res => {
            if (res.status == 201 || res.status == 200) {
              swal('Success...', 'Beneficiario item has been deleted successfully.', 'success');
              this.router.navigate(['../../administrar'], { relativeTo: this.route });
            } else {
              swal('Error...', 'Beneficiario save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Beneficiario no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Ordensimplificada deleted unsuccessfully", "error");
      }
    });
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
