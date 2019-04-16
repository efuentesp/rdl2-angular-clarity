/* PSG  Grupoa Administrar Ts */
import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Grupoa } from '../grupoa.psg.model';
import { GrupoaService } from '../grupoa.psg.service';

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
  selector: 'clr-grupoa-demo-styles',
  styleUrls: ['../grupoa.psg.scss'],
  templateUrl: './grupoa-administrar.psg.html',
})
export class GrupoaAdministrarDemo {
  grupoaArray: Grupoa[];

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private grupoa_update: boolean = false;
  private grupoa_delete: boolean = false;
  private grupoa_create: boolean = false;
  private grupoa_read: boolean = false;

  // Child Entities *

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private opcionService: OpcionService,
    private preguntaService: PreguntaService,
    private examenService: ExamenService,
    private publicacionService: PublicacionService,
    private programaService: ProgramaService,
    private recursoService: RecursoService,
    private unidadService: UnidadService,
    private certificacionService: CertificacionService,
    private profesorService: ProfesorService,
    private estudianteService: EstudianteService,
    private registroService: RegistroService,
    private institucionService: InstitucionService,
    private eventoService: EventoService,
    private grupoaService: GrupoaService
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();
    this.cargaGrupoa();
  }

  cargaGrupoa() {
    this.grupoaService.getRecuperaGrupoa().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.grupoaArray = res.json();

            this.grupoaArray.forEach(element => {
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
        swal('Error...', 'An error occurred while calling the grupoa.', 'error');
      }
    );
  }

  setClickedRowEditaGrupoa(index, grupoa) {
    this.grupoaService.setGrupoa(grupoa);
    this.router.navigate(['../editar', grupoa.id], { relativeTo: this.route });
  }

  setClickedRowEliminaGrupoa(index, grupoa) {
    this.grupoaService.setGrupoa(grupoa);
    this.router.navigate(['../eliminar', grupoa.id], { relativeTo: this.route });
  }

  getGrupoa() {
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
        this.grupoa_create = true;
        this.grupoa_delete = true;
        this.grupoa_update = true;
        this.grupoa_read = true;
      }

      if (element.code == 'GRUPOA:UPDATE') {
        this.grupoa_update = true;
      }

      if (element.code == 'GRUPOA:DELETE') {
        this.grupoa_delete = true;
      }

      if (element.code == 'GRUPOA:READ') {
        this.grupoa_read = true;
      }

      if (element.code == 'GRUPOA:CREATE') {
        this.grupoa_create = true;
      }

      if (element.code == 'GRUPOA:*') {
        this.grupoa_update = true;
        this.grupoa_create = true;
        this.grupoa_delete = true;
        this.grupoa_read = true;
      }
    });
  }
}
