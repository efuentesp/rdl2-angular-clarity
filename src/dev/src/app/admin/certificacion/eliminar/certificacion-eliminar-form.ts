import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../../_validation/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { Certificacion } from '../certificacion.psg.model';
import { CertificacionService } from '../certificacion.psg.service';

@Component({
  selector: 'clr-certificacion-angular',
  styleUrls: ['../certificacion.psg.scss'],
  templateUrl: './certificacion-eliminar.psg.html',
})
export class CertificacionEliminarFormDemo {
  certificacionForm: FormGroup;
  submitted = false;
  public certificacion: Certificacion = new Certificacion();
  public idCertificacion: string;
  public datePipe = new DatePipe('en-US');

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute,
    private certificacionService: CertificacionService
  ) {
    this.certificacionForm = this.fb.group({
      tieneId: new FormControl({ value: '', disabled: true }),
      tieneItem: new FormControl({ value: '', disabled: true }),
      sonId: new FormControl({ value: '', disabled: true }),
      sonItem: new FormControl({ value: '', disabled: true }),
      idcertificacion: new FormControl({ value: '', disabled: true }),
      fechacertificacionAux: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    this.recuperaCertificacion();
  }

  recuperaCertificacion() {
    this.certificacion = this.certificacionService.getCertificacion();
    this.certificacionForm.controls['tieneId'].setValue(this.certificacion.tieneId);
    this.certificacionForm.controls['sonId'].setValue(this.certificacion.sonId);
    this.certificacionForm.controls['idcertificacion'].setValue(this.certificacion.idcertificacion);
    this.certificacionForm.controls['fechacertificacionAux'].setValue(
      this.datePipe.transform(this.certificacion.fechacertificacion, 'dd/MM/yyyy')
    );
  }

  eliminaCertificacion() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idCertificacion = params['id'];
    });

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
        this.certificacionService.deleteCertificacion(this.idCertificacion).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Certificacion item has been deleted successfully.', 'success');
              this.router.navigate(['../../administrar'], { relativeTo: this.route });
            } else {
              swal('Error...', 'Certificacion save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Certificacion no se puede eliminar debido a que esta asociado con otra entidad.',
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

  regresaCertificacion() {
    this.router.navigate(['../../administrar'], { relativeTo: this.route });
  }
}
