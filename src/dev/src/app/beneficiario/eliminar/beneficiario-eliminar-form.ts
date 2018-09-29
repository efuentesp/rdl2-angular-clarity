import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Beneficiario } from '../beneficiario.demo.model';
import { ValidationService } from '../../_validation/validation.service';
import { BeneficiarioService } from '../beneficiario.demo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../beneficiario.demo.scss'],
  templateUrl: './beneficiario-eliminar.demo.html',
})
export class BeneficiarioEliminarFormDemo {
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
      nss: new FormControl(''),
      nombre: new FormControl(''),
      apellidopaterno: new FormControl(''),
      apellidomaterno: new FormControl(''),
      observaciones: new FormControl(''),
      fechaafiliacion: new FormControl(''),
      correo: new FormControl(''),
      semanascotizadas: new FormControl(''),
      numero: new FormControl(''),
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
    this.beneficiarioForm.controls['fechaafiliacion'].setValue(this.beneficiario.fechaafiliacion);
    // this.beneficiarioForm.controls['foto'].setValue(this.beneficiario.foto);
    // this.beneficiarioForm.controls['actanacimiento'].setValue(this.beneficiario.actanacimiento);
    this.beneficiarioForm.controls['correo'].setValue(this.beneficiario.correo);
    this.beneficiarioForm.controls['semanascotizadas'].setValue(this.beneficiario.semanascotizadas);
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
}
