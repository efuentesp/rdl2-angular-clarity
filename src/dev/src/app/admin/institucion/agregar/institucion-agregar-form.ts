import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, FormArray } from '@angular/forms';

import { Institucion } from '../institucion.psg.model';
import { InstitucionSend } from '../institucion.psg.model-send';
import { InstitucionService } from '../institucion.psg.service';

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
import { ProfesorService } from '../../profesor/profesor.psg.service';
import { Profesor } from '../../profesor/profesor.psg.model';
import { EstudianteService } from '../../estudiante/estudiante.psg.service';
import { Estudiante } from '../../estudiante/estudiante.psg.model';
import { RegistroService } from '../../registro/registro.psg.service';
import { Registro } from '../../registro/registro.psg.model';
import { EventoService } from '../../evento/evento.psg.service';
import { Evento } from '../../evento/evento.psg.model';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../institucion.psg.scss'],
  templateUrl: './institucion-agregar.psg.html',
})
export class InstitucionAgregarFormDemo implements OnInit {
  institucionForm: FormGroup;
  submitted = false;
  public institucion: Institucion = new Institucion();
  public institucionSend: InstitucionSend = new InstitucionSend();

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
    private profesorService: ProfesorService,
    private estudianteService: EstudianteService,
    private registroService: RegistroService,
    private eventoService: EventoService,
    private institucionService: InstitucionService
  ) {
    this.institucionForm = this.fb.group({
      claveinstitucion: new FormControl('', Validators.required),
      nombreinstitucion: new FormControl('', Validators.required),
      representante: new FormControl(''),
      paginaweb: new FormControl(''),
      telefono: new FormControl(''),
      tipoestatus: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  guardaInstitucion() {
    this.submitted = true;

    if (this.institucionForm.invalid) {
      return;
    } else {
      this.institucionSend.claveinstitucion = this.institucionForm.controls['claveinstitucion'].value;
      this.institucionSend.nombreinstitucion = this.institucionForm.controls['nombreinstitucion'].value;
      this.institucionSend.representante = this.institucionForm.controls['representante'].value;
      this.institucionSend.paginaweb = this.institucionForm.controls['paginaweb'].value;
      this.institucionSend.telefono = this.institucionForm.controls['telefono'].value;
      this.institucionSend.tipoestatus = this.institucionForm.controls['tipoestatus'].value;

      this.institucionService.postGuardaInstitucion(this.institucionSend).subscribe(
        res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Institucion save successfully.', 'success');
              this.router.navigate(['../administrar'], { relativeTo: this.route });
            }
          }
        },
        error => {
          swal('Error...', 'Institucion save unsuccessfully.', 'error');
        }
      );
    }
  }

  regresaInstitucion() {
    this.router.navigate(['../administrar'], { relativeTo: this.route });
  }
}
