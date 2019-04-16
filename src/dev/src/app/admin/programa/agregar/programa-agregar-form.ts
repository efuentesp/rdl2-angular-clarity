import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, FormArray } from '@angular/forms';

import { Programa } from '../programa.psg.model';
import { ProgramaSend } from '../programa.psg.model-send';
import { ProgramaService } from '../programa.psg.service';

import swal from 'sweetalert2';
import { ValidationService } from '../../../_validation/validation.service';

import { OpcionService } from '../../opcion/opcion.psg.service';
import { Opcion } from '../../opcion/opcion.psg.model';
import { PreguntaService } from '../../pregunta/pregunta.psg.service';
import { Pregunta } from '../../pregunta/pregunta.psg.model';
import { ExamenService } from '../../examen/examen.psg.service';
import { Examen } from '../../examen/examen.psg.model';
import { PublicacionService } from '../../publicacion/publicacion.psg.service';
import { Publicacion } from '../../publicacion/publicacion.psg.model';
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
  styleUrls: ['../programa.psg.scss'],
  templateUrl: './programa-agregar.psg.html',
})
export class ProgramaAgregarFormDemo implements OnInit {
  programaForm: FormGroup;
  submitted = false;
  public programa: Programa = new Programa();
  public programaSend: ProgramaSend = new ProgramaSend();

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute,
    private opcionService: OpcionService,
    private preguntaService: PreguntaService,
    private examenService: ExamenService,
    private publicacionService: PublicacionService,
    private grupoaService: GrupoaService,
    private recursoService: RecursoService,
    private unidadService: UnidadService,
    private certificacionService: CertificacionService,
    private profesorService: ProfesorService,
    private estudianteService: EstudianteService,
    private registroService: RegistroService,
    private institucionService: InstitucionService,
    private eventoService: EventoService,
    private programaService: ProgramaService
  ) {
    this.programaForm = this.fb.group({
      clave: new FormControl('', Validators.required),
      nombreprograma: new FormControl('', Validators.required),
      tipoestatus: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  guardaPrograma() {
    this.submitted = true;

    if (this.programaForm.invalid) {
      return;
    } else {
      this.programaSend.clave = this.programaForm.controls['clave'].value;
      this.programaSend.nombreprograma = this.programaForm.controls['nombreprograma'].value;
      this.programaSend.tipoestatus = this.programaForm.controls['tipoestatus'].value;

      this.programaService.postGuardaPrograma(this.programaSend).subscribe(
        res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Programa save successfully.', 'success');
              this.router.navigate(['../administrar'], { relativeTo: this.route });
            }
          }
        },
        error => {
          swal('Error...', 'Programa save unsuccessfully.', 'error');
        }
      );
    }
  }

  regresaPrograma() {
    this.router.navigate(['../administrar'], { relativeTo: this.route });
  }
}
