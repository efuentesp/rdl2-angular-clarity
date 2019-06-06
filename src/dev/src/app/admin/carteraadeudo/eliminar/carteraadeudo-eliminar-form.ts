/* PSG  Carteraadeudo Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Carteraadeudo } from '../carteraadeudo.psg.model';
import { CarteraadeudoService } from '../carteraadeudo.psg.service';

import { HonorarioscontratoService } from '../../honorarioscontrato/honorarioscontrato.psg.service';
import { Honorarioscontrato } from '../../honorarioscontrato/honorarioscontrato.psg.model';

@Component({
  selector: 'clr-carteraadeudo-eliminar',
  styleUrls: ['../carteraadeudo.psg.scss'],
  templateUrl: './carteraadeudo-eliminar.psg.html',
})
export class CarteraadeudoEliminarForm {
  carteraadeudoForm: FormGroup;
  submitted = false;
  loading = false;
  public carteraadeudo: Carteraadeudo = new Carteraadeudo();
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
      honorarioscontratoId: new FormControl({ value: '', disabled: true }),
      honorarioscontratoItem: new FormControl({ value: '', disabled: true }),
      folioadeudo: new FormControl({ value: '', disabled: true }),
      calificacion: new FormControl({ value: '', disabled: true }),
      calificacionItem: new FormControl({ value: '', disabled: true }),
      fechacalculoAux: new FormControl({ value: '', disabled: true }),
      delAux: new FormControl({ value: '', disabled: true }),
      alAux: new FormControl({ value: '', disabled: true }),
      moneda: new FormControl({ value: '', disabled: true }),
      monedaItem: new FormControl({ value: '', disabled: true }),
      importe: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Carteraadeudo eliminar()');

    this.recuperaCarteraadeudo();

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

  eliminaCarteraadeudo() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idCarteraadeudo = params['id'];
    });

    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this ordensimplificada!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(isConfirm => {
      if (isConfirm.value) {
        this.carteraadeudoService.deleteCarteraadeudo(this.idCarteraadeudo).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Carteraadeudo item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Cartera adeudos save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Cartera adeudos no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Cartera adeudos deleted unsuccessfully", "error");
      }
    });
  }

  regresaCarteraadeudo() {
    this.location.back();
  }
}
