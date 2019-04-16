/* PSG  Certificacion Administrar Ts */
import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Certificacion } from '../certificacion.psg.model';
import { CertificacionService } from '../certificacion.psg.service';

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
  selector: 'clr-certificacion-demo-styles',
  styleUrls: ['../certificacion.psg.scss'],
  templateUrl: './certificacion-administrar.psg.html',
})
export class CertificacionAdministrarDemo {
  certificacionArray: Certificacion[];
  public tiene: Publicacion;
  public son: Profesor;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private certificacion_update: boolean = false;
  private certificacion_delete: boolean = false;
  private certificacion_create: boolean = false;
  private certificacion_read: boolean = false;

  // Child Entities *

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
    private profesorService: ProfesorService,
    private estudianteService: EstudianteService,
    private registroService: RegistroService,
    private institucionService: InstitucionService,
    private eventoService: EventoService,
    private certificacionService: CertificacionService
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();
    this.cargaCertificacion();
  }

  cargaCertificacion() {
    this.certificacionService.getRecuperaCertificacion().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.certificacionArray = res.json();

            this.certificacionArray.forEach(element => {
              this.publicacionService.getRecuperaPublicacionPorId(element.tieneId).subscribe(res => {
                this.tiene = res.json();
                element.tieneItem = this.tiene.nombreobra + '';
              });
              this.profesorService.getRecuperaProfesorPorId(element.sonId).subscribe(res => {
                this.son = res.json();
                element.sonItem = this.son.nombreprofesor + '';
              });
              element.fechacertificacionAux = new Date(element.fechacertificacion);
            });
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the certificacion.', 'error');
      }
    );
  }

  setClickedRowEditaCertificacion(index, certificacion) {
    this.certificacionService.setCertificacion(certificacion);
    this.router.navigate(['../editar', certificacion.id], { relativeTo: this.route });
  }

  setClickedRowEliminaCertificacion(index, certificacion) {
    this.certificacionService.setCertificacion(certificacion);
    this.router.navigate(['../eliminar', certificacion.id], { relativeTo: this.route });
  }

  getCertificacion() {
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
        this.certificacion_create = true;
        this.certificacion_delete = true;
        this.certificacion_update = true;
        this.certificacion_read = true;
      }

      if (element.code == 'CERTIFICACION:UPDATE') {
        this.certificacion_update = true;
      }

      if (element.code == 'CERTIFICACION:DELETE') {
        this.certificacion_delete = true;
      }

      if (element.code == 'CERTIFICACION:READ') {
        this.certificacion_read = true;
      }

      if (element.code == 'CERTIFICACION:CREATE') {
        this.certificacion_create = true;
      }

      if (element.code == 'CERTIFICACION:*') {
        this.certificacion_update = true;
        this.certificacion_create = true;
        this.certificacion_delete = true;
        this.certificacion_read = true;
      }
    });
  }
}
