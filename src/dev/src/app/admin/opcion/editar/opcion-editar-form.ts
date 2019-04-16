/* PSG  Opcion Edita Ts */
import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../_validation/validation.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ValidatorFn } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Opcion } from '../opcion.psg.model';
import { OpcionSend } from '../opcion.psg.model-send';
import { OpcionService } from '../opcion.psg.service';

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
import { EventoService } from '../../evento/evento.psg.service';
import { Evento } from '../../evento/evento.psg.model';

@Component({
  selector: 'clr-opcion-not-closable-psg-angular',
  styleUrls: ['../opcion.psg.scss'],
  templateUrl: './opcion-editar.psg.html',
})
export class OpcionEditarFormDemo implements OnInit {
  public opcionForm: FormGroup;
  public submitted = false;
  public opcion: Opcion = new Opcion();
  public opcionSend: OpcionSend = new OpcionSend();
  public idOpcion: string;
  public datePipe = new DatePipe('en-US');

  public paraArray: Pregunta[];
  public para: Pregunta;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute,
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
    private eventoService: EventoService,
    private opcionService: OpcionService
  ) {
    this.opcionForm = this.fb.group({
      paraId: new FormControl('', Validators.required),
      paraItem: new FormControl(''),
      descipcionopcion: new FormControl('', Validators.required),
      puntos: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.recuperaOpcion();

    this.cargaPara();
  }

  recuperaOpcion() {
    this.opcion = this.opcionService.getOpcion();
    this.opcionForm.controls['paraId'].setValue(this.opcion.paraId);
    this.preguntaService.getRecuperaPreguntaPorId(this.opcion.paraId).subscribe(res => {
      if (res) {
        this.para = res.json();
        this.opcionForm.controls['paraItem'].setValue(this.para.descipcionpregunta);
      }
    });

    this.opcionForm.controls['descipcionopcion'].setValue(this.opcion.descipcionopcion);
    this.opcionForm.controls['puntos'].setValue(this.opcion.puntos);
  }

  editaOpcion() {
    this.submitted = true;

    if (this.opcionForm.invalid) {
      return;
    } else {
      this.route.params.subscribe(params => {
        this.idOpcion = params['id'];
      });

      this.opcionSend.paraId = this.opcionForm.controls['paraId'].value;
      this.opcionSend.descipcionopcion = this.opcionForm.controls['descipcionopcion'].value;
      this.opcionSend.puntos = this.opcionForm.controls['puntos'].value;

      this.opcionService.updateEditaOpcion(this.opcionSend, this.idOpcion).subscribe(res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            swal('Success...', 'Opcion save successfully.', 'success');
            this.router.navigate(['../../administrar'], { relativeTo: this.route });
          }
        } else {
          swal('Error...', 'Opcion save unsuccessfully.', 'error');
        }
      });
    }
  }

  cargaPara() {
    this.preguntaService.getRecuperaPregunta().subscribe(
      res => {
        if (res) {
          this.paraArray = res.json();
        }
      },
      error => {
        //swal('Error...', 'An error occurred while calling the preguntas.', 'error');
      }
    );
  }

  setClickedRowPara(index, para) {
    para.checked = !para.checked;
    if (para.checked) {
      this.preguntaService.setPregunta(para);

      this.opcionForm.controls['paraId'].setValue(para.id);
      this.opcionForm.controls['paraItem'].setValue(para.descipcionpregunta);
    } else {
      this.preguntaService.clear();
      this.opcionForm.controls['paraId'].setValue(null);
      this.opcionForm.controls['paraItem'].setValue('');
    }
  }

  regresaOpcion() {
    this.router.navigate(['../../administrar'], { relativeTo: this.route });
  }
}
