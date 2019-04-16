/* PSG  Unidad Administrar Ts */
import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Unidad } from '../unidad.psg.model';
import { UnidadService } from '../unidad.psg.service';

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
  selector: 'clr-unidad-demo-styles',
  styleUrls: ['../unidad.psg.scss'],
  templateUrl: './unidad-administrar.psg.html',
})
export class UnidadAdministrarDemo {
  unidadArray: Unidad[];
  public compete: Publicacion;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private unidad_update: boolean = false;
  private unidad_delete: boolean = false;
  private unidad_create: boolean = false;
  private unidad_read: boolean = false;

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
    private certificacionService: CertificacionService,
    private profesorService: ProfesorService,
    private estudianteService: EstudianteService,
    private registroService: RegistroService,
    private institucionService: InstitucionService,
    private eventoService: EventoService,
    private unidadService: UnidadService
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();
    this.cargaUnidad();
  }

  cargaUnidad() {
    this.unidadService.getRecuperaUnidad().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.unidadArray = res.json();

            this.unidadArray.forEach(element => {
              this.publicacionService.getRecuperaPublicacionPorId(element.competeId).subscribe(res => {
                this.compete = res.json();
                element.competeItem = this.compete.nombreobra + '';
              });
            });
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the unidad.', 'error');
      }
    );
  }

  setClickedRowEditaUnidad(index, unidad) {
    this.unidadService.setUnidad(unidad);
    this.router.navigate(['../editar', unidad.id], { relativeTo: this.route });
  }

  setClickedRowEliminaUnidad(index, unidad) {
    this.unidadService.setUnidad(unidad);
    this.router.navigate(['../eliminar', unidad.id], { relativeTo: this.route });
  }

  getUnidad() {
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
        this.unidad_create = true;
        this.unidad_delete = true;
        this.unidad_update = true;
        this.unidad_read = true;
      }

      if (element.code == 'UNIDAD:UPDATE') {
        this.unidad_update = true;
      }

      if (element.code == 'UNIDAD:DELETE') {
        this.unidad_delete = true;
      }

      if (element.code == 'UNIDAD:READ') {
        this.unidad_read = true;
      }

      if (element.code == 'UNIDAD:CREATE') {
        this.unidad_create = true;
      }

      if (element.code == 'UNIDAD:*') {
        this.unidad_update = true;
        this.unidad_create = true;
        this.unidad_delete = true;
        this.unidad_read = true;
      }
    });
  }
}
