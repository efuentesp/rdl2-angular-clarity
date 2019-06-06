/* PSG  Retiro Edita Ts */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Retiro } from '../retiro.psg.model';
import { RetiroSend } from '../retiro.psg.model-send';
import { RetiroService } from '../retiro.psg.service';

@Component({
  selector: 'clr-retiro-editar',
  styleUrls: ['../retiro.psg.scss'],
  templateUrl: './retiro-editar.psg.html',
})
export class RetiroEditarForm implements OnInit {
  public retiroForm: FormGroup;
  public submitted = false;
  public loading = false;
  public retiro: Retiro = new Retiro();
  public retiroSend: RetiroSend = new RetiroSend();
  public idRetiro: string;
  public datePipe = new DatePipe('en-US');
  public id: number;

  // Modal

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private retiroService: RetiroService
  ) {
    this.retiroForm = this.fb.group({
      usuario: new FormControl('', Validators.required),
      fechahora: new FormControl('', Validators.required),
      archivo: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.recuperaRetiro();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaRetiro() {
    this.retiro = this.retiroService.getRetiro();
    this.retiroForm.controls['usuario'].setValue(this.retiro.usuario);
    this.retiroForm.controls['fechahora'].setValue(this.retiro.fechahora);
    this.retiroForm.controls['archivo'].setValue(this.retiro.archivo);
  }

  editaRetiro() {
    this.submitted = true;

    if (this.retiroForm.invalid) {
      swal('Error...', 'Retiros has fields to fill.', 'error');
    } else {
      this.route.params.subscribe(params => {
        this.idRetiro = params['id'];
      });

      this.retiroSend.usuario = this.retiroForm.controls['usuario'].value;
      this.retiroSend.fechahora = this.retiroForm.controls['fechahora'].value;
      this.retiroSend.archivo = this.retiroForm.controls['archivo'].value;

      this.retiroService.updateEditaRetiro(this.retiroSend, this.idRetiro).subscribe(res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            swal('Success...', 'Retiros save successfully.', 'success');
            this.location.back();
          } else {
            swal('Error...', 'Retiros has fields to fill.', 'error');
          }
        } else {
          swal('Error...', 'Retiros save unsuccessfully.', 'error');
        }
      });
    }
  }

  regresaRetiro() {
    this.location.back();
  }
}
