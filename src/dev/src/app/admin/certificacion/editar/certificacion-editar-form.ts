/* PSG  Certificacion Edita Ts */
import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../_validation/validation.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ValidatorFn } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Certificacion } from '../certificacion.psg.model';
import { CertificacionSend } from '../certificacion.psg.model-send';
import { CertificacionService } from '../certificacion.psg.service';

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
  selector: 'clr-certificacion-not-closable-psg-angular',
  styleUrls: ['../certificacion.psg.scss'],
  templateUrl: './certificacion-editar.psg.html',
})
export class CertificacionEditarFormDemo implements OnInit {
  public certificacionForm: FormGroup;
  public submitted = false;
  public certificacion: Certificacion = new Certificacion();
  public certificacionSend: CertificacionSend = new CertificacionSend();
  public idCertificacion: string;
  public datePipe = new DatePipe('en-US');

  public tieneArray: Publicacion[];
  public tiene: Publicacion;
  public sonArray: Profesor[];
  public son: Profesor;

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
    private profesorService: ProfesorService,
    private estudianteService: EstudianteService,
    private registroService: RegistroService,
    private institucionService: InstitucionService,
    private eventoService: EventoService,
    private certificacionService: CertificacionService
  ) {
    this.certificacionForm = this.fb.group({
      tieneId: new FormControl('', Validators.required),
      tieneItem: new FormControl(''),
      sonId: new FormControl('', Validators.required),
      sonItem: new FormControl(''),
      idcertificacion: new FormControl('', Validators.required),
      fechacertificacionAux: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.recuperaCertificacion();

    this.cargaTiene();
    this.cargaSon();
  }

  recuperaCertificacion() {
    this.certificacion = this.certificacionService.getCertificacion();
    this.certificacionForm.controls['tieneId'].setValue(this.certificacion.tieneId);
    this.publicacionService.getRecuperaPublicacionPorId(this.certificacion.tieneId).subscribe(res => {
      if (res) {
        this.tiene = res.json();
        this.certificacionForm.controls['tieneItem'].setValue(this.tiene.nombreobra);
      }
    });

    this.certificacionForm.controls['sonId'].setValue(this.certificacion.sonId);
    this.profesorService.getRecuperaProfesorPorId(this.certificacion.sonId).subscribe(res => {
      if (res) {
        this.son = res.json();
        this.certificacionForm.controls['sonItem'].setValue(this.son.nombreprofesor);
      }
    });

    this.certificacionForm.controls['idcertificacion'].setValue(this.certificacion.idcertificacion);
    this.certificacionForm.controls['fechacertificacionAux'].setValue(
      this.datePipe.transform(this.certificacion.fechacertificacion, 'dd/MM/yyyy')
    );
  }

  editaCertificacion() {
    this.submitted = true;

    if (this.certificacionForm.invalid) {
      return;
    } else {
      this.route.params.subscribe(params => {
        this.idCertificacion = params['id'];
      });

      this.certificacionSend.tieneId = this.certificacionForm.controls['tieneId'].value;
      this.certificacionSend.sonId = this.certificacionForm.controls['sonId'].value;
      this.certificacionSend.idcertificacion = this.certificacionForm.controls['idcertificacion'].value;
      let fechacertificacionAuxtoArray = this.certificacionForm.controls['fechacertificacionAux'].value.split('/');
      let fechacertificacionAuxDate = new Date(
        fechacertificacionAuxtoArray[1] + '/' + fechacertificacionAuxtoArray[0] + '/' + fechacertificacionAuxtoArray[2]
      );
      this.certificacionSend.fechacertificacion = fechacertificacionAuxDate.getTime();

      this.certificacionService
        .updateEditaCertificacion(this.certificacionSend, this.idCertificacion)
        .subscribe(res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Certificacion save successfully.', 'success');
              this.router.navigate(['../../administrar'], { relativeTo: this.route });
            }
          } else {
            swal('Error...', 'Certificacion save unsuccessfully.', 'error');
          }
        });
    }
  }

  cargaTiene() {
    this.publicacionService.getRecuperaPublicacion().subscribe(
      res => {
        if (res) {
          this.tieneArray = res.json();
        }
      },
      error => {
        //swal('Error...', 'An error occurred while calling the publicacions.', 'error');
      }
    );
  }

  setClickedRowTiene(index, tiene) {
    tiene.checked = !tiene.checked;
    if (tiene.checked) {
      this.publicacionService.setPublicacion(tiene);

      this.certificacionForm.controls['tieneId'].setValue(tiene.id);
      this.certificacionForm.controls['tieneItem'].setValue(tiene.nombreobra);
    } else {
      this.publicacionService.clear();
      this.certificacionForm.controls['tieneId'].setValue(null);
      this.certificacionForm.controls['tieneItem'].setValue('');
    }
  }
  cargaSon() {
    this.profesorService.getRecuperaProfesor().subscribe(
      res => {
        if (res) {
          this.sonArray = res.json();
        }
      },
      error => {
        //swal('Error...', 'An error occurred while calling the profesors.', 'error');
      }
    );
  }

  setClickedRowSon(index, son) {
    son.checked = !son.checked;
    if (son.checked) {
      this.profesorService.setProfesor(son);

      this.certificacionForm.controls['sonId'].setValue(son.id);
      this.certificacionForm.controls['sonItem'].setValue(son.nombreprofesor);
    } else {
      this.profesorService.clear();
      this.certificacionForm.controls['sonId'].setValue(null);
      this.certificacionForm.controls['sonItem'].setValue('');
    }
  }

  regresaCertificacion() {
    this.router.navigate(['../../administrar'], { relativeTo: this.route });
  }
}
