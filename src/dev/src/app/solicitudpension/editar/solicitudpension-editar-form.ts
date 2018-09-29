import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../_validation/validation.service';
import { SolicitudpensionService } from '../solicitudpension.demo.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Solicitudpension } from '../solicitudpension.demo.model';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../solicitudpension.demo.scss'],
  templateUrl: './solicitudpension-editar.demo.html',
})
export class SolicitudpensionEditarFormDemo implements OnInit {
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
    this.solicitudpensionForm.controls['genero1Id'].setValue(this.solicitudpension.genero1Id);
    // this.solicitudpensionForm.controls['genero1Item'].setValue(this.solicitudpension.genero1Item);
    this.solicitudpensionForm.controls['fechaafiliacion'].setValue(this.solicitudpension.fechaafiliacion);
    // this.solicitudpensionForm.controls['foto'].setValue(this.solicitudpension.foto);
    // this.solicitudpensionForm.controls['actanacimiento'].setValue(this.solicitudpension.actanacimiento);
    this.solicitudpensionForm.controls['correo'].setValue(this.solicitudpension.correo);
    this.solicitudpensionForm.controls['semanascotizadas'].setValue(this.solicitudpension.semanascotizadas);
  }

  editaSolicitudpension() {
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

      console.log('Solicitudpension:', this.solicitudpension);
      this.solicitudpensionService.updateEditaSolicitudpension(this.solicitudpension).subscribe(res => {
        if (res.status == 201 || res.status == 200) {
          swal('Success...', 'Solicitudpension save successfully.', 'success');
          this.router.navigate(['../../administrar'], { relativeTo: this.route });
        } else {
          swal('Error...', 'Solicitudpension save unsuccessfully.', 'error');
        }
      });
    }
  }
}
