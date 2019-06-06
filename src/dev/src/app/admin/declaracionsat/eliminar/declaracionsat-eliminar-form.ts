/* PSG  Declaracionsat Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Declaracionsat } from '../declaracionsat.psg.model';
import { DeclaracionsatService } from '../declaracionsat.psg.service';

@Component({
  selector: 'clr-declaracionsat-eliminar',
  styleUrls: ['../declaracionsat.psg.scss'],
  templateUrl: './declaracionsat-eliminar.psg.html',
})
export class DeclaracionsatEliminarForm {
  declaracionsatForm: FormGroup;
  submitted = false;
  loading = false;
  public declaracionsat: Declaracionsat = new Declaracionsat();
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
      inicioejerciciofiscalAux: new FormControl({ value: '', disabled: true }),
      tipodeclaracion: new FormControl({ value: '', disabled: true }),
      tipodeclaracionItem: new FormControl({ value: '', disabled: true }),
      finejerciciofiscalAux: new FormControl({ value: '', disabled: true }),
      fechadeclaracionanteriorAux: new FormControl({ value: '', disabled: true }),
      foliodeclaracionanterior: new FormControl({ value: '', disabled: true }),
      mensajesproceso: new FormControl({ value: '', disabled: true }),
      archivo: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Declaracionsat eliminar()');

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

  eliminaDeclaracionsat() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idDeclaracionsat = params['id'];
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
        this.declaracionsatService.deleteDeclaracionsat(this.idDeclaracionsat).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Declaracionsat item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Generación archivo SAT 32-B save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Generación archivo SAT 32-B no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Generación archivo SAT 32-B deleted unsuccessfully", "error");
      }
    });
  }

  regresaDeclaracionsat() {
    this.location.back();
  }
}
