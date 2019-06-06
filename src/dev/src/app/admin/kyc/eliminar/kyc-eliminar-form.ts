/* PSG  Kyc Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Kyc } from '../kyc.psg.model';
import { KycService } from '../kyc.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-kyc-eliminar',
  styleUrls: ['../kyc.psg.scss'],
  templateUrl: './kyc-eliminar.psg.html',
})
export class KycEliminarForm {
  kycForm: FormGroup;
  submitted = false;
  loading = false;
  public kyc: Kyc = new Kyc();
  public idKyc: string;
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
    private kycService: KycService
  ) {
    this.kycForm = this.fb.group({
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      nombre: new FormControl({ value: '', disabled: true }),
      numregistro: new FormControl({ value: '', disabled: true }),
      oficina: new FormControl({ value: '', disabled: true }),
      conceptoimpresion: new FormControl({ value: '', disabled: true }),
      conceptoimpresionItem: new FormControl({ value: '', disabled: true }),
      crbanca: new FormControl({ value: '', disabled: true }),
      folio: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Kyc eliminar()');

    this.recuperaKyc();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaKyc() {
    this.kyc = this.kycService.getKyc();
    this.kycForm.controls['fideicomisoId'].setValue(this.kyc.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.kyc.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.kycForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.kycForm.controls['nombre'].setValue(this.kyc.nombre);
    this.kycForm.controls['numregistro'].setValue(this.kyc.numregistro);
    this.kycForm.controls['oficina'].setValue(this.kyc.oficina);
    this.kycForm.controls['conceptoimpresion'].setValue(this.kyc.conceptoimpresion);
    this.kycForm.controls['crbanca'].setValue(this.kyc.crbanca);
    this.kycForm.controls['folio'].setValue(this.kyc.folio);
  }

  eliminaKyc() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idKyc = params['id'];
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
        this.kycService.deleteKyc(this.idKyc).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Kyc item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Generar KYC save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Generar KYC no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Generar KYC deleted unsuccessfully", "error");
      }
    });
  }

  regresaKyc() {
    this.location.back();
  }
}
