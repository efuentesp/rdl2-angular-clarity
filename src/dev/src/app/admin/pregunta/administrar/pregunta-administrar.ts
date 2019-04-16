/* PSG  Pregunta Administrar Ts */
import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Pregunta } from '../pregunta.psg.model';
import { PreguntaService } from '../pregunta.psg.service';

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
  selector: 'clr-pregunta-demo-styles',
  styleUrls: ['../pregunta.psg.scss'],
  templateUrl: './pregunta-administrar.psg.html',
})
export class PreguntaAdministrarDemo {
  preguntaArray: Pregunta[];
  public peternece: Examen;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private pregunta_update: boolean = false;
  private pregunta_delete: boolean = false;
  private pregunta_create: boolean = false;
  private pregunta_read: boolean = false;

  // Child Entities *

  constructor(
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
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();
    this.cargaPregunta();
  }

  cargaPregunta() {
    this.preguntaService.getRecuperaPregunta().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.preguntaArray = res.json();

            this.preguntaArray.forEach(element => {
              this.examenService.getRecuperaExamenPorId(element.peterneceId).subscribe(res => {
                this.peternece = res.json();
                element.peterneceItem = this.peternece.nombreexamen + '';
              });
            });
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the pregunta.', 'error');
      }
    );
  }

  setClickedRowEditaPregunta(index, pregunta) {
    this.preguntaService.setPregunta(pregunta);
    this.router.navigate(['../editar', pregunta.id], { relativeTo: this.route });
  }

  setClickedRowEliminaPregunta(index, pregunta) {
    this.preguntaService.setPregunta(pregunta);
    this.router.navigate(['../eliminar', pregunta.id], { relativeTo: this.route });
  }

  getPregunta() {
    this.router.navigate(['../agregar'], { relativeTo: this.route });
  }

  getUser() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['access_token'];
    this.permissions = obj['permissions'];
    this.user = obj['user'];
  }

  setButtons() {
    this.permissions.forEach(element => {
      if (element.code == '*:*') {
        this.pregunta_create = true;
        this.pregunta_delete = true;
        this.pregunta_update = true;
        this.pregunta_read = true;
      }

      if (element.code == 'PREGUNTA:UPDATE') {
        this.pregunta_update = true;
      }

      if (element.code == 'PREGUNTA:DELETE') {
        this.pregunta_delete = true;
      }

      if (element.code == 'PREGUNTA:READ') {
        this.pregunta_read = true;
      }

      if (element.code == 'PREGUNTA:CREATE') {
        this.pregunta_create = true;
      }

      if (element.code == 'PREGUNTA:*') {
        this.pregunta_update = true;
        this.pregunta_create = true;
        this.pregunta_delete = true;
        this.pregunta_read = true;
      }
    });
  }
}
