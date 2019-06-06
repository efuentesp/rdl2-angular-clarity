/* PSG  Retiro Agregar Ts */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import swal from 'sweetalert2';

import { Retiro } from '../retiro.psg.model';
import { RetiroSend } from '../retiro.psg.model-send';
import { RetiroService } from '../retiro.psg.service';

@Component({
  selector: 'clr-retiro-agregar',
  styleUrls: ['../retiro.psg.scss'],
  templateUrl: './retiro-agregar.psg.html',
})
export class RetiroAgregarForm implements OnInit {
  retiroForm: FormGroup;
  submitted = false;
  loading = false;
  public retiro: Retiro = new Retiro();
  public retiroSend: RetiroSend = new RetiroSend();
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
    console.log('Retiro agregar()');

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  guardaRetiro() {
    this.submitted = true;

    if (this.retiroForm.invalid) {
      swal('Error...', 'Retiros has fields to fill.', 'error');
    } else {
      this.retiroSend.usuario = this.retiroForm.controls['usuario'].value;
      this.retiroSend.fechahora = this.retiroForm.controls['fechahora'].value;
      this.retiroSend.archivo = this.retiroForm.controls['archivo'].value;

      this.retiroService.postGuardaRetiro(this.retiroSend).subscribe(
        res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Retiros save successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Retiros has fields to fill.', 'error');
            }
          }
        },
        error => {
          swal('Error...', 'Retiros save unsuccessfully.', 'error');
        }
      );
    }
  }

  regresaRetiro() {
    this.location.back();
  }
}
