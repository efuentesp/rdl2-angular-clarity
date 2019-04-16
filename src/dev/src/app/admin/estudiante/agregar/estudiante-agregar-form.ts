import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, FormArray } from '@angular/forms';

import { Estudiante } from '../estudiante.psg.model';
import { EstudianteSend } from '../estudiante.psg.model-send';
import { EstudianteService } from '../estudiante.psg.service';

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
import { RegistroService } from '../../registro/registro.psg.service';
import { Registro } from '../../registro/registro.psg.model';
import { InstitucionService } from '../../institucion/institucion.psg.service';
import { Institucion } from '../../institucion/institucion.psg.model';
import { EventoService } from '../../evento/evento.psg.service';
import { Evento } from '../../evento/evento.psg.model';

@Component({
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../estudiante.psg.scss'],
  templateUrl: './estudiante-agregar.psg.html',
})
export class EstudianteAgregarFormDemo implements OnInit {
  estudianteForm: FormGroup;
  submitted = false;
  public estudiante: Estudiante = new Estudiante();
  public estudianteSend: EstudianteSend = new EstudianteSend();

  public concierneporArray: Programa[];

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
      correoest: new FormControl(''),
      telefono: new FormControl(''),
    });
  }

  ngOnInit() {
    this.cargaConciernepor();
  }

  guardaEstudiante() {
    this.submitted = true;

    if (this.estudianteForm.invalid) {
      return;
    } else {
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

      this.estudianteService.postGuardaEstudiante(this.estudianteSend).subscribe(
        res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Estudiante save successfully.', 'success');
              this.router.navigate(['../administrar'], { relativeTo: this.route });
            }
          }
        },
        error => {
          swal('Error...', 'Estudiante save unsuccessfully.', 'error');
        }
      );
    }
  }

  cargaConciernepor() {
    this.programaService.getRecuperaPrograma().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.concierneporArray = res.json();
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the programas.', 'error');
      }
    );
  }

  setClickedRowConciernepor(index, conciernepor) {
    conciernepor.checked = !conciernepor.checked;
    if (conciernepor.checked) {
      this.programaService.setPrograma(conciernepor);

      this.estudianteForm.controls['concierneporId'].setValue(conciernepor.id);
      this.estudianteForm.controls['concierneporItem'].setValue(conciernepor.nombreprograma);
    } else {
      this.programaService.clear();
      this.estudianteForm.controls['concierneporId'].setValue(null);
      this.estudianteForm.controls['concierneporItem'].setValue('');
    }
  }

  regresaEstudiante() {
    this.router.navigate(['../administrar'], { relativeTo: this.route });
  }
}
