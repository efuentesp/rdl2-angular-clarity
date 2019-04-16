/* PSG  Opcion Administrar Ts */
import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Opcion } from '../opcion.psg.model';
import { OpcionService } from '../opcion.psg.service';

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
import { InstitucionService } from '../../institucion/institucion.psg.service';
import { Institucion } from '../../institucion/institucion.psg.model';
import { EventoService } from '../../evento/evento.psg.service';
import { Evento } from '../../evento/evento.psg.model';

@Component({
  selector: 'clr-opcion-demo-styles',
  styleUrls: ['../opcion.psg.scss'],
  templateUrl: './opcion-administrar.psg.html',
})
export class OpcionAdministrarDemo {
  opcionArray: Opcion[];
  public para: Pregunta;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private opcion_update: boolean = false;
  private opcion_delete: boolean = false;
  private opcion_create: boolean = false;
  private opcion_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    private institucionService: InstitucionService,
    private eventoService: EventoService,
    private opcionService: OpcionService
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();
    this.cargaOpcion();
  }

  cargaOpcion() {
    this.opcionService.getRecuperaOpcion().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.opcionArray = res.json();

            this.opcionArray.forEach(element => {
              this.preguntaService.getRecuperaPreguntaPorId(element.paraId).subscribe(res => {
                this.para = res.json();
                element.paraItem = this.para.descipcionpregunta + '';
              });
            });
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the opcion.', 'error');
      }
    );
  }

  setClickedRowEditaOpcion(index, opcion) {
    this.opcionService.setOpcion(opcion);
    this.router.navigate(['../editar', opcion.id], { relativeTo: this.route });
  }

  setClickedRowEliminaOpcion(index, opcion) {
    this.opcionService.setOpcion(opcion);
    this.router.navigate(['../eliminar', opcion.id], { relativeTo: this.route });
  }

  getOpcion() {
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
        this.opcion_create = true;
        this.opcion_delete = true;
        this.opcion_update = true;
        this.opcion_read = true;
      }

      if (element.code == 'OPCION:UPDATE') {
        this.opcion_update = true;
      }

      if (element.code == 'OPCION:DELETE') {
        this.opcion_delete = true;
      }

      if (element.code == 'OPCION:READ') {
        this.opcion_read = true;
      }

      if (element.code == 'OPCION:CREATE') {
        this.opcion_create = true;
      }

      if (element.code == 'OPCION:*') {
        this.opcion_update = true;
        this.opcion_create = true;
        this.opcion_delete = true;
        this.opcion_read = true;
      }
    });
  }
}
