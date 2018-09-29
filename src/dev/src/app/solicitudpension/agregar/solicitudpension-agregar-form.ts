import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../../_validation/validation.service';
import { SolicitudpensionService } from '../solicitudpension.demo.service';
import { Solicitudpension } from '../solicitudpension.demo.model';
import { User } from '../inventory/user';
import swal from 'sweetalert2';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../solicitudpension.demo.scss'],
  templateUrl: './solicitudpension-agregar.demo.html',
})
export class SolicitudpensionAgregarFormDemo implements OnInit {
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
      nss: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellidopaterno: new FormControl('', Validators.required),
      apellidomaterno: new FormControl('', Validators.required),
      observaciones: new FormControl('', Validators.required),
      fechaafiliacion: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      semanascotizadas: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      genero1Id: new FormControl('', Validators.required),
      actanacimiento: new FormControl('', Validators.required),
      foto: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  guardaSolicitudpension() {
    this.submitted = true;

    if (this.solicitudpensionForm.invalid) {
      return;
    } else {
      this.solicitudpension.nss = this.solicitudpensionForm.controls['nss'].value;
      this.solicitudpension.nombre = this.solicitudpensionForm.controls['nombre'].value;
      this.solicitudpension.apellidopaterno = this.solicitudpensionForm.controls['apellidopaterno'].value;
      this.solicitudpension.apellidomaterno = this.solicitudpensionForm.controls['apellidomaterno'].value;
      this.solicitudpension.observaciones = this.solicitudpensionForm.controls['observaciones'].value;
      this.solicitudpension.fechaafiliacion = this.solicitudpensionForm.controls['fechaafiliacion'].value;
      this.solicitudpension.correo = this.solicitudpensionForm.controls['correo'].value;
      this.solicitudpension.semanascotizadas = this.solicitudpensionForm.controls['semanascotizadas'].value;
      this.solicitudpension.numero = this.solicitudpensionForm.controls['numero'].value;
      this.solicitudpension.genero1Id = this.solicitudpensionForm.controls['genero1Id'].value;
      this.solicitudpension.actanacimiento = this.solicitudpensionForm.controls['actanacimiento'].value;
      this.solicitudpension.foto = this.solicitudpensionForm.controls['foto'].value;

      this.solicitudpensionService.postGuardaSolicitudpension(this.solicitudpension).subscribe(res => {
        if (res.status == 201 || res.status == 200) {
          swal('Success...', 'Etiquetaasignada save successfully.', 'success');
          this.router.navigate(['../../administrar'], { relativeTo: this.route });
        } else {
          swal('Error...', 'Etiquetaasignada save unsuccessfully.', 'error');
        }
      });
    }
  }
}
