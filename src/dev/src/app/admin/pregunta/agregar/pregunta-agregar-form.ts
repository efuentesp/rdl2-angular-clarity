import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, FormArray } from '@angular/forms';

import { Pregunta } from '../pregunta.psg.model';
import { PreguntaSend } from '../pregunta.psg.model-send';
import { PreguntaService } from '../pregunta.psg.service';

import swal from 'sweetalert2';
import { ValidationService } from '../../../_validation/validation.service';

import { OpcionService } from '../../opcion/opcion.psg.service';
import { Opcion } from '../../opcion/opcion.psg.model';
import { ExamenService } from '../../examen/examen.psg.service';
import { Examen } from '../../examen/examen.psg.model';
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
  styleUrls: ['../pregunta.psg.scss'],
  templateUrl: './pregunta-agregar.psg.html',
})
export class PreguntaAgregarFormDemo implements OnInit {
  preguntaForm: FormGroup;
  submitted = false;
  public pregunta: Pregunta = new Pregunta();
  public preguntaSend: PreguntaSend = new PreguntaSend();

  public peterneceArray: Examen[];

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute,
    private opcionService: OpcionService,
    private examenService: ExamenService,
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
    private preguntaService: PreguntaService
  ) {
    this.preguntaForm = this.fb.group({
      peterneceId: new FormControl('', Validators.required),
      peterneceItem: new FormControl(''),
      descipcionpregunta: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.cargaPeternece();
  }

  guardaPregunta() {
    this.submitted = true;

    if (this.preguntaForm.invalid) {
      return;
    } else {
      this.preguntaSend.peterneceId = this.preguntaForm.controls['peterneceId'].value;
      this.preguntaSend.descipcionpregunta = this.preguntaForm.controls['descipcionpregunta'].value;

      this.preguntaService.postGuardaPregunta(this.preguntaSend).subscribe(
        res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Pregunta save successfully.', 'success');
              this.router.navigate(['../administrar'], { relativeTo: this.route });
            }
          }
        },
        error => {
          swal('Error...', 'Pregunta save unsuccessfully.', 'error');
        }
      );
    }
  }

  cargaPeternece() {
    this.examenService.getRecuperaExamen().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.peterneceArray = res.json();
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the examens.', 'error');
      }
    );
  }

  setClickedRowPeternece(index, peternece) {
    peternece.checked = !peternece.checked;
    if (peternece.checked) {
      this.examenService.setExamen(peternece);

      this.preguntaForm.controls['peterneceId'].setValue(peternece.id);
      this.preguntaForm.controls['peterneceItem'].setValue(peternece.nombreexamen);
    } else {
      this.examenService.clear();
      this.preguntaForm.controls['peterneceId'].setValue(null);
      this.preguntaForm.controls['peterneceItem'].setValue('');
    }
  }

  regresaPregunta() {
    this.router.navigate(['../administrar'], { relativeTo: this.route });
  }
}
