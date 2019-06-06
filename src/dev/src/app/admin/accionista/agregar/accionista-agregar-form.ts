/* PSG  Accionista Agregar Ts */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import swal from 'sweetalert2';

import { Accionista } from '../accionista.psg.model';
import { AccionistaSend } from '../accionista.psg.model-send';
import { AccionistaService } from '../accionista.psg.service';

@Component({
  selector: 'clr-accionista-agregar',
  styleUrls: ['../accionista.psg.scss'],
  templateUrl: './accionista-agregar.psg.html',
})
export class AccionistaAgregarForm implements OnInit {
  accionistaForm: FormGroup;
  submitted = false;
  loading = false;
  public accionista: Accionista = new Accionista();
  public accionistaSend: AccionistaSend = new AccionistaSend();
  public id: number;

  // Modal

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private accionistaService: AccionistaService
  ) {
    this.accionistaForm = this.fb.group({
      accionistade: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      rfc: new FormControl('', Validators.required),
      porcentajeparticipacionaccionaria: new FormControl('', Validators.required),
      tipopersona: new FormControl('', Validators.required),
      nacionalidad: new FormControl('', Validators.required),
      pep: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    console.log('Accionista agregar()');

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  guardaAccionista() {
    this.submitted = true;

    if (this.accionistaForm.invalid) {
      swal('Error...', 'Accionista has fields to fill.', 'error');
    } else {
      this.accionistaSend.accionistade = this.accionistaForm.controls['accionistade'].value;
      this.accionistaSend.nombre = this.accionistaForm.controls['nombre'].value;
      this.accionistaSend.rfc = this.accionistaForm.controls['rfc'].value;
      this.accionistaSend.porcentajeparticipacionaccionaria = this.accionistaForm.controls[
        'porcentajeparticipacionaccionaria'
      ].value;
      this.accionistaSend.tipopersona = this.accionistaForm.controls['tipopersona'].value;
      this.accionistaSend.nacionalidad = this.accionistaForm.controls['nacionalidad'].value;
      this.accionistaSend.pep = this.accionistaForm.controls['pep'].value;

      this.accionistaService.postGuardaAccionista(this.accionistaSend).subscribe(
        res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Accionista save successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Accionista has fields to fill.', 'error');
            }
          }
        },
        error => {
          swal('Error...', 'Accionista save unsuccessfully.', 'error');
        }
      );
    }
  }

  regresaAccionista() {
    this.location.back();
  }
}
