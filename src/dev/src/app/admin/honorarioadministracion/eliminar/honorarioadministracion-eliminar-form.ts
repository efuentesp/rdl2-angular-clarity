/* PSG  Honorarioadministracion Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Honorarioadministracion } from '../honorarioadministracion.psg.model';
import { HonorarioadministracionService } from '../honorarioadministracion.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-honorarioadministracion-eliminar',
  styleUrls: ['../honorarioadministracion.psg.scss'],
  templateUrl: './honorarioadministracion-eliminar.psg.html',
})
export class HonorarioadministracionEliminarForm {
  honorarioadministracionForm: FormGroup;
  submitted = false;
  loading = false;
  public honorarioadministracion: Honorarioadministracion = new Honorarioadministracion();
  public idHonorarioadministracion: string;
  public datePipe = new DatePipe('en-US');
  public id: number;

  public fideicomisoArray: Fideicomiso[];
  public fideicomiso: Fideicomiso;

  // Modal
  modalfideicomiso: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private honorarioadministracionService: HonorarioadministracionService
  ) {
    this.honorarioadministracionForm = this.fb.group({
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      periodo: new FormControl({ value: '', disabled: true }),
      periodoItem: new FormControl({ value: '', disabled: true }),
      montopatrimonio: new FormControl({ value: '', disabled: true }),
      de: new FormControl({ value: '', disabled: true }),
      destinatario: new FormControl({ value: '', disabled: true }),
      honorarioatual: new FormControl({ value: '', disabled: true }),
      cuotaminima: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Honorarioadministracion eliminar()');

    this.recuperaHonorarioadministracion();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaHonorarioadministracion() {
    this.honorarioadministracion = this.honorarioadministracionService.getHonorarioadministracion();
    this.honorarioadministracionForm.controls['fideicomisoId'].setValue(this.honorarioadministracion.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.honorarioadministracion.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.honorarioadministracionForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.honorarioadministracionForm.controls['periodo'].setValue(this.honorarioadministracion.periodo);
    this.honorarioadministracionForm.controls['montopatrimonio'].setValue(this.honorarioadministracion.montopatrimonio);
    this.honorarioadministracionForm.controls['de'].setValue(this.honorarioadministracion.de);
    this.honorarioadministracionForm.controls['destinatario'].setValue(this.honorarioadministracion.destinatario);
    this.honorarioadministracionForm.controls['honorarioatual'].setValue(this.honorarioadministracion.honorarioatual);
    this.honorarioadministracionForm.controls['cuotaminima'].setValue(this.honorarioadministracion.cuotaminima);
  }

  eliminaHonorarioadministracion() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idHonorarioadministracion = params['id'];
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
        this.honorarioadministracionService.deleteHonorarioadministracion(this.idHonorarioadministracion).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Honorarioadministracion item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Honorario por administración save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Honorario por administración no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Honorario por administración deleted unsuccessfully", "error");
      }
    });
  }

  regresaHonorarioadministracion() {
    this.location.back();
  }
}
