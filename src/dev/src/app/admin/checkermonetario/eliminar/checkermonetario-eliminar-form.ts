/* PSG  Checkermonetario Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Checkermonetario } from '../checkermonetario.psg.model';
import { CheckermonetarioService } from '../checkermonetario.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';
import { InstruccionService } from '../../instruccion/instruccion.psg.service';
import { Instruccion } from '../../instruccion/instruccion.psg.model';
import { TransaccionService } from '../../transaccion/transaccion.psg.service';
import { Transaccion } from '../../transaccion/transaccion.psg.model';

@Component({
  selector: 'clr-checkermonetario-eliminar',
  styleUrls: ['../checkermonetario.psg.scss'],
  templateUrl: './checkermonetario-eliminar.psg.html',
})
export class CheckermonetarioEliminarForm {
  checkermonetarioForm: FormGroup;
  submitted = false;
  loading = false;
  public checkermonetario: Checkermonetario = new Checkermonetario();
  public idCheckermonetario: string;
  public datePipe = new DatePipe('en-US');
  public id: number;

  public fideicomisoArray: Fideicomiso[];
  public fideicomiso: Fideicomiso;
  public subfisoArray: Subfiso[];
  public subfiso: Subfiso;
  public instruccionArray: Instruccion[];
  public instruccion: Instruccion;
  public transaccionArray: Transaccion[];
  public transaccion: Transaccion;

  // Modal
  modalfideicomiso: boolean = false;
  modalsubfiso: boolean = false;
  modalinstruccion: boolean = false;
  modaltransaccion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private subfisoService: SubfisoService,
    private instruccionService: InstruccionService,
    private transaccionService: TransaccionService,
    private checkermonetarioService: CheckermonetarioService
  ) {
    this.checkermonetarioForm = this.fb.group({
      foliooperacion: new FormControl({ value: '', disabled: true }),
      operador: new FormControl({ value: '', disabled: true }),
      tipoliquidacion: new FormControl({ value: '', disabled: true }),
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      subfisoId: new FormControl({ value: '', disabled: true }),
      subfisoItem: new FormControl({ value: '', disabled: true }),
      instruccionId: new FormControl({ value: '', disabled: true }),
      instruccionItem: new FormControl({ value: '', disabled: true }),
      importe: new FormControl({ value: '', disabled: true }),
      fechapago: new FormControl({ value: '', disabled: true }),
      numeroliquidaciones: new FormControl({ value: '', disabled: true }),
      transaccionId: new FormControl({ value: '', disabled: true }),
      transaccionItem: new FormControl({ value: '', disabled: true }),
      moneda: new FormControl({ value: '', disabled: true }),
      monedaItem: new FormControl({ value: '', disabled: true }),
      estatus: new FormControl({ value: '', disabled: true }),
      estatusItem: new FormControl({ value: '', disabled: true }),
      fecha: new FormControl({ value: '', disabled: true }),
      operado: new FormControl({ value: '', disabled: true }),
      autorizo: new FormControl({ value: '', disabled: true }),
      fechaautorizado: new FormControl({ value: '', disabled: true }),
      numerofirma: new FormControl({ value: '', disabled: true }),
      nombrefirma: new FormControl({ value: '', disabled: true }),
      fechafirma: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Checkermonetario eliminar()');

    this.recuperaCheckermonetario();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaCheckermonetario() {
    this.checkermonetario = this.checkermonetarioService.getCheckermonetario();
    this.checkermonetarioForm.controls['foliooperacion'].setValue(this.checkermonetario.foliooperacion);
    this.checkermonetarioForm.controls['operador'].setValue(this.checkermonetario.operador);
    this.checkermonetarioForm.controls['tipoliquidacion'].setValue(this.checkermonetario.tipoliquidacion);
    this.checkermonetarioForm.controls['fideicomisoId'].setValue(this.checkermonetario.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.checkermonetario.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.checkermonetarioForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.checkermonetarioForm.controls['subfisoId'].setValue(this.checkermonetario.subfisoId);
    this.subfisoService.getRecuperaSubfisoPorId(this.checkermonetario.subfisoId).subscribe(res => {
      if (res) {
        this.subfiso = res.json();
        this.checkermonetarioForm.controls['subfisoItem'].setValue(this.subfiso.numero);
      }
    });
    this.checkermonetarioForm.controls['instruccionId'].setValue(this.checkermonetario.instruccionId);
    this.instruccionService.getRecuperaInstruccionPorId(this.checkermonetario.instruccionId).subscribe(res => {
      if (res) {
        this.instruccion = res.json();
        this.checkermonetarioForm.controls['instruccionItem'].setValue(this.instruccion.folio);
      }
    });
    this.checkermonetarioForm.controls['importe'].setValue(this.checkermonetario.importe);
    this.checkermonetarioForm.controls['fechapago'].setValue(this.checkermonetario.fechapago);
    this.checkermonetarioForm.controls['numeroliquidaciones'].setValue(this.checkermonetario.numeroliquidaciones);
    this.checkermonetarioForm.controls['transaccionId'].setValue(this.checkermonetario.transaccionId);
    this.transaccionService.getRecuperaTransaccionPorId(this.checkermonetario.transaccionId).subscribe(res => {
      if (res) {
        this.transaccion = res.json();
        this.checkermonetarioForm.controls['transaccionItem'].setValue(this.transaccion.notransaccion);
      }
    });
    this.checkermonetarioForm.controls['moneda'].setValue(this.checkermonetario.moneda);
    this.checkermonetarioForm.controls['estatus'].setValue(this.checkermonetario.estatus);
    this.checkermonetarioForm.controls['fecha'].setValue(this.checkermonetario.fecha);
    this.checkermonetarioForm.controls['operado'].setValue(this.checkermonetario.operado);
    this.checkermonetarioForm.controls['autorizo'].setValue(this.checkermonetario.autorizo);
    this.checkermonetarioForm.controls['fechaautorizado'].setValue(this.checkermonetario.fechaautorizado);
    this.checkermonetarioForm.controls['numerofirma'].setValue(this.checkermonetario.numerofirma);
    this.checkermonetarioForm.controls['nombrefirma'].setValue(this.checkermonetario.nombrefirma);
    this.checkermonetarioForm.controls['fechafirma'].setValue(this.checkermonetario.fechafirma);
  }

  eliminaCheckermonetario() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idCheckermonetario = params['id'];
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
        this.checkermonetarioService.deleteCheckermonetario(this.idCheckermonetario).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Checkermonetario item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Monetario save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Monetario no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Monetario deleted unsuccessfully", "error");
      }
    });
  }

  regresaCheckermonetario() {
    this.location.back();
  }
}
