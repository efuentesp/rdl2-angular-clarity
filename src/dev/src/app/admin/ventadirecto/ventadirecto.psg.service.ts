/* PSG  Ventadirecto Service */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Ventadirecto } from './ventadirecto.psg.model';
import { HttpModule, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class VentadirectoService {
  private env: any = environment;
  private token: string;
  ventadirecto = new Ventadirecto();

  constructor(private http: Http) {}

  postGuardaVentadirecto(ventadirecto) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/fiduciario/ventadirecto`, ventadirecto, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaVentadirecto() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto`, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaVentadirectoPorId(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  deleteVentadirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .delete(`${environment.apiUrl}/fiduciario/ventadirecto/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  updateEditaVentadirecto(ventadirecto, id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/fiduciario/ventadirecto/` + id, ventadirecto, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaVentadirectoPorFideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?fideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorFideicomitente(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?fideicomitenteId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorFideicomisario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?fideicomisarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorTercero(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?terceroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorComitetecnico(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?comitetecnicoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorSubfiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?subfisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorParametroscomisiones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?parametroscomisionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorContratoinversion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?contratoinversionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorKyc(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?kycId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorCuentacheques(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?cuentachequesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorInstruccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?instruccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorMovimiento(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?movimientoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorTransaccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?transaccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorGuia(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?guiaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorCompraventavalores(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?compraventavaloresId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorCompradirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?compradirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorDeclaracionsat(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?declaracionsatId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorHonorarioscontrato(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?honorarioscontratoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorCarteraadeudo(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?carteraadeudoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorAportacioninmueble(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?aportacioninmuebleId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorAsientoscontables(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?asientoscontablesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorCheckermonetario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?checkermonetarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorMonitoreochekermonerario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?monitoreochekermonerarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorRetiro(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?retiroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorSaldoscuenta(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?saldoscuentaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorAgenda(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?agendaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorEvaluacionriesgos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?evaluacionriesgosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorDocumentosfideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?documentosfideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorHonorarioadministracion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?honorarioadministracionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorAccionista(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?accionistaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorFormasliquidacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?formasliquidacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorAutodeclaracioncrs(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?autodeclaracioncrsId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorAportaciones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?aportacionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorPagos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?pagosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorFideicomisospendientesliberar(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?fideicomisospendientesliberarId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaVentadirectoPorAplicacionpagoscontrolados(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/ventadirecto?aplicacionpagoscontroladosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  resetVentadirecto(): Ventadirecto {
    this.clear();
    return this.ventadirecto;
  }

  getVentadirecto(): Ventadirecto {
    var ventadirecto: Ventadirecto = {
      instruccionId: this.ventadirecto.instruccionId,
      instruccionItem: this.ventadirecto.instruccionItem,
      fechavalor: this.ventadirecto.fechavalor,
      titulosgarantia: this.ventadirecto.titulosgarantia,
      titulosgarantiaItem: this.ventadirecto.titulosgarantiaItem,
      subfisoId: this.ventadirecto.subfisoId,
      subfisoItem: this.ventadirecto.subfisoItem,
      operacionfutura: this.ventadirecto.operacionfutura,
      operacionfuturaItem: this.ventadirecto.operacionfuturaItem,
      fechaoperacion: this.ventadirecto.fechaoperacion,
      fechaoperacionAux: this.ventadirecto.fechaoperacionAux,
      activos: this.ventadirecto.activos,
      activosItem: this.ventadirecto.activosItem,
      tipomovimiento: this.ventadirecto.tipomovimiento,
      importe: this.ventadirecto.importe,
      custodio: this.ventadirecto.custodio,
      comision: this.ventadirecto.comision,
      mercado: this.ventadirecto.mercado,
      mercadoItem: this.ventadirecto.mercadoItem,
      instrumento: this.ventadirecto.instrumento,
      instrumentoItem: this.ventadirecto.instrumentoItem,
      isr: this.ventadirecto.isr,
      moneda: this.ventadirecto.moneda,
      monedaItem: this.ventadirecto.monedaItem,
      fideicomisoId: this.ventadirecto.fideicomisoId,
      fideicomisoItem: this.ventadirecto.fideicomisoItem,
      contratoinversionId: this.ventadirecto.contratoinversionId,
      contratoinversionItem: this.ventadirecto.contratoinversionItem,
      fechaliquidacion: this.ventadirecto.fechaliquidacion,
      emisiones: this.ventadirecto.emisiones,
      emisionesItem: this.ventadirecto.emisionesItem,
      serie: this.ventadirecto.serie,
      notitulos: this.ventadirecto.notitulos,
      precio: this.ventadirecto.precio,
      desccomplementaria: this.ventadirecto.desccomplementaria,
      intereses: this.ventadirecto.intereses,
      pizarra: this.ventadirecto.pizarra,
      cupon: this.ventadirecto.cupon,
    };
    return ventadirecto;
  }

  setVentadirecto(ventadirecto: Ventadirecto) {
    this.ventadirecto.instruccionId = ventadirecto.instruccionId;
    this.ventadirecto.instruccionItem = ventadirecto.instruccionItem;
    this.ventadirecto.fechavalor = ventadirecto.fechavalor;
    this.ventadirecto.titulosgarantia = ventadirecto.titulosgarantia;
    this.ventadirecto.titulosgarantiaItem = ventadirecto.titulosgarantiaItem;
    this.ventadirecto.subfisoId = ventadirecto.subfisoId;
    this.ventadirecto.subfisoItem = ventadirecto.subfisoItem;
    this.ventadirecto.operacionfutura = ventadirecto.operacionfutura;
    this.ventadirecto.operacionfuturaItem = ventadirecto.operacionfuturaItem;
    this.ventadirecto.fechaoperacion = ventadirecto.fechaoperacion;
    this.ventadirecto.fechaoperacionAux = ventadirecto.fechaoperacionAux;
    this.ventadirecto.activos = ventadirecto.activos;
    this.ventadirecto.activosItem = ventadirecto.activosItem;
    this.ventadirecto.tipomovimiento = ventadirecto.tipomovimiento;
    this.ventadirecto.importe = ventadirecto.importe;
    this.ventadirecto.custodio = ventadirecto.custodio;
    this.ventadirecto.comision = ventadirecto.comision;
    this.ventadirecto.mercado = ventadirecto.mercado;
    this.ventadirecto.mercadoItem = ventadirecto.mercadoItem;
    this.ventadirecto.instrumento = ventadirecto.instrumento;
    this.ventadirecto.instrumentoItem = ventadirecto.instrumentoItem;
    this.ventadirecto.isr = ventadirecto.isr;
    this.ventadirecto.moneda = ventadirecto.moneda;
    this.ventadirecto.monedaItem = ventadirecto.monedaItem;
    this.ventadirecto.fideicomisoId = ventadirecto.fideicomisoId;
    this.ventadirecto.fideicomisoItem = ventadirecto.fideicomisoItem;
    this.ventadirecto.contratoinversionId = ventadirecto.contratoinversionId;
    this.ventadirecto.contratoinversionItem = ventadirecto.contratoinversionItem;
    this.ventadirecto.fechaliquidacion = ventadirecto.fechaliquidacion;
    this.ventadirecto.emisiones = ventadirecto.emisiones;
    this.ventadirecto.emisionesItem = ventadirecto.emisionesItem;
    this.ventadirecto.serie = ventadirecto.serie;
    this.ventadirecto.notitulos = ventadirecto.notitulos;
    this.ventadirecto.precio = ventadirecto.precio;
    this.ventadirecto.desccomplementaria = ventadirecto.desccomplementaria;
    this.ventadirecto.intereses = ventadirecto.intereses;
    this.ventadirecto.pizarra = ventadirecto.pizarra;
    this.ventadirecto.cupon = ventadirecto.cupon;
  }

  clear() {
    this.ventadirecto.instruccionId = null;
    this.ventadirecto.instruccionItem = null;
    this.ventadirecto.fechavalor = null;
    this.ventadirecto.titulosgarantia = null;
    this.ventadirecto.titulosgarantiaItem = null;
    this.ventadirecto.subfisoId = null;
    this.ventadirecto.subfisoItem = null;
    this.ventadirecto.operacionfutura = null;
    this.ventadirecto.operacionfuturaItem = null;
    this.ventadirecto.fechaoperacion = null;
    this.ventadirecto.fechaoperacionAux = null;
    this.ventadirecto.activos = null;
    this.ventadirecto.activosItem = null;
    this.ventadirecto.tipomovimiento = null;
    this.ventadirecto.importe = null;
    this.ventadirecto.custodio = null;
    this.ventadirecto.comision = null;
    this.ventadirecto.mercado = null;
    this.ventadirecto.mercadoItem = null;
    this.ventadirecto.instrumento = null;
    this.ventadirecto.instrumentoItem = null;
    this.ventadirecto.isr = null;
    this.ventadirecto.moneda = null;
    this.ventadirecto.monedaItem = null;
    this.ventadirecto.fideicomisoId = null;
    this.ventadirecto.fideicomisoItem = null;
    this.ventadirecto.contratoinversionId = null;
    this.ventadirecto.contratoinversionItem = null;
    this.ventadirecto.fechaliquidacion = null;
    this.ventadirecto.emisiones = null;
    this.ventadirecto.emisionesItem = null;
    this.ventadirecto.serie = null;
    this.ventadirecto.notitulos = null;
    this.ventadirecto.precio = null;
    this.ventadirecto.desccomplementaria = null;
    this.ventadirecto.intereses = null;
    this.ventadirecto.pizarra = null;
    this.ventadirecto.cupon = null;
  }
}
