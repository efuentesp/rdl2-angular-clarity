/* PSG  Programa Administrar Ts */
import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Programa } from '../programa.psg.model';
import { ProgramaService } from '../programa.psg.service';

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
  selector: 'clr-programa-demo-styles',
  styleUrls: ['../programa.psg.scss'],
  templateUrl: './programa-administrar.psg.html',
})
export class ProgramaAdministrarDemo {
  programaArray: Programa[];

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private programa_update: boolean = false;
  private programa_delete: boolean = false;
  private programa_create: boolean = false;
  private programa_read: boolean = false;

  // Child Entities *
  private estudiante_read: boolean = false;
  private estudiante_update: boolean = false;
  private estudiante_delete: boolean = false;
  private estudiante_create: boolean = false;
  private publicacion_read: boolean = false;
  private publicacion_update: boolean = false;
  private publicacion_delete: boolean = false;
  private publicacion_create: boolean = false;

  constructor(
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
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();
    this.cargaPrograma();
  }

  cargaPrograma() {
    this.programaService.getRecuperaPrograma().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.programaArray = res.json();

            this.programaArray.forEach(element => {
              if (element.tipoestatus == 'AB') {
                element.tipoestatusItem = 'Abierto';
              }
              if (element.tipoestatus == 'CE') {
                element.tipoestatusItem = 'Cerrado';
              }
              if (element.tipoestatus == 'CA') {
                element.tipoestatusItem = 'Cancelado';
              }
            });
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the programa.', 'error');
      }
    );
  }

  setClickedRowEditaPrograma(index, programa) {
    this.programaService.setPrograma(programa);
    this.router.navigate(['../editar', programa.id], { relativeTo: this.route });
  }

  setClickedRowEliminaPrograma(index, programa) {
    this.programaService.setPrograma(programa);
    this.router.navigate(['../eliminar', programa.id], { relativeTo: this.route });
  }

  getPrograma() {
    this.router.navigate(['../agregar'], { relativeTo: this.route });
  }

  setClickedRowConsultaEstudiante(index, programa) {
    this.programaService.setPrograma(programa);
    this.router.navigate(['../estudiante-details/administrar/', programa.id], { relativeTo: this.route });
  }
  setClickedRowConsultaPublicacion(index, programa) {
    this.programaService.setPrograma(programa);
    this.router.navigate(['../publicacion-details/administrar/', programa.id], { relativeTo: this.route });
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
        this.programa_create = true;
        this.programa_delete = true;
        this.programa_update = true;
        this.programa_read = true;

        this.estudiante_create = true;
        this.estudiante_update = true;
        this.estudiante_delete = true;
        this.estudiante_read = true;
        this.publicacion_create = true;
        this.publicacion_update = true;
        this.publicacion_delete = true;
        this.publicacion_read = true;
      }

      if (element.code == 'PROGRAMA:UPDATE') {
        this.programa_update = true;
      }

      if (element.code == 'PROGRAMA:DELETE') {
        this.programa_delete = true;
      }

      if (element.code == 'PROGRAMA:READ') {
        this.programa_read = true;
      }

      if (element.code == 'PROGRAMA:CREATE') {
        this.programa_create = true;
      }

      if (element.code == 'PROGRAMA:*') {
        this.programa_update = true;
        this.programa_create = true;
        this.programa_delete = true;
        this.programa_read = true;
      }

      // Child Entities
      if (element.code == 'CONCIERNE:READ') {
        this.estudiante_read = true;
      }

      if (element.code == 'CONCIERNE:*') {
        this.estudiante_read = true;
        this.estudiante_update = true;
        this.estudiante_create = true;
        this.estudiante_delete = true;
      }
      // Child Entities
      if (element.code == 'COMUNICADOPOR:READ') {
        this.publicacion_read = true;
      }

      if (element.code == 'COMUNICADOPOR:*') {
        this.publicacion_read = true;
        this.publicacion_update = true;
        this.publicacion_create = true;
        this.publicacion_delete = true;
      }
    });
  }
}
