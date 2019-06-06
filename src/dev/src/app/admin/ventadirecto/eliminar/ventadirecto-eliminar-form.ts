/* PSG  Ventadirecto Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Ventadirecto } from '../ventadirecto.psg.model';
import { VentadirectoService } from '../ventadirecto.psg.service';

import { InstruccionService } from '../../instruccion/instruccion.psg.service';
import { Instruccion } from '../../instruccion/instruccion.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { ContratoinversionService } from '../../contratoinversion/contratoinversion.psg.service';
import { Contratoinversion } from '../../contratoinversion/contratoinversion.psg.model';

@Component({
  selector: 'clr-ventadirecto-eliminar',
  styleUrls: ['../ventadirecto.psg.scss'],
  templateUrl: './ventadirecto-eliminar.psg.html',
})
export class VentadirectoEliminarForm {
  ventadirectoForm: FormGroup;
  submitted = false;
  loading = false;
  public ventadirecto: Ventadirecto = new Ventadirecto();
  public idVentadirecto: string;
  public datePipe = new DatePipe('en-US');
  public id: number;

  public instruccionArray: Instruccion[];
  public instruccion: Instruccion;
  public subfisoArray: Subfiso[];
  public subfiso: Subfiso;
  public fideicomisoArray: Fideicomiso[];
  public fideicomiso: Fideicomiso;
  public contratoinversionArray: Contratoinversion[];
  public contratoinversion: Contratoinversion;

  // Modal
  modalinstruccion: boolean = false;
  modalsubfiso: boolean = false;
  modalfideicomiso: boolean = false;
  modalcontratoinversion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private instruccionService: InstruccionService,
    private subfisoService: SubfisoService,
    private fideicomisoService: FideicomisoService,
    private contratoinversionService: ContratoinversionService,
    private ventadirectoService: VentadirectoService
  ) {
    this.ventadirectoForm = this.fb.group({
      instruccionId: new FormControl({ value: '', disabled: true }),
      instruccionItem: new FormControl({ value: '', disabled: true }),
      fechavalor: new FormControl({ value: '', disabled: true }),
      titulosgarantia: new FormControl({ value: '', disabled: true }),
      titulosgarantiaItem: new FormControl({ value: '', disabled: true }),
      subfisoId: new FormControl({ value: '', disabled: true }),
      subfisoItem: new FormControl({ value: '', disabled: true }),
      operacionfutura: new FormControl({ value: '', disabled: true }),
      operacionfuturaItem: new FormControl({ value: '', disabled: true }),
      fechaoperacionAux: new FormControl({ value: '', disabled: true }),
      activos: new FormControl({ value: '', disabled: true }),
      activosItem: new FormControl({ value: '', disabled: true }),
      tipomovimiento: new FormControl({ value: '', disabled: true }),
      importe: new FormControl({ value: '', disabled: true }),
      custodio: new FormControl({ value: '', disabled: true }),
      comision: new FormControl({ value: '', disabled: true }),
      mercado: new FormControl({ value: '', disabled: true }),
      mercadoItem: new FormControl({ value: '', disabled: true }),
      instrumento: new FormControl({ value: '', disabled: true }),
      instrumentoItem: new FormControl({ value: '', disabled: true }),
      isr: new FormControl({ value: '', disabled: true }),
      moneda: new FormControl({ value: '', disabled: true }),
      monedaItem: new FormControl({ value: '', disabled: true }),
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      contratoinversionId: new FormControl({ value: '', disabled: true }),
      contratoinversionItem: new FormControl({ value: '', disabled: true }),
      fechaliquidacion: new FormControl({ value: '', disabled: true }),
      emisiones: new FormControl({ value: '', disabled: true }),
      emisionesItem: new FormControl({ value: '', disabled: true }),
      serie: new FormControl({ value: '', disabled: true }),
      notitulos: new FormControl({ value: '', disabled: true }),
      precio: new FormControl({ value: '', disabled: true }),
      desccomplementaria: new FormControl({ value: '', disabled: true }),
      intereses: new FormControl({ value: '', disabled: true }),
      pizarra: new FormControl({ value: '', disabled: true }),
      cupon: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Ventadirecto eliminar()');

    this.recuperaVentadirecto();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaVentadirecto() {
    this.ventadirecto = this.ventadirectoService.getVentadirecto();
    this.ventadirectoForm.controls['instruccionId'].setValue(this.ventadirecto.instruccionId);
    this.instruccionService.getRecuperaInstruccionPorId(this.ventadirecto.instruccionId).subscribe(res => {
      if (res) {
        this.instruccion = res.json();
        this.ventadirectoForm.controls['instruccionItem'].setValue(this.instruccion.folio);
      }
    });
    this.ventadirectoForm.controls['fechavalor'].setValue(this.ventadirecto.fechavalor);
    this.ventadirectoForm.controls['titulosgarantia'].setValue(this.ventadirecto.titulosgarantia);
    this.ventadirectoForm.controls['subfisoId'].setValue(this.ventadirecto.subfisoId);
    this.subfisoService.getRecuperaSubfisoPorId(this.ventadirecto.subfisoId).subscribe(res => {
      if (res) {
        this.subfiso = res.json();
        this.ventadirectoForm.controls['subfisoItem'].setValue(this.subfiso.numero);
      }
    });
    this.ventadirectoForm.controls['operacionfutura'].setValue(this.ventadirecto.operacionfutura);
    this.ventadirectoForm.controls['fechaoperacionAux'].setValue(
      this.datePipe.transform(this.ventadirecto.fechaoperacion, 'dd/MM/yyyy')
    );
    this.ventadirectoForm.controls['activos'].setValue(this.ventadirecto.activos);
    this.ventadirectoForm.controls['tipomovimiento'].setValue(this.ventadirecto.tipomovimiento);
    this.ventadirectoForm.controls['importe'].setValue(this.ventadirecto.importe);
    this.ventadirectoForm.controls['custodio'].setValue(this.ventadirecto.custodio);
    this.ventadirectoForm.controls['comision'].setValue(this.ventadirecto.comision);
    this.ventadirectoForm.controls['mercado'].setValue(this.ventadirecto.mercado);
    this.ventadirectoForm.controls['instrumento'].setValue(this.ventadirecto.instrumento);
    this.ventadirectoForm.controls['isr'].setValue(this.ventadirecto.isr);
    this.ventadirectoForm.controls['moneda'].setValue(this.ventadirecto.moneda);
    this.ventadirectoForm.controls['fideicomisoId'].setValue(this.ventadirecto.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.ventadirecto.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.ventadirectoForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.ventadirectoForm.controls['contratoinversionId'].setValue(this.ventadirecto.contratoinversionId);
    this.contratoinversionService
      .getRecuperaContratoinversionPorId(this.ventadirecto.contratoinversionId)
      .subscribe(res => {
        if (res) {
          this.contratoinversion = res.json();
          this.ventadirectoForm.controls['contratoinversionItem'].setValue(this.contratoinversion.contratoiversion);
        }
      });
    this.ventadirectoForm.controls['fechaliquidacion'].setValue(this.ventadirecto.fechaliquidacion);
    this.ventadirectoForm.controls['emisiones'].setValue(this.ventadirecto.emisiones);
    this.ventadirectoForm.controls['serie'].setValue(this.ventadirecto.serie);
    this.ventadirectoForm.controls['notitulos'].setValue(this.ventadirecto.notitulos);
    this.ventadirectoForm.controls['precio'].setValue(this.ventadirecto.precio);
    this.ventadirectoForm.controls['desccomplementaria'].setValue(this.ventadirecto.desccomplementaria);
    this.ventadirectoForm.controls['intereses'].setValue(this.ventadirecto.intereses);
    this.ventadirectoForm.controls['pizarra'].setValue(this.ventadirecto.pizarra);
    this.ventadirectoForm.controls['cupon'].setValue(this.ventadirecto.cupon);
  }

  eliminaVentadirecto() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idVentadirecto = params['id'];
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
        this.ventadirectoService.deleteVentadirecto(this.idVentadirecto).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Ventadirecto item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Instrucción de venta de valores save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Instrucción de venta de valores no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Instrucción de venta de valores deleted unsuccessfully", "error");
      }
    });
  }

  regresaVentadirecto() {
    this.location.back();
  }
}
