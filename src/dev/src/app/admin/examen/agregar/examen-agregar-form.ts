import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, FormArray } from '@angular/forms';

import { Examen } from '../examen.psg.model';
import { ExamenSend } from '../examen.psg.model-send';
import { ExamenService } from '../examen.psg.service';

import swal from 'sweetalert2';
import { ValidationService } from '../../../_validation/validation.service';

import { OpcionService } from '../../opcion/opcion.psg.service';
import { Opcion } from '../../opcion/opcion.psg.model';
import { PreguntaService } from '../../pregunta/pregunta.psg.service';
import { Pregunta } from '../../pregunta/pregunta.psg.model';
import { PublicacionService } from '../../publicacion/publicacion.psg.service';
import { Publicacion } from '../../publicacion/publicacion.psg.model';
import { ProgramaService } from '../../programa/programa.psg.service';
import { Programa } from '../../programa/programa.psg.model';
import { GrupoaService } from '../../grupoa/grupoa.psg.service';
import { Grupoa } from '../../grupoa/grupoa.psg.model';
import { RecursoService } from '../../recurso/recurso.psg.service';
import { Recurso } from '../../recurso/recurso.psg.model';
import { UnidadService } from '../../unidad/unidad.psg.service';
import { Unidad } from '../../unidad/unidad.psg.model';
import { CertificacionService } from '../../certificacion/certificacion.psg.service';
import { Certificacion } from '../../certificacion/certificacion.psg.model';
import { ProfesorService } from '../../profesor/profesor.psg.service';
import { Profesor } from '../../profesor/profesor.psg.model';
import { EstudianteService } from '../../estudiante/estudiante.psg.service';
import { Estudiante } from '../../estudiante/estudiante.psg.model';
import { RegistroService } from '../../registro/registro.psg.service';
import { Registro } from '../../registro/registro.psg.model';
import { InstitucionService } from '../../institucion/institucion.psg.service';
import { Institucion } from '../../institucion/institucion.psg.model';
import { EventoService } from '../../evento/evento.psg.service';
import { Evento } from '../../evento/evento.psg.model';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../examen.psg.scss'],
  templateUrl: './examen-agregar.psg.html',
})
export class ExamenAgregarFormDemo implements OnInit {
  examenForm: FormGroup;
  submitted = false;
  public examen: Examen = new Examen();
  public examenSend: ExamenSend = new ExamenSend();

  public correspondeArray: Publicacion[];

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute,
    private opcionService: OpcionService,
    private preguntaService: PreguntaService,
    private publicacionService: PublicacionService,
    private programaService: ProgramaService,
    private grupoaService: GrupoaService,
    private recursoService: RecursoService,
    private unidadService: UnidadService,
    private certificacionService: CertificacionService,
    private profesorService: ProfesorService,
    private estudianteService: EstudianteService,
    private registroService: RegistroService,
    private institucionService: InstitucionService,
    private eventoService: EventoService,
    private examenService: ExamenService
  ) {
    this.examenForm = this.fb.group({
      correspondeId: new FormControl('', Validators.required),
      correspondeItem: new FormControl(''),
      nombreexamen: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.cargaCorresponde();
  }

  guardaExamen() {
    this.submitted = true;

    if (this.examenForm.invalid) {
      return;
    } else {
      this.examenSend.correspondeId = this.examenForm.controls['correspondeId'].value;
      this.examenSend.nombreexamen = this.examenForm.controls['nombreexamen'].value;

      this.examenService.postGuardaExamen(this.examenSend).subscribe(
        res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Examen save successfully.', 'success');
              this.router.navigate(['../administrar'], { relativeTo: this.route });
            }
          }
        },
        error => {
          swal('Error...', 'Examen save unsuccessfully.', 'error');
        }
      );
    }
  }

  cargaCorresponde() {
    this.publicacionService.getRecuperaPublicacion().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.correspondeArray = res.json();
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the publicacions.', 'error');
      }
    );
  }

  setClickedRowCorresponde(index, corresponde) {
    corresponde.checked = !corresponde.checked;
    if (corresponde.checked) {
      this.publicacionService.setPublicacion(corresponde);

      this.examenForm.controls['correspondeId'].setValue(corresponde.id);
      this.examenForm.controls['correspondeItem'].setValue(corresponde.nombreobra);
    } else {
      this.publicacionService.clear();
      this.examenForm.controls['correspondeId'].setValue(null);
      this.examenForm.controls['correspondeItem'].setValue('');
    }
  }

  regresaExamen() {
    this.router.navigate(['../administrar'], { relativeTo: this.route });
  }
}
