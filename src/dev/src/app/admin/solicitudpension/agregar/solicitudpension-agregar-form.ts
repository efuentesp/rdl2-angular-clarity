import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../../../_validation/validation.service';
import { SolicitudpensionService } from '../solicitudpension.demo.service';
import { Solicitudpension } from '../solicitudpension.demo.model';
import { User } from '../inventory/user';
import swal from 'sweetalert2';
import { AfiliadoService } from '../../afiliado/afiliado.demo.service';
import { TipopensionService } from '../../tipopension/tipopension.demo.service';
import { Tipopension } from '../../tipopension/tipopension.demo.model';
import { Afiliado } from '../../afiliado/afiliado.demo.model';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../solicitudpension.demo.scss'],
  templateUrl: './solicitudpension-agregar.demo.html',
})
export class SolicitudpensionAgregarFormDemo implements OnInit {
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
      numero: new FormControl('', Validators.required),
      afiliado1Id: new FormControl(''),
      afiliado1Item: new FormControl('', Validators.required),
      tipopension1Id: new FormControl(''),
      tipopension1Item: new FormControl('', Validators.required),
      fechasolicitud: new FormControl('', Validators.required),
      observaciones: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.cargaAfiliados();
    this.cargaTipopensions();
  }

  guardaSolicitudpension() {
    this.submitted = true;

    if (this.solicitudpensionForm.invalid) {
      return;
    } else {
      this.solicitudpension.numero = this.solicitudpensionForm.controls['numero'].value;
      this.solicitudpension.afiliado1Id = this.solicitudpensionForm.controls['afiliado1Id'].value;
      this.solicitudpension.afiliado1Item = this.solicitudpensionForm.controls['afiliado1Item'].value;
      this.solicitudpension.tipopension1Id = this.solicitudpensionForm.controls['tipopension1Id'].value;
      this.solicitudpension.tipopension1Item = this.solicitudpensionForm.controls['tipopension1Item'].value;
      this.solicitudpension.fechasolicitud = this.solicitudpensionForm.controls['fechasolicitud'].value;
      this.solicitudpension.observaciones = this.solicitudpensionForm.controls['observaciones'].value;

      this.solicitudpensionService.postGuardaSolicitudpension(this.solicitudpension).subscribe(res => {
        if (res.status == 201 || res.status == 200) {
          swal('Success...', 'Etiquetaasignada save successfully.', 'success');
          this.router.navigate(['../../administrar'], { relativeTo: this.route });
        } else {
          swal('Error...', 'Etiquetaasignada save unsuccessfully.', 'error');
        }
      });
    }
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
