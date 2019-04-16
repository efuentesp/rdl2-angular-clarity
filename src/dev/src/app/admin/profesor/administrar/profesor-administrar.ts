/* PSG  Profesor Administrar Ts */
import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Profesor } from '../profesor.psg.model';
import { ProfesorService } from '../profesor.psg.service';

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
  selector: 'clr-profesor-demo-styles',
  styleUrls: ['../profesor.psg.scss'],
  templateUrl: './profesor-administrar.psg.html',
})
export class ProfesorAdministrarDemo {
  profesorArray: Profesor[];

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private profesor_update: boolean = false;
  private profesor_delete: boolean = false;
  private profesor_create: boolean = false;
  private profesor_read: boolean = false;

  // Child Entities *
  private evento_read: boolean = false;
  private evento_update: boolean = false;
  private evento_delete: boolean = false;
  private evento_create: boolean = false;

  constructor(
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
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();
    this.cargaProfesor();
  }

  cargaProfesor() {
    this.profesorService.getRecuperaProfesor().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.profesorArray = res.json();

            this.profesorArray.forEach(element => {});
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the profesor.', 'error');
      }
    );
  }

  setClickedRowEditaProfesor(index, profesor) {
    this.profesorService.setProfesor(profesor);
    this.router.navigate(['../editar', profesor.id], { relativeTo: this.route });
  }

  setClickedRowEliminaProfesor(index, profesor) {
    this.profesorService.setProfesor(profesor);
    this.router.navigate(['../eliminar', profesor.id], { relativeTo: this.route });
  }

  getProfesor() {
    this.router.navigate(['../agregar'], { relativeTo: this.route });
  }

  setClickedRowConsultaEvento(index, profesor) {
    this.profesorService.setProfesor(profesor);
    this.router.navigate(['../evento-details/administrar/', profesor.id], { relativeTo: this.route });
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
        this.profesor_create = true;
        this.profesor_delete = true;
        this.profesor_update = true;
        this.profesor_read = true;

        this.evento_create = true;
        this.evento_update = true;
        this.evento_delete = true;
        this.evento_read = true;
      }

      if (element.code == 'PROFESOR:UPDATE') {
        this.profesor_update = true;
      }

      if (element.code == 'PROFESOR:DELETE') {
        this.profesor_delete = true;
      }

      if (element.code == 'PROFESOR:READ') {
        this.profesor_read = true;
      }

      if (element.code == 'PROFESOR:CREATE') {
        this.profesor_create = true;
      }

      if (element.code == 'PROFESOR:*') {
        this.profesor_update = true;
        this.profesor_create = true;
        this.profesor_delete = true;
        this.profesor_read = true;
      }

      // Child Entities
      if (element.code == 'IMPARTE:READ') {
        this.evento_read = true;
      }

      if (element.code == 'IMPARTE:*') {
        this.evento_read = true;
        this.evento_update = true;
        this.evento_create = true;
        this.evento_delete = true;
      }
    });
  }
}
