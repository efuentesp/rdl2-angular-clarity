/* PSG  Compraventavalores Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Compraventavalores } from '../compraventavalores.psg.model';
import { CompraventavaloresService } from '../compraventavalores.psg.service';

import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';
import { ContratoinversionService } from '../../contratoinversion/contratoinversion.psg.service';
import { Contratoinversion } from '../../contratoinversion/contratoinversion.psg.model';
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-compraventavalores-eliminar',
  styleUrls: ['../compraventavalores.psg.scss'],
  templateUrl: './compraventavalores-eliminar.psg.html',
})
export class CompraventavaloresEliminarForm {
  compraventavaloresForm: FormGroup;
  submitted = false;
  loading = false;
  public compraventavalores: Compraventavalores = new Compraventavalores();
  public idCompraventavalores: string;
  public datePipe = new DatePipe('en-US');
  public id: number;

  public subfisoArray: Subfiso[];
  public subfiso: Subfiso;
  public contratoinversionArray: Contratoinversion[];
  public contratoinversion: Contratoinversion;
  public fideicomisoArray: Fideicomiso[];
  public fideicomiso: Fideicomiso;

  // Modal
  modalsubfiso: boolean = false;
  modalcontratoinversion: boolean = false;
  modalfideicomiso: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private subfisoService: SubfisoService,
    private contratoinversionService: ContratoinversionService,
    private fideicomisoService: FideicomisoService,
    private compraventavaloresService: CompraventavaloresService
  ) {
    this.compraventavaloresForm = this.fb.group({
      fechaoperacionAux: new FormControl({ value: '', disabled: true }),
      generooperacion: new FormControl({ value: '', disabled: true }),
      subfisoId: new FormControl({ value: '', disabled: true }),
      subfisoItem: new FormControl({ value: '', disabled: true }),
      contratoinversionId: new FormControl({ value: '', disabled: true }),
      contratoinversionItem: new FormControl({ value: '', disabled: true }),
      descripcionoperacion: new FormControl({ value: '', disabled: true }),
      operacion: new FormControl({ value: '', disabled: true }),
      operacionItem: new FormControl({ value: '', disabled: true }),
      montooperacion: new FormControl({ value: '', disabled: true }),
      intermediario: new FormControl({ value: '', disabled: true }),
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      descripcionfideicomiso: new FormControl({ value: '', disabled: true }),
      politicainversion: new FormControl({ value: '', disabled: true }),
      moneda: new FormControl({ value: '', disabled: true }),
      monedaItem: new FormControl({ value: '', disabled: true }),
      emergente: new FormControl({ value: '', disabled: true }),
      emergenteItem: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Compraventavalores eliminar()');

    this.recuperaCompraventavalores();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaCompraventavalores() {
    this.compraventavalores = this.compraventavaloresService.getCompraventavalores();
    this.compraventavaloresForm.controls['fechaoperacionAux'].setValue(
      this.datePipe.transform(this.compraventavalores.fechaoperacion, 'dd/MM/yyyy')
    );
    this.compraventavaloresForm.controls['generooperacion'].setValue(this.compraventavalores.generooperacion);
    this.compraventavaloresForm.controls['subfisoId'].setValue(this.compraventavalores.subfisoId);
    this.subfisoService.getRecuperaSubfisoPorId(this.compraventavalores.subfisoId).subscribe(res => {
      if (res) {
        this.subfiso = res.json();
        this.compraventavaloresForm.controls['subfisoItem'].setValue(this.subfiso.numero);
      }
    });
    this.compraventavaloresForm.controls['contratoinversionId'].setValue(this.compraventavalores.contratoinversionId);
    this.contratoinversionService
      .getRecuperaContratoinversionPorId(this.compraventavalores.contratoinversionId)
      .subscribe(res => {
        if (res) {
          this.contratoinversion = res.json();
          this.compraventavaloresForm.controls['contratoinversionItem'].setValue(
            this.contratoinversion.contratoiversion
          );
        }
      });
    this.compraventavaloresForm.controls['descripcionoperacion'].setValue(this.compraventavalores.descripcionoperacion);
    this.compraventavaloresForm.controls['operacion'].setValue(this.compraventavalores.operacion);
    this.compraventavaloresForm.controls['montooperacion'].setValue(this.compraventavalores.montooperacion);
    this.compraventavaloresForm.controls['intermediario'].setValue(this.compraventavalores.intermediario);
    this.compraventavaloresForm.controls['fideicomisoId'].setValue(this.compraventavalores.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.compraventavalores.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.compraventavaloresForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.compraventavaloresForm.controls['descripcionfideicomiso'].setValue(
      this.compraventavalores.descripcionfideicomiso
    );
    this.compraventavaloresForm.controls['politicainversion'].setValue(this.compraventavalores.politicainversion);
    this.compraventavaloresForm.controls['moneda'].setValue(this.compraventavalores.moneda);
    this.compraventavaloresForm.controls['emergente'].setValue(this.compraventavalores.emergente);
  }

  eliminaCompraventavalores() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idCompraventavalores = params['id'];
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
        this.compraventavaloresService.deleteCompraventavalores(this.idCompraventavalores).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Compraventavalores item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Solicitud compra - venta de valores save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Solicitud compra - venta de valores no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Solicitud compra - venta de valores deleted unsuccessfully", "error");
      }
    });
  }

  regresaCompraventavalores() {
    this.location.back();
  }
}
