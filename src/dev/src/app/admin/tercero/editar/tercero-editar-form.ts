/* PSG  Tercero Edita Ts */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import swal from 'sweetalert2';

import { Tercero } from '../tercero.psg.model';
import { TerceroSend } from '../tercero.psg.model-send';
import { TerceroService } from '../tercero.psg.service';

import { FideicomisoService } from '../../fideicomiso/fideicomiso.psg.service';
import { Fideicomiso } from '../../fideicomiso/fideicomiso.psg.model';

@Component({
  selector: 'clr-tercero-editar',
  styleUrls: ['../tercero.psg.scss'],
  templateUrl: './tercero-editar.psg.html',
})
export class TerceroEditarForm implements OnInit {
  public terceroForm: FormGroup;
  public submitted = false;
  public loading = false;
  public tercero: Tercero = new Tercero();
  public terceroSend: TerceroSend = new TerceroSend();
  public idTercero: string;
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
    private terceroService: TerceroService
  ) {
    this.terceroForm = this.fb.group({
      fideicomisoId: new FormControl('', Validators.required),
      fideicomisoItem: new FormControl(''),
      notercero: new FormControl('', Validators.required),
      razonsocial: new FormControl('', Validators.required),
      nacionalidad: new FormControl('', Validators.required),
      actividadeconomica: new FormControl(''),
      ladacasa: new FormControl(''),
      ladaoficina: new FormControl(''),
      ladafax: new FormControl(''),
      telefonocasa: new FormControl(''),
      telefonooficina: new FormControl(''),
      telefonofax: new FormControl(''),
      extoficina: new FormControl(''),
      extfax: new FormControl(''),
      estatus: new FormControl('', Validators.required),
      fechaverfircosoftAux: new FormControl(''),
      tipopersona: new FormControl('', Validators.required),
      rfc: new FormControl(''),
      correo: new FormControl(''),
      calidamigratoria: new FormControl(''),
    });
  }

  ngOnInit() {
    this.recuperaTercero();

    this.cargaFideicomiso();

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  recuperaTercero() {
    this.tercero = this.terceroService.getTercero();
    this.terceroForm.controls['fideicomisoId'].setValue(this.tercero.fideicomisoId);
    this.fideicomisoService.getRecuperaFideicomisoPorId(this.tercero.fideicomisoId).subscribe(res => {
      if (res) {
        this.fideicomiso = res.json();
        this.terceroForm.controls['fideicomisoItem'].setValue(this.fideicomiso.generalesnumero);
      }
    });

    this.terceroForm.controls['notercero'].setValue(this.tercero.notercero);
    this.terceroForm.controls['razonsocial'].setValue(this.tercero.razonsocial);
    this.terceroForm.controls['nacionalidad'].setValue(this.tercero.nacionalidad);
    this.terceroForm.controls['actividadeconomica'].setValue(this.tercero.actividadeconomica);
    this.terceroForm.controls['ladacasa'].setValue(this.tercero.ladacasa);
    this.terceroForm.controls['ladaoficina'].setValue(this.tercero.ladaoficina);
    this.terceroForm.controls['ladafax'].setValue(this.tercero.ladafax);
    this.terceroForm.controls['telefonocasa'].setValue(this.tercero.telefonocasa);
    this.terceroForm.controls['telefonooficina'].setValue(this.tercero.telefonooficina);
    this.terceroForm.controls['telefonofax'].setValue(this.tercero.telefonofax);
    this.terceroForm.controls['extoficina'].setValue(this.tercero.extoficina);
    this.terceroForm.controls['extfax'].setValue(this.tercero.extfax);
    this.terceroForm.controls['estatus'].setValue(this.tercero.estatus);
    this.terceroForm.controls['fechaverfircosoftAux'].setValue(
      this.datePipe.transform(this.tercero.fechaverfircosoft, 'dd/MM/yyyy')
    );
    this.terceroForm.controls['tipopersona'].setValue(this.tercero.tipopersona);
    this.terceroForm.controls['rfc'].setValue(this.tercero.rfc);
    this.terceroForm.controls['correo'].setValue(this.tercero.correo);
    this.terceroForm.controls['calidamigratoria'].setValue(this.tercero.calidamigratoria);
  }

  editaTercero() {
    this.submitted = true;

    if (this.terceroForm.invalid) {
      swal('Error...', 'Tercero has fields to fill.', 'error');
    } else {
      this.route.params.subscribe(params => {
        this.idTercero = params['id'];
      });

      this.terceroSend.fideicomisoId = this.terceroForm.controls['fideicomisoId'].value;
      this.terceroSend.notercero = this.terceroForm.controls['notercero'].value;
      this.terceroSend.razonsocial = this.terceroForm.controls['razonsocial'].value;
      this.terceroSend.nacionalidad = this.terceroForm.controls['nacionalidad'].value;
      this.terceroSend.actividadeconomica = this.terceroForm.controls['actividadeconomica'].value;
      this.terceroSend.ladacasa = this.terceroForm.controls['ladacasa'].value;
      this.terceroSend.ladaoficina = this.terceroForm.controls['ladaoficina'].value;
      this.terceroSend.ladafax = this.terceroForm.controls['ladafax'].value;
      this.terceroSend.telefonocasa = this.terceroForm.controls['telefonocasa'].value;
      this.terceroSend.telefonooficina = this.terceroForm.controls['telefonooficina'].value;
      this.terceroSend.telefonofax = this.terceroForm.controls['telefonofax'].value;
      this.terceroSend.extoficina = this.terceroForm.controls['extoficina'].value;
      this.terceroSend.extfax = this.terceroForm.controls['extfax'].value;
      this.terceroSend.estatus = this.terceroForm.controls['estatus'].value;
      if (this.terceroForm.controls['fechaverfircosoftAux'].value !== null) {
        let fechaverfircosoftAuxtoArray = this.terceroForm.controls['fechaverfircosoftAux'].value.split('/');
        let fechaverfircosoftAuxDate = new Date(
          fechaverfircosoftAuxtoArray[1] + '/' + fechaverfircosoftAuxtoArray[0] + '/' + fechaverfircosoftAuxtoArray[2]
        );
        this.terceroSend.fechaverfircosoft = fechaverfircosoftAuxDate.getTime();
      } else {
        this.terceroSend.fechaverfircosoft = null;
      }
      this.terceroSend.tipopersona = this.terceroForm.controls['tipopersona'].value;
      this.terceroSend.rfc = this.terceroForm.controls['rfc'].value;
      this.terceroSend.correo = this.terceroForm.controls['correo'].value;
      this.terceroSend.calidamigratoria = this.terceroForm.controls['calidamigratoria'].value;

      this.terceroService.updateEditaTercero(this.terceroSend, this.idTercero).subscribe(res => {
        if (res) {
          if (res.status === 201 || res.status === 200) {
            swal('Success...', 'Tercero save successfully.', 'success');
            this.location.back();
          } else {
            swal('Error...', 'Tercero has fields to fill.', 'error');
          }
        } else {
          swal('Error...', 'Tercero save unsuccessfully.', 'error');
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

      this.terceroForm.controls['fideicomisoId'].setValue(fideicomiso.id);
      this.terceroForm.controls['fideicomisoItem'].setValue(fideicomiso.generalesnumero);
    } else {
      this.fideicomisoService.clear();
      this.terceroForm.controls['fideicomisoId'].setValue(null);
      this.terceroForm.controls['fideicomisoItem'].setValue('');
    }
  }

  regresaTercero() {
    this.location.back();
  }
}
