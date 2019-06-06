/* PSG  Aportacioninmueble Service */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Aportacioninmueble } from './aportacioninmueble.psg.model';
import { HttpModule, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AportacioninmuebleService {
  private env: any = environment;
  private token: string;
  aportacioninmueble = new Aportacioninmueble();

  constructor(private http: Http) {}

  postGuardaAportacioninmueble(aportacioninmueble) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/fiduciario/aportacioninmueble`, aportacioninmueble, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaAportacioninmueble() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble`, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaAportacioninmueblePorId(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  deleteAportacioninmueble(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .delete(`${environment.apiUrl}/fiduciario/aportacioninmueble/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  updateEditaAportacioninmueble(aportacioninmueble, id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/fiduciario/aportacioninmueble/` + id, aportacioninmueble, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaAportacioninmueblePorFideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?fideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorFideicomitente(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?fideicomitenteId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorFideicomisario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?fideicomisarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorTercero(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?terceroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorComitetecnico(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?comitetecnicoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorSubfiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?subfisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorParametroscomisiones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?parametroscomisionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorContratoinversion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?contratoinversionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorKyc(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?kycId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorCuentacheques(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?cuentachequesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorInstruccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?instruccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorMovimiento(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?movimientoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorTransaccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?transaccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorGuia(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?guiaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorCompraventavalores(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?compraventavaloresId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorVentadirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?ventadirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorCompradirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?compradirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorDeclaracionsat(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?declaracionsatId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorHonorarioscontrato(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?honorarioscontratoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorCarteraadeudo(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?carteraadeudoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorAsientoscontables(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?asientoscontablesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorCheckermonetario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?checkermonetarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorMonitoreochekermonerario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?monitoreochekermonerarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorRetiro(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?retiroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorSaldoscuenta(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?saldoscuentaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorAgenda(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?agendaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorEvaluacionriesgos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?evaluacionriesgosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorDocumentosfideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?documentosfideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorHonorarioadministracion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?honorarioadministracionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorAccionista(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?accionistaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorFormasliquidacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?formasliquidacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorAutodeclaracioncrs(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?autodeclaracioncrsId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorAportaciones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?aportacionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorPagos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?pagosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorFideicomisospendientesliberar(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?fideicomisospendientesliberarId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacioninmueblePorAplicacionpagoscontrolados(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportacioninmueble?aplicacionpagoscontroladosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  resetAportacioninmueble(): Aportacioninmueble {
    this.clear();
    return this.aportacioninmueble;
  }

  getAportacioninmueble(): Aportacioninmueble {
    var aportacioninmueble: Aportacioninmueble = {
      fideicomisoId: this.aportacioninmueble.fideicomisoId,
      fideicomisoItem: this.aportacioninmueble.fideicomisoItem,
      subfisoId: this.aportacioninmueble.subfisoId,
      subfisoItem: this.aportacioninmueble.subfisoItem,
      tiponegocio: this.aportacioninmueble.tiponegocio,
      producto: this.aportacioninmueble.producto,
      idinmueble: this.aportacioninmueble.idinmueble,
      fechaalta: this.aportacioninmueble.fechaalta,
      fechaaltaAux: this.aportacioninmueble.fechaaltaAux,
      tipoinmueble: this.aportacioninmueble.tipoinmueble,
      tipoinmuebleItem: this.aportacioninmueble.tipoinmuebleItem,
      arbol: this.aportacioninmueble.arbol,
      fecharegistro: this.aportacioninmueble.fecharegistro,
      fecharegistroAux: this.aportacioninmueble.fecharegistroAux,
      tipofraccion: this.aportacioninmueble.tipofraccion,
      tipofraccionItem: this.aportacioninmueble.tipofraccionItem,
      descripcion: this.aportacioninmueble.descripcion,
      inmueblevalorinicial: this.aportacioninmueble.inmueblevalorinicial,
      inmuebleubicacion: this.aportacioninmueble.inmuebleubicacion,
      inmuebleestado: this.aportacioninmueble.inmuebleestado,
      inmuebleestadoItem: this.aportacioninmueble.inmuebleestadoItem,
      inmueblesuperficie: this.aportacioninmueble.inmueblesuperficie,
      inmuebleindivisos: this.aportacioninmueble.inmuebleindivisos,
      inmuebledias: this.aportacioninmueble.inmuebledias,
      inmuebleproyectoejecutivo: this.aportacioninmueble.inmuebleproyectoejecutivo,
      inmueblevaloractual: this.aportacioninmueble.inmueblevaloractual,
      inmuebleciudad: this.aportacioninmueble.inmuebleciudad,
      inmueblesuperficieconstruida: this.aportacioninmueble.inmueblesuperficieconstruida,
      inmueblefraccionamientounidad: this.aportacioninmueble.inmueblefraccionamientounidad,
      inmuebleclavecatastral: this.aportacioninmueble.inmuebleclavecatastral,
      inmueblevalor: this.aportacioninmueble.inmueblevalor,
      inmuebleestatus: this.aportacioninmueble.inmuebleestatus,
      inmuebleestatusItem: this.aportacioninmueble.inmuebleestatusItem,
      datosconstitucionescritura: this.aportacioninmueble.datosconstitucionescritura,
      datosconstitucionescrituraItem: this.aportacioninmueble.datosconstitucionescrituraItem,
      datosconstitucionnumescritura: this.aportacioninmueble.datosconstitucionnumescritura,
      datosconstitucionnombrenotario: this.aportacioninmueble.datosconstitucionnombrenotario,
      datosconstitucionnombrenotarioItem: this.aportacioninmueble.datosconstitucionnombrenotarioItem,
      datosconstitucionestadonotario: this.aportacioninmueble.datosconstitucionestadonotario,
      datosconstituciontelefononotario: this.aportacioninmueble.datosconstituciontelefononotario,
      datosconstitucionfecharpp: this.aportacioninmueble.datosconstitucionfecharpp,
      datosconstitucionfecharppAux: this.aportacioninmueble.datosconstitucionfecharppAux,
      datosconstitucionfechaescritura: this.aportacioninmueble.datosconstitucionfechaescritura,
      datosconstitucionfechaescrituraAux: this.aportacioninmueble.datosconstitucionfechaescrituraAux,
      datosconstitucionnumnotaria: this.aportacioninmueble.datosconstitucionnumnotaria,
      datosconstitucionciudadnotario: this.aportacioninmueble.datosconstitucionciudadnotario,
      datosconstitucionemailnotario: this.aportacioninmueble.datosconstitucionemailnotario,
      datosconstitucionnumrpp: this.aportacioninmueble.datosconstitucionnumrpp,
    };
    return aportacioninmueble;
  }

  setAportacioninmueble(aportacioninmueble: Aportacioninmueble) {
    this.aportacioninmueble.fideicomisoId = aportacioninmueble.fideicomisoId;
    this.aportacioninmueble.fideicomisoItem = aportacioninmueble.fideicomisoItem;
    this.aportacioninmueble.subfisoId = aportacioninmueble.subfisoId;
    this.aportacioninmueble.subfisoItem = aportacioninmueble.subfisoItem;
    this.aportacioninmueble.tiponegocio = aportacioninmueble.tiponegocio;
    this.aportacioninmueble.producto = aportacioninmueble.producto;
    this.aportacioninmueble.idinmueble = aportacioninmueble.idinmueble;
    this.aportacioninmueble.fechaalta = aportacioninmueble.fechaalta;
    this.aportacioninmueble.fechaaltaAux = aportacioninmueble.fechaaltaAux;
    this.aportacioninmueble.tipoinmueble = aportacioninmueble.tipoinmueble;
    this.aportacioninmueble.tipoinmuebleItem = aportacioninmueble.tipoinmuebleItem;
    this.aportacioninmueble.arbol = aportacioninmueble.arbol;
    this.aportacioninmueble.fecharegistro = aportacioninmueble.fecharegistro;
    this.aportacioninmueble.fecharegistroAux = aportacioninmueble.fecharegistroAux;
    this.aportacioninmueble.tipofraccion = aportacioninmueble.tipofraccion;
    this.aportacioninmueble.tipofraccionItem = aportacioninmueble.tipofraccionItem;
    this.aportacioninmueble.descripcion = aportacioninmueble.descripcion;
    this.aportacioninmueble.inmueblevalorinicial = aportacioninmueble.inmueblevalorinicial;
    this.aportacioninmueble.inmuebleubicacion = aportacioninmueble.inmuebleubicacion;
    this.aportacioninmueble.inmuebleestado = aportacioninmueble.inmuebleestado;
    this.aportacioninmueble.inmuebleestadoItem = aportacioninmueble.inmuebleestadoItem;
    this.aportacioninmueble.inmueblesuperficie = aportacioninmueble.inmueblesuperficie;
    this.aportacioninmueble.inmuebleindivisos = aportacioninmueble.inmuebleindivisos;
    this.aportacioninmueble.inmuebledias = aportacioninmueble.inmuebledias;
    this.aportacioninmueble.inmuebleproyectoejecutivo = aportacioninmueble.inmuebleproyectoejecutivo;
    this.aportacioninmueble.inmueblevaloractual = aportacioninmueble.inmueblevaloractual;
    this.aportacioninmueble.inmuebleciudad = aportacioninmueble.inmuebleciudad;
    this.aportacioninmueble.inmueblesuperficieconstruida = aportacioninmueble.inmueblesuperficieconstruida;
    this.aportacioninmueble.inmueblefraccionamientounidad = aportacioninmueble.inmueblefraccionamientounidad;
    this.aportacioninmueble.inmuebleclavecatastral = aportacioninmueble.inmuebleclavecatastral;
    this.aportacioninmueble.inmueblevalor = aportacioninmueble.inmueblevalor;
    this.aportacioninmueble.inmuebleestatus = aportacioninmueble.inmuebleestatus;
    this.aportacioninmueble.inmuebleestatusItem = aportacioninmueble.inmuebleestatusItem;
    this.aportacioninmueble.datosconstitucionescritura = aportacioninmueble.datosconstitucionescritura;
    this.aportacioninmueble.datosconstitucionescrituraItem = aportacioninmueble.datosconstitucionescrituraItem;
    this.aportacioninmueble.datosconstitucionnumescritura = aportacioninmueble.datosconstitucionnumescritura;
    this.aportacioninmueble.datosconstitucionnombrenotario = aportacioninmueble.datosconstitucionnombrenotario;
    this.aportacioninmueble.datosconstitucionnombrenotarioItem = aportacioninmueble.datosconstitucionnombrenotarioItem;
    this.aportacioninmueble.datosconstitucionestadonotario = aportacioninmueble.datosconstitucionestadonotario;
    this.aportacioninmueble.datosconstituciontelefononotario = aportacioninmueble.datosconstituciontelefononotario;
    this.aportacioninmueble.datosconstitucionfecharpp = aportacioninmueble.datosconstitucionfecharpp;
    this.aportacioninmueble.datosconstitucionfecharppAux = aportacioninmueble.datosconstitucionfecharppAux;
    this.aportacioninmueble.datosconstitucionfechaescritura = aportacioninmueble.datosconstitucionfechaescritura;
    this.aportacioninmueble.datosconstitucionfechaescrituraAux = aportacioninmueble.datosconstitucionfechaescrituraAux;
    this.aportacioninmueble.datosconstitucionnumnotaria = aportacioninmueble.datosconstitucionnumnotaria;
    this.aportacioninmueble.datosconstitucionciudadnotario = aportacioninmueble.datosconstitucionciudadnotario;
    this.aportacioninmueble.datosconstitucionemailnotario = aportacioninmueble.datosconstitucionemailnotario;
    this.aportacioninmueble.datosconstitucionnumrpp = aportacioninmueble.datosconstitucionnumrpp;
  }

  clear() {
    this.aportacioninmueble.fideicomisoId = null;
    this.aportacioninmueble.fideicomisoItem = null;
    this.aportacioninmueble.subfisoId = null;
    this.aportacioninmueble.subfisoItem = null;
    this.aportacioninmueble.tiponegocio = null;
    this.aportacioninmueble.producto = null;
    this.aportacioninmueble.idinmueble = null;
    this.aportacioninmueble.fechaalta = null;
    this.aportacioninmueble.fechaaltaAux = null;
    this.aportacioninmueble.tipoinmueble = null;
    this.aportacioninmueble.tipoinmuebleItem = null;
    this.aportacioninmueble.arbol = null;
    this.aportacioninmueble.fecharegistro = null;
    this.aportacioninmueble.fecharegistroAux = null;
    this.aportacioninmueble.tipofraccion = null;
    this.aportacioninmueble.tipofraccionItem = null;
    this.aportacioninmueble.descripcion = null;
    this.aportacioninmueble.inmueblevalorinicial = null;
    this.aportacioninmueble.inmuebleubicacion = null;
    this.aportacioninmueble.inmuebleestado = null;
    this.aportacioninmueble.inmuebleestadoItem = null;
    this.aportacioninmueble.inmueblesuperficie = null;
    this.aportacioninmueble.inmuebleindivisos = null;
    this.aportacioninmueble.inmuebledias = null;
    this.aportacioninmueble.inmuebleproyectoejecutivo = null;
    this.aportacioninmueble.inmueblevaloractual = null;
    this.aportacioninmueble.inmuebleciudad = null;
    this.aportacioninmueble.inmueblesuperficieconstruida = null;
    this.aportacioninmueble.inmueblefraccionamientounidad = null;
    this.aportacioninmueble.inmuebleclavecatastral = null;
    this.aportacioninmueble.inmueblevalor = null;
    this.aportacioninmueble.inmuebleestatus = null;
    this.aportacioninmueble.inmuebleestatusItem = null;
    this.aportacioninmueble.datosconstitucionescritura = null;
    this.aportacioninmueble.datosconstitucionescrituraItem = null;
    this.aportacioninmueble.datosconstitucionnumescritura = null;
    this.aportacioninmueble.datosconstitucionnombrenotario = null;
    this.aportacioninmueble.datosconstitucionnombrenotarioItem = null;
    this.aportacioninmueble.datosconstitucionestadonotario = null;
    this.aportacioninmueble.datosconstituciontelefononotario = null;
    this.aportacioninmueble.datosconstitucionfecharpp = null;
    this.aportacioninmueble.datosconstitucionfecharppAux = null;
    this.aportacioninmueble.datosconstitucionfechaescritura = null;
    this.aportacioninmueble.datosconstitucionfechaescrituraAux = null;
    this.aportacioninmueble.datosconstitucionnumnotaria = null;
    this.aportacioninmueble.datosconstitucionciudadnotario = null;
    this.aportacioninmueble.datosconstitucionemailnotario = null;
    this.aportacioninmueble.datosconstitucionnumrpp = null;
  }
}
