/* PSG  Recurso Administrar Ts */
import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Recurso } from '../recurso.psg.model';
import { RecursoService } from '../recurso.psg.service';

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
  selector: 'clr-recurso-demo-styles',
  styleUrls: ['../recurso.psg.scss'],
  templateUrl: './recurso-administrar.psg.html',
})
export class RecursoAdministrarDemo {
  recursoArray: Recurso[];
  public relaciona: Unidad;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private recurso_update: boolean = false;
  private recurso_delete: boolean = false;
  private recurso_create: boolean = false;
  private recurso_read: boolean = false;

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
    private unidadService: UnidadService,
    private certificacionService: CertificacionService,
    private profesorService: ProfesorService,
    private estudianteService: EstudianteService,
    private registroService: RegistroService,
    private institucionService: InstitucionService,
    private eventoService: EventoService,
    private recursoService: RecursoService
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();
    this.cargaRecurso();
  }

  cargaRecurso() {
    this.recursoService.getRecuperaRecurso().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.recursoArray = res.json();

            this.recursoArray.forEach(element => {
              this.unidadService.getRecuperaUnidadPorId(element.relacionaId).subscribe(res => {
                this.relaciona = res.json();
                element.relacionaItem = this.relaciona.nombreunidad + '';
              });
              if (element.tiporecurso == 'VL') {
                element.tiporecursoItem = 'Video en línea';
              }
              if (element.tiporecurso == 'AL') {
                element.tiporecursoItem = 'Audio en línea';
              }
              if (element.tiporecurso == 'ADZ') {
                element.tiporecursoItem = 'Archivo descargable ZIP';
              }
              if (element.tiporecurso == 'ADP') {
                element.tiporecursoItem = 'Archivo descargable PDF';
              }
              if (element.tiporecurso == 'ADD') {
                element.tiporecursoItem = 'Archivo descargable DOC';
              }
              if (element.tiporecurso == 'ADX') {
                element.tiporecursoItem = 'Archivo descargable XLS';
              }
              if (element.tiporecurso == 'ADT') {
                element.tiporecursoItem = 'Archivo descargable PPT';
              }
              if (element.tiporecurso == 'IA') {
                element.tiporecursoItem = 'Información del autor';
              }
            });
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the recurso.', 'error');
      }
    );
  }

  setClickedRowEditaRecurso(index, recurso) {
    this.recursoService.setRecurso(recurso);
    this.router.navigate(['../editar', recurso.id], { relativeTo: this.route });
  }

  setClickedRowEliminaRecurso(index, recurso) {
    this.recursoService.setRecurso(recurso);
    this.router.navigate(['../eliminar', recurso.id], { relativeTo: this.route });
  }

  getRecurso() {
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
        this.recurso_create = true;
        this.recurso_delete = true;
        this.recurso_update = true;
        this.recurso_read = true;
      }

      if (element.code == 'RECURSO:UPDATE') {
        this.recurso_update = true;
      }

      if (element.code == 'RECURSO:DELETE') {
        this.recurso_delete = true;
      }

      if (element.code == 'RECURSO:READ') {
        this.recurso_read = true;
      }

      if (element.code == 'RECURSO:CREATE') {
        this.recurso_create = true;
      }

      if (element.code == 'RECURSO:*') {
        this.recurso_update = true;
        this.recurso_create = true;
        this.recurso_delete = true;
        this.recurso_read = true;
      }
    });
  }
}
