import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../_validation/validation.service';
import { SolicitudpensionService } from '../solicitudpension.demo.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Solicitudpension } from '../solicitudpension.demo.model';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { TipopensionService } from '../../tipopension/tipopension.demo.service';
import { AfiliadoService } from '../../afiliado/afiliado.demo.service';
import { Afiliado } from '../../afiliado/afiliado.demo.model';
import { Tipopension } from '../../tipopension/tipopension.demo.model';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../solicitudpension.demo.scss'],
  templateUrl: './solicitudpension-editar.demo.html',
})
export class SolicitudpensionEditarFormDemo implements OnInit {
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

  editaSolicitudpension() {
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

      console.log('Solicitudpension:', this.solicitudpension);
      this.solicitudpensionService.updateEditaSolicitudpension(this.solicitudpension).subscribe(res => {
        if (res) {
          swal('Success...', 'Solicitudpension save successfully.', 'success');
          this.router.navigate(['../../administrar'], { relativeTo: this.route });
        } else {
          swal('Error...', 'Solicitudpension save unsuccessfully.', 'error');
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
