/* PSG  Aportaciones Service */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Aportaciones } from './aportaciones.psg.model';
import { HttpModule, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AportacionesService {
  private env: any = environment;
  private token: string;
  aportaciones = new Aportaciones();

  constructor(private http: Http) {}

  postGuardaAportaciones(aportaciones) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/fiduciario/aportaciones`, aportaciones, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaAportaciones() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones`, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaAportacionesPorId(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  deleteAportaciones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .delete(`${environment.apiUrl}/fiduciario/aportaciones/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  updateEditaAportaciones(aportaciones, id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/fiduciario/aportaciones/` + id, aportaciones, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaAportacionesPorFideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?fideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorFideicomitente(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?fideicomitenteId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorFideicomisario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?fideicomisarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorTercero(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?terceroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorComitetecnico(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?comitetecnicoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorSubfiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?subfisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorParametroscomisiones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?parametroscomisionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorContratoinversion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?contratoinversionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorKyc(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?kycId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorCuentacheques(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?cuentachequesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorInstruccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?instruccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorMovimiento(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?movimientoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorTransaccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?transaccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorGuia(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?guiaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorCompraventavalores(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?compraventavaloresId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorVentadirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?ventadirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorCompradirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?compradirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorDeclaracionsat(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?declaracionsatId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorHonorarioscontrato(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?honorarioscontratoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorCarteraadeudo(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?carteraadeudoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorAportacioninmueble(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?aportacioninmuebleId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorAsientoscontables(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?asientoscontablesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorCheckermonetario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?checkermonetarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorMonitoreochekermonerario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?monitoreochekermonerarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorRetiro(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?retiroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorSaldoscuenta(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?saldoscuentaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorAgenda(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?agendaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorEvaluacionriesgos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?evaluacionriesgosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorDocumentosfideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?documentosfideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorHonorarioadministracion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?honorarioadministracionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorAccionista(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?accionistaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorFormasliquidacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?formasliquidacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorAutodeclaracioncrs(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?autodeclaracioncrsId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorPagos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?pagosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorFideicomisospendientesliberar(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?fideicomisospendientesliberarId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaAportacionesPorAplicacionpagoscontrolados(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/aportaciones?aplicacionpagoscontroladosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  resetAportaciones(): Aportaciones {
    this.clear();
    return this.aportaciones;
  }

  getAportaciones(): Aportaciones {
    var aportaciones: Aportaciones = {
      instruccionId: this.aportaciones.instruccionId,
      instruccionItem: this.aportaciones.instruccionItem,
      fideicomisoId: this.aportaciones.fideicomisoId,
      fideicomisoItem: this.aportaciones.fideicomisoItem,
      subfisoId: this.aportaciones.subfisoId,
      subfisoItem: this.aportaciones.subfisoItem,
      totalimporte: this.aportaciones.totalimporte,
      destinorecepcion: this.aportaciones.destinorecepcion,
      destinorecepcionItem: this.aportaciones.destinorecepcionItem,
      estatus: this.aportaciones.estatus,
      estatusItem: this.aportaciones.estatusItem,
      moneda: this.aportaciones.moneda,
      monedaItem: this.aportaciones.monedaItem,
      formarecepcion: this.aportaciones.formarecepcion,
      formarecepcionItem: this.aportaciones.formarecepcionItem,
      estatusoperacion: this.aportaciones.estatusoperacion,
      estatusoperacionItem: this.aportaciones.estatusoperacionItem,
      tipopersona: this.aportaciones.tipopersona,
      tipopersonaItem: this.aportaciones.tipopersonaItem,
      fechacontabilizacion: this.aportaciones.fechacontabilizacion,
      fechacontabilizacionAux: this.aportaciones.fechacontabilizacionAux,
      nombre: this.aportaciones.nombre,
      descripcioncomplementaria: this.aportaciones.descripcioncomplementaria,
      nombrefideicomiso: this.aportaciones.nombrefideicomiso,
      eventos: this.aportaciones.eventos,
      totalaplicado: this.aportaciones.totalaplicado,
      importerecepcion: this.aportaciones.importerecepcion,
      origenrecursos: this.aportaciones.origenrecursos,
      origenrecursosItem: this.aportaciones.origenrecursosItem,
    };
    return aportaciones;
  }

  setAportaciones(aportaciones: Aportaciones) {
    this.aportaciones.instruccionId = aportaciones.instruccionId;
    this.aportaciones.instruccionItem = aportaciones.instruccionItem;
    this.aportaciones.fideicomisoId = aportaciones.fideicomisoId;
    this.aportaciones.fideicomisoItem = aportaciones.fideicomisoItem;
    this.aportaciones.subfisoId = aportaciones.subfisoId;
    this.aportaciones.subfisoItem = aportaciones.subfisoItem;
    this.aportaciones.totalimporte = aportaciones.totalimporte;
    this.aportaciones.destinorecepcion = aportaciones.destinorecepcion;
    this.aportaciones.destinorecepcionItem = aportaciones.destinorecepcionItem;
    this.aportaciones.estatus = aportaciones.estatus;
    this.aportaciones.estatusItem = aportaciones.estatusItem;
    this.aportaciones.moneda = aportaciones.moneda;
    this.aportaciones.monedaItem = aportaciones.monedaItem;
    this.aportaciones.formarecepcion = aportaciones.formarecepcion;
    this.aportaciones.formarecepcionItem = aportaciones.formarecepcionItem;
    this.aportaciones.estatusoperacion = aportaciones.estatusoperacion;
    this.aportaciones.estatusoperacionItem = aportaciones.estatusoperacionItem;
    this.aportaciones.tipopersona = aportaciones.tipopersona;
    this.aportaciones.tipopersonaItem = aportaciones.tipopersonaItem;
    this.aportaciones.fechacontabilizacion = aportaciones.fechacontabilizacion;
    this.aportaciones.fechacontabilizacionAux = aportaciones.fechacontabilizacionAux;
    this.aportaciones.nombre = aportaciones.nombre;
    this.aportaciones.descripcioncomplementaria = aportaciones.descripcioncomplementaria;
    this.aportaciones.nombrefideicomiso = aportaciones.nombrefideicomiso;
    this.aportaciones.eventos = aportaciones.eventos;
    this.aportaciones.totalaplicado = aportaciones.totalaplicado;
    this.aportaciones.importerecepcion = aportaciones.importerecepcion;
    this.aportaciones.origenrecursos = aportaciones.origenrecursos;
    this.aportaciones.origenrecursosItem = aportaciones.origenrecursosItem;
  }

  clear() {
    this.aportaciones.instruccionId = null;
    this.aportaciones.instruccionItem = null;
    this.aportaciones.fideicomisoId = null;
    this.aportaciones.fideicomisoItem = null;
    this.aportaciones.subfisoId = null;
    this.aportaciones.subfisoItem = null;
    this.aportaciones.totalimporte = null;
    this.aportaciones.destinorecepcion = null;
    this.aportaciones.destinorecepcionItem = null;
    this.aportaciones.estatus = null;
    this.aportaciones.estatusItem = null;
    this.aportaciones.moneda = null;
    this.aportaciones.monedaItem = null;
    this.aportaciones.formarecepcion = null;
    this.aportaciones.formarecepcionItem = null;
    this.aportaciones.estatusoperacion = null;
    this.aportaciones.estatusoperacionItem = null;
    this.aportaciones.tipopersona = null;
    this.aportaciones.tipopersonaItem = null;
    this.aportaciones.fechacontabilizacion = null;
    this.aportaciones.fechacontabilizacionAux = null;
    this.aportaciones.nombre = null;
    this.aportaciones.descripcioncomplementaria = null;
    this.aportaciones.nombrefideicomiso = null;
    this.aportaciones.eventos = null;
    this.aportaciones.totalaplicado = null;
    this.aportaciones.importerecepcion = null;
    this.aportaciones.origenrecursos = null;
    this.aportaciones.origenrecursosItem = null;
  }
}
