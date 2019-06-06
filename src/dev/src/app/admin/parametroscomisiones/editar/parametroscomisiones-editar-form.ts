/* PSG  Parametroscomisiones Edita Ts */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Parametroscomisiones } from '../parametroscomisiones.psg.model';
import { ParametroscomisionesSend } from '../parametroscomisiones.psg.model-send';
import { ParametroscomisionesService } from '../parametroscomisiones.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-parametroscomisiones-editar',
  styleUrls: ['../parametroscomisiones.psg.scss'],
  templateUrl: './parametroscomisiones-editar.psg.html',
})
export class ParametroscomisionesEditarForm implements OnInit {
  public parametroscomisionesForm: FormGroup;
  public submitted = false;
  public loading = false;
  public parametroscomisiones: Parametroscomisiones = new Parametroscomisiones();
  public parametroscomisionesSend: ParametroscomisionesSend = new ParametroscomisionesSend();
  public idParametroscomisiones: string;
  public datePipe = new DatePipe('en-US');
  public id: number;

  public fideicomisoArray: Fideicomiso[];
  public fideicomiso: Fideicomiso;

  // Modal
  modalfideicomiso: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private fideicomisoService: FideicomisoService,
    private parametroscomisionesService: ParametroscomisionesService
  ) {
    this.parametroscomisionesForm = this.fb.group({
      fideicomisoId: new FormControl('', Validators.required),
      fideicomisoItem: new FormControl(''),
      tipocalculo: new FormControl('', Validators.required),
      aquiensecobra: new FormControl('', Validators.required),
      montoaceptacion: new FormControl(''),
      importeanualizado: new FormControl(''),
      periodicidad: new FormControl(''),
      calculoaldiaprimero: new FormControl(''),
      reevaluacion: new FormControl(''),
      fechaconstitucionAux: new FormControl(''),
      fechapivoteAux: new FormControl(''),
      fechaproxcalculoAux: new FormControl(''),
      metodopago: new FormControl(''),
      aquienfactura: new FormControl(''),
      nombre: new FormControl(''),
      comentario: new FormControl(''),
      estatus: new FormControl(''),
      penasconvencionales: new FormControl(''),
      moneda: new FormControl(''),
      interes: new FormControl(''),
      tipoiva: new FormControl(''),
      diacorte: new FormControl(''),
      fechaprimercalculoAux: new FormControl(''),
      fechaultimocalculoAux: new FormControl(''),
      cuentapago: new FormControl(''),
      numero: new FormControl(''),
      situacionmorosidad: new FormControl(''),
    });
  }

  ngOnInit() {
    this.recuperaParametroscomisiones();

    this.cargaFideicomiso();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaParametroscomisiones() {
    this.parametroscomisiones = this.parametroscomisionesService.getParametroscomisiones();
    this.parametroscomisionesForm.controls['fideicomisoId'].setValue(this.parametroscomisiones.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.parametroscomisiones.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.parametroscomisionesForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });

    this.parametroscomisionesForm.controls['tipocalculo'].setValue(this.parametroscomisiones.tipocalculo);
    this.parametroscomisionesForm.controls['aquiensecobra'].setValue(this.parametroscomisiones.aquiensecobra);
    this.parametroscomisionesForm.controls['montoaceptacion'].setValue(this.parametroscomisiones.montoaceptacion);
    this.parametroscomisionesForm.controls['importeanualizado'].setValue(this.parametroscomisiones.importeanualizado);
    this.parametroscomisionesForm.controls['periodicidad'].setValue(this.parametroscomisiones.periodicidad);
    this.parametroscomisionesForm.controls['calculoaldiaprimero'].setValue(
      this.parametroscomisiones.calculoaldiaprimero
    );
    this.parametroscomisionesForm.controls['reevaluacion'].setValue(this.parametroscomisiones.reevaluacion);
    this.parametroscomisionesForm.controls['fechaconstitucionAux'].setValue(
      this.datePipe.transform(this.parametroscomisiones.fechaconstitucion, 'dd/MM/yyyy')
    );
    this.parametroscomisionesForm.controls['fechapivoteAux'].setValue(
      this.datePipe.transform(this.parametroscomisiones.fechapivote, 'dd/MM/yyyy')
    );
    this.parametroscomisionesForm.controls['fechaproxcalculoAux'].setValue(
      this.datePipe.transform(this.parametroscomisiones.fechaproxcalculo, 'dd/MM/yyyy')
    );
    this.parametroscomisionesForm.controls['metodopago'].setValue(this.parametroscomisiones.metodopago);
    this.parametroscomisionesForm.controls['aquienfactura'].setValue(this.parametroscomisiones.aquienfactura);
    this.parametroscomisionesForm.controls['nombre'].setValue(this.parametroscomisiones.nombre);
    this.parametroscomisionesForm.controls['comentario'].setValue(this.parametroscomisiones.comentario);
    this.parametroscomisionesForm.controls['estatus'].setValue(this.parametroscomisiones.estatus);
    this.parametroscomisionesForm.controls['penasconvencionales'].setValue(
      this.parametroscomisiones.penasconvencionales
    );
    this.parametroscomisionesForm.controls['moneda'].setValue(this.parametroscomisiones.moneda);
    this.parametroscomisionesForm.controls['interes'].setValue(this.parametroscomisiones.interes);
    this.parametroscomisionesForm.controls['tipoiva'].setValue(this.parametroscomisiones.tipoiva);
    this.parametroscomisionesForm.controls['diacorte'].setValue(this.parametroscomisiones.diacorte);
    this.parametroscomisionesForm.controls['fechaprimercalculoAux'].setValue(
      this.datePipe.transform(this.parametroscomisiones.fechaprimercalculo, 'dd/MM/yyyy')
    );
    this.parametroscomisionesForm.controls['fechaultimocalculoAux'].setValue(
      this.datePipe.transform(this.parametroscomisiones.fechaultimocalculo, 'dd/MM/yyyy')
    );
    this.parametroscomisionesForm.controls['cuentapago'].setValue(this.parametroscomisiones.cuentapago);
    this.parametroscomisionesForm.controls['numero'].setValue(this.parametroscomisiones.numero);
    this.parametroscomisionesForm.controls['situacionmorosidad'].setValue(this.parametroscomisiones.situacionmorosidad);
  }

  editaParametroscomisiones() {
    this.submitted = true;

    if (this.parametroscomisionesForm.invalid) {
      swal('Error...', 'Parámetros de comisiones has fields to fill.', 'error');
    } else {
      this.route.params.subscribe(params => {
        this.idParametroscomisiones = params['id'];
      });

      this.parametroscomisionesSend.fideicomisoId = this.parametroscomisionesForm.controls['fideicomisoId'].value;
      this.parametroscomisionesSend.tipocalculo = this.parametroscomisionesForm.controls['tipocalculo'].value;
      this.parametroscomisionesSend.aquiensecobra = this.parametroscomisionesForm.controls['aquiensecobra'].value;
      this.parametroscomisionesSend.montoaceptacion = this.parametroscomisionesForm.controls['montoaceptacion'].value;
      this.parametroscomisionesSend.importeanualizado = this.parametroscomisionesForm.controls[
        'importeanualizado'
      ].value;
      this.parametroscomisionesSend.periodicidad = this.parametroscomisionesForm.controls['periodicidad'].value;
      this.parametroscomisionesSend.calculoaldiaprimero = this.parametroscomisionesForm.controls[
        'calculoaldiaprimero'
      ].value;
      this.parametroscomisionesSend.reevaluacion = this.parametroscomisionesForm.controls['reevaluacion'].value;
      if (this.parametroscomisionesForm.controls['fechaconstitucionAux'].value !== null) {
        let fechaconstitucionAuxtoArray = this.parametroscomisionesForm.controls['fechaconstitucionAux'].value.split(
          '/'
        );
        let fechaconstitucionAuxDate = new Date(
          fechaconstitucionAuxtoArray[1] + '/' + fechaconstitucionAuxtoArray[0] + '/' + fechaconstitucionAuxtoArray[2]
        );
        this.parametroscomisionesSend.fechaconstitucion = fechaconstitucionAuxDate.getTime();
      } else {
        this.parametroscomisionesSend.fechaconstitucion = null;
      }
      if (this.parametroscomisionesForm.controls['fechapivoteAux'].value !== null) {
        let fechapivoteAuxtoArray = this.parametroscomisionesForm.controls['fechapivoteAux'].value.split('/');
        let fechapivoteAuxDate = new Date(
          fechapivoteAuxtoArray[1] + '/' + fechapivoteAuxtoArray[0] + '/' + fechapivoteAuxtoArray[2]
        );
        this.parametroscomisionesSend.fechapivote = fechapivoteAuxDate.getTime();
      } else {
        this.parametroscomisionesSend.fechapivote = null;
      }
      if (this.parametroscomisionesForm.controls['fechaproxcalculoAux'].value !== null) {
        let fechaproxcalculoAuxtoArray = this.parametroscomisionesForm.controls['fechaproxcalculoAux'].value.split('/');
        let fechaproxcalculoAuxDate = new Date(
          fechaproxcalculoAuxtoArray[1] + '/' + fechaproxcalculoAuxtoArray[0] + '/' + fechaproxcalculoAuxtoArray[2]
        );
        this.parametroscomisionesSend.fechaproxcalculo = fechaproxcalculoAuxDate.getTime();
      } else {
        this.parametroscomisionesSend.fechaproxcalculo = null;
      }
      this.parametroscomisionesSend.metodopago = this.parametroscomisionesForm.controls['metodopago'].value;
      this.parametroscomisionesSend.aquienfactura = this.parametroscomisionesForm.controls['aquienfactura'].value;
      this.parametroscomisionesSend.nombre = this.parametroscomisionesForm.controls['nombre'].value;
      this.parametroscomisionesSend.comentario = this.parametroscomisionesForm.controls['comentario'].value;
      this.parametroscomisionesSend.estatus = this.parametroscomisionesForm.controls['estatus'].value;
      this.parametroscomisionesSend.penasconvencionales = this.parametroscomisionesForm.controls[
        'penasconvencionales'
      ].value;
      this.parametroscomisionesSend.moneda = this.parametroscomisionesForm.controls['moneda'].value;
      this.parametroscomisionesSend.interes = this.parametroscomisionesForm.controls['interes'].value;
      this.parametroscomisionesSend.tipoiva = this.parametroscomisionesForm.controls['tipoiva'].value;
      this.parametroscomisionesSend.diacorte = this.parametroscomisionesForm.controls['diacorte'].value;
      if (this.parametroscomisionesForm.controls['fechaprimercalculoAux'].value !== null) {
        let fechaprimercalculoAuxtoArray = this.parametroscomisionesForm.controls['fechaprimercalculoAux'].value.split(
          '/'
        );
        let fechaprimercalculoAuxDate = new Date(
          fechaprimercalculoAuxtoArray[1] +
            '/' +
            fechaprimercalculoAuxtoArray[0] +
            '/' +
            fechaprimercalculoAuxtoArray[2]
        );
        this.parametroscomisionesSend.fechaprimercalculo = fechaprimercalculoAuxDate.getTime();
      } else {
        this.parametroscomisionesSend.fechaprimercalculo = null;
      }
      if (this.parametroscomisionesForm.controls['fechaultimocalculoAux'].value !== null) {
        let fechaultimocalculoAuxtoArray = this.parametroscomisionesForm.controls['fechaultimocalculoAux'].value.split(
          '/'
        );
        let fechaultimocalculoAuxDate = new Date(
          fechaultimocalculoAuxtoArray[1] +
            '/' +
            fechaultimocalculoAuxtoArray[0] +
            '/' +
            fechaultimocalculoAuxtoArray[2]
        );
        this.parametroscomisionesSend.fechaultimocalculo = fechaultimocalculoAuxDate.getTime();
      } else {
        this.parametroscomisionesSend.fechaultimocalculo = null;
      }
      this.parametroscomisionesSend.cuentapago = this.parametroscomisionesForm.controls['cuentapago'].value;
      this.parametroscomisionesSend.numero = this.parametroscomisionesForm.controls['numero'].value;
      this.parametroscomisionesSend.situacionmorosidad = this.parametroscomisionesForm.controls[
        'situacionmorosidad'
      ].value;

      this.parametroscomisionesService
        .updateEditaParametroscomisiones(this.parametroscomisionesSend, this.idParametroscomisiones)
        .subscribe(res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Parámetros de comisiones save successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Parámetros de comisiones has fields to fill.', 'error');
            }
          } else {
            swal('Error...', 'Parámetros de comisiones save unsuccessfully.', 'error');
          }
        });
    }
  }

  cargaFideicomiso() {
    this.fideicomisoService.getRecuperaFideicomiso().subscribe(
      res => {
        if (res) {
          this.fideicomisoArray = res.json();

          this.fideicomisoArray.forEach(element => {
            if (element.generalesadministrador == 'ADMIN1002') {
              element.generalesadministradorItem = 'ADMINISTRADOR 1002';
            }
            if (element.generalesadministrador == 'ADMIN1003') {
              element.generalesadministradorItem = 'ADMINISTRADOR 1003';
            }
            if (element.generalesadministrador == 'ADMIN1004') {
              element.generalesadministradorItem = 'ADMINISTRADOR 1004';
            }
            if (element.generalesadministrador == 'ADMIN1005') {
              element.generalesadministradorItem = 'ADMINISTRADOR 1005';
            }
            if (element.generalesadministrador == 'ADMIN1006') {
              element.generalesadministradorItem = 'ADMINISTRADOR 1006';
            }
            if (element.generalespromotor == 'PROMOTOR1002') {
              element.generalespromotorItem = 'PROMOTOR 1002';
            }
            if (element.generalespromotor == 'PROMOTOR1003') {
              element.generalespromotorItem = 'PROMOTOR 1003';
            }
            if (element.generalespromotor == 'PROMOTOR1004') {
              element.generalespromotorItem = 'PROMOTOR 1004';
            }
            if (element.generalespromotor == 'PROMOTOR1005') {
              element.generalespromotorItem = 'PROMOTOR 1005';
            }
            if (element.generalespromotor == 'PROMOTOR1006') {
              element.generalespromotorItem = 'PROMOTOR 1006';
            }
            if (element.caracteristicasformamanejo == 'DISCRESTR') {
              element.caracteristicasformamanejoItem = 'DISCRECIONAL RESTRINGIDO';
            }
            if (element.caracteristicasformamanejo == 'NODISCR') {
              element.caracteristicasformamanejoItem = 'NO DISCRECIONAL';
            }
            if (element.caracteristicasformamanejo == 'SINMANEJO') {
              element.caracteristicasformamanejoItem = 'SIN MANEJO DE INVERSION';
            }
            if (element.caracteristicastiponegocio == 'TIPO1') {
              element.caracteristicastiponegocioItem = 'FIDEICOMISO';
            }
            if (element.caracteristicastiponegocio == 'TIPO2') {
              element.caracteristicastiponegocioItem = 'MANDATO';
            }
            if (element.caracteristicastiponegocio == 'TIPO3') {
              element.caracteristicastiponegocioItem = 'COMISIÓN MERCANTIL';
            }
            if (element.caracteristicastiponegocio == 'TIPO4') {
              element.caracteristicastiponegocioItem = 'DEPÓSITO CONDICIONAL';
            }
            if (element.caracteristicastiponegocio == 'TIPO5') {
              element.caracteristicastiponegocioItem = 'REPRESENTACIÓN COMÚN';
            }
            if (element.caracteristicasproducto == 'PROD1') {
              element.caracteristicasproductoItem = 'PLANEACIÓN PATRIMONIAL TESTAMENTARIA';
            }
            if (element.caracteristicasproducto == 'PROD2') {
              element.caracteristicasproductoItem = 'ADMINISTRACIÓN DE RECURSOS';
            }
            if (element.caracteristicasproducto == 'PROD3') {
              element.caracteristicasproductoItem = 'GARANTÍA';
            }
            if (element.caracteristicasproducto == 'PROD4') {
              element.caracteristicasproductoItem = 'FUENTE DE PAGO';
            }
            if (element.caracteristicasproducto == 'PROD5') {
              element.caracteristicasproductoItem = 'ZONA RESTRINGIDA';
            }
            if (element.caracteristicasproducto == 'PROD6') {
              element.caracteristicasproductoItem = 'MANDATO';
            }
            if (element.caracteristicasproducto == 'PROD7') {
              element.caracteristicasproductoItem = 'PENSIONES Y JUBILACIONES';
            }
            if (element.caracteristicasproducto == 'PROD8') {
              element.caracteristicasproductoItem = 'DESARROLLO INMOBILIARIO';
            }
            if (element.caracteristicasproducto == 'PROD9') {
              element.caracteristicasproductoItem = 'INFRAESTRUCTURA';
            }
            if (element.caracteristicasproducto == 'PROD10') {
              element.caracteristicasproductoItem = 'REPRESENTACIÓN COMÚN';
            }
            if (element.caracteristicasproducto == 'PROD11') {
              element.caracteristicasproductoItem = 'DEPÓSITO CONDICIONAL (Escrow)';
            }
            if (element.caracteristicasvalfatca == 'NO') {
              element.caracteristicasvalfatcaItem = 'NO';
            }
            if (element.caracteristicasvalfatca == 'SI') {
              element.caracteristicasvalfatcaItem = 'SI';
            }
            if (element.caracteristicasmanejosubfisos == 'NO') {
              element.caracteristicasmanejosubfisosItem = 'NO';
            }
            if (element.caracteristicasmanejosubfisos == 'SI') {
              element.caracteristicasmanejosubfisosItem = 'SI';
            }
            if (element.caracteristicassujetoart151 == 'NO') {
              element.caracteristicassujetoart151Item = 'NO';
            }
            if (element.caracteristicassujetoart151 == 'SI') {
              element.caracteristicassujetoart151Item = 'SI';
            }
            if (element.caracteristicascerrado == 'NO') {
              element.caracteristicascerradoItem = 'NO';
            }
            if (element.caracteristicascerrado == 'SI') {
              element.caracteristicascerradoItem = 'SI';
            }
            if (element.caracteristicasrevocable == 'NO') {
              element.caracteristicasrevocableItem = 'NO';
            }
            if (element.caracteristicasrevocable == 'SI') {
              element.caracteristicasrevocableItem = 'SI';
            }
            if (element.caracteristicasescontratoeje == 'NO') {
              element.caracteristicasescontratoejeItem = 'NO';
            }
            if (element.caracteristicasescontratoeje == 'SI') {
              element.caracteristicasescontratoejeItem = 'SI';
            }
            if (element.caracteristicascomitetecnico == 'NO') {
              element.caracteristicascomitetecnicoItem = 'NO';
            }
            if (element.caracteristicascomitetecnico == 'SI') {
              element.caracteristicascomitetecnicoItem = 'SI';
            }
            if (element.caracteristicasmanejamonext == 'NO') {
              element.caracteristicasmanejamonextItem = 'NO';
            }
            if (element.caracteristicasmanejamonext == 'SI') {
              element.caracteristicasmanejamonextItem = 'SI';
            }
            if (element.caracteristicasivafronterizo == 'NO') {
              element.caracteristicasivafronterizoItem = 'NO';
            }
            if (element.caracteristicasivafronterizo == 'SI') {
              element.caracteristicasivafronterizoItem = 'SI';
            }
            element.caracteristicasfechaaltaAux = new Date(element.caracteristicasfechaalta);
            element.caracteristicasfechaconstitucionAux = new Date(element.caracteristicasfechaconstitucion);
            element.caracteristicasfechaaprobacionAux = new Date(element.caracteristicasfechaaprobacion);
            if (element.caracteristicasestado == 'ACTIVO') {
              element.caracteristicasestadoItem = 'ACTIVO';
            }
            if (element.caracteristicasestado == 'CANCELADO') {
              element.caracteristicasestadoItem = 'CANCELADO';
            }
            if (element.caracteristicasestado == 'CONSTITUIDO') {
              element.caracteristicasestadoItem = 'CONSTITUIDO';
            }
            if (element.caracteristicasestado == 'ENVRESULTADOS') {
              element.caracteristicasestadoItem = 'ENV. A RESULTADOS';
            }
            if (element.caracteristicasestado == 'SUSPENDIDO') {
              element.caracteristicasestadoItem = 'SUSPENDIDO';
            }
            if (element.caracteristicasestado == 'ANTEPROYECTO') {
              element.caracteristicasestadoItem = 'ANTEPROYECTO';
            }
            if (element.adicionalestipo == 'PUBLICO') {
              element.adicionalestipoItem = 'PUBLICO';
            }
            if (element.adicionalestipo == 'PRIVADO') {
              element.adicionalestipoItem = 'PRIVADO';
            }
            if (element.adicionalestipopersona == 'FISICA') {
              element.adicionalestipopersonaItem = 'FISICA';
            }
            if (element.adicionalestipopersona == 'GOBIERNO') {
              element.adicionalestipopersonaItem = 'GOBIERNO';
            }
            if (element.adicionalestipopersona == 'MORAL') {
              element.adicionalestipopersonaItem = 'MORAL';
            }
            if (element.adicionalesconactividadempresarial == 'NO') {
              element.adicionalesconactividadempresarialItem = 'NO';
            }
            if (element.adicionalesconactividadempresarial == 'SI') {
              element.adicionalesconactividadempresarialItem = 'SI';
            }
            element.adicionalesfechapermisosreAux = new Date(element.adicionalesfechapermisosre);
            if (element.adicionalesprovsustfiduciaria == 'NO') {
              element.adicionalesprovsustfiduciariaItem = 'NO';
            }
            if (element.adicionalesprovsustfiduciaria == 'SI') {
              element.adicionalesprovsustfiduciariaItem = 'SI';
            }
            if (element.adicionalesfondosinterfaseafore == 'NO') {
              element.adicionalesfondosinterfaseaforeItem = 'NO';
            }
            if (element.adicionalesfondosinterfaseafore == 'SI') {
              element.adicionalesfondosinterfaseaforeItem = 'SI';
            }
            element.adicionalesfechainscripcionAux = new Date(element.adicionalesfechainscripcion);
            if (element.adicionalesformalizacioncontrato == 'PRIVADO') {
              element.adicionalesformalizacioncontratoItem = 'Contrato Privado';
            }
            if (element.adicionalesformalizacioncontrato == 'ESCPUB') {
              element.adicionalesformalizacioncontratoItem = 'Escritura Pública';
            }
            element.adicionalesfechaescrituraAux = new Date(element.adicionalesfechaescritura);
            if (element.adicionalesnombrenotario == 'NOTARIO01') {
              element.adicionalesnombrenotarioItem = 'NOTARIO 01';
            }
            if (element.adicionalesnombrenotario == 'NOTARIO02') {
              element.adicionalesnombrenotarioItem = 'NOTARIO 02';
            }
            if (element.adicionalesnombrenotario == 'NOTARIO03') {
              element.adicionalesnombrenotarioItem = 'NOTARIO 03';
            }
            element.adicionalesfechainscripcionregpublicoAux = new Date(element.adicionalesfechainscripcionregpublico);
            if (element.adicionalesadministracion == 'DELEGADA') {
              element.adicionalesadministracionItem = 'ADMINISTRACION DELEGADA';
            }
            if (element.adicionalesadministracion == 'FIDUCIARIA') {
              element.adicionalesadministracionItem = 'ADMINISTRACION FIDUCIARIA';
            }
            if (element.adicionalescontabilidaddelegada == 'NO') {
              element.adicionalescontabilidaddelegadaItem = 'NO';
            }
            if (element.adicionalescontabilidaddelegada == 'SI') {
              element.adicionalescontabilidaddelegadaItem = 'SI';
            }
          });
        }
      },
      error => {
        //swal('Error...', 'An error occurred while calling Prospecto.', 'error');
      }
    );
  }

  setClickedRowFideicomiso(index, fideicomiso) {
    fideicomiso.checked = !fideicomiso.checked;
    if (fideicomiso.checked) {
      this.fideicomisoService.setFideicomiso(fideicomiso);

      this.parametroscomisionesForm.controls['fideicomisoId'].setValue(fideicomiso.id);
      this.parametroscomisionesForm.controls['fideicomisoItem'].setValue(fideicomiso.generalesnumero);
    } else {
      this.fideicomisoService.clear();
      this.parametroscomisionesForm.controls['fideicomisoId'].setValue(null);
      this.parametroscomisionesForm.controls['fideicomisoItem'].setValue('');
    }
  }

  regresaParametroscomisiones() {
    this.location.back();
  }
}
