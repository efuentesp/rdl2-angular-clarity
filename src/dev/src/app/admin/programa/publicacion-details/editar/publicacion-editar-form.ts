/* PSG  Publicacion Edita Ts */
import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../../_validation/validation.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ValidatorFn } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Publicacion } from '../../../publicacion/publicacion.psg.model';
import { PublicacionSend } from '../../../publicacion/publicacion.psg.model-send';
import { PublicacionService } from '../../../publicacion/publicacion.psg.service';

import { OpcionService } from '../../../opcion/opcion.psg.service';
import { Opcion } from '../../../opcion/opcion.psg.model';
import { PreguntaService } from '../../../pregunta/pregunta.psg.service';
import { Pregunta } from '../../../pregunta/pregunta.psg.model';
import { ExamenService } from '../../../examen/examen.psg.service';
import { Examen } from '../../../examen/examen.psg.model';
import { ProgramaService } from '../../../programa/programa.psg.service';
import { Programa } from '../../../programa/programa.psg.model';
import { GrupoaService } from '../../../grupoa/grupoa.psg.service';
import { Grupoa } from '../../../grupoa/grupoa.psg.model';
import { RecursoService } from '../../../recurso/recurso.psg.service';
import { Recurso } from '../../../recurso/recurso.psg.model';
import { UnidadService } from '../../../unidad/unidad.psg.service';
import { Unidad } from '../../../unidad/unidad.psg.model';
import { CertificacionService } from '../../../certificacion/certificacion.psg.service';
import { Certificacion } from '../../../certificacion/certificacion.psg.model';
import { ProfesorService } from '../../../profesor/profesor.psg.service';
import { Profesor } from '../../../profesor/profesor.psg.model';
import { EstudianteService } from '../../../estudiante/estudiante.psg.service';
import { Estudiante } from '../../../estudiante/estudiante.psg.model';
import { RegistroService } from '../../../registro/registro.psg.service';
import { Registro } from '../../../registro/registro.psg.model';
import { InstitucionService } from '../../../institucion/institucion.psg.service';
import { Institucion } from '../../../institucion/institucion.psg.model';
import { EventoService } from '../../../evento/evento.psg.service';
import { Evento } from '../../../evento/evento.psg.model';

@Component({
  selector: 'clr-publicacion-not-closable-psg-angular',
  templateUrl: './publicacion-editar.psg.html',
})
export class PublicacionDetailsEditarFormDemo implements OnInit {
  public publicacionForm: FormGroup;
  public submitted = false;
  public publicacion: Publicacion = new Publicacion();
  public publicacionSend: PublicacionSend = new PublicacionSend();
  public idPublicacion: string;
  public datePipe = new DatePipe('en-US');

  public familiariza: Grupoa;
  public idFamiliariza: string = '';
  public comunicado: Programa;
  public idComunicado: string = '';

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
    this.recuperaPublicacion();

    this.route.params.subscribe(params => {
      this.idFamiliariza = params['id'];
      this.cargaFamiliariza(this.idFamiliariza);
      this.idComunicado = params['id'];
      this.cargaComunicado(this.idComunicado);
    });
  }

  recuperaPublicacion() {
    this.publicacion = this.publicacionService.getPublicacion();
    this.publicacionForm.controls['nombreobra'].setValue(this.publicacion.nombreobra);
    this.publicacionForm.controls['tiposubsistema'].setValue(this.publicacion.tiposubsistema);
    this.publicacionForm.controls['tiponivel'].setValue(this.publicacion.tiponivel);
    this.publicacionForm.controls['tipoarea'].setValue(this.publicacion.tipoarea);
    this.publicacionForm.controls['fechapublicacionAux'].setValue(
      this.datePipe.transform(this.publicacion.fechapublicacion, 'dd/MM/yyyy')
    );
    this.publicacionForm.controls['autor'].setValue(this.publicacion.autor);
    this.publicacionForm.controls['familiarizaId'].setValue(this.publicacion.familiarizaId);
    this.publicacionForm.controls['comunicadoId'].setValue(this.publicacion.comunicadoId);
  }

  editaPublicacion() {
    this.submitted = true;

    if (this.publicacionForm.invalid) {
      return;
    } else {
      this.route.params.subscribe(params => {
        this.idPublicacion = params['id'];
      });

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

      this.publicacionService.updateEditaPublicacion(this.publicacionSend, this.idPublicacion).subscribe(res => {
        if (res) {
          swal('Success...', 'Publicacion save successfully.', 'success');
          // DETAILS this.router.navigate(['../../../publicacion-details/administrar/', this.publicacionSend.programaId], { relativeTo: this.route });
        } else {
          swal('Error...', 'Publicacion save unsuccessfully.', 'error');
        }
      });
    }
  }

  cargaFamiliariza(id) {
    this.grupoaService.getRecuperaGrupoaPorId(id).subscribe(
      res => {
        if (res) {
          this.familiariza = res.json();
          this.publicacionForm.controls['familiarizaId'].setValue(id);
          this.publicacionForm.controls['familiarizaItem'].setValue(this.familiariza.nombregrupo);
        }
      },
      error => {
        //swal('Error...', 'An error occurred while calling the grupoas.', 'error');
      }
    );
  }
  cargaComunicado(id) {
    this.programaService.getRecuperaProgramaPorId(id).subscribe(
      res => {
        if (res) {
          this.comunicado = res.json();
          this.publicacionForm.controls['comunicadoId'].setValue(id);
          this.publicacionForm.controls['comunicadoItem'].setValue(this.comunicado.nombreprograma);
        }
      },
      error => {
        //swal('Error...', 'An error occurred while calling the programas.', 'error');
      }
    );
  }

  regresaPublicacion() {
    // DETAILS this.router.navigate(['../../../publicacion-details/administrar/', this.idPrograma], { relativeTo: this.route });
  }
}
