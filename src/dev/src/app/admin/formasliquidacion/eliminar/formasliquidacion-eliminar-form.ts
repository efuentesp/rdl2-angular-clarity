/* PSG  Formasliquidacion Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Formasliquidacion } from '../formasliquidacion.psg.model';
import { FormasliquidacionService } from '../formasliquidacion.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-formasliquidacion-eliminar',
  styleUrls: ['../formasliquidacion.psg.scss'],
  templateUrl: './formasliquidacion-eliminar.psg.html',
})
export class FormasliquidacionEliminarForm {
  formasliquidacionForm: FormGroup;
  submitted = false;
  loading = false;
  public formasliquidacion: Formasliquidacion = new Formasliquidacion();
  public idFormasliquidacion: string;
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
    private formasliquidacionService: FormasliquidacionService
  ) {
    this.formasliquidacionForm = this.fb.group({
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      participante: new FormControl({ value: '', disabled: true }),
      tipo: new FormControl({ value: '', disabled: true }),
      tipoItem: new FormControl({ value: '', disabled: true }),
      fideicomisario: new FormControl({ value: '', disabled: true }),
      formaliquidacion: new FormControl({ value: '', disabled: true }),
      formaliquidacionItem: new FormControl({ value: '', disabled: true }),
      moneda: new FormControl({ value: '', disabled: true }),
      monedaItem: new FormControl({ value: '', disabled: true }),
      seccuentaseleccionada: new FormControl({ value: '', disabled: true }),
      plprincipal: new FormControl({ value: '', disabled: true }),
      plprincipalItem: new FormControl({ value: '', disabled: true }),
      estado: new FormControl({ value: '', disabled: true }),
      estadoItem: new FormControl({ value: '', disabled: true }),
      secparamliq: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Formasliquidacion eliminar()');

    this.recuperaFormasliquidacion();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaFormasliquidacion() {
    this.formasliquidacion = this.formasliquidacionService.getFormasliquidacion();
    this.formasliquidacionForm.controls['fideicomisoId'].setValue(this.formasliquidacion.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.formasliquidacion.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.formasliquidacionForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.formasliquidacionForm.controls['participante'].setValue(this.formasliquidacion.participante);
    this.formasliquidacionForm.controls['tipo'].setValue(this.formasliquidacion.tipo);
    this.formasliquidacionForm.controls['fideicomisario'].setValue(this.formasliquidacion.fideicomisario);
    this.formasliquidacionForm.controls['formaliquidacion'].setValue(this.formasliquidacion.formaliquidacion);
    this.formasliquidacionForm.controls['moneda'].setValue(this.formasliquidacion.moneda);
    this.formasliquidacionForm.controls['seccuentaseleccionada'].setValue(this.formasliquidacion.seccuentaseleccionada);
    this.formasliquidacionForm.controls['plprincipal'].setValue(this.formasliquidacion.plprincipal);
    this.formasliquidacionForm.controls['estado'].setValue(this.formasliquidacion.estado);
    this.formasliquidacionForm.controls['secparamliq'].setValue(this.formasliquidacion.secparamliq);
  }

  eliminaFormasliquidacion() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idFormasliquidacion = params['id'];
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
        this.formasliquidacionService.deleteFormasliquidacion(this.idFormasliquidacion).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Formasliquidacion item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Formas de Liquidación save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Formas de Liquidación no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Formas de Liquidación deleted unsuccessfully", "error");
      }
    });
  }

  regresaFormasliquidacion() {
    this.location.back();
  }
}
