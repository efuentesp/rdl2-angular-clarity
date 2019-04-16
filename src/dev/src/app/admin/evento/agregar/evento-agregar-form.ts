import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, FormArray } from '@angular/forms';

import { Evento } from '../evento.psg.model';
import { EventoSend } from '../evento.psg.model-send';
import { EventoService } from '../evento.psg.service';

import swal from 'sweetalert2';
import { ValidationService } from '../../../_validation/validation.service';

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
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../evento.psg.scss'],
  templateUrl: './evento-agregar.psg.html',
})
export class EventoAgregarFormDemo implements OnInit {
  eventoForm: FormGroup;
  submitted = false;
  public evento: Evento = new Evento();
  public eventoSend: EventoSend = new EventoSend();

  public organizadoporArray: Institucion[];
  public impartidoporArray: Profesor[];

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
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
  ) {
    this.eventoForm = this.fb.group({
      organizadoporId: new FormControl('', Validators.required),
      organizadoporItem: new FormControl(''),
      impartidoporId: new FormControl('', Validators.required),
      impartidoporItem: new FormControl(''),
      clave: new FormControl('', Validators.required),
      fechaeventoAux: new FormControl('', Validators.required),
      titulo: new FormControl('', Validators.required),
      duracion: new FormControl('', Validators.required),
      lugar: new FormControl('', Validators.required),
      cartel: new FormControl(''),
      tipoestatus: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.cargaOrganizadopor();
    this.cargaImpartidopor();
  }

  guardaEvento() {
    this.submitted = true;

    if (this.eventoForm.invalid) {
      return;
    } else {
      this.eventoSend.organizadoporId = this.eventoForm.controls['organizadoporId'].value;
      this.eventoSend.impartidoporId = this.eventoForm.controls['impartidoporId'].value;
      this.eventoSend.clave = this.eventoForm.controls['clave'].value;
      let fechaeventoAuxtoArray = this.eventoForm.controls['fechaeventoAux'].value.split('/');
      let fechaeventoAuxDate = new Date(
        fechaeventoAuxtoArray[1] + '/' + fechaeventoAuxtoArray[0] + '/' + fechaeventoAuxtoArray[2]
      );
      this.eventoSend.fechaevento = fechaeventoAuxDate.getTime();
      this.eventoSend.titulo = this.eventoForm.controls['titulo'].value;
      this.eventoSend.duracion = this.eventoForm.controls['duracion'].value;
      this.eventoSend.lugar = this.eventoForm.controls['lugar'].value;
      this.eventoSend.cartel = this.eventoForm.controls['cartel'].value;
      this.eventoSend.tipoestatus = this.eventoForm.controls['tipoestatus'].value;

      this.eventoService.postGuardaEvento(this.eventoSend).subscribe(
        res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Evento save successfully.', 'success');
              this.router.navigate(['../administrar'], { relativeTo: this.route });
            }
          }
        },
        error => {
          swal('Error...', 'Evento save unsuccessfully.', 'error');
        }
      );
    }
  }

  cargaOrganizadopor() {
    this.institucionService.getRecuperaInstitucion().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.organizadoporArray = res.json();
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the institucions.', 'error');
      }
    );
  }

  setClickedRowOrganizadopor(index, organizadopor) {
    organizadopor.checked = !organizadopor.checked;
    if (organizadopor.checked) {
      this.institucionService.setInstitucion(organizadopor);

      this.eventoForm.controls['organizadoporId'].setValue(organizadopor.id);
      this.eventoForm.controls['organizadoporItem'].setValue(organizadopor.nombreinstitucion);
    } else {
      this.institucionService.clear();
      this.eventoForm.controls['organizadoporId'].setValue(null);
      this.eventoForm.controls['organizadoporItem'].setValue('');
    }
  }
  cargaImpartidopor() {
    this.profesorService.getRecuperaProfesor().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.impartidoporArray = res.json();
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the profesors.', 'error');
      }
    );
  }

  setClickedRowImpartidopor(index, impartidopor) {
    impartidopor.checked = !impartidopor.checked;
    if (impartidopor.checked) {
      this.profesorService.setProfesor(impartidopor);

      this.eventoForm.controls['impartidoporId'].setValue(impartidopor.id);
      this.eventoForm.controls['impartidoporItem'].setValue(impartidopor.nombreprofesor);
    } else {
      this.profesorService.clear();
      this.eventoForm.controls['impartidoporId'].setValue(null);
      this.eventoForm.controls['impartidoporItem'].setValue('');
    }
  }

  regresaEvento() {
    this.router.navigate(['../administrar'], { relativeTo: this.route });
  }
}
