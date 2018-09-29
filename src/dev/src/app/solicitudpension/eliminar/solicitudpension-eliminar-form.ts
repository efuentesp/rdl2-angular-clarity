import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Solicitudpension } from '../solicitudpension.demo.model';
import { ValidationService } from '../../_validation/validation.service';
import { SolicitudpensionService } from '../solicitudpension.demo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../solicitudpension.demo.scss'],
  templateUrl: './solicitudpension-eliminar.demo.html',
})
export class SolicitudpensionEliminarFormDemo {
  solicitudpensionForm: FormGroup;
  submitted = false;
  public solicitudpension: Solicitudpension = new Solicitudpension();

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private solicitudpensionService: SolicitudpensionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.solicitudpensionForm = this.fb.group({
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
    this.recuperaSolicitudpension();
  }

  recuperaSolicitudpension() {
    this.solicitudpension = this.solicitudpensionService.getSolicitudpension();
    this.solicitudpensionForm.controls['nss'].setValue(this.solicitudpension.nss);
    this.solicitudpensionForm.controls['apellidomaterno'].setValue(this.solicitudpension.apellidomaterno);
    this.solicitudpensionForm.controls['apellidopaterno'].setValue(this.solicitudpension.apellidopaterno);
    this.solicitudpensionForm.controls['nombre'].setValue(this.solicitudpension.nombre);
    this.solicitudpensionForm.controls['numero'].setValue(this.solicitudpension.numero);
    this.solicitudpensionForm.controls['observaciones'].setValue(this.solicitudpension.observaciones);
    this.solicitudpensionForm.controls['fechaafiliacion'].setValue(this.solicitudpension.fechaafiliacion);
    // this.solicitudpensionForm.controls['foto'].setValue(this.solicitudpension.foto);
    // this.solicitudpensionForm.controls['actanacimiento'].setValue(this.solicitudpension.actanacimiento);
    this.solicitudpensionForm.controls['correo'].setValue(this.solicitudpension.correo);
    this.solicitudpensionForm.controls['semanascotizadas'].setValue(this.solicitudpension.semanascotizadas);
  }

  eliminaSolicitudpension() {
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
        this.solicitudpensionService.deleteSolicitudpension(this.solicitudpension).subscribe(
          res => {
            if (res.status == 201 || res.status == 200) {
              swal('Success...', 'Solicitudpension item has been deleted successfully.', 'success');
              this.router.navigate(['../../administrar'], { relativeTo: this.route });
            } else {
              swal('Error...', 'Solicitudpension save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Solicitudpension no se puede eliminar debido a que esta asociado con otra entidad.',
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
