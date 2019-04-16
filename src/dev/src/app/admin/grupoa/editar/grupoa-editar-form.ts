/* PSG  Grupoa Edita Ts */
import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../_validation/validation.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ValidatorFn } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Grupoa } from '../grupoa.psg.model';
import { GrupoaSend } from '../grupoa.psg.model-send';
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
  selector: 'clr-grupoa-not-closable-psg-angular',
  styleUrls: ['../grupoa.psg.scss'],
  templateUrl: './grupoa-editar.psg.html',
})
export class GrupoaEditarFormDemo implements OnInit {
  public grupoaForm: FormGroup;
  public submitted = false;
  public grupoa: Grupoa = new Grupoa();
  public grupoaSend: GrupoaSend = new GrupoaSend();
  public idGrupoa: string;
  public datePipe = new DatePipe('en-US');

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
    private recursoService: RecursoService,
    private unidadService: UnidadService,
    private certificacionService: CertificacionService,
    private profesorService: ProfesorService,
    private estudianteService: EstudianteService,
    private registroService: RegistroService,
    private institucionService: InstitucionService,
    private eventoService: EventoService,
    private grupoaService: GrupoaService
  ) {
    this.grupoaForm = this.fb.group({
      nombregrupo: new FormControl('', Validators.required),
      descripciongrupo: new FormControl('', Validators.required),
      tipoestatus: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.recuperaGrupoa();
  }

  recuperaGrupoa() {
    this.grupoa = this.grupoaService.getGrupoa();
    this.grupoaForm.controls['nombregrupo'].setValue(this.grupoa.nombregrupo);
    this.grupoaForm.controls['descripciongrupo'].setValue(this.grupoa.descripciongrupo);
    this.grupoaForm.controls['tipoestatus'].setValue(this.grupoa.tipoestatus);
  }

  editaGrupoa() {
    this.submitted = true;

    if (this.grupoaForm.invalid) {
      return;
    } else {
      this.route.params.subscribe(params => {
        this.idGrupoa = params['id'];
      });

      this.grupoaSend.nombregrupo = this.grupoaForm.controls['nombregrupo'].value;
      this.grupoaSend.descripciongrupo = this.grupoaForm.controls['descripciongrupo'].value;
      this.grupoaSend.tipoestatus = this.grupoaForm.controls['tipoestatus'].value;

      this.grupoaService.updateEditaGrupoa(this.grupoaSend, this.idGrupoa).subscribe(res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            swal('Success...', 'Grupoa save successfully.', 'success');
            this.router.navigate(['../../administrar'], { relativeTo: this.route });
          }
        } else {
          swal('Error...', 'Grupoa save unsuccessfully.', 'error');
        }
      });
    }
  }

  regresaGrupoa() {
    this.router.navigate(['../../administrar'], { relativeTo: this.route });
  }
}
