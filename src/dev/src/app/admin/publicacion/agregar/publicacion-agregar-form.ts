import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, FormArray } from '@angular/forms';

import { Publicacion } from '../publicacion.psg.model';
import { PublicacionSend } from '../publicacion.psg.model-send';
import { PublicacionService } from '../publicacion.psg.service';

import swal from 'sweetalert2';
import { ValidationService } from '../../../_validation/validation.service';

import { OpcionService } from '../../opcion/opcion.psg.service';
import { Opcion } from '../../opcion/opcion.psg.model';
import { PreguntaService } from '../../pregunta/pregunta.psg.service';
import { Pregunta } from '../../pregunta/pregunta.psg.model';
import { ExamenService } from '../../examen/examen.psg.service';
import { Examen } from '../../examen/examen.psg.model';
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
  selector: 'clr-alert-not-closable-demo-angular',
  styleUrls: ['../publicacion.psg.scss'],
  templateUrl: './publicacion-agregar.psg.html',
})
export class PublicacionAgregarFormDemo implements OnInit {
  publicacionForm: FormGroup;
  submitted = false;
  public publicacion: Publicacion = new Publicacion();
  public publicacionSend: PublicacionSend = new PublicacionSend();

  public familiarizaArray: Grupoa[];
  public comunicadoArray: Programa[];

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private route: ActivatedRoute,
    private opcionService: OpcionService,
    private preguntaService: PreguntaService,
    private examenService: ExamenService,
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
    private publicacionService: PublicacionService
  ) {
    this.publicacionForm = this.fb.group({
      nombreobra: new FormControl('', Validators.required),
      tiposubsistema: new FormControl('', Validators.required),
      tiponivel: new FormControl('', Validators.required),
      tipoarea: new FormControl('', Validators.required),
      fechapublicacionAux: new FormControl('', Validators.required),
      autor: new FormControl('', Validators.required),
      familiarizaId: new FormControl('', Validators.required),
      familiarizaItem: new FormControl(''),
      comunicadoId: new FormControl('', Validators.required),
      comunicadoItem: new FormControl(''),
    });
  }

  ngOnInit() {
    this.cargaFamiliariza();
    this.cargaComunicado();
  }

  guardaPublicacion() {
    this.submitted = true;

    if (this.publicacionForm.invalid) {
      return;
    } else {
      this.publicacionSend.nombreobra = this.publicacionForm.controls['nombreobra'].value;
      this.publicacionSend.tiposubsistema = this.publicacionForm.controls['tiposubsistema'].value;
      this.publicacionSend.tiponivel = this.publicacionForm.controls['tiponivel'].value;
      this.publicacionSend.tipoarea = this.publicacionForm.controls['tipoarea'].value;
      let fechapublicacionAuxtoArray = this.publicacionForm.controls['fechapublicacionAux'].value.split('/');
      let fechapublicacionAuxDate = new Date(
        fechapublicacionAuxtoArray[1] + '/' + fechapublicacionAuxtoArray[0] + '/' + fechapublicacionAuxtoArray[2]
      );
      this.publicacionSend.fechapublicacion = fechapublicacionAuxDate.getTime();
      this.publicacionSend.autor = this.publicacionForm.controls['autor'].value;
      this.publicacionSend.familiarizaId = this.publicacionForm.controls['familiarizaId'].value;
      this.publicacionSend.comunicadoId = this.publicacionForm.controls['comunicadoId'].value;

      this.publicacionService.postGuardaPublicacion(this.publicacionSend).subscribe(
        res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Publicacion save successfully.', 'success');
              this.router.navigate(['../administrar'], { relativeTo: this.route });
            }
          }
        },
        error => {
          swal('Error...', 'Publicacion save unsuccessfully.', 'error');
        }
      );
    }
  }

  cargaFamiliariza() {
    this.grupoaService.getRecuperaGrupoa().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.familiarizaArray = res.json();
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the grupoas.', 'error');
      }
    );
  }

  setClickedRowFamiliariza(index, familiariza) {
    familiariza.checked = !familiariza.checked;
    if (familiariza.checked) {
      this.grupoaService.setGrupoa(familiariza);

      this.publicacionForm.controls['familiarizaId'].setValue(familiariza.id);
      this.publicacionForm.controls['familiarizaItem'].setValue(familiariza.nombregrupo);
    } else {
      this.grupoaService.clear();
      this.publicacionForm.controls['familiarizaId'].setValue(null);
      this.publicacionForm.controls['familiarizaItem'].setValue('');
    }
  }
  cargaComunicado() {
    this.programaService.getRecuperaPrograma().subscribe(
      res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            this.comunicadoArray = res.json();
          }
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the programas.', 'error');
      }
    );
  }

  setClickedRowComunicado(index, comunicado) {
    comunicado.checked = !comunicado.checked;
    if (comunicado.checked) {
      this.programaService.setPrograma(comunicado);

      this.publicacionForm.controls['comunicadoId'].setValue(comunicado.id);
      this.publicacionForm.controls['comunicadoItem'].setValue(comunicado.nombreprograma);
    } else {
      this.programaService.clear();
      this.publicacionForm.controls['comunicadoId'].setValue(null);
      this.publicacionForm.controls['comunicadoItem'].setValue('');
    }
  }

  regresaPublicacion() {
    this.router.navigate(['../administrar'], { relativeTo: this.route });
  }
}
