/* PSG  Evento Administrar Ts */
import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { Evento } from '../evento.psg.model';
import { EventoService } from '../evento.psg.service';

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
import { InstitucionService } from '../../institucion/institucion.psg.service';
import { Institucion } from '../../institucion/institucion.psg.model';

@Component({
  selector: 'clr-evento-demo-styles',
  styleUrls: ['../evento.psg.scss'],
  templateUrl: './evento-administrar.psg.html',
})
export class EventoAdministrarDemo {
  eventoArray: Evento[];
  public organizadopor: Institucion;
  public impartidopor: Profesor;

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private evento_update: boolean = false;
  private evento_delete: boolean = false;
  private evento_create: boolean = false;
  private evento_read: boolean = false;

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
    private estudianteService: EstudianteService,
    private registroService: RegistroService,
    private institucionService: InstitucionService,
    private eventoService: EventoService
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();
    this.cargaEvento();
  }

  cargaEvento() {
    this.eventoService.getRecuperaEvento().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.eventoArray = res.json();

            this.eventoArray.forEach(element => {
              this.institucionService.getRecuperaInstitucionPorId(element.organizadoporId).subscribe(res => {
                this.organizadopor = res.json();
                element.organizadoporItem = this.organizadopor.nombreinstitucion + '';
              });
              this.profesorService.getRecuperaProfesorPorId(element.impartidoporId).subscribe(res => {
                this.impartidopor = res.json();
                element.impartidoporItem = this.impartidopor.nombreprofesor + '';
              });
              element.fechaeventoAux = new Date(element.fechaevento);
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
        swal('Error...', 'An error occurred while calling the evento.', 'error');
      }
    );
  }

  setClickedRowEditaEvento(index, evento) {
    this.eventoService.setEvento(evento);
    this.router.navigate(['../editar', evento.id], { relativeTo: this.route });
  }

  setClickedRowEliminaEvento(index, evento) {
    this.eventoService.setEvento(evento);
    this.router.navigate(['../eliminar', evento.id], { relativeTo: this.route });
  }

  getEvento() {
    this.router.navigate(['../agregar'], { relativeTo: this.route });
  }

  setClickedRowConsultaRegistro(index, evento) {
    this.eventoService.setEvento(evento);
    this.router.navigate(['../registro-details/administrar/', evento.id], { relativeTo: this.route });
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
        this.evento_create = true;
        this.evento_delete = true;
        this.evento_update = true;
        this.evento_read = true;

        this.registro_create = true;
        this.registro_update = true;
        this.registro_delete = true;
        this.registro_read = true;
      }

      if (element.code == 'EVENTO:UPDATE') {
        this.evento_update = true;
      }

      if (element.code == 'EVENTO:DELETE') {
        this.evento_delete = true;
      }

      if (element.code == 'EVENTO:READ') {
        this.evento_read = true;
      }

      if (element.code == 'EVENTO:CREATE') {
        this.evento_create = true;
      }

      if (element.code == 'EVENTO:*') {
        this.evento_update = true;
        this.evento_create = true;
        this.evento_delete = true;
        this.evento_read = true;
      }

      // Child Entities
      if (element.code == 'INSCRITO:READ') {
        this.registro_read = true;
      }

      if (element.code == 'INSCRITO:*') {
        this.registro_read = true;
        this.registro_update = true;
        this.registro_create = true;
        this.registro_delete = true;
      }
    });
  }
}
