/* PSG  Parametroscomisiones Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Parametroscomisiones } from '../parametroscomisiones.psg.model';
import { ParametroscomisionesService } from '../parametroscomisiones.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-parametroscomisiones-eliminar',
  styleUrls: ['../parametroscomisiones.psg.scss'],
  templateUrl: './parametroscomisiones-eliminar.psg.html',
})
export class ParametroscomisionesEliminarForm {
  parametroscomisionesForm: FormGroup;
  submitted = false;
  loading = false;
  public parametroscomisiones: Parametroscomisiones = new Parametroscomisiones();
  public idParametroscomisiones: string;
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
    private parametroscomisionesService: ParametroscomisionesService
  ) {
    this.parametroscomisionesForm = this.fb.group({
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      tipocalculo: new FormControl({ value: '', disabled: true }),
      tipocalculoItem: new FormControl({ value: '', disabled: true }),
      aquiensecobra: new FormControl({ value: '', disabled: true }),
      aquiensecobraItem: new FormControl({ value: '', disabled: true }),
      montoaceptacion: new FormControl({ value: '', disabled: true }),
      importeanualizado: new FormControl({ value: '', disabled: true }),
      periodicidad: new FormControl({ value: '', disabled: true }),
      periodicidadItem: new FormControl({ value: '', disabled: true }),
      calculoaldiaprimero: new FormControl({ value: '', disabled: true }),
      calculoaldiaprimeroItem: new FormControl({ value: '', disabled: true }),
      reevaluacion: new FormControl({ value: '', disabled: true }),
      reevaluacionItem: new FormControl({ value: '', disabled: true }),
      fechaconstitucionAux: new FormControl({ value: '', disabled: true }),
      fechapivoteAux: new FormControl({ value: '', disabled: true }),
      fechaproxcalculoAux: new FormControl({ value: '', disabled: true }),
      metodopago: new FormControl({ value: '', disabled: true }),
      aquienfactura: new FormControl({ value: '', disabled: true }),
      nombre: new FormControl({ value: '', disabled: true }),
      comentario: new FormControl({ value: '', disabled: true }),
      estatus: new FormControl({ value: '', disabled: true }),
      estatusItem: new FormControl({ value: '', disabled: true }),
      penasconvencionales: new FormControl({ value: '', disabled: true }),
      penasconvencionalesItem: new FormControl({ value: '', disabled: true }),
      moneda: new FormControl({ value: '', disabled: true }),
      monedaItem: new FormControl({ value: '', disabled: true }),
      interes: new FormControl({ value: '', disabled: true }),
      interesItem: new FormControl({ value: '', disabled: true }),
      tipoiva: new FormControl({ value: '', disabled: true }),
      tipoivaItem: new FormControl({ value: '', disabled: true }),
      diacorte: new FormControl({ value: '', disabled: true }),
      fechaprimercalculoAux: new FormControl({ value: '', disabled: true }),
      fechaultimocalculoAux: new FormControl({ value: '', disabled: true }),
      cuentapago: new FormControl({ value: '', disabled: true }),
      numero: new FormControl({ value: '', disabled: true }),
      situacionmorosidad: new FormControl({ value: '', disabled: true }),
      situacionmorosidadItem: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Parametroscomisiones eliminar()');

    this.recuperaParametroscomisiones();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaParametroscomisiones() {
    this.parametroscomisiones = this.parametroscomisionesService.getParametroscomisiones();
    this.parametroscomisionesForm.controls['fideicomisoId'].setValue(this.parametroscomisiones.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.parametroscomisiones.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.parametroscomisionesForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.parametroscomisionesForm.controls['tipocalculo'].setValue(this.parametroscomisiones.tipocalculo);
    this.parametroscomisionesForm.controls['aquiensecobra'].setValue(this.parametroscomisiones.aquiensecobra);
    this.parametroscomisionesForm.controls['montoaceptacion'].setValue(this.parametroscomisiones.montoaceptacion);
    this.parametroscomisionesForm.controls['importeanualizado'].setValue(this.parametroscomisiones.importeanualizado);
    this.parametroscomisionesForm.controls['periodicidad'].setValue(this.parametroscomisiones.periodicidad);
    this.parametroscomisionesForm.controls['calculoaldiaprimero'].setValue(
      this.parametroscomisiones.calculoaldiaprimero
    );
    this.parametroscomisionesForm.controls['reevaluacion'].setValue(this.parametroscomisiones.reevaluacion);
    this.parametroscomisionesForm.controls['fechaconstitucionAux'].setValue(
      this.datePipe.transform(this.parametroscomisiones.fechaconstitucion, 'dd/MM/yyyy')
    );
    this.parametroscomisionesForm.controls['fechapivoteAux'].setValue(
      this.datePipe.transform(this.parametroscomisiones.fechapivote, 'dd/MM/yyyy')
    );
    this.parametroscomisionesForm.controls['fechaproxcalculoAux'].setValue(
      this.datePipe.transform(this.parametroscomisiones.fechaproxcalculo, 'dd/MM/yyyy')
    );
    this.parametroscomisionesForm.controls['metodopago'].setValue(this.parametroscomisiones.metodopago);
    this.parametroscomisionesForm.controls['aquienfactura'].setValue(this.parametroscomisiones.aquienfactura);
    this.parametroscomisionesForm.controls['nombre'].setValue(this.parametroscomisiones.nombre);
    this.parametroscomisionesForm.controls['comentario'].setValue(this.parametroscomisiones.comentario);
    this.parametroscomisionesForm.controls['estatus'].setValue(this.parametroscomisiones.estatus);
    this.parametroscomisionesForm.controls['penasconvencionales'].setValue(
      this.parametroscomisiones.penasconvencionales
    );
    this.parametroscomisionesForm.controls['moneda'].setValue(this.parametroscomisiones.moneda);
    this.parametroscomisionesForm.controls['interes'].setValue(this.parametroscomisiones.interes);
    this.parametroscomisionesForm.controls['tipoiva'].setValue(this.parametroscomisiones.tipoiva);
    this.parametroscomisionesForm.controls['diacorte'].setValue(this.parametroscomisiones.diacorte);
    this.parametroscomisionesForm.controls['fechaprimercalculoAux'].setValue(
      this.datePipe.transform(this.parametroscomisiones.fechaprimercalculo, 'dd/MM/yyyy')
    );
    this.parametroscomisionesForm.controls['fechaultimocalculoAux'].setValue(
      this.datePipe.transform(this.parametroscomisiones.fechaultimocalculo, 'dd/MM/yyyy')
    );
    this.parametroscomisionesForm.controls['cuentapago'].setValue(this.parametroscomisiones.cuentapago);
    this.parametroscomisionesForm.controls['numero'].setValue(this.parametroscomisiones.numero);
    this.parametroscomisionesForm.controls['situacionmorosidad'].setValue(this.parametroscomisiones.situacionmorosidad);
  }

  eliminaParametroscomisiones() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idParametroscomisiones = params['id'];
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
        this.parametroscomisionesService.deleteParametroscomisiones(this.idParametroscomisiones).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Parametroscomisiones item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Parámetros de comisiones save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Parámetros de comisiones no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Parámetros de comisiones deleted unsuccessfully", "error");
      }
    });
  }

  regresaParametroscomisiones() {
    this.location.back();
  }
}
