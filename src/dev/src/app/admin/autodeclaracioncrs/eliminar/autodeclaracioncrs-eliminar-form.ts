/* PSG  Autodeclaracioncrs Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Autodeclaracioncrs } from '../autodeclaracioncrs.psg.model';
import { AutodeclaracioncrsService } from '../autodeclaracioncrs.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-autodeclaracioncrs-eliminar',
  styleUrls: ['../autodeclaracioncrs.psg.scss'],
  templateUrl: './autodeclaracioncrs-eliminar.psg.html',
})
export class AutodeclaracioncrsEliminarForm {
  autodeclaracioncrsForm: FormGroup;
  submitted = false;
  loading = false;
  public autodeclaracioncrs: Autodeclaracioncrs = new Autodeclaracioncrs();
  public idAutodeclaracioncrs: string;
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
    private autodeclaracioncrsService: AutodeclaracioncrsService
  ) {
    this.autodeclaracioncrsForm = this.fb.group({
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      numero: new FormControl({ value: '', disabled: true }),
      nombre: new FormControl({ value: '', disabled: true }),
      tipopersona: new FormControl({ value: '', disabled: true }),
      tipopersonaItem: new FormControl({ value: '', disabled: true }),
      tipoparticipante: new FormControl({ value: '', disabled: true }),
      tipoparticipanteItem: new FormControl({ value: '', disabled: true }),
      formatocrs: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Autodeclaracioncrs eliminar()');

    this.recuperaAutodeclaracioncrs();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaAutodeclaracioncrs() {
    this.autodeclaracioncrs = this.autodeclaracioncrsService.getAutodeclaracioncrs();
    this.autodeclaracioncrsForm.controls['fideicomisoId'].setValue(this.autodeclaracioncrs.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.autodeclaracioncrs.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.autodeclaracioncrsForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.autodeclaracioncrsForm.controls['numero'].setValue(this.autodeclaracioncrs.numero);
    this.autodeclaracioncrsForm.controls['nombre'].setValue(this.autodeclaracioncrs.nombre);
    this.autodeclaracioncrsForm.controls['tipopersona'].setValue(this.autodeclaracioncrs.tipopersona);
    this.autodeclaracioncrsForm.controls['tipoparticipante'].setValue(this.autodeclaracioncrs.tipoparticipante);
    this.autodeclaracioncrsForm.controls['formatocrs'].setValue(this.autodeclaracioncrs.formatocrs);
  }

  eliminaAutodeclaracioncrs() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idAutodeclaracioncrs = params['id'];
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
        this.autodeclaracioncrsService.deleteAutodeclaracioncrs(this.idAutodeclaracioncrs).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Autodeclaracioncrs item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Autodeclaración CRS save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Autodeclaración CRS no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Autodeclaración CRS deleted unsuccessfully", "error");
      }
    });
  }

  regresaAutodeclaracioncrs() {
    this.location.back();
  }
}
