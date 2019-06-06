/* PSG  Aplicacionpagoscontrolados Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Aplicacionpagoscontrolados } from '../aplicacionpagoscontrolados.psg.model';
import { AplicacionpagoscontroladosService } from '../aplicacionpagoscontrolados.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { SubfisoService } from '../../subfiso/subfiso.psg.service';
import { Subfiso } from '../../subfiso/subfiso.psg.model';

@Component({
  selector: 'clr-aplicacionpagoscontrolados-eliminar',
  styleUrls: ['../aplicacionpagoscontrolados.psg.scss'],
  templateUrl: './aplicacionpagoscontrolados-eliminar.psg.html',
})
export class AplicacionpagoscontroladosEliminarForm {
  aplicacionpagoscontroladosForm: FormGroup;
  submitted = false;
  loading = false;
  public aplicacionpagoscontrolados: Aplicacionpagoscontrolados = new Aplicacionpagoscontrolados();
  public idAplicacionpagoscontrolados: string;
  public datePipe = new DatePipe('en-US');
  public id: number;

  public fideicomisoArray: Fideicomiso[];
  public fideicomiso: Fideicomiso;
  public subfisoArray: Subfiso[];
  public subfiso: Subfiso;

  // Modal
  modalfideicomiso: boolean = false;
  modalsubfiso: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private subfisoService: SubfisoService,
    private aplicacionpagoscontroladosService: AplicacionpagoscontroladosService
  ) {
    this.aplicacionpagoscontroladosForm = this.fb.group({
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      subfisoId: new FormControl({ value: '', disabled: true }),
      subfisoItem: new FormControl({ value: '', disabled: true }),
      importe: new FormControl({ value: '', disabled: true }),
      importepago: new FormControl({ value: '', disabled: true }),
      formapago: new FormControl({ value: '', disabled: true }),
      formapagoItem: new FormControl({ value: '', disabled: true }),
      tipocomision: new FormControl({ value: '', disabled: true }),
      tipocomisionItem: new FormControl({ value: '', disabled: true }),
      iva: new FormControl({ value: '', disabled: true }),
      moneda: new FormControl({ value: '', disabled: true }),
      monedaItem: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Aplicacionpagoscontrolados eliminar()');

    this.recuperaAplicacionpagoscontrolados();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaAplicacionpagoscontrolados() {
    this.aplicacionpagoscontrolados = this.aplicacionpagoscontroladosService.getAplicacionpagoscontrolados();
    this.aplicacionpagoscontroladosForm.controls['fideicomisoId'].setValue(
      this.aplicacionpagoscontrolados.fideicomisoId
    );
    this.fideicomisoService
      .getRecuperaFideicomisoPorId(this.aplicacionpagoscontrolados.fideicomisoId)
      .subscribe(res => {
        if (res) {
          this.fideicomiso = res.json();
          this.aplicacionpagoscontroladosForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
        }
      });
    this.aplicacionpagoscontroladosForm.controls['subfisoId'].setValue(this.aplicacionpagoscontrolados.subfisoId);
    this.subfisoService.getRecuperaSubfisoPorId(this.aplicacionpagoscontrolados.subfisoId).subscribe(res => {
      if (res) {
        this.subfiso = res.json();
        this.aplicacionpagoscontroladosForm.controls['subfisoItem'].setValue(this.subfiso.numero);
      }
    });
    this.aplicacionpagoscontroladosForm.controls['importe'].setValue(this.aplicacionpagoscontrolados.importe);
    this.aplicacionpagoscontroladosForm.controls['importepago'].setValue(this.aplicacionpagoscontrolados.importepago);
    this.aplicacionpagoscontroladosForm.controls['formapago'].setValue(this.aplicacionpagoscontrolados.formapago);
    this.aplicacionpagoscontroladosForm.controls['tipocomision'].setValue(this.aplicacionpagoscontrolados.tipocomision);
    this.aplicacionpagoscontroladosForm.controls['iva'].setValue(this.aplicacionpagoscontrolados.iva);
    this.aplicacionpagoscontroladosForm.controls['moneda'].setValue(this.aplicacionpagoscontrolados.moneda);
  }

  eliminaAplicacionpagoscontrolados() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idAplicacionpagoscontrolados = params['id'];
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
        this.aplicacionpagoscontroladosService
          .deleteAplicacionpagoscontrolados(this.idAplicacionpagoscontrolados)
          .subscribe(
            res => {
              if (res) {
                swal('Success...', 'Aplicacionpagoscontrolados item has been deleted successfully.', 'success');
                this.location.back();
              } else {
                swal('Error...', 'Aplicación de pagos controlados save unsuccessfully.', 'error');
              }
            },
            error => {
              if (error.status == 500) {
                swal(
                  'Warning...',
                  'Aplicación de pagos controlados no se puede eliminar debido a que esta asociado con otra entidad.',
                  'warning'
                );
              }
            }
          );
      } else {
        //swal("Cancelled", "Aplicación de pagos controlados deleted unsuccessfully", "error");
      }
    });
  }

  regresaAplicacionpagoscontrolados() {
    this.location.back();
  }
}
