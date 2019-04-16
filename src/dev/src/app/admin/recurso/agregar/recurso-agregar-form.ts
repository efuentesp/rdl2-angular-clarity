import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, FormArray } from '@angular/forms';

import { Recurso } from '../recurso.psg.model';
import { RecursoSend } from '../recurso.psg.model-send';
import { RecursoService } from '../recurso.psg.service';

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
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../recurso.psg.scss'],
  templateUrl: './recurso-agregar.psg.html',
})
export class RecursoAgregarFormDemo implements OnInit {
  recursoForm: FormGroup;
  submitted = false;
  public recurso: Recurso = new Recurso();
  public recursoSend: RecursoSend = new RecursoSend();

  public relacionaArray: Unidad[];

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
    private unidadService: UnidadService,
    private certificacionService: CertificacionService,
    private profesorService: ProfesorService,
    private estudianteService: EstudianteService,
    private registroService: RegistroService,
    private institucionService: InstitucionService,
    private eventoService: EventoService,
    private recursoService: RecursoService
  ) {
    this.recursoForm = this.fb.group({
      relacionaId: new FormControl('', Validators.required),
      relacionaItem: new FormControl(''),
      descripcionrecurso: new FormControl('', Validators.required),
      ruta: new FormControl('', Validators.required),
      tiporecurso: new FormControl('', Validators.required),
      tamano: new FormControl(''),
    });
  }

  ngOnInit() {
    this.cargaRelaciona();
  }

  guardaRecurso() {
    this.submitted = true;

    if (this.recursoForm.invalid) {
      return;
    } else {
      this.recursoSend.relacionaId = this.recursoForm.controls['relacionaId'].value;
      this.recursoSend.descripcionrecurso = this.recursoForm.controls['descripcionrecurso'].value;
      this.recursoSend.ruta = this.recursoForm.controls['ruta'].value;
      this.recursoSend.tiporecurso = this.recursoForm.controls['tiporecurso'].value;
      this.recursoSend.tamano = this.recursoForm.controls['tamano'].value;

      this.recursoService.postGuardaRecurso(this.recursoSend).subscribe(
        res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Recurso save successfully.', 'success');
              this.router.navigate(['../administrar'], { relativeTo: this.route });
            }
          }
        },
        error => {
          swal('Error...', 'Recurso save unsuccessfully.', 'error');
        }
      );
    }
  }

  cargaRelaciona() {
    this.unidadService.getRecuperaUnidad().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.relacionaArray = res.json();
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the unidads.', 'error');
      }
    );
  }

  setClickedRowRelaciona(index, relaciona) {
    relaciona.checked = !relaciona.checked;
    if (relaciona.checked) {
      this.unidadService.setUnidad(relaciona);

      this.recursoForm.controls['relacionaId'].setValue(relaciona.id);
      this.recursoForm.controls['relacionaItem'].setValue(relaciona.nombreunidad);
    } else {
      this.unidadService.clear();
      this.recursoForm.controls['relacionaId'].setValue(null);
      this.recursoForm.controls['relacionaItem'].setValue('');
    }
  }

  regresaRecurso() {
    this.router.navigate(['../administrar'], { relativeTo: this.route });
  }
}
