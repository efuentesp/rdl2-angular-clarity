/* PSG  Compradirecto Service */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Compradirecto } from './compradirecto.psg.model';
import { HttpModule, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CompradirectoService {
  private env: any = environment;
  private token: string;
  compradirecto = new Compradirecto();

  constructor(private http: Http) {}

  postGuardaCompradirecto(compradirecto) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/fiduciario/compradirecto`, compradirecto, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaCompradirecto() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto`, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaCompradirectoPorId(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  deleteCompradirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .delete(`${environment.apiUrl}/fiduciario/compradirecto/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  updateEditaCompradirecto(compradirecto, id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/fiduciario/compradirecto/` + id, compradirecto, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaCompradirectoPorFideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?fideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorFideicomitente(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?fideicomitenteId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorFideicomisario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?fideicomisarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorTercero(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?terceroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorComitetecnico(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?comitetecnicoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorSubfiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?subfisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorParametroscomisiones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?parametroscomisionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorContratoinversion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?contratoinversionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorKyc(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?kycId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorCuentacheques(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?cuentachequesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorInstruccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?instruccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorMovimiento(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?movimientoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorTransaccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?transaccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorGuia(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?guiaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorCompraventavalores(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?compraventavaloresId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorVentadirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?ventadirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorDeclaracionsat(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?declaracionsatId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorHonorarioscontrato(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?honorarioscontratoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorCarteraadeudo(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?carteraadeudoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorAportacioninmueble(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?aportacioninmuebleId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorAsientoscontables(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?asientoscontablesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorCheckermonetario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?checkermonetarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorMonitoreochekermonerario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?monitoreochekermonerarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorRetiro(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?retiroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorSaldoscuenta(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?saldoscuentaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorAgenda(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?agendaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorEvaluacionriesgos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?evaluacionriesgosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorDocumentosfideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?documentosfideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorHonorarioadministracion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?honorarioadministracionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorAccionista(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?accionistaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorFormasliquidacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?formasliquidacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorAutodeclaracioncrs(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?autodeclaracioncrsId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorAportaciones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?aportacionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorPagos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?pagosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorFideicomisospendientesliberar(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?fideicomisospendientesliberarId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCompradirectoPorAplicacionpagoscontrolados(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/compradirecto?aplicacionpagoscontroladosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  resetCompradirecto(): Compradirecto {
    this.clear();
    return this.compradirecto;
  }

  getCompradirecto(): Compradirecto {
    var compradirecto: Compradirecto = {
      instruccionId: this.compradirecto.instruccionId,
      instruccionItem: this.compradirecto.instruccionItem,
      fechavalor: this.compradirecto.fechavalor,
      titulosgarantia: this.compradirecto.titulosgarantia,
      titulosgarantiaItem: this.compradirecto.titulosgarantiaItem,
      subfisoId: this.compradirecto.subfisoId,
      subfisoItem: this.compradirecto.subfisoItem,
      operacionfutura: this.compradirecto.operacionfutura,
      operacionfuturaItem: this.compradirecto.operacionfuturaItem,
      fechaoperacion: this.compradirecto.fechaoperacion,
      fechaoperacionAux: this.compradirecto.fechaoperacionAux,
      activos: this.compradirecto.activos,
      activosItem: this.compradirecto.activosItem,
      tipomovimiento: this.compradirecto.tipomovimiento,
      importe: this.compradirecto.importe,
      custodio: this.compradirecto.custodio,
      comision: this.compradirecto.comision,
      mercado: this.compradirecto.mercado,
      mercadoItem: this.compradirecto.mercadoItem,
      instrumento: this.compradirecto.instrumento,
      instrumentoItem: this.compradirecto.instrumentoItem,
      isr: this.compradirecto.isr,
      moneda: this.compradirecto.moneda,
      monedaItem: this.compradirecto.monedaItem,
      fideicomisoId: this.compradirecto.fideicomisoId,
      fideicomisoItem: this.compradirecto.fideicomisoItem,
      contratoinversionId: this.compradirecto.contratoinversionId,
      contratoinversionItem: this.compradirecto.contratoinversionItem,
      fechaliquidacion: this.compradirecto.fechaliquidacion,
      emisiones: this.compradirecto.emisiones,
      emisionesItem: this.compradirecto.emisionesItem,
      serie: this.compradirecto.serie,
      notitulos: this.compradirecto.notitulos,
      precio: this.compradirecto.precio,
      desccomplementaria: this.compradirecto.desccomplementaria,
      intereses: this.compradirecto.intereses,
      pizarra: this.compradirecto.pizarra,
      cupon: this.compradirecto.cupon,
    };
    return compradirecto;
  }

  setCompradirecto(compradirecto: Compradirecto) {
    this.compradirecto.instruccionId = compradirecto.instruccionId;
    this.compradirecto.instruccionItem = compradirecto.instruccionItem;
    this.compradirecto.fechavalor = compradirecto.fechavalor;
    this.compradirecto.titulosgarantia = compradirecto.titulosgarantia;
    this.compradirecto.titulosgarantiaItem = compradirecto.titulosgarantiaItem;
    this.compradirecto.subfisoId = compradirecto.subfisoId;
    this.compradirecto.subfisoItem = compradirecto.subfisoItem;
    this.compradirecto.operacionfutura = compradirecto.operacionfutura;
    this.compradirecto.operacionfuturaItem = compradirecto.operacionfuturaItem;
    this.compradirecto.fechaoperacion = compradirecto.fechaoperacion;
    this.compradirecto.fechaoperacionAux = compradirecto.fechaoperacionAux;
    this.compradirecto.activos = compradirecto.activos;
    this.compradirecto.activosItem = compradirecto.activosItem;
    this.compradirecto.tipomovimiento = compradirecto.tipomovimiento;
    this.compradirecto.importe = compradirecto.importe;
    this.compradirecto.custodio = compradirecto.custodio;
    this.compradirecto.comision = compradirecto.comision;
    this.compradirecto.mercado = compradirecto.mercado;
    this.compradirecto.mercadoItem = compradirecto.mercadoItem;
    this.compradirecto.instrumento = compradirecto.instrumento;
    this.compradirecto.instrumentoItem = compradirecto.instrumentoItem;
    this.compradirecto.isr = compradirecto.isr;
    this.compradirecto.moneda = compradirecto.moneda;
    this.compradirecto.monedaItem = compradirecto.monedaItem;
    this.compradirecto.fideicomisoId = compradirecto.fideicomisoId;
    this.compradirecto.fideicomisoItem = compradirecto.fideicomisoItem;
    this.compradirecto.contratoinversionId = compradirecto.contratoinversionId;
    this.compradirecto.contratoinversionItem = compradirecto.contratoinversionItem;
    this.compradirecto.fechaliquidacion = compradirecto.fechaliquidacion;
    this.compradirecto.emisiones = compradirecto.emisiones;
    this.compradirecto.emisionesItem = compradirecto.emisionesItem;
    this.compradirecto.serie = compradirecto.serie;
    this.compradirecto.notitulos = compradirecto.notitulos;
    this.compradirecto.precio = compradirecto.precio;
    this.compradirecto.desccomplementaria = compradirecto.desccomplementaria;
    this.compradirecto.intereses = compradirecto.intereses;
    this.compradirecto.pizarra = compradirecto.pizarra;
    this.compradirecto.cupon = compradirecto.cupon;
  }

  clear() {
    this.compradirecto.instruccionId = null;
    this.compradirecto.instruccionItem = null;
    this.compradirecto.fechavalor = null;
    this.compradirecto.titulosgarantia = null;
    this.compradirecto.titulosgarantiaItem = null;
    this.compradirecto.subfisoId = null;
    this.compradirecto.subfisoItem = null;
    this.compradirecto.operacionfutura = null;
    this.compradirecto.operacionfuturaItem = null;
    this.compradirecto.fechaoperacion = null;
    this.compradirecto.fechaoperacionAux = null;
    this.compradirecto.activos = null;
    this.compradirecto.activosItem = null;
    this.compradirecto.tipomovimiento = null;
    this.compradirecto.importe = null;
    this.compradirecto.custodio = null;
    this.compradirecto.comision = null;
    this.compradirecto.mercado = null;
    this.compradirecto.mercadoItem = null;
    this.compradirecto.instrumento = null;
    this.compradirecto.instrumentoItem = null;
    this.compradirecto.isr = null;
    this.compradirecto.moneda = null;
    this.compradirecto.monedaItem = null;
    this.compradirecto.fideicomisoId = null;
    this.compradirecto.fideicomisoItem = null;
    this.compradirecto.contratoinversionId = null;
    this.compradirecto.contratoinversionItem = null;
    this.compradirecto.fechaliquidacion = null;
    this.compradirecto.emisiones = null;
    this.compradirecto.emisionesItem = null;
    this.compradirecto.serie = null;
    this.compradirecto.notitulos = null;
    this.compradirecto.precio = null;
    this.compradirecto.desccomplementaria = null;
    this.compradirecto.intereses = null;
    this.compradirecto.pizarra = null;
    this.compradirecto.cupon = null;
  }
}
