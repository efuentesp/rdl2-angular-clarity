/* PSG  Registro Administrar Ts */
import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Registro } from '../registro.psg.model';
import { RegistroService } from '../registro.psg.service';

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
import { InstitucionService } from '../../institucion/institucion.psg.service';
import { Institucion } from '../../institucion/institucion.psg.model';
import { EventoService } from '../../evento/evento.psg.service';
import { Evento } from '../../evento/evento.psg.model';

@Component({
  selector: 'clr-registro-demo-styles',
  styleUrls: ['../registro.psg.scss'],
  templateUrl: './registro-administrar.psg.html',
})
export class RegistroAdministrarDemo {
  registroArray: Registro[];
  public confirmado: Estudiante;
  public inscritopor: Evento;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private registro_update: boolean = false;
  private registro_delete: boolean = false;
  private registro_create: boolean = false;
  private registro_read: boolean = false;

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
    private certificacionService: CertificacionService,
    private profesorService: ProfesorService,
    private estudianteService: EstudianteService,
    private institucionService: InstitucionService,
    private eventoService: EventoService,
    private registroService: RegistroService
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();
    this.cargaRegistro();
  }

  cargaRegistro() {
    this.registroService.getRecuperaRegistro().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.registroArray = res.json();

            this.registroArray.forEach(element => {
              this.estudianteService.getRecuperaEstudiantePorId(element.confirmadoId).subscribe(res => {
                this.confirmado = res.json();
                element.confirmadoItem = this.confirmado.nombreestudiante + '';
              });
              this.eventoService.getRecuperaEventoPorId(element.inscritoporId).subscribe(res => {
                this.inscritopor = res.json();
                element.inscritoporItem = this.inscritopor.clave + '';
              });
            });
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the registro.', 'error');
      }
    );
  }

  setClickedRowEditaRegistro(index, registro) {
    this.registroService.setRegistro(registro);
    this.router.navigate(['../editar', registro.id], { relativeTo: this.route });
  }

  setClickedRowEliminaRegistro(index, registro) {
    this.registroService.setRegistro(registro);
    this.router.navigate(['../eliminar', registro.id], { relativeTo: this.route });
  }

  getRegistro() {
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
        this.registro_create = true;
        this.registro_delete = true;
        this.registro_update = true;
        this.registro_read = true;
      }

      if (element.code == 'REGISTRO:UPDATE') {
        this.registro_update = true;
      }

      if (element.code == 'REGISTRO:DELETE') {
        this.registro_delete = true;
      }

      if (element.code == 'REGISTRO:READ') {
        this.registro_read = true;
      }

      if (element.code == 'REGISTRO:CREATE') {
        this.registro_create = true;
      }

      if (element.code == 'REGISTRO:*') {
        this.registro_update = true;
        this.registro_create = true;
        this.registro_delete = true;
        this.registro_read = true;
      }
    });
  }
}
