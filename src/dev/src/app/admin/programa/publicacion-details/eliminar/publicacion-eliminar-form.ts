import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../../../_validation/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { Publicacion } from '../../../publicacion/publicacion.psg.model';
import { PublicacionService } from '../../../publicacion/publicacion.psg.service';

@Component({
  selector: 'clr-publicacion-angular',
  templateUrl: './publicacion-eliminar.psg.html',
})
export class PublicacionDetailsEliminarFormDemo {
  publicacionForm: FormGroup;
  submitted = false;
  public publicacion: Publicacion = new Publicacion();
  public idPublicacion: string;
  public idPrograma: string = '';
  public datePipe = new DatePipe('en-US');

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute,
    private publicacionService: PublicacionService
  ) {
    this.publicacionForm = this.fb.group({
      nombreobra: new FormControl({ value: '', disabled: true }),
      tiposubsistema: new FormControl({ value: '', disabled: true }),
      tiposubsistemaItem: new FormControl({ value: '', disabled: true }),
      tiponivel: new FormControl({ value: '', disabled: true }),
      tiponivelItem: new FormControl({ value: '', disabled: true }),
      tipoarea: new FormControl({ value: '', disabled: true }),
      tipoareaItem: new FormControl({ value: '', disabled: true }),
      fechapublicacionAux: new FormControl({ value: '', disabled: true }),
      autor: new FormControl({ value: '', disabled: true }),
      familiarizaId: new FormControl({ value: '', disabled: true }),
      familiarizaItem: new FormControl({ value: '', disabled: true }),
      comunicadoId: new FormControl({ value: '', disabled: true }),
      comunicadoItem: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idPrograma = params['id'];
    });
    this.recuperaPublicacion();
  }

  recuperaPublicacion() {
    this.publicacion = this.publicacionService.getPublicacion();
    this.publicacionForm.controls['nombreobra'].setValue(this.publicacion.nombreobra);
    this.publicacionForm.controls['tiposubsistema'].setValue(this.publicacion.tiposubsistema);
    this.publicacionForm.controls['tiponivel'].setValue(this.publicacion.tiponivel);
    this.publicacionForm.controls['tipoarea'].setValue(this.publicacion.tipoarea);
    this.publicacionForm.controls['fechapublicacionAux'].setValue(
      this.datePipe.transform(this.publicacion.fechapublicacion, 'dd/MM/yyyy')
    );
    this.publicacionForm.controls['autor'].setValue(this.publicacion.autor);
    this.publicacionForm.controls['familiarizaId'].setValue(this.publicacion.familiarizaId);
    this.publicacionForm.controls['comunicadoId'].setValue(this.publicacion.comunicadoId);
  }

  eliminaPublicacion() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idPublicacion = params['id'];
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
        this.publicacionService.deletePublicacion(this.idPublicacion).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Publicacion item has been deleted successfully.', 'success');
              this.router.navigate(['../../../publicacion-details/administrar/', this.idPublicacion], {
                relativeTo: this.route,
              });
            } else {
              swal('Error...', 'Publicacion save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Publicacion no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Ordensimplificada deleted unsuccessfully", "error");
      }
    });
  }

  regresaPublicacion() {
    // DETAILS this.router.navigate(['../../../publicacion-details/administrar/', this.idPrograma], { relativeTo: this.route });
  }
}
