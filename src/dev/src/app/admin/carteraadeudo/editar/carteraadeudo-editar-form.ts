/* PSG  Carteraadeudo Edita Ts */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Carteraadeudo } from '../carteraadeudo.psg.model';
import { CarteraadeudoSend } from '../carteraadeudo.psg.model-send';
import { CarteraadeudoService } from '../carteraadeudo.psg.service';

import { HonorarioscontratoService } from '../../honorarioscontrato/honorarioscontrato.psg.service';
import { Honorarioscontrato } from '../../honorarioscontrato/honorarioscontrato.psg.model';

@Component({
  selector: 'clr-carteraadeudo-editar',
  styleUrls: ['../carteraadeudo.psg.scss'],
  templateUrl: './carteraadeudo-editar.psg.html',
})
export class CarteraadeudoEditarForm implements OnInit {
  public carteraadeudoForm: FormGroup;
  public submitted = false;
  public loading = false;
  public carteraadeudo: Carteraadeudo = new Carteraadeudo();
  public carteraadeudoSend: CarteraadeudoSend = new CarteraadeudoSend();
  public idCarteraadeudo: string;
  public datePipe = new DatePipe('en-US');
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
    this.recuperaCarteraadeudo();

    this.cargaHonorarioscontrato();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaCarteraadeudo() {
    this.carteraadeudo = this.carteraadeudoService.getCarteraadeudo();
    this.carteraadeudoForm.controls['honorarioscontratoId'].setValue(this.carteraadeudo.honorarioscontratoId);
    this.honorarioscontratoService
      .getRecuperaHonorarioscontratoPorId(this.carteraadeudo.honorarioscontratoId)
      .subscribe(res => {
        if (res) {
          this.honorarioscontrato = res.json();
          this.carteraadeudoForm.controls['honorarioscontratoItem'].setValue(this.honorarioscontrato.persona);
        }
      });

    this.carteraadeudoForm.controls['folioadeudo'].setValue(this.carteraadeudo.folioadeudo);
    this.carteraadeudoForm.controls['calificacion'].setValue(this.carteraadeudo.calificacion);
    this.carteraadeudoForm.controls['fechacalculoAux'].setValue(
      this.datePipe.transform(this.carteraadeudo.fechacalculo, 'dd/MM/yyyy')
    );
    this.carteraadeudoForm.controls['delAux'].setValue(this.datePipe.transform(this.carteraadeudo.del, 'dd/MM/yyyy'));
    this.carteraadeudoForm.controls['alAux'].setValue(this.datePipe.transform(this.carteraadeudo.al, 'dd/MM/yyyy'));
    this.carteraadeudoForm.controls['moneda'].setValue(this.carteraadeudo.moneda);
    this.carteraadeudoForm.controls['importe'].setValue(this.carteraadeudo.importe);
  }

  editaCarteraadeudo() {
    this.submitted = true;

    if (this.carteraadeudoForm.invalid) {
      swal('Error...', 'Cartera adeudos has fields to fill.', 'error');
    } else {
      this.route.params.subscribe(params => {
        this.idCarteraadeudo = params['id'];
      });

      this.carteraadeudoSend.honorarioscontratoId = this.carteraadeudoForm.controls['honorarioscontratoId'].value;
      this.carteraadeudoSend.folioadeudo = this.carteraadeudoForm.controls['folioadeudo'].value;
      this.carteraadeudoSend.calificacion = this.carteraadeudoForm.controls['calificacion'].value;
      if (this.carteraadeudoForm.controls['fechacalculoAux'].value !== null) {
        let fechacalculoAuxtoArray = this.carteraadeudoForm.controls['fechacalculoAux'].value.split('/');
        let fechacalculoAuxDate = new Date(
          fechacalculoAuxtoArray[1] + '/' + fechacalculoAuxtoArray[0] + '/' + fechacalculoAuxtoArray[2]
        );
        this.carteraadeudoSend.fechacalculo = fechacalculoAuxDate.getTime();
      } else {
        this.carteraadeudoSend.fechacalculo = null;
      }
      if (this.carteraadeudoForm.controls['delAux'].value !== null) {
        let delAuxtoArray = this.carteraadeudoForm.controls['delAux'].value.split('/');
        let delAuxDate = new Date(delAuxtoArray[1] + '/' + delAuxtoArray[0] + '/' + delAuxtoArray[2]);
        this.carteraadeudoSend.del = delAuxDate.getTime();
      } else {
        this.carteraadeudoSend.del = null;
      }
      if (this.carteraadeudoForm.controls['alAux'].value !== null) {
        let alAuxtoArray = this.carteraadeudoForm.controls['alAux'].value.split('/');
        let alAuxDate = new Date(alAuxtoArray[1] + '/' + alAuxtoArray[0] + '/' + alAuxtoArray[2]);
        this.carteraadeudoSend.al = alAuxDate.getTime();
      } else {
        this.carteraadeudoSend.al = null;
      }
      this.carteraadeudoSend.moneda = this.carteraadeudoForm.controls['moneda'].value;
      this.carteraadeudoSend.importe = this.carteraadeudoForm.controls['importe'].value;

      this.carteraadeudoService
        .updateEditaCarteraadeudo(this.carteraadeudoSend, this.idCarteraadeudo)
        .subscribe(res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Cartera adeudos save successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Cartera adeudos has fields to fill.', 'error');
            }
          } else {
            swal('Error...', 'Cartera adeudos save unsuccessfully.', 'error');
          }
        });
    }
  }

  cargaHonorarioscontrato() {
    this.honorarioscontratoService.getRecuperaHonorarioscontrato().subscribe(
      res => {
        if (res) {
          this.honorarioscontratoArray = res.json();

          this.honorarioscontratoArray.forEach(element => {});
        }
      },
      error => {
        //swal('Error...', 'An error occurred while calling Cartera honorarios por contrato.', 'error');
      }
    );
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
