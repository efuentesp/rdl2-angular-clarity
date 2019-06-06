/* PSG  Fideicomisospendientesliberar Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Fideicomisospendientesliberar } from '../fideicomisospendientesliberar.psg.model';
import { FideicomisospendientesliberarService } from '../fideicomisospendientesliberar.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-fideicomisospendientesliberar-eliminar',
  styleUrls: ['../fideicomisospendientesliberar.psg.scss'],
  templateUrl: './fideicomisospendientesliberar-eliminar.psg.html',
})
export class FideicomisospendientesliberarEliminarForm {
  fideicomisospendientesliberarForm: FormGroup;
  submitted = false;
  loading = false;
  public fideicomisospendientesliberar: Fideicomisospendientesliberar = new Fideicomisospendientesliberar();
  public idFideicomisospendientesliberar: string;
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
    private fideicomisospendientesliberarService: FideicomisospendientesliberarService
  ) {
    this.fideicomisospendientesliberarForm = this.fb.group({
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      nombrefiso: new FormControl({ value: '', disabled: true }),
      tiponegocio: new FormControl({ value: '', disabled: true }),
      tiponegocioItem: new FormControl({ value: '', disabled: true }),
      clasifproducto: new FormControl({ value: '', disabled: true }),
      clasifproductoItem: new FormControl({ value: '', disabled: true }),
      manejo: new FormControl({ value: '', disabled: true }),
      manejoItem: new FormControl({ value: '', disabled: true }),
      tipopersona: new FormControl({ value: '', disabled: true }),
      tipopersonaItem: new FormControl({ value: '', disabled: true }),
      estatus: new FormControl({ value: '', disabled: true }),
      estatusItem: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Fideicomisospendientesliberar eliminar()');

    this.recuperaFideicomisospendientesliberar();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaFideicomisospendientesliberar() {
    this.fideicomisospendientesliberar = this.fideicomisospendientesliberarService.getFideicomisospendientesliberar();
    this.fideicomisospendientesliberarForm.controls['fideicomisoId'].setValue(
      this.fideicomisospendientesliberar.fideicomisoId
    );
    this.fideicomisoService
      .getRecuperaFideicomisoPorId(this.fideicomisospendientesliberar.fideicomisoId)
      .subscribe(res => {
        if (res) {
          this.fideicomiso = res.json();
          this.fideicomisospendientesliberarForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
        }
      });
    this.fideicomisospendientesliberarForm.controls['nombrefiso'].setValue(
      this.fideicomisospendientesliberar.nombrefiso
    );
    this.fideicomisospendientesliberarForm.controls['tiponegocio'].setValue(
      this.fideicomisospendientesliberar.tiponegocio
    );
    this.fideicomisospendientesliberarForm.controls['clasifproducto'].setValue(
      this.fideicomisospendientesliberar.clasifproducto
    );
    this.fideicomisospendientesliberarForm.controls['manejo'].setValue(this.fideicomisospendientesliberar.manejo);
    this.fideicomisospendientesliberarForm.controls['tipopersona'].setValue(
      this.fideicomisospendientesliberar.tipopersona
    );
    this.fideicomisospendientesliberarForm.controls['estatus'].setValue(this.fideicomisospendientesliberar.estatus);
  }

  eliminaFideicomisospendientesliberar() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idFideicomisospendientesliberar = params['id'];
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
        this.fideicomisospendientesliberarService
          .deleteFideicomisospendientesliberar(this.idFideicomisospendientesliberar)
          .subscribe(
            res => {
              if (res) {
                swal('Success...', 'Fideicomisospendientesliberar item has been deleted successfully.', 'success');
                this.location.back();
              } else {
                swal('Error...', 'Fideicomisos Pendientes de Liberar save unsuccessfully.', 'error');
              }
            },
            error => {
              if (error.status == 500) {
                swal(
                  'Warning...',
                  'Fideicomisos Pendientes de Liberar no se puede eliminar debido a que esta asociado con otra entidad.',
                  'warning'
                );
              }
            }
          );
      } else {
        //swal("Cancelled", "Fideicomisos Pendientes de Liberar deleted unsuccessfully", "error");
      }
    });
  }

  regresaFideicomisospendientesliberar() {
    this.location.back();
  }
}
