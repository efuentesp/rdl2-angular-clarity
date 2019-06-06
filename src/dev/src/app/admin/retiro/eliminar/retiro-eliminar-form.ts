/* PSG  Retiro Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Retiro } from '../retiro.psg.model';
import { RetiroService } from '../retiro.psg.service';

@Component({
  selector: 'clr-retiro-eliminar',
  styleUrls: ['../retiro.psg.scss'],
  templateUrl: './retiro-eliminar.psg.html',
})
export class RetiroEliminarForm {
  retiroForm: FormGroup;
  submitted = false;
  loading = false;
  public retiro: Retiro = new Retiro();
  public idRetiro: string;
  public datePipe = new DatePipe('en-US');
  public id: number;

  // Modal

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private retiroService: RetiroService
  ) {
    this.retiroForm = this.fb.group({
      usuario: new FormControl({ value: '', disabled: true }),
      fechahora: new FormControl({ value: '', disabled: true }),
      archivo: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Retiro eliminar()');

    this.recuperaRetiro();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaRetiro() {
    this.retiro = this.retiroService.getRetiro();
    this.retiroForm.controls['usuario'].setValue(this.retiro.usuario);
    this.retiroForm.controls['fechahora'].setValue(this.retiro.fechahora);
    this.retiroForm.controls['archivo'].setValue(this.retiro.archivo);
  }

  eliminaRetiro() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idRetiro = params['id'];
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
        this.retiroService.deleteRetiro(this.idRetiro).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Retiro item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Retiros save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Retiros no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Retiros deleted unsuccessfully", "error");
      }
    });
  }

  regresaRetiro() {
    this.location.back();
  }
}
