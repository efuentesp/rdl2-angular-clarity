/* PSG  Publicacion Administrar Ts */
import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Publicacion } from '../publicacion.psg.model';
import { PublicacionService } from '../publicacion.psg.service';

import { OpcionService } from '../../opcion/opcion.psg.service';
import { Opcion } from '../../opcion/opcion.psg.model';
import { PreguntaService } from '../../pregunta/pregunta.psg.service';
import { Pregunta } from '../../pregunta/pregunta.psg.model';
import { ExamenService } from '../../examen/examen.psg.service';
import { Examen } from '../../examen/examen.psg.model';
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
  selector: 'clr-publicacion-demo-styles',
  styleUrls: ['../publicacion.psg.scss'],
  templateUrl: './publicacion-administrar.psg.html',
})
export class PublicacionAdministrarDemo {
  publicacionArray: Publicacion[];
  public familiariza: Grupoa;
  public comunicado: Programa;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private publicacion_update: boolean = false;
  private publicacion_delete: boolean = false;
  private publicacion_create: boolean = false;
  private publicacion_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private opcionService: OpcionService,
    private preguntaService: PreguntaService,
    private examenService: ExamenService,
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
    private publicacionService: PublicacionService
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();
    this.cargaPublicacion();
  }

  cargaPublicacion() {
    this.publicacionService.getRecuperaPublicacion().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.publicacionArray = res.json();

            this.publicacionArray.forEach(element => {
              if (element.tiposubsistema == 'SS1') {
                element.tiposubsistemaItem = 'DGB';
              }
              if (element.tiposubsistema == 'SS2') {
                element.tiposubsistemaItem = 'DGIRE';
              }
              if (element.tiposubsistema == 'SS3') {
                element.tiposubsistemaItem = 'DGETI';
              }
              if (element.tiposubsistema == 'SS4') {
                element.tiposubsistemaItem = 'UDG';
              }
              if (element.tiposubsistema == 'SS5') {
                element.tiposubsistemaItem = 'UNITEC';
              }
              if (element.tiponivel == 'B') {
                element.tiponivelItem = 'Bachillerato';
              }
              if (element.tiponivel == 'U') {
                element.tiponivelItem = 'Universitario';
              }
              if (element.tipoarea == 'FM') {
                element.tipoareaItem = 'Físico Matemáticas';
              }
              if (element.tipoarea == 'CSA') {
                element.tipoareaItem = 'Ciencias Sociales y Administrativas';
              }
              if (element.tipoarea == 'CMB') {
                element.tipoareaItem = 'Ciencias Medico Biológicas';
              }
              element.fechapublicacionAux = new Date(element.fechapublicacion);
              this.grupoaService.getRecuperaGrupoaPorId(element.familiarizaId).subscribe(res => {
                this.familiariza = res.json();
                element.familiarizaItem = this.familiariza.nombregrupo + '';
              });
              this.programaService.getRecuperaProgramaPorId(element.comunicadoId).subscribe(res => {
                this.comunicado = res.json();
                element.comunicadoItem = this.comunicado.nombreprograma + '';
              });
            });
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the publicacion.', 'error');
      }
    );
  }

  setClickedRowEditaPublicacion(index, publicacion) {
    this.publicacionService.setPublicacion(publicacion);
    this.router.navigate(['../editar', publicacion.id], { relativeTo: this.route });
  }

  setClickedRowEliminaPublicacion(index, publicacion) {
    this.publicacionService.setPublicacion(publicacion);
    this.router.navigate(['../eliminar', publicacion.id], { relativeTo: this.route });
  }

  getPublicacion() {
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
        this.publicacion_create = true;
        this.publicacion_delete = true;
        this.publicacion_update = true;
        this.publicacion_read = true;
      }

      if (element.code == 'PUBLICACION:UPDATE') {
        this.publicacion_update = true;
      }

      if (element.code == 'PUBLICACION:DELETE') {
        this.publicacion_delete = true;
      }

      if (element.code == 'PUBLICACION:READ') {
        this.publicacion_read = true;
      }

      if (element.code == 'PUBLICACION:CREATE') {
        this.publicacion_create = true;
      }

      if (element.code == 'PUBLICACION:*') {
        this.publicacion_update = true;
        this.publicacion_create = true;
        this.publicacion_delete = true;
        this.publicacion_read = true;
      }
    });
  }
}
