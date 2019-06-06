/* PSG  Accionista Edita Ts */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Accionista } from '../accionista.psg.model';
import { AccionistaSend } from '../accionista.psg.model-send';
import { AccionistaService } from '../accionista.psg.service';

@Component({
  selector: 'clr-accionista-editar',
  styleUrls: ['../accionista.psg.scss'],
  templateUrl: './accionista-editar.psg.html',
})
export class AccionistaEditarForm implements OnInit {
  public accionistaForm: FormGroup;
  public submitted = false;
  public loading = false;
  public accionista: Accionista = new Accionista();
  public accionistaSend: AccionistaSend = new AccionistaSend();
  public idAccionista: string;
  public datePipe = new DatePipe('en-US');
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
    this.recuperaAccionista();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaAccionista() {
    this.accionista = this.accionistaService.getAccionista();
    this.accionistaForm.controls['accionistade'].setValue(this.accionista.accionistade);
    this.accionistaForm.controls['nombre'].setValue(this.accionista.nombre);
    this.accionistaForm.controls['rfc'].setValue(this.accionista.rfc);
    this.accionistaForm.controls['porcentajeparticipacionaccionaria'].setValue(
      this.accionista.porcentajeparticipacionaccionaria
    );
    this.accionistaForm.controls['tipopersona'].setValue(this.accionista.tipopersona);
    this.accionistaForm.controls['nacionalidad'].setValue(this.accionista.nacionalidad);
    this.accionistaForm.controls['pep'].setValue(this.accionista.pep);
  }

  editaAccionista() {
    this.submitted = true;

    if (this.accionistaForm.invalid) {
      swal('Error...', 'Accionista has fields to fill.', 'error');
    } else {
      this.route.params.subscribe(params => {
        this.idAccionista = params['id'];
      });

      this.accionistaSend.accionistade = this.accionistaForm.controls['accionistade'].value;
      this.accionistaSend.nombre = this.accionistaForm.controls['nombre'].value;
      this.accionistaSend.rfc = this.accionistaForm.controls['rfc'].value;
      this.accionistaSend.porcentajeparticipacionaccionaria = this.accionistaForm.controls[
        'porcentajeparticipacionaccionaria'
      ].value;
      this.accionistaSend.tipopersona = this.accionistaForm.controls['tipopersona'].value;
      this.accionistaSend.nacionalidad = this.accionistaForm.controls['nacionalidad'].value;
      this.accionistaSend.pep = this.accionistaForm.controls['pep'].value;

      this.accionistaService.updateEditaAccionista(this.accionistaSend, this.idAccionista).subscribe(res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            swal('Success...', 'Accionista save successfully.', 'success');
            this.location.back();
          } else {
            swal('Error...', 'Accionista has fields to fill.', 'error');
          }
        } else {
          swal('Error...', 'Accionista save unsuccessfully.', 'error');
        }
      });
    }
  }

  regresaAccionista() {
    this.location.back();
  }
}
