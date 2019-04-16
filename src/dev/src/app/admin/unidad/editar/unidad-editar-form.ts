/* PSG  Unidad Edita Ts */
import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../_validation/validation.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ValidatorFn } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Unidad } from '../unidad.psg.model';
import { UnidadSend } from '../unidad.psg.model-send';
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
  selector: 'clr-unidad-not-closable-psg-angular',
  styleUrls: ['../unidad.psg.scss'],
  templateUrl: './unidad-editar.psg.html',
})
export class UnidadEditarFormDemo implements OnInit {
  public unidadForm: FormGroup;
  public submitted = false;
  public unidad: Unidad = new Unidad();
  public unidadSend: UnidadSend = new UnidadSend();
  public idUnidad: string;
  public datePipe = new DatePipe('en-US');

  public competeArray: Publicacion[];
  public compete: Publicacion;

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
    private certificacionService: CertificacionService,
    private profesorService: ProfesorService,
    private estudianteService: EstudianteService,
    private registroService: RegistroService,
    private institucionService: InstitucionService,
    private eventoService: EventoService,
    private unidadService: UnidadService
  ) {
    this.unidadForm = this.fb.group({
      competeId: new FormControl('', Validators.required),
      competeItem: new FormControl(''),
      nombreunidad: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.recuperaUnidad();

    this.cargaCompete();
  }

  recuperaUnidad() {
    this.unidad = this.unidadService.getUnidad();
    this.unidadForm.controls['competeId'].setValue(this.unidad.competeId);
    this.publicacionService.getRecuperaPublicacionPorId(this.unidad.competeId).subscribe(res => {
      if (res) {
        this.compete = res.json();
        this.unidadForm.controls['competeItem'].setValue(this.compete.nombreobra);
      }
    });

    this.unidadForm.controls['nombreunidad'].setValue(this.unidad.nombreunidad);
  }

  editaUnidad() {
    this.submitted = true;

    if (this.unidadForm.invalid) {
      return;
    } else {
      this.route.params.subscribe(params => {
        this.idUnidad = params['id'];
      });

      this.unidadSend.competeId = this.unidadForm.controls['competeId'].value;
      this.unidadSend.nombreunidad = this.unidadForm.controls['nombreunidad'].value;

      this.unidadService.updateEditaUnidad(this.unidadSend, this.idUnidad).subscribe(res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            swal('Success...', 'Unidad save successfully.', 'success');
            this.router.navigate(['../../administrar'], { relativeTo: this.route });
          }
        } else {
          swal('Error...', 'Unidad save unsuccessfully.', 'error');
        }
      });
    }
  }

  cargaCompete() {
    this.publicacionService.getRecuperaPublicacion().subscribe(
      res => {
        if (res) {
          this.competeArray = res.json();
        }
      },
      error => {
        //swal('Error...', 'An error occurred while calling the publicacions.', 'error');
      }
    );
  }

  setClickedRowCompete(index, compete) {
    compete.checked = !compete.checked;
    if (compete.checked) {
      this.publicacionService.setPublicacion(compete);

      this.unidadForm.controls['competeId'].setValue(compete.id);
      this.unidadForm.controls['competeItem'].setValue(compete.nombreobra);
    } else {
      this.publicacionService.clear();
      this.unidadForm.controls['competeId'].setValue(null);
      this.unidadForm.controls['competeItem'].setValue('');
    }
  }

  regresaUnidad() {
    this.router.navigate(['../../administrar'], { relativeTo: this.route });
  }
}
