/* PSG  Examen Administrar Ts */
import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Examen } from '../examen.psg.model';
import { ExamenService } from '../examen.psg.service';

import { OpcionService } from '../../opcion/opcion.psg.service';
import { Opcion } from '../../opcion/opcion.psg.model';
import { PreguntaService } from '../../pregunta/pregunta.psg.service';
import { Pregunta } from '../../pregunta/pregunta.psg.model';
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
  selector: 'clr-examen-demo-styles',
  styleUrls: ['../examen.psg.scss'],
  templateUrl: './examen-administrar.psg.html',
})
export class ExamenAdministrarDemo {
  examenArray: Examen[];
  public corresponde: Publicacion;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private examen_update: boolean = false;
  private examen_delete: boolean = false;
  private examen_create: boolean = false;
  private examen_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private opcionService: OpcionService,
    private preguntaService: PreguntaService,
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
    private examenService: ExamenService
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();
    this.cargaExamen();
  }

  cargaExamen() {
    this.examenService.getRecuperaExamen().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.examenArray = res.json();

            this.examenArray.forEach(element => {
              this.publicacionService.getRecuperaPublicacionPorId(element.correspondeId).subscribe(res => {
                this.corresponde = res.json();
                element.correspondeItem = this.corresponde.nombreobra + '';
              });
            });
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the examen.', 'error');
      }
    );
  }

  setClickedRowEditaExamen(index, examen) {
    this.examenService.setExamen(examen);
    this.router.navigate(['../editar', examen.id], { relativeTo: this.route });
  }

  setClickedRowEliminaExamen(index, examen) {
    this.examenService.setExamen(examen);
    this.router.navigate(['../eliminar', examen.id], { relativeTo: this.route });
  }

  getExamen() {
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
        this.examen_create = true;
        this.examen_delete = true;
        this.examen_update = true;
        this.examen_read = true;
      }

      if (element.code == 'EXAMEN:UPDATE') {
        this.examen_update = true;
      }

      if (element.code == 'EXAMEN:DELETE') {
        this.examen_delete = true;
      }

      if (element.code == 'EXAMEN:READ') {
        this.examen_read = true;
      }

      if (element.code == 'EXAMEN:CREATE') {
        this.examen_create = true;
      }

      if (element.code == 'EXAMEN:*') {
        this.examen_update = true;
        this.examen_create = true;
        this.examen_delete = true;
        this.examen_read = true;
      }
    });
  }
}
