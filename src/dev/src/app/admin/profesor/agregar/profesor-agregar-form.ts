import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, FormArray } from '@angular/forms';

import { Profesor } from '../profesor.psg.model';
import { ProfesorSend } from '../profesor.psg.model-send';
import { ProfesorService } from '../profesor.psg.service';

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
  styleUrls: ['../profesor.psg.scss'],
  templateUrl: './profesor-agregar.psg.html',
})
export class ProfesorAgregarFormDemo implements OnInit {
  profesorForm: FormGroup;
  submitted = false;
  public profesor: Profesor = new Profesor();
  public profesorSend: ProfesorSend = new ProfesorSend();

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute,
    private opcionService: OpcionService,
    private preguntaService: PreguntaService,
    private examenService: ExamenService,
    private publicacionService: PublicacionService,
    private programaService: ProgramaService,
    private grupoaService: GrupoaService,
    private recursoService: RecursoService,
    private unidadService: UnidadService,
    private certificacionService: CertificacionService,
    private estudianteService: EstudianteService,
    private registroService: RegistroService,
    private institucionService: InstitucionService,
    private eventoService: EventoService,
    private profesorService: ProfesorService
  ) {
    this.profesorForm = this.fb.group({
      noempleado: new FormControl('', Validators.required),
      nombreprofesor: new FormControl('', Validators.required),
      apellidopaterno: new FormControl('', Validators.required),
      rfc: new FormControl('', Validators.required),
      correopro: new FormControl(''),
      telefono: new FormControl(''),
    });
  }

  ngOnInit() {}

  guardaProfesor() {
    this.submitted = true;

    if (this.profesorForm.invalid) {
      return;
    } else {
      this.profesorSend.noempleado = this.profesorForm.controls['noempleado'].value;
      this.profesorSend.nombreprofesor = this.profesorForm.controls['nombreprofesor'].value;
      this.profesorSend.apellidopaterno = this.profesorForm.controls['apellidopaterno'].value;
      this.profesorSend.rfc = this.profesorForm.controls['rfc'].value;
      this.profesorSend.correopro = this.profesorForm.controls['correopro'].value;
      this.profesorSend.telefono = this.profesorForm.controls['telefono'].value;

      this.profesorService.postGuardaProfesor(this.profesorSend).subscribe(
        res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Profesor save successfully.', 'success');
              this.router.navigate(['../administrar'], { relativeTo: this.route });
            }
          }
        },
        error => {
          swal('Error...', 'Profesor save unsuccessfully.', 'error');
        }
      );
    }
  }

  regresaProfesor() {
    this.router.navigate(['../administrar'], { relativeTo: this.route });
  }
}
