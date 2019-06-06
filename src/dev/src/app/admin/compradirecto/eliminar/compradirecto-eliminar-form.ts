/* PSG  Compradirecto Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Compradirecto } from '../compradirecto.psg.model';
import { CompradirectoService } from '../compradirecto.psg.service';

import { InstruccionService } from '../../instruccion/instruccion.psg.service';
import { Instruccion } from '../../instruccion/instruccion.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';
import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { ContratoinversionService } from '../../contratoinversion/contratoinversion.psg.service';
import { Contratoinversion } from '../../contratoinversion/contratoinversion.psg.model';

@Component({
  selector: 'clr-compradirecto-eliminar',
  styleUrls: ['../compradirecto.psg.scss'],
  templateUrl: './compradirecto-eliminar.psg.html',
})
export class CompradirectoEliminarForm {
  compradirectoForm: FormGroup;
  submitted = false;
  loading = false;
  public compradirecto: Compradirecto = new Compradirecto();
  public idCompradirecto: string;
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
    private compradirectoService: CompradirectoService
  ) {
    this.compradirectoForm = this.fb.group({
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
    console.log('Compradirecto eliminar()');

    this.recuperaCompradirecto();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaCompradirecto() {
    this.compradirecto = this.compradirectoService.getCompradirecto();
    this.compradirectoForm.controls['instruccionId'].setValue(this.compradirecto.instruccionId);
    this.instruccionService.getRecuperaInstruccionPorId(this.compradirecto.instruccionId).subscribe(res => {
      if (res) {
        this.instruccion = res.json();
        this.compradirectoForm.controls['instruccionItem'].setValue(this.instruccion.folio);
      }
    });
    this.compradirectoForm.controls['fechavalor'].setValue(this.compradirecto.fechavalor);
    this.compradirectoForm.controls['titulosgarantia'].setValue(this.compradirecto.titulosgarantia);
    this.compradirectoForm.controls['subfisoId'].setValue(this.compradirecto.subfisoId);
    this.subfisoService.getRecuperaSubfisoPorId(this.compradirecto.subfisoId).subscribe(res => {
      if (res) {
        this.subfiso = res.json();
        this.compradirectoForm.controls['subfisoItem'].setValue(this.subfiso.numero);
      }
    });
    this.compradirectoForm.controls['operacionfutura'].setValue(this.compradirecto.operacionfutura);
    this.compradirectoForm.controls['fechaoperacionAux'].setValue(
      this.datePipe.transform(this.compradirecto.fechaoperacion, 'dd/MM/yyyy')
    );
    this.compradirectoForm.controls['activos'].setValue(this.compradirecto.activos);
    this.compradirectoForm.controls['tipomovimiento'].setValue(this.compradirecto.tipomovimiento);
    this.compradirectoForm.controls['importe'].setValue(this.compradirecto.importe);
    this.compradirectoForm.controls['custodio'].setValue(this.compradirecto.custodio);
    this.compradirectoForm.controls['comision'].setValue(this.compradirecto.comision);
    this.compradirectoForm.controls['mercado'].setValue(this.compradirecto.mercado);
    this.compradirectoForm.controls['instrumento'].setValue(this.compradirecto.instrumento);
    this.compradirectoForm.controls['isr'].setValue(this.compradirecto.isr);
    this.compradirectoForm.controls['moneda'].setValue(this.compradirecto.moneda);
    this.compradirectoForm.controls['fideicomisoId'].setValue(this.compradirecto.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.compradirecto.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.compradirectoForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.compradirectoForm.controls['contratoinversionId'].setValue(this.compradirecto.contratoinversionId);
    this.contratoinversionService
      .getRecuperaContratoinversionPorId(this.compradirecto.contratoinversionId)
      .subscribe(res => {
        if (res) {
          this.contratoinversion = res.json();
          this.compradirectoForm.controls['contratoinversionItem'].setValue(this.contratoinversion.contratoiversion);
        }
      });
    this.compradirectoForm.controls['fechaliquidacion'].setValue(this.compradirecto.fechaliquidacion);
    this.compradirectoForm.controls['emisiones'].setValue(this.compradirecto.emisiones);
    this.compradirectoForm.controls['serie'].setValue(this.compradirecto.serie);
    this.compradirectoForm.controls['notitulos'].setValue(this.compradirecto.notitulos);
    this.compradirectoForm.controls['precio'].setValue(this.compradirecto.precio);
    this.compradirectoForm.controls['desccomplementaria'].setValue(this.compradirecto.desccomplementaria);
    this.compradirectoForm.controls['intereses'].setValue(this.compradirecto.intereses);
    this.compradirectoForm.controls['pizarra'].setValue(this.compradirecto.pizarra);
    this.compradirectoForm.controls['cupon'].setValue(this.compradirecto.cupon);
  }

  eliminaCompradirecto() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idCompradirecto = params['id'];
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
        this.compradirectoService.deleteCompradirecto(this.idCompradirecto).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Compradirecto item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Instrucción de compra de valores save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Instrucción de compra de valores no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Instrucción de compra de valores deleted unsuccessfully", "error");
      }
    });
  }

  regresaCompradirecto() {
    this.location.back();
  }
}
