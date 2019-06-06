/* PSG  Declaracionsat Agregar Ts */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import swal from 'sweetalert2';

import { Declaracionsat } from '../declaracionsat.psg.model';
import { DeclaracionsatSend } from '../declaracionsat.psg.model-send';
import { DeclaracionsatService } from '../declaracionsat.psg.service';

@Component({
  selector: 'clr-declaracionsat-agregar',
  styleUrls: ['../declaracionsat.psg.scss'],
  templateUrl: './declaracionsat-agregar.psg.html',
})
export class DeclaracionsatAgregarForm implements OnInit {
  declaracionsatForm: FormGroup;
  submitted = false;
  loading = false;
  public declaracionsat: Declaracionsat = new Declaracionsat();
  public declaracionsatSend: DeclaracionsatSend = new DeclaracionsatSend();
  public id: number;

  // Modal

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private declaracionsatService: DeclaracionsatService
  ) {
    this.declaracionsatForm = this.fb.group({
      inicioejerciciofiscalAux: new FormControl('', Validators.required),
      tipodeclaracion: new FormControl('', Validators.required),
      finejerciciofiscalAux: new FormControl('', Validators.required),
      fechadeclaracionanteriorAux: new FormControl('', Validators.required),
      foliodeclaracionanterior: new FormControl('', Validators.required),
      mensajesproceso: new FormControl('', Validators.required),
      archivo: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    console.log('Declaracionsat agregar()');

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  guardaDeclaracionsat() {
    this.submitted = true;

    if (this.declaracionsatForm.invalid) {
      swal('Error...', 'Generación archivo SAT 32-B has fields to fill.', 'error');
    } else {
      let inicioejerciciofiscalAuxtoArray = this.declaracionsatForm.controls['inicioejerciciofiscalAux'].value.split(
        '/'
      );
      let inicioejerciciofiscalAuxDate = new Date(
        inicioejerciciofiscalAuxtoArray[1] +
          '/' +
          inicioejerciciofiscalAuxtoArray[0] +
          '/' +
          inicioejerciciofiscalAuxtoArray[2]
      );
      this.declaracionsatSend.inicioejerciciofiscal = inicioejerciciofiscalAuxDate.getTime();
      this.declaracionsatSend.tipodeclaracion = this.declaracionsatForm.controls['tipodeclaracion'].value;
      let finejerciciofiscalAuxtoArray = this.declaracionsatForm.controls['finejerciciofiscalAux'].value.split('/');
      let finejerciciofiscalAuxDate = new Date(
        finejerciciofiscalAuxtoArray[1] + '/' + finejerciciofiscalAuxtoArray[0] + '/' + finejerciciofiscalAuxtoArray[2]
      );
      this.declaracionsatSend.finejerciciofiscal = finejerciciofiscalAuxDate.getTime();
      let fechadeclaracionanteriorAuxtoArray = this.declaracionsatForm.controls[
        'fechadeclaracionanteriorAux'
      ].value.split('/');
      let fechadeclaracionanteriorAuxDate = new Date(
        fechadeclaracionanteriorAuxtoArray[1] +
          '/' +
          fechadeclaracionanteriorAuxtoArray[0] +
          '/' +
          fechadeclaracionanteriorAuxtoArray[2]
      );
      this.declaracionsatSend.fechadeclaracionanterior = fechadeclaracionanteriorAuxDate.getTime();
      this.declaracionsatSend.foliodeclaracionanterior = this.declaracionsatForm.controls[
        'foliodeclaracionanterior'
      ].value;
      this.declaracionsatSend.mensajesproceso = this.declaracionsatForm.controls['mensajesproceso'].value;
      this.declaracionsatSend.archivo = this.declaracionsatForm.controls['archivo'].value;

      this.declaracionsatService.postGuardaDeclaracionsat(this.declaracionsatSend).subscribe(
        res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Generación archivo SAT 32-B save successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Generación archivo SAT 32-B has fields to fill.', 'error');
            }
          }
        },
        error => {
          swal('Error...', 'Generación archivo SAT 32-B save unsuccessfully.', 'error');
        }
      );
    }
  }

  regresaDeclaracionsat() {
    this.location.back();
  }
}
