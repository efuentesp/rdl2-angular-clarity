import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Afiliado } from '../afiliado.demo.model';
import { ValidationService } from '../../../_validation/validation.service';
import { AfiliadoService } from '../afiliado.demo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

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
    this.recuperaAfiliado();
  }

  recuperaAfiliado() {
    this.afiliado = this.afiliadoService.getAfiliado();
    this.afiliadoForm.controls['nss'].setValue(this.afiliado.nss);
    this.afiliadoForm.controls['apellidomaterno'].setValue(this.afiliado.apellidomaterno);
    this.afiliadoForm.controls['apellidopaterno'].setValue(this.afiliado.apellidopaterno);
    this.afiliadoForm.controls['nombre'].setValue(this.afiliado.nombre);
    this.afiliadoForm.controls['numero'].setValue(this.afiliado.numero);
    this.afiliadoForm.controls['observaciones'].setValue(this.afiliado.observaciones);
    this.afiliadoForm.controls['fechaafiliacion'].setValue(this.afiliado.fechaafiliacion);
    // this.afiliadoForm.controls['foto'].setValue(this.afiliado.foto);
    // this.afiliadoForm.controls['actanacimiento'].setValue(this.afiliado.actanacimiento);
    this.afiliadoForm.controls['correo'].setValue(this.afiliado.correo);
    this.afiliadoForm.controls['semanascotizadas'].setValue(this.afiliado.semanascotizadas);
  }

  eliminaAfiliado() {
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
        this.afiliadoService.deleteAfiliado(this.afiliado).subscribe(
          res => {
            if (res.status == 201 || res.status == 200) {
              swal('Success...', 'Afiliado item has been deleted successfully.', 'success');
              this.router.navigate(['../../administrar'], { relativeTo: this.route });
            } else {
              swal('Error...', 'Afiliado save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Afiliado no se puede eliminar debido a que esta asociado con otra entidad.',
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
