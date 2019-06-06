/* PSG  Declaracionsat Edita Ts */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Declaracionsat } from '../declaracionsat.psg.model';
import { DeclaracionsatSend } from '../declaracionsat.psg.model-send';
import { DeclaracionsatService } from '../declaracionsat.psg.service';

@Component({
  selector: 'clr-declaracionsat-editar',
  styleUrls: ['../declaracionsat.psg.scss'],
  templateUrl: './declaracionsat-editar.psg.html',
})
export class DeclaracionsatEditarForm implements OnInit {
  public declaracionsatForm: FormGroup;
  public submitted = false;
  public loading = false;
  public declaracionsat: Declaracionsat = new Declaracionsat();
  public declaracionsatSend: DeclaracionsatSend = new DeclaracionsatSend();
  public idDeclaracionsat: string;
  public datePipe = new DatePipe('en-US');
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
    this.recuperaDeclaracionsat();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaDeclaracionsat() {
    this.declaracionsat = this.declaracionsatService.getDeclaracionsat();
    this.declaracionsatForm.controls['inicioejerciciofiscalAux'].setValue(
      this.datePipe.transform(this.declaracionsat.inicioejerciciofiscal, 'dd/MM/yyyy')
    );
    this.declaracionsatForm.controls['tipodeclaracion'].setValue(this.declaracionsat.tipodeclaracion);
    this.declaracionsatForm.controls['finejerciciofiscalAux'].setValue(
      this.datePipe.transform(this.declaracionsat.finejerciciofiscal, 'dd/MM/yyyy')
    );
    this.declaracionsatForm.controls['fechadeclaracionanteriorAux'].setValue(
      this.datePipe.transform(this.declaracionsat.fechadeclaracionanterior, 'dd/MM/yyyy')
    );
    this.declaracionsatForm.controls['foliodeclaracionanterior'].setValue(this.declaracionsat.foliodeclaracionanterior);
    this.declaracionsatForm.controls['mensajesproceso'].setValue(this.declaracionsat.mensajesproceso);
    this.declaracionsatForm.controls['archivo'].setValue(this.declaracionsat.archivo);
  }

  editaDeclaracionsat() {
    this.submitted = true;

    if (this.declaracionsatForm.invalid) {
      swal('Error...', 'Generación archivo SAT 32-B has fields to fill.', 'error');
    } else {
      this.route.params.subscribe(params => {
        this.idDeclaracionsat = params['id'];
      });

      if (this.declaracionsatForm.controls['inicioejerciciofiscalAux'].value !== null) {
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
      } else {
        this.declaracionsatSend.inicioejerciciofiscal = null;
      }
      this.declaracionsatSend.tipodeclaracion = this.declaracionsatForm.controls['tipodeclaracion'].value;
      if (this.declaracionsatForm.controls['finejerciciofiscalAux'].value !== null) {
        let finejerciciofiscalAuxtoArray = this.declaracionsatForm.controls['finejerciciofiscalAux'].value.split('/');
        let finejerciciofiscalAuxDate = new Date(
          finejerciciofiscalAuxtoArray[1] +
            '/' +
            finejerciciofiscalAuxtoArray[0] +
            '/' +
            finejerciciofiscalAuxtoArray[2]
        );
        this.declaracionsatSend.finejerciciofiscal = finejerciciofiscalAuxDate.getTime();
      } else {
        this.declaracionsatSend.finejerciciofiscal = null;
      }
      if (this.declaracionsatForm.controls['fechadeclaracionanteriorAux'].value !== null) {
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
      } else {
        this.declaracionsatSend.fechadeclaracionanterior = null;
      }
      this.declaracionsatSend.foliodeclaracionanterior = this.declaracionsatForm.controls[
        'foliodeclaracionanterior'
      ].value;
      this.declaracionsatSend.mensajesproceso = this.declaracionsatForm.controls['mensajesproceso'].value;
      this.declaracionsatSend.archivo = this.declaracionsatForm.controls['archivo'].value;

      this.declaracionsatService
        .updateEditaDeclaracionsat(this.declaracionsatSend, this.idDeclaracionsat)
        .subscribe(res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Generación archivo SAT 32-B save successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Generación archivo SAT 32-B has fields to fill.', 'error');
            }
          } else {
            swal('Error...', 'Generación archivo SAT 32-B save unsuccessfully.', 'error');
          }
        });
    }
  }

  regresaDeclaracionsat() {
    this.location.back();
  }
}
