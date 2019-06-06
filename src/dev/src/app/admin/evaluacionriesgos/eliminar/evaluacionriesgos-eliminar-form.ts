/* PSG  Evaluacionriesgos Elimina Ts */
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Evaluacionriesgos } from '../evaluacionriesgos.psg.model';
import { EvaluacionriesgosService } from '../evaluacionriesgos.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-evaluacionriesgos-eliminar',
  styleUrls: ['../evaluacionriesgos.psg.scss'],
  templateUrl: './evaluacionriesgos-eliminar.psg.html',
})
export class EvaluacionriesgosEliminarForm {
  evaluacionriesgosForm: FormGroup;
  submitted = false;
  loading = false;
  public evaluacionriesgos: Evaluacionriesgos = new Evaluacionriesgos();
  public idEvaluacionriesgos: string;
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
    private evaluacionriesgosService: EvaluacionriesgosService
  ) {
    this.evaluacionriesgosForm = this.fb.group({
      campo: new FormControl({ value: '', disabled: true }),
      fideicomisoId: new FormControl({ value: '', disabled: true }),
      fideicomisoItem: new FormControl({ value: '', disabled: true }),
      cliente: new FormControl({ value: '', disabled: true }),
      clienteItem: new FormControl({ value: '', disabled: true }),
      estructura: new FormControl({ value: '', disabled: true }),
      estructuraItem: new FormControl({ value: '', disabled: true }),
      resultadofinal: new FormControl({ value: '', disabled: true }),
      resultadofinalItem: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit() {
    console.log('Evaluacionriesgos eliminar()');

    this.recuperaEvaluacionriesgos();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaEvaluacionriesgos() {
    this.evaluacionriesgos = this.evaluacionriesgosService.getEvaluacionriesgos();
    this.evaluacionriesgosForm.controls['campo'].setValue(this.evaluacionriesgos.campo);
    this.evaluacionriesgosForm.controls['fideicomisoId'].setValue(this.evaluacionriesgos.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.evaluacionriesgos.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.evaluacionriesgosForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });
    this.evaluacionriesgosForm.controls['cliente'].setValue(this.evaluacionriesgos.cliente);
    this.evaluacionriesgosForm.controls['estructura'].setValue(this.evaluacionriesgos.estructura);
    this.evaluacionriesgosForm.controls['resultadofinal'].setValue(this.evaluacionriesgos.resultadofinal);
  }

  eliminaEvaluacionriesgos() {
    this.submitted = true;

    this.route.params.subscribe(params => {
      this.idEvaluacionriesgos = params['id'];
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
        this.evaluacionriesgosService.deleteEvaluacionriesgos(this.idEvaluacionriesgos).subscribe(
          res => {
            if (res) {
              swal('Success...', 'Evaluacionriesgos item has been deleted successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Resultados de la Evaluación de Riesgos save unsuccessfully.', 'error');
            }
          },
          error => {
            if (error.status == 500) {
              swal(
                'Warning...',
                'Resultados de la Evaluación de Riesgos no se puede eliminar debido a que esta asociado con otra entidad.',
                'warning'
              );
            }
          }
        );
      } else {
        //swal("Cancelled", "Resultados de la Evaluación de Riesgos deleted unsuccessfully", "error");
      }
    });
  }

  regresaEvaluacionriesgos() {
    this.location.back();
  }
}
