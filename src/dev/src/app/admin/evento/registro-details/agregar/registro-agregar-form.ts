import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, FormArray } from '@angular/forms';

import { Registro } from '../../../registro/registro.psg.model';
import { RegistroSend } from '../../../registro/registro.psg.model-send';
import { RegistroService } from '../../../registro/registro.psg.service';

import swal from 'sweetalert2';
import { ValidationService } from '../../../../_validation/validation.service';

import { OpcionService } from '../../../opcion/opcion.psg.service';
import { Opcion } from '../../../opcion/opcion.psg.model';
import { PreguntaService } from '../../../pregunta/pregunta.psg.service';
import { Pregunta } from '../../../pregunta/pregunta.psg.model';
import { ExamenService } from '../../../examen/examen.psg.service';
import { Examen } from '../../../examen/examen.psg.model';
import { PublicacionService } from '../../../publicacion/publicacion.psg.service';
import { Publicacion } from '../../../publicacion/publicacion.psg.model';
import { ProgramaService } from '../../../programa/programa.psg.service';
import { Programa } from '../../../programa/programa.psg.model';
import { GrupoaService } from '../../../grupoa/grupoa.psg.service';
import { Grupoa } from '../../../grupoa/grupoa.psg.model';
import { RecursoService } from '../../../recurso/recurso.psg.service';
import { Recurso } from '../../../recurso/recurso.psg.model';
import { UnidadService } from '../../../unidad/unidad.psg.service';
import { Unidad } from '../../../unidad/unidad.psg.model';
import { CertificacionService } from '../../../certificacion/certificacion.psg.service';
import { Certificacion } from '../../../certificacion/certificacion.psg.model';
import { ProfesorService } from '../../../profesor/profesor.psg.service';
import { Profesor } from '../../../profesor/profesor.psg.model';
import { EstudianteService } from '../../../estudiante/estudiante.psg.service';
import { Estudiante } from '../../../estudiante/estudiante.psg.model';
import { InstitucionService } from '../../../institucion/institucion.psg.service';
import { Institucion } from '../../../institucion/institucion.psg.model';
import { EventoService } from '../../../evento/evento.psg.service';
import { Evento } from '../../../evento/evento.psg.model';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  templateUrl: './registro-agregar.psg.html',
})
export class RegistroDetailsAgregarFormDemo implements OnInit {
  registroForm: FormGroup;
  submitted = false;
  public registro: Registro = new Registro();
  public registroSend: RegistroSend = new RegistroSend();

  public confirmado: Estudiante;
  public idConfirmado: string = '';
  public inscritopor: Evento;
  public idInscritopor: string = '';

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
    private institucionService: InstitucionService,
    private eventoService: EventoService,
    private registroService: RegistroService
  ) {
    this.registroForm = this.fb.group({
      confirmadoId: new FormControl('', Validators.required),
      confirmadoItem: new FormControl(''),
      inscritoporId: new FormControl('', Validators.required),
      inscritoporItem: new FormControl(''),
      numconfirmacion: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idConfirmado = params['id'];
      this.cargaConfirmado(this.idConfirmado);

      this.idInscritopor = params['id'];
      this.cargaInscritopor(this.idInscritopor);
    });
  }

  guardaRegistro() {
    this.submitted = true;

    if (this.registroForm.invalid) {
      return;
    } else {
      this.registroSend.confirmadoId = this.registroForm.controls['confirmadoId'].value;
      this.registroSend.inscritoporId = this.registroForm.controls['inscritoporId'].value;
      this.registroSend.numconfirmacion = this.registroForm.controls['numconfirmacion'].value;

      this.registroService.postGuardaRegistro(this.registroSend).subscribe(res => {
        if (res) {
          swal('Success...', 'Registro save successfully.', 'success');
          // DETAILS this.router.navigate(['../../../registro-details/administrar/', this.registroSend.eventoId], { relativeTo: this.route });
        } else {
          swal('Error...', 'Registro save unsuccessfully.', 'error');
        }
      });
    }
  }

  cargaConfirmado(id) {
    this.estudianteService.getRecuperaEstudiantePorId(id).subscribe(
      res => {
        if (res) {
          this.confirmado = res.json();
          this.registroForm.controls['confirmadoId'].setValue(id);
          this.registroForm.controls['confirmadoItem'].setValue(this.confirmado.nombreestudiante);
        }
      },
      error => {
        //swal('Error...', 'An error occurred while calling the estudiantes.', 'error');
      }
    );
  }

  cargaInscritopor(id) {
    this.eventoService.getRecuperaEventoPorId(id).subscribe(
      res => {
        if (res) {
          this.inscritopor = res.json();
          this.registroForm.controls['inscritoporId'].setValue(id);
          this.registroForm.controls['inscritoporItem'].setValue(this.inscritopor.clave);
        }
      },
      error => {
        //swal('Error...', 'An error occurred while calling the eventos.', 'error');
      }
    );
  }

  regresaRegistro() {
    // DETAILS this.router.navigate(['../../../registro-details/administrar/', this.idEvento], { relativeTo: this.route });
  }
}
