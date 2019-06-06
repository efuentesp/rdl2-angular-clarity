/* PSG  Comitetecnico Edita Ts */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Comitetecnico } from '../comitetecnico.psg.model';
import { ComitetecnicoSend } from '../comitetecnico.psg.model-send';
import { ComitetecnicoService } from '../comitetecnico.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-comitetecnico-editar',
  styleUrls: ['../comitetecnico.psg.scss'],
  templateUrl: './comitetecnico-editar.psg.html',
})
export class ComitetecnicoEditarForm implements OnInit {
  public comitetecnicoForm: FormGroup;
  public submitted = false;
  public loading = false;
  public comitetecnico: Comitetecnico = new Comitetecnico();
  public comitetecnicoSend: ComitetecnicoSend = new ComitetecnicoSend();
  public idComitetecnico: string;
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
    private comitetecnicoService: ComitetecnicoService
  ) {
    this.comitetecnicoForm = this.fb.group({
      fideicomisoId: new FormControl('', Validators.required),
      fideicomisoItem: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      integracion: new FormControl(''),
      facultades: new FormControl(''),
      comentarios: new FormControl(''),
      fechaconstitucionAux: new FormControl('', Validators.required),
      miembrosquorum: new FormControl(''),
      estatus: new FormControl('', Validators.required),
      nombrepresidentepropietario: new FormControl(''),
      rfcpresidentepropietario: new FormControl(''),
      nacionalidadpresidentepropietario: new FormControl(''),
      peppresidentepropietario: new FormControl(''),
      nombrepresidentesuplente: new FormControl(''),
      rfcpresidentesuplente: new FormControl(''),
      nacionalidadpresidentesuplente: new FormControl(''),
      peppresidentesuplente: new FormControl(''),
      nombresecretariopropietario: new FormControl(''),
      rfcsecretariopropietario: new FormControl(''),
      nacionalidadsecretariopropietario: new FormControl(''),
      pepsecretariopropietario: new FormControl(''),
      nombresecretariosuplente: new FormControl(''),
      rfcsecretariosuplente: new FormControl(''),
      nacionalidadsecretariosuplente: new FormControl(''),
      pepsecretariosuplente: new FormControl(''),
      nombrevocalpropietario: new FormControl(''),
      rfcvocalpropietario: new FormControl(''),
      nacionalidadvocalpropietario: new FormControl(''),
      pepvocalpropietario: new FormControl(''),
      nombrevocalsuplente: new FormControl(''),
      rfcvocalsuplente: new FormControl(''),
      nacionalidadvocalsuplente: new FormControl(''),
      pepvocalsuplente: new FormControl(''),
    });
  }

  ngOnInit() {
    this.recuperaComitetecnico();

    this.cargaFideicomiso();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaComitetecnico() {
    this.comitetecnico = this.comitetecnicoService.getComitetecnico();
    this.comitetecnicoForm.controls['fideicomisoId'].setValue(this.comitetecnico.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.comitetecnico.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.comitetecnicoForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });

    this.comitetecnicoForm.controls['nombre'].setValue(this.comitetecnico.nombre);
    this.comitetecnicoForm.controls['integracion'].setValue(this.comitetecnico.integracion);
    this.comitetecnicoForm.controls['facultades'].setValue(this.comitetecnico.facultades);
    this.comitetecnicoForm.controls['comentarios'].setValue(this.comitetecnico.comentarios);
    this.comitetecnicoForm.controls['fechaconstitucionAux'].setValue(
      this.datePipe.transform(this.comitetecnico.fechaconstitucion, 'dd/MM/yyyy')
    );
    this.comitetecnicoForm.controls['miembrosquorum'].setValue(this.comitetecnico.miembrosquorum);
    this.comitetecnicoForm.controls['estatus'].setValue(this.comitetecnico.estatus);
    this.comitetecnicoForm.controls['nombrepresidentepropietario'].setValue(
      this.comitetecnico.nombrepresidentepropietario
    );
    this.comitetecnicoForm.controls['rfcpresidentepropietario'].setValue(this.comitetecnico.rfcpresidentepropietario);
    this.comitetecnicoForm.controls['nacionalidadpresidentepropietario'].setValue(
      this.comitetecnico.nacionalidadpresidentepropietario
    );
    this.comitetecnicoForm.controls['peppresidentepropietario'].setValue(this.comitetecnico.peppresidentepropietario);
    this.comitetecnicoForm.controls['nombrepresidentesuplente'].setValue(this.comitetecnico.nombrepresidentesuplente);
    this.comitetecnicoForm.controls['rfcpresidentesuplente'].setValue(this.comitetecnico.rfcpresidentesuplente);
    this.comitetecnicoForm.controls['nacionalidadpresidentesuplente'].setValue(
      this.comitetecnico.nacionalidadpresidentesuplente
    );
    this.comitetecnicoForm.controls['peppresidentesuplente'].setValue(this.comitetecnico.peppresidentesuplente);
    this.comitetecnicoForm.controls['nombresecretariopropietario'].setValue(
      this.comitetecnico.nombresecretariopropietario
    );
    this.comitetecnicoForm.controls['rfcsecretariopropietario'].setValue(this.comitetecnico.rfcsecretariopropietario);
    this.comitetecnicoForm.controls['nacionalidadsecretariopropietario'].setValue(
      this.comitetecnico.nacionalidadsecretariopropietario
    );
    this.comitetecnicoForm.controls['pepsecretariopropietario'].setValue(this.comitetecnico.pepsecretariopropietario);
    this.comitetecnicoForm.controls['nombresecretariosuplente'].setValue(this.comitetecnico.nombresecretariosuplente);
    this.comitetecnicoForm.controls['rfcsecretariosuplente'].setValue(this.comitetecnico.rfcsecretariosuplente);
    this.comitetecnicoForm.controls['nacionalidadsecretariosuplente'].setValue(
      this.comitetecnico.nacionalidadsecretariosuplente
    );
    this.comitetecnicoForm.controls['pepsecretariosuplente'].setValue(this.comitetecnico.pepsecretariosuplente);
    this.comitetecnicoForm.controls['nombrevocalpropietario'].setValue(this.comitetecnico.nombrevocalpropietario);
    this.comitetecnicoForm.controls['rfcvocalpropietario'].setValue(this.comitetecnico.rfcvocalpropietario);
    this.comitetecnicoForm.controls['nacionalidadvocalpropietario'].setValue(
      this.comitetecnico.nacionalidadvocalpropietario
    );
    this.comitetecnicoForm.controls['pepvocalpropietario'].setValue(this.comitetecnico.pepvocalpropietario);
    this.comitetecnicoForm.controls['nombrevocalsuplente'].setValue(this.comitetecnico.nombrevocalsuplente);
    this.comitetecnicoForm.controls['rfcvocalsuplente'].setValue(this.comitetecnico.rfcvocalsuplente);
    this.comitetecnicoForm.controls['nacionalidadvocalsuplente'].setValue(this.comitetecnico.nacionalidadvocalsuplente);
    this.comitetecnicoForm.controls['pepvocalsuplente'].setValue(this.comitetecnico.pepvocalsuplente);
  }

  editaComitetecnico() {
    this.submitted = true;

    if (this.comitetecnicoForm.invalid) {
      swal('Error...', 'Comité Técnico has fields to fill.', 'error');
    } else {
      this.route.params.subscribe(params => {
        this.idComitetecnico = params['id'];
      });

      this.comitetecnicoSend.fideicomisoId = this.comitetecnicoForm.controls['fideicomisoId'].value;
      this.comitetecnicoSend.nombre = this.comitetecnicoForm.controls['nombre'].value;
      this.comitetecnicoSend.integracion = this.comitetecnicoForm.controls['integracion'].value;
      this.comitetecnicoSend.facultades = this.comitetecnicoForm.controls['facultades'].value;
      this.comitetecnicoSend.comentarios = this.comitetecnicoForm.controls['comentarios'].value;
      if (this.comitetecnicoForm.controls['fechaconstitucionAux'].value !== null) {
        let fechaconstitucionAuxtoArray = this.comitetecnicoForm.controls['fechaconstitucionAux'].value.split('/');
        let fechaconstitucionAuxDate = new Date(
          fechaconstitucionAuxtoArray[1] + '/' + fechaconstitucionAuxtoArray[0] + '/' + fechaconstitucionAuxtoArray[2]
        );
        this.comitetecnicoSend.fechaconstitucion = fechaconstitucionAuxDate.getTime();
      } else {
        this.comitetecnicoSend.fechaconstitucion = null;
      }
      this.comitetecnicoSend.miembrosquorum = this.comitetecnicoForm.controls['miembrosquorum'].value;
      this.comitetecnicoSend.estatus = this.comitetecnicoForm.controls['estatus'].value;
      this.comitetecnicoSend.nombrepresidentepropietario = this.comitetecnicoForm.controls[
        'nombrepresidentepropietario'
      ].value;
      this.comitetecnicoSend.rfcpresidentepropietario = this.comitetecnicoForm.controls[
        'rfcpresidentepropietario'
      ].value;
      this.comitetecnicoSend.nacionalidadpresidentepropietario = this.comitetecnicoForm.controls[
        'nacionalidadpresidentepropietario'
      ].value;
      this.comitetecnicoSend.peppresidentepropietario = this.comitetecnicoForm.controls[
        'peppresidentepropietario'
      ].value;
      this.comitetecnicoSend.nombrepresidentesuplente = this.comitetecnicoForm.controls[
        'nombrepresidentesuplente'
      ].value;
      this.comitetecnicoSend.rfcpresidentesuplente = this.comitetecnicoForm.controls['rfcpresidentesuplente'].value;
      this.comitetecnicoSend.nacionalidadpresidentesuplente = this.comitetecnicoForm.controls[
        'nacionalidadpresidentesuplente'
      ].value;
      this.comitetecnicoSend.peppresidentesuplente = this.comitetecnicoForm.controls['peppresidentesuplente'].value;
      this.comitetecnicoSend.nombresecretariopropietario = this.comitetecnicoForm.controls[
        'nombresecretariopropietario'
      ].value;
      this.comitetecnicoSend.rfcsecretariopropietario = this.comitetecnicoForm.controls[
        'rfcsecretariopropietario'
      ].value;
      this.comitetecnicoSend.nacionalidadsecretariopropietario = this.comitetecnicoForm.controls[
        'nacionalidadsecretariopropietario'
      ].value;
      this.comitetecnicoSend.pepsecretariopropietario = this.comitetecnicoForm.controls[
        'pepsecretariopropietario'
      ].value;
      this.comitetecnicoSend.nombresecretariosuplente = this.comitetecnicoForm.controls[
        'nombresecretariosuplente'
      ].value;
      this.comitetecnicoSend.rfcsecretariosuplente = this.comitetecnicoForm.controls['rfcsecretariosuplente'].value;
      this.comitetecnicoSend.nacionalidadsecretariosuplente = this.comitetecnicoForm.controls[
        'nacionalidadsecretariosuplente'
      ].value;
      this.comitetecnicoSend.pepsecretariosuplente = this.comitetecnicoForm.controls['pepsecretariosuplente'].value;
      this.comitetecnicoSend.nombrevocalpropietario = this.comitetecnicoForm.controls['nombrevocalpropietario'].value;
      this.comitetecnicoSend.rfcvocalpropietario = this.comitetecnicoForm.controls['rfcvocalpropietario'].value;
      this.comitetecnicoSend.nacionalidadvocalpropietario = this.comitetecnicoForm.controls[
        'nacionalidadvocalpropietario'
      ].value;
      this.comitetecnicoSend.pepvocalpropietario = this.comitetecnicoForm.controls['pepvocalpropietario'].value;
      this.comitetecnicoSend.nombrevocalsuplente = this.comitetecnicoForm.controls['nombrevocalsuplente'].value;
      this.comitetecnicoSend.rfcvocalsuplente = this.comitetecnicoForm.controls['rfcvocalsuplente'].value;
      this.comitetecnicoSend.nacionalidadvocalsuplente = this.comitetecnicoForm.controls[
        'nacionalidadvocalsuplente'
      ].value;
      this.comitetecnicoSend.pepvocalsuplente = this.comitetecnicoForm.controls['pepvocalsuplente'].value;

      this.comitetecnicoService
        .updateEditaComitetecnico(this.comitetecnicoSend, this.idComitetecnico)
        .subscribe(res => {
          if (res) {
            if (res.status === 201 || res.status === 200) {
              swal('Success...', 'Comité Técnico save successfully.', 'success');
              this.location.back();
            } else {
              swal('Error...', 'Comité Técnico has fields to fill.', 'error');
            }
          } else {
            swal('Error...', 'Comité Técnico save unsuccessfully.', 'error');
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

      this.comitetecnicoForm.controls['fideicomisoId'].setValue(fideicomiso.id);
      this.comitetecnicoForm.controls['fideicomisoItem'].setValue(fideicomiso.generalesnumero);
    } else {
      this.fideicomisoService.clear();
      this.comitetecnicoForm.controls['fideicomisoId'].setValue(null);
      this.comitetecnicoForm.controls['fideicomisoItem'].setValue('');
    }
  }

  regresaComitetecnico() {
    this.location.back();
  }
}
