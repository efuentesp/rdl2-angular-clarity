/* PSG  Cuentacheques Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Cuentacheques } from '../cuentacheques.psg.model';
import { CuentachequesService } from '../cuentacheques.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';
import { FideicomitenteService } from '../../fideicomitente/fideicomitente.psg.service';
import { Fideicomitente } from '../../fideicomitente/fideicomitente.psg.model';

@Component({
  selector: 'clr-cuentacheques-eliminar',
  styleUrls: ['../cuentacheques.psg.scss'],
  templateUrl: './cuentacheques-eliminar.psg.html',
})
export class CuentachequesEliminarForm {
  cuentachequesForm: FormGroup;
  submitted = false;
  loading = false;
  public cuentacheques: Cuentacheques = new Cuentacheques();
  public idCuentacheques: string;
  public datePipe = new DatePipe('en-US');
  public id: number;

  public fideicomisoArray: Fideicomiso[];
  public fideicomiso: Fideicomiso;
  public fideicomitenteArray: Fideicomitente[];
  public fideicomitente: Fideicomitente;

  // Modal
  modalfideicomiso: boolean = false;
  modalfideicomitente: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private fideicomitenteService: FideicomitenteService,
    private cuentachequesService: CuentachequesService
  ) {
    this.cuentachequesForm = this.fb.group({
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      tipopersona: new FormControl({ value: '', disabled: true }),
      tipopersonaItem: new FormControl({ value: '', disabled: true }),
      fideicomitenteId: new FormControl({ value: '', disabled: true }),
      fideicomitenteItem: new FormControl({ value: '', disabled: true }),
      tipocuenta: new FormControl({ value: '', disabled: true }),
      tipocuentaItem: new FormControl({ value: '', disabled: true }),
      tipopago: new FormControl({ value: '', disabled: true }),
      tipopagoItem: new FormControl({ value: '', disabled: true }),
      bancospei: new FormControl({ value: '', disabled: true }),
      bancospeiItem: new FormControl({ value: '', disabled: true }),
      banco: new FormControl({ value: '', disabled: true }),
      bancoItem: new FormControl({ value: '', disabled: true }),
      dombanco: new FormControl({ value: '', disabled: true }),
      moneda: new FormControl({ value: '', disabled: true }),
      monedaItem: new FormControl({ value: '', disabled: true }),
      clavevostro: new FormControl({ value: '', disabled: true }),
      clavevostroItem: new FormControl({ value: '', disabled: true }),
      numcuenta: new FormControl({ value: '', disabled: true }),
      dombeneficiario: new FormControl({ value: '', disabled: true }),
      plazainternacional: new FormControl({ value: '', disabled: true }),
      pais: new FormControl({ value: '', disabled: true }),
      clavesiacinst: new FormControl({ value: '', disabled: true }),
      conveniociedie: new FormControl({ value: '', disabled: true }),
      estatus: new FormControl({ value: '', disabled: true }),
      estatusItem: new FormControl({ value: '', disabled: true }),
      clabe: new FormControl({ value: '', disabled: true }),
      cuentachequera: new FormControl({ value: '', disabled: true }),
      cuentachequeraItem: new FormControl({ value: '', disabled: true }),
      fechavence: new FormControl({ value: '', disabled: true }),
      numabbasswift: new FormControl({ value: '', disabled: true }),
      conceptosiac: new FormControl({ value: '', disabled: true }),
      refciedie: new FormControl({ value: '', disabled: true }),
      autorizacion: new FormControl({ value: '', disabled: true }),
      autorizacionItem: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Cuentacheques eliminar()');

    this.recuperaCuentacheques();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaCuentacheques() {
    this.cuentacheques = this.cuentachequesService.getCuentacheques();
    this.cuentachequesForm.controls['fideicomisoId'].setValue(this.cuentacheques.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.cuentacheques.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.cuentachequesForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.cuentachequesForm.controls['tipopersona'].setValue(this.cuentacheques.tipopersona);
    this.cuentachequesForm.controls['fideicomitenteId'].setValue(this.cuentacheques.fideicomitenteId);
    this.fideicomitenteService.getRecuperaFideicomitentePorId(this.cuentacheques.fideicomitenteId).subscribe(res => {
      if (res) {
        this.fideicomitente = res.json();
        this.cuentachequesForm.controls['fideicomitenteItem'].setValue(this.fideicomitente.numerofideicomitente);
      }
    });
    this.cuentachequesForm.controls['tipocuenta'].setValue(this.cuentacheques.tipocuenta);
    this.cuentachequesForm.controls['tipopago'].setValue(this.cuentacheques.tipopago);
    this.cuentachequesForm.controls['bancospei'].setValue(this.cuentacheques.bancospei);
    this.cuentachequesForm.controls['banco'].setValue(this.cuentacheques.banco);
    this.cuentachequesForm.controls['dombanco'].setValue(this.cuentacheques.dombanco);
    this.cuentachequesForm.controls['moneda'].setValue(this.cuentacheques.moneda);
    this.cuentachequesForm.controls['clavevostro'].setValue(this.cuentacheques.clavevostro);
    this.cuentachequesForm.controls['numcuenta'].setValue(this.cuentacheques.numcuenta);
    this.cuentachequesForm.controls['dombeneficiario'].setValue(this.cuentacheques.dombeneficiario);
    this.cuentachequesForm.controls['plazainternacional'].setValue(this.cuentacheques.plazainternacional);
    this.cuentachequesForm.controls['pais'].setValue(this.cuentacheques.pais);
    this.cuentachequesForm.controls['clavesiacinst'].setValue(this.cuentacheques.clavesiacinst);
    this.cuentachequesForm.controls['conveniociedie'].setValue(this.cuentacheques.conveniociedie);
    this.cuentachequesForm.controls['estatus'].setValue(this.cuentacheques.estatus);
    this.cuentachequesForm.controls['clabe'].setValue(this.cuentacheques.clabe);
    this.cuentachequesForm.controls['cuentachequera'].setValue(this.cuentacheques.cuentachequera);
    this.cuentachequesForm.controls['fechavence'].setValue(this.cuentacheques.fechavence);
    this.cuentachequesForm.controls['numabbasswift'].setValue(this.cuentacheques.numabbasswift);
    this.cuentachequesForm.controls['conceptosiac'].setValue(this.cuentacheques.conceptosiac);
    this.cuentachequesForm.controls['refciedie'].setValue(this.cuentacheques.refciedie);
    this.cuentachequesForm.controls['autorizacion'].setValue(this.cuentacheques.autorizacion);
  }

  eliminaCuentacheques() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idCuentacheques = params['id'];
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
        this.cuentachequesService.deleteCuentacheques(this.idCuentacheques).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Cuentacheques item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Cuenta de cheques save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Cuenta de cheques no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Cuenta de cheques deleted unsuccessfully", "error");
      }
    });
  }

  regresaCuentacheques() {
    this.location.back();
  }
}
