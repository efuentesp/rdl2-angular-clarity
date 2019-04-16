/* PSG  Estudiante Edita Ts */
import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../../_validation/validation.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ValidatorFn } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Estudiante } from '../../../estudiante/estudiante.psg.model';
import { EstudianteSend } from '../../../estudiante/estudiante.psg.model-send';
import { EstudianteService } from '../../../estudiante/estudiante.psg.service';

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
import { RegistroService } from '../../../registro/registro.psg.service';
import { Registro } from '../../../registro/registro.psg.model';
import { InstitucionService } from '../../../institucion/institucion.psg.service';
import { Institucion } from '../../../institucion/institucion.psg.model';
import { EventoService } from '../../../evento/evento.psg.service';
import { Evento } from '../../../evento/evento.psg.model';

@Component({
  selector: 'clr-estudiante-not-closable-psg-angular',
  templateUrl: './estudiante-editar.psg.html',
})
export class EstudianteDetailsEditarFormDemo implements OnInit {
  public estudianteForm: FormGroup;
  public submitted = false;
  public estudiante: Estudiante = new Estudiante();
  public estudianteSend: EstudianteSend = new EstudianteSend();
  public idEstudiante: string;
  public datePipe = new DatePipe('en-US');

  public conciernepor: Programa;
  public idConciernepor: string = '';

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
    private registroService: RegistroService,
    private institucionService: InstitucionService,
    private eventoService: EventoService,
    private estudianteService: EstudianteService
  ) {
    this.estudianteForm = this.fb.group({
      concierneporId: new FormControl('', Validators.required),
      concierneporItem: new FormControl(''),
      matricula: new FormControl('', Validators.required),
      nombreestudiante: new FormControl('', Validators.required),
      apellidopaterno: new FormControl('', Validators.required),
      fechanacimientoAux: new FormControl('', Validators.required),
      genero: new FormControl('', Validators.required),
      tiponivel: new FormControl('', Validators.required),
      tipoarea: new FormControl('', Validators.required),
      correoest: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.recuperaEstudiante();

    this.route.params.subscribe(params => {
      this.idConciernepor = params['id'];
      this.cargaConciernepor(this.idConciernepor);
    });
  }

  recuperaEstudiante() {
    this.estudiante = this.estudianteService.getEstudiante();
    this.estudianteForm.controls['concierneporId'].setValue(this.estudiante.concierneporId);
    this.estudianteForm.controls['matricula'].setValue(this.estudiante.matricula);
    this.estudianteForm.controls['nombreestudiante'].setValue(this.estudiante.nombreestudiante);
    this.estudianteForm.controls['apellidopaterno'].setValue(this.estudiante.apellidopaterno);
    this.estudianteForm.controls['fechanacimientoAux'].setValue(
      this.datePipe.transform(this.estudiante.fechanacimiento, 'dd/MM/yyyy')
    );
    this.estudianteForm.controls['genero'].setValue(this.estudiante.genero);
    this.estudianteForm.controls['tiponivel'].setValue(this.estudiante.tiponivel);
    this.estudianteForm.controls['tipoarea'].setValue(this.estudiante.tipoarea);
    this.estudianteForm.controls['correoest'].setValue(this.estudiante.correoest);
    this.estudianteForm.controls['telefono'].setValue(this.estudiante.telefono);
  }

  editaEstudiante() {
    this.submitted = true;

    if (this.estudianteForm.invalid) {
      return;
    } else {
      this.route.params.subscribe(params => {
        this.idEstudiante = params['id'];
      });

      this.estudianteSend.concierneporId = this.estudianteForm.controls['concierneporId'].value;
      this.estudianteSend.matricula = this.estudianteForm.controls['matricula'].value;
      this.estudianteSend.nombreestudiante = this.estudianteForm.controls['nombreestudiante'].value;
      this.estudianteSend.apellidopaterno = this.estudianteForm.controls['apellidopaterno'].value;
      let fechanacimientoAuxtoArray = this.estudianteForm.controls['fechanacimientoAux'].value.split('/');
      let fechanacimientoAuxDate = new Date(
        fechanacimientoAuxtoArray[1] + '/' + fechanacimientoAuxtoArray[0] + '/' + fechanacimientoAuxtoArray[2]
      );
      this.estudianteSend.fechanacimiento = fechanacimientoAuxDate.getTime();
      this.estudianteSend.genero = this.estudianteForm.controls['genero'].value;
      this.estudianteSend.tiponivel = this.estudianteForm.controls['tiponivel'].value;
      this.estudianteSend.tipoarea = this.estudianteForm.controls['tipoarea'].value;
      this.estudianteSend.correoest = this.estudianteForm.controls['correoest'].value;
      this.estudianteSend.telefono = this.estudianteForm.controls['telefono'].value;

      this.estudianteService.updateEditaEstudiante(this.estudianteSend, this.idEstudiante).subscribe(res => {
        if (res) {
          swal('Success...', 'Estudiante save successfully.', 'success');
          // DETAILS this.router.navigate(['../../../estudiante-details/administrar/', this.estudianteSend.programaId], { relativeTo: this.route });
        } else {
          swal('Error...', 'Estudiante save unsuccessfully.', 'error');
        }
      });
    }
  }

  cargaConciernepor(id) {
    this.programaService.getRecuperaProgramaPorId(id).subscribe(
      res => {
        if (res) {
          this.conciernepor = res.json();
          this.estudianteForm.controls['concierneporId'].setValue(id);
          this.estudianteForm.controls['concierneporItem'].setValue(this.conciernepor.nombreprograma);
        }
      },
      error => {
        //swal('Error...', 'An error occurred while calling the programas.', 'error');
      }
    );
  }

  regresaEstudiante() {
    // DETAILS this.router.navigate(['../../../estudiante-details/administrar/', this.idPrograma], { relativeTo: this.route });
  }
}
