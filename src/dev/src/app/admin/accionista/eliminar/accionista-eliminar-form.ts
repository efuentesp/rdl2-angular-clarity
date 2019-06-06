/* PSG  Accionista Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Accionista } from '../accionista.psg.model';
import { AccionistaService } from '../accionista.psg.service';

@Component({
  selector: 'clr-accionista-eliminar',
  styleUrls: ['../accionista.psg.scss'],
  templateUrl: './accionista-eliminar.psg.html',
})
export class AccionistaEliminarForm {
  accionistaForm: FormGroup;
  submitted = false;
  loading = false;
  public accionista: Accionista = new Accionista();
  public idAccionista: string;
  public datePipe = new DatePipe('en-US');
  public id: number;

  // Modal

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private accionistaService: AccionistaService
  ) {
    this.accionistaForm = this.fb.group({
      accionistade: new FormControl({ value: '', disabled: true }),
      nombre: new FormControl({ value: '', disabled: true }),
      rfc: new FormControl({ value: '', disabled: true }),
      porcentajeparticipacionaccionaria: new FormControl({ value: '', disabled: true }),
      tipopersona: new FormControl({ value: '', disabled: true }),
      tipopersonaItem: new FormControl({ value: '', disabled: true }),
      nacionalidad: new FormControl({ value: '', disabled: true }),
      nacionalidadItem: new FormControl({ value: '', disabled: true }),
      pep: new FormControl({ value: '', disabled: true }),
      pepItem: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Accionista eliminar()');

    this.recuperaAccionista();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaAccionista() {
    this.accionista = this.accionistaService.getAccionista();
    this.accionistaForm.controls['accionistade'].setValue(this.accionista.accionistade);
    this.accionistaForm.controls['nombre'].setValue(this.accionista.nombre);
    this.accionistaForm.controls['rfc'].setValue(this.accionista.rfc);
    this.accionistaForm.controls['porcentajeparticipacionaccionaria'].setValue(
      this.accionista.porcentajeparticipacionaccionaria
    );
    this.accionistaForm.controls['tipopersona'].setValue(this.accionista.tipopersona);
    this.accionistaForm.controls['nacionalidad'].setValue(this.accionista.nacionalidad);
    this.accionistaForm.controls['pep'].setValue(this.accionista.pep);
  }

  eliminaAccionista() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idAccionista = params['id'];
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
        this.accionistaService.deleteAccionista(this.idAccionista).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Accionista item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Accionista save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Accionista no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Accionista deleted unsuccessfully", "error");
      }
    });
  }

  regresaAccionista() {
    this.location.back();
  }
}
