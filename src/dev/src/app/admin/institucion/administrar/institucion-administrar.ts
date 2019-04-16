/* PSG  Institucion Administrar Ts */
import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Institucion } from '../institucion.psg.model';
import { InstitucionService } from '../institucion.psg.service';

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
  selector: 'clr-institucion-demo-styles',
  styleUrls: ['../institucion.psg.scss'],
  templateUrl: './institucion-administrar.psg.html',
})
export class InstitucionAdministrarDemo {
  institucionArray: Institucion[];

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private institucion_update: boolean = false;
  private institucion_delete: boolean = false;
  private institucion_create: boolean = false;
  private institucion_read: boolean = false;

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
    private profesorService: ProfesorService,
    private estudianteService: EstudianteService,
    private registroService: RegistroService,
    private eventoService: EventoService,
    private institucionService: InstitucionService
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();
    this.cargaInstitucion();
  }

  cargaInstitucion() {
    this.institucionService.getRecuperaInstitucion().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.institucionArray = res.json();

            this.institucionArray.forEach(element => {
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
        swal('Error...', 'An error occurred while calling the institucion.', 'error');
      }
    );
  }

  setClickedRowEditaInstitucion(institucion) {
    this.institucionService.setInstitucion(institucion);
    this.router.navigate(['../editar', institucion.institucionId], { relativeTo: this.route });
  }

  setClickedRowEliminaInstitucion(institucion) {
    console.log(institucion);
    this.institucionService.setInstitucion(institucion);
    this.router.navigate(['../eliminar', institucion.institucionId], { relativeTo: this.route });
  }

  getInstitucion() {
    this.router.navigate(['../agregar'], { relativeTo: this.route });
  }

  setClickedRowConsultaEvento(institucion) {
    this.institucionService.setInstitucion(institucion);
    this.router.navigate(['../evento-details/administrar/', institucion.institucionId], { relativeTo: this.route });
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
        this.institucion_create = true;
        this.institucion_delete = true;
        this.institucion_update = true;
        this.institucion_read = true;

        this.evento_create = true;
        this.evento_update = true;
        this.evento_delete = true;
        this.evento_read = true;
      }

      if (element.code == 'INSTITUCION:UPDATE') {
        this.institucion_update = true;
      }

      if (element.code == 'INSTITUCION:DELETE') {
        this.institucion_delete = true;
      }

      if (element.code == 'INSTITUCION:READ') {
        this.institucion_read = true;
      }

      if (element.code == 'INSTITUCION:CREATE') {
        this.institucion_create = true;
      }

      if (element.code == 'INSTITUCION:*') {
        this.institucion_update = true;
        this.institucion_create = true;
        this.institucion_delete = true;
        this.institucion_read = true;
      }

      // Child Entities
      if (element.code == 'ORGANIZA:READ') {
        this.evento_read = true;
      }

      if (element.code == 'ORGANIZA:*') {
        this.evento_read = true;
        this.evento_update = true;
        this.evento_create = true;
        this.evento_delete = true;
      }
    });
  }
}
