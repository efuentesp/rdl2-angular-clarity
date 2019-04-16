/* PSG  Estudiante Administrar Ts */
import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Estudiante } from '../estudiante.psg.model';
import { EstudianteService } from '../estudiante.psg.service';

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
import { RegistroService } from '../../registro/registro.psg.service';
import { Registro } from '../../registro/registro.psg.model';
import { InstitucionService } from '../../institucion/institucion.psg.service';
import { Institucion } from '../../institucion/institucion.psg.model';
import { EventoService } from '../../evento/evento.psg.service';
import { Evento } from '../../evento/evento.psg.model';

@Component({
  selector: 'clr-estudiante-demo-styles',
  styleUrls: ['../estudiante.psg.scss'],
  templateUrl: './estudiante-administrar.psg.html',
})
export class EstudianteAdministrarDemo {
  estudianteArray: Estudiante[];
  public conciernepor: Programa;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private estudiante_update: boolean = false;
  private estudiante_delete: boolean = false;
  private estudiante_create: boolean = false;
  private estudiante_read: boolean = false;

  // Child Entities *
  private registro_read: boolean = false;
  private registro_update: boolean = false;
  private registro_delete: boolean = false;
  private registro_create: boolean = false;

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
    private registroService: RegistroService,
    private institucionService: InstitucionService,
    private eventoService: EventoService,
    private estudianteService: EstudianteService
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();
    this.cargaEstudiante();
  }

  cargaEstudiante() {
    this.estudianteService.getRecuperaEstudiante().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.estudianteArray = res.json();

            this.estudianteArray.forEach(element => {
              this.programaService.getRecuperaProgramaPorId(element.concierneporId).subscribe(res => {
                this.conciernepor = res.json();
                element.concierneporItem = this.conciernepor.nombreprograma + '';
              });
              element.fechanacimientoAux = new Date(element.fechanacimiento);
              if (element.genero == 'FEM') {
                element.generoItem = 'Femenino';
              }
              if (element.genero == 'MAS') {
                element.generoItem = 'Masculino';
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
            });
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the estudiante.', 'error');
      }
    );
  }

  setClickedRowEditaEstudiante(index, estudiante) {
    this.estudianteService.setEstudiante(estudiante);
    this.router.navigate(['../editar', estudiante.id], { relativeTo: this.route });
  }

  setClickedRowEliminaEstudiante(index, estudiante) {
    this.estudianteService.setEstudiante(estudiante);
    this.router.navigate(['../eliminar', estudiante.id], { relativeTo: this.route });
  }

  getEstudiante() {
    this.router.navigate(['../agregar'], { relativeTo: this.route });
  }

  setClickedRowConsultaRegistro(index, estudiante) {
    this.estudianteService.setEstudiante(estudiante);
    this.router.navigate(['../registro-details/administrar/', estudiante.id], { relativeTo: this.route });
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
        this.estudiante_create = true;
        this.estudiante_delete = true;
        this.estudiante_update = true;
        this.estudiante_read = true;

        this.registro_create = true;
        this.registro_update = true;
        this.registro_delete = true;
        this.registro_read = true;
      }

      if (element.code == 'ESTUDIANTE:UPDATE') {
        this.estudiante_update = true;
      }

      if (element.code == 'ESTUDIANTE:DELETE') {
        this.estudiante_delete = true;
      }

      if (element.code == 'ESTUDIANTE:READ') {
        this.estudiante_read = true;
      }

      if (element.code == 'ESTUDIANTE:CREATE') {
        this.estudiante_create = true;
      }

      if (element.code == 'ESTUDIANTE:*') {
        this.estudiante_update = true;
        this.estudiante_create = true;
        this.estudiante_delete = true;
        this.estudiante_read = true;
      }

      // Child Entities
      if (element.code == 'CONFIRMADOPOR:READ') {
        this.registro_read = true;
      }

      if (element.code == 'CONFIRMADOPOR:*') {
        this.registro_read = true;
        this.registro_update = true;
        this.registro_create = true;
        this.registro_delete = true;
      }
    });
  }
}
