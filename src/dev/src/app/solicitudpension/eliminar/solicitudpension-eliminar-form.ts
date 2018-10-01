import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Solicitudpension } from '../solicitudpension.demo.model';
import { ValidationService } from '../../_validation/validation.service';
import { SolicitudpensionService } from '../solicitudpension.demo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { AfiliadoService } from '../../afiliado/afiliado.demo.service';
import { TipopensionService } from '../../tipopension/tipopension.demo.service';
import { Afiliado } from '../../afiliado/afiliado.demo.model';
import { Tipopension } from '../../tipopension/tipopension.demo.model';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../solicitudpension.demo.scss'],
  templateUrl: './solicitudpension-eliminar.demo.html',
})
export class SolicitudpensionEliminarFormDemo {
  solicitudpensionForm: FormGroup;
  submitted = false;
  public solicitudpension: Solicitudpension = new Solicitudpension();
  afiliado1Array: Afiliado[];
  tipopension1Array: Tipopension[];

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private solicitudpensionService: SolicitudpensionService,
    private router: Router,
    private route: ActivatedRoute,
    private afiliadoService: AfiliadoService,
    private tipopensionService: TipopensionService
  ) {
    this.solicitudpensionForm = this.fb.group({
      numero: new FormControl(''),
      afiliado1Id: new FormControl(''),
      afiliado1Item: new FormControl(''),
      tipopension1Id: new FormControl(''),
      tipopension1Item: new FormControl(''),
      fechasolicitud: new FormControl(''),
      observaciones: new FormControl(''),
    });
  }

  ngOnInit() {
    this.recuperaSolicitudpension();
    this.cargaAfiliados();
    this.cargaTipopensions();
  }

  recuperaSolicitudpension() {
    this.solicitudpension = this.solicitudpensionService.getSolicitudpension();

    this.solicitudpensionForm.controls['numero'].setValue(this.solicitudpension.numero);
    this.solicitudpensionForm.controls['afiliado1Id'].setValue(this.solicitudpension.afiliado1Id);
    this.solicitudpensionForm.controls['afiliado1Item'].setValue(this.solicitudpension.afiliado1Item);
    this.solicitudpensionForm.controls['tipopension1Id'].setValue(this.solicitudpension.tipopension1Id);
    this.solicitudpensionForm.controls['tipopension1Item'].setValue(this.solicitudpension.tipopension1Item);
    this.solicitudpensionForm.controls['fechasolicitud'].setValue(this.solicitudpension.fechasolicitud);
    this.solicitudpensionForm.controls['observaciones'].setValue(this.solicitudpension.observaciones);
  }

  eliminaSolicitudpension() {
    this.submitted = true;

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
        this.solicitudpensionService.deleteSolicitudpension(this.solicitudpension).subscribe(
          res => {
            if (res.status == 201 || res.status == 200) {
              swal('Success...', 'Solicitudpension item has been deleted successfully.', 'success');
              this.router.navigate(['../../administrar'], { relativeTo: this.route });
            } else {
              swal('Error...', 'Solicitudpension save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Solicitudpension no se puede eliminar debido a que esta asociado con otra entidad.',
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

  cargaAfiliados() {
    this.afiliadoService.getRecuperaAfiliados().subscribe(
      res => {
        if (res) {
          this.afiliado1Array = res;
        }
      },
      error => {
        // swal({
        //   title: 'Error...',
        //   text: 'An error occurred while calling the afiliados.',
        //   type: 'error',
        //   confirmButtonText: 'OK',
        // });

        swal('Error...', 'An error occurred while calling the afiliados.', 'error');
      }
    );
  }

  setClickedRowAfiliado1(index, afiliado1) {
    afiliado1.checked = !afiliado1.checked;
    if (afiliado1.checked) {
      this.afiliadoService.setAfiliado(afiliado1);
      this.solicitudpensionForm.controls['afiliado1Id'].setValue(afiliado1.afiliado1Id);
      this.solicitudpensionForm.controls['afiliado1Item'].setValue(afiliado1.nss);
    } else {
      this.afiliadoService.clear();
      this.solicitudpensionForm.controls['afiliado1Id'].setValue(null);
      this.solicitudpensionForm.controls['afiliado1Item'].setValue('');
    }
  }

  cargaTipopensions() {
    this.tipopensionService.getRecuperaTipopensions().subscribe(
      res => {
        if (res) {
          this.tipopension1Array = res;
        }
      },
      error => {
        // swal({
        //   title: 'Error...',
        //   text: 'An error occurred while calling the afiliados.',
        //   type: 'error',
        //   confirmButtonText: 'OK',
        // });

        swal('Error...', 'An error occurred while calling the tipopensions.', 'error');
      }
    );
  }

  setClickedRowTipopension1(index, tipopension1) {
    tipopension1.checked = !tipopension1.checked;
    if (tipopension1.checked) {
      this.tipopensionService.setTipopension(tipopension1);
      this.solicitudpensionForm.controls['tipopension1Id'].setValue(tipopension1.tipopension1Id);
      this.solicitudpensionForm.controls['tipopension1Item'].setValue(tipopension1.clave);
    } else {
      this.afiliadoService.clear();
      this.solicitudpensionForm.controls['tipopension1Id'].setValue(null);
      this.solicitudpensionForm.controls['tipopension1Item'].setValue('');
    }
  }
}
