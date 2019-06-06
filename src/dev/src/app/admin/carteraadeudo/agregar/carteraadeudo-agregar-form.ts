/* PSG  Carteraadeudo Agregar Ts */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import swal from 'sweetalert2';

import { Carteraadeudo } from '../carteraadeudo.psg.model';
import { CarteraadeudoSend } from '../carteraadeudo.psg.model-send';
import { CarteraadeudoService } from '../carteraadeudo.psg.service';

import { HonorarioscontratoService } from '../../honorarioscontrato/honorarioscontrato.psg.service';
import { Honorarioscontrato } from '../../honorarioscontrato/honorarioscontrato.psg.model';

@Component({
  selector: 'clr-carteraadeudo-agregar',
  styleUrls: ['../carteraadeudo.psg.scss'],
  templateUrl: './carteraadeudo-agregar.psg.html',
})
export class CarteraadeudoAgregarForm implements OnInit {
  carteraadeudoForm: FormGroup;
  submitted = false;
  loading = false;
  public carteraadeudo: Carteraadeudo = new Carteraadeudo();
  public carteraadeudoSend: CarteraadeudoSend = new CarteraadeudoSend();
  public id: number;

  public honorarioscontratoArray: Honorarioscontrato[];
  public honorarioscontrato: Honorarioscontrato;

  // Modal
  modalhonorarioscontrato: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private honorarioscontratoService: HonorarioscontratoService,
    private carteraadeudoService: CarteraadeudoService
  ) {
    this.carteraadeudoForm = this.fb.group({
      honorarioscontratoId: new FormControl('', Validators.required),
      honorarioscontratoItem: new FormControl(''),
      folioadeudo: new FormControl('', Validators.required),
      calificacion: new FormControl('', Validators.required),
      fechacalculoAux: new FormControl('', Validators.required),
      delAux: new FormControl('', Validators.required),
      alAux: new FormControl('', Validators.required),
      moneda: new FormControl('', Validators.required),
      importe: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    console.log('Carteraadeudo agregar()');

    this.cargaHonorarioscontrato();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (this.id !== undefined) {
      this.getRecuperaHonorarioscontratoPorId(this.id);
    }
  }

  guardaCarteraadeudo() {
    this.submitted = true;

    if (this.carteraadeudoForm.invalid) {
      swal('Error...', 'Cartera adeudos has fields to fill.', 'error');
    } else {
      this.carteraadeudoSend.honorarioscontratoId = this.carteraadeudoForm.controls['honorarioscontratoId'].value;
      this.carteraadeudoSend.folioadeudo = this.carteraadeudoForm.controls['folioadeudo'].value;
      this.carteraadeudoSend.calificacion = this.carteraadeudoForm.controls['calificacion'].value;
      let fechacalculoAuxtoArray = this.carteraadeudoForm.controls['fechacalculoAux'].value.split('/');
      let fechacalculoAuxDate = new Date(
        fechacalculoAuxtoArray[1] + '/' + fechacalculoAuxtoArray[0] + '/' + fechacalculoAuxtoArray[2]
      );
      this.carteraadeudoSend.fechacalculo = fechacalculoAuxDate.getTime();
      let delAuxtoArray = this.carteraadeudoForm.controls['delAux'].value.split('/');
      let delAuxDate = new Date(delAuxtoArray[1] + '/' + delAuxtoArray[0] + '/' + delAuxtoArray[2]);
      this.carteraadeudoSend.del = delAuxDate.getTime();
      let alAuxtoArray = this.carteraadeudoForm.controls['alAux'].value.split('/');
      let alAuxDate = new Date(alAuxtoArray[1] + '/' + alAuxtoArray[0] + '/' + alAuxtoArray[2]);
      this.carteraadeudoSend.al = alAuxDate.getTime();
      this.carteraadeudoSend.moneda = this.carteraadeudoForm.controls['moneda'].value;
      this.carteraadeudoSend.importe = this.carteraadeudoForm.controls['importe'].value;

      this.carteraadeudoService.postGuardaCarteraadeudo(this.carteraadeudoSend).subscribe(
        res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Cartera adeudos save successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Cartera adeudos has fields to fill.', 'error');
            }
          }
        },
        error => {
          swal('Error...', 'Cartera adeudos save unsuccessfully.', 'error');
        }
      );
    }
  }

  cargaHonorarioscontrato() {
    this.honorarioscontratoService.getRecuperaHonorarioscontrato().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.honorarioscontratoArray = res.json();

            this.honorarioscontratoArray.forEach(element => {
              this.llenaCamposHonorarioscontrato(this.honorarioscontratoArray);
            });
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Cartera honorarios por contrato.', 'error');
      }
    );
  }

  getRecuperaHonorarioscontratoPorId(id) {
    this.honorarioscontratoService.getRecuperaHonorarioscontratoPorId(id).subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.honorarioscontrato = res.json();
            this.honorarioscontratoArray = [];
            this.honorarioscontratoArray.push(this.honorarioscontrato);
            this.llenaCamposHonorarioscontrato(this.honorarioscontratoArray);
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling Cartera honorarios por contrato', 'error');
      }
    );
  }

  llenaCamposHonorarioscontrato(array) {
    array.forEach(element => {});
  }

  setClickedRowHonorarioscontrato(index, honorarioscontrato) {
    honorarioscontrato.checked = !honorarioscontrato.checked;
    if (honorarioscontrato.checked) {
      this.honorarioscontratoService.setHonorarioscontrato(honorarioscontrato);

      this.carteraadeudoForm.controls['honorarioscontratoId'].setValue(honorarioscontrato.id);
      this.carteraadeudoForm.controls['honorarioscontratoItem'].setValue(honorarioscontrato.persona);
    } else {
      this.honorarioscontratoService.clear();
      this.carteraadeudoForm.controls['honorarioscontratoId'].setValue(null);
      this.carteraadeudoForm.controls['honorarioscontratoItem'].setValue('');
    }
  }

  regresaCarteraadeudo() {
    this.location.back();
  }
}
