/* PSG  Cuentacheques Service */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Cuentacheques } from './cuentacheques.psg.model';
import { HttpModule, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CuentachequesService {
  private env: any = environment;
  private token: string;
  cuentacheques = new Cuentacheques();

  constructor(private http: Http) {}

  postGuardaCuentacheques(cuentacheques) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/fiduciario/cuentacheques`, cuentacheques, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaCuentacheques() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques`, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaCuentachequesPorId(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  deleteCuentacheques(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .delete(`${environment.apiUrl}/fiduciario/cuentacheques/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  updateEditaCuentacheques(cuentacheques, id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/fiduciario/cuentacheques/` + id, cuentacheques, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaCuentachequesPorFideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?fideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorFideicomitente(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?fideicomitenteId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorFideicomisario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?fideicomisarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorTercero(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?terceroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorComitetecnico(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?comitetecnicoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorSubfiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?subfisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorParametroscomisiones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?parametroscomisionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorContratoinversion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?contratoinversionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorKyc(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?kycId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorInstruccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?instruccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorMovimiento(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?movimientoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorTransaccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?transaccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorGuia(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?guiaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorCompraventavalores(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?compraventavaloresId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorVentadirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?ventadirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorCompradirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?compradirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorDeclaracionsat(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?declaracionsatId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorHonorarioscontrato(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?honorarioscontratoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorCarteraadeudo(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?carteraadeudoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorAportacioninmueble(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?aportacioninmuebleId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorAsientoscontables(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?asientoscontablesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorCheckermonetario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?checkermonetarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorMonitoreochekermonerario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?monitoreochekermonerarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorRetiro(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?retiroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorSaldoscuenta(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?saldoscuentaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorAgenda(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?agendaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorEvaluacionriesgos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?evaluacionriesgosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorDocumentosfideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?documentosfideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorHonorarioadministracion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?honorarioadministracionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorAccionista(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?accionistaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorFormasliquidacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?formasliquidacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorAutodeclaracioncrs(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?autodeclaracioncrsId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorAportaciones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?aportacionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorPagos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?pagosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorFideicomisospendientesliberar(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?fideicomisospendientesliberarId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaCuentachequesPorAplicacionpagoscontrolados(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/cuentacheques?aplicacionpagoscontroladosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  resetCuentacheques(): Cuentacheques {
    this.clear();
    return this.cuentacheques;
  }

  getCuentacheques(): Cuentacheques {
    var cuentacheques: Cuentacheques = {
      fideicomisoId: this.cuentacheques.fideicomisoId,
      fideicomisoItem: this.cuentacheques.fideicomisoItem,
      tipopersona: this.cuentacheques.tipopersona,
      tipopersonaItem: this.cuentacheques.tipopersonaItem,
      fideicomitenteId: this.cuentacheques.fideicomitenteId,
      fideicomitenteItem: this.cuentacheques.fideicomitenteItem,
      tipocuenta: this.cuentacheques.tipocuenta,
      tipocuentaItem: this.cuentacheques.tipocuentaItem,
      tipopago: this.cuentacheques.tipopago,
      tipopagoItem: this.cuentacheques.tipopagoItem,
      bancospei: this.cuentacheques.bancospei,
      bancospeiItem: this.cuentacheques.bancospeiItem,
      banco: this.cuentacheques.banco,
      bancoItem: this.cuentacheques.bancoItem,
      dombanco: this.cuentacheques.dombanco,
      moneda: this.cuentacheques.moneda,
      monedaItem: this.cuentacheques.monedaItem,
      clavevostro: this.cuentacheques.clavevostro,
      clavevostroItem: this.cuentacheques.clavevostroItem,
      numcuenta: this.cuentacheques.numcuenta,
      dombeneficiario: this.cuentacheques.dombeneficiario,
      plazainternacional: this.cuentacheques.plazainternacional,
      pais: this.cuentacheques.pais,
      clavesiacinst: this.cuentacheques.clavesiacinst,
      conveniociedie: this.cuentacheques.conveniociedie,
      estatus: this.cuentacheques.estatus,
      estatusItem: this.cuentacheques.estatusItem,
      clabe: this.cuentacheques.clabe,
      cuentachequera: this.cuentacheques.cuentachequera,
      cuentachequeraItem: this.cuentacheques.cuentachequeraItem,
      fechavence: this.cuentacheques.fechavence,
      numabbasswift: this.cuentacheques.numabbasswift,
      conceptosiac: this.cuentacheques.conceptosiac,
      refciedie: this.cuentacheques.refciedie,
      autorizacion: this.cuentacheques.autorizacion,
      autorizacionItem: this.cuentacheques.autorizacionItem,
    };
    return cuentacheques;
  }

  setCuentacheques(cuentacheques: Cuentacheques) {
    this.cuentacheques.fideicomisoId = cuentacheques.fideicomisoId;
    this.cuentacheques.fideicomisoItem = cuentacheques.fideicomisoItem;
    this.cuentacheques.tipopersona = cuentacheques.tipopersona;
    this.cuentacheques.tipopersonaItem = cuentacheques.tipopersonaItem;
    this.cuentacheques.fideicomitenteId = cuentacheques.fideicomitenteId;
    this.cuentacheques.fideicomitenteItem = cuentacheques.fideicomitenteItem;
    this.cuentacheques.tipocuenta = cuentacheques.tipocuenta;
    this.cuentacheques.tipocuentaItem = cuentacheques.tipocuentaItem;
    this.cuentacheques.tipopago = cuentacheques.tipopago;
    this.cuentacheques.tipopagoItem = cuentacheques.tipopagoItem;
    this.cuentacheques.bancospei = cuentacheques.bancospei;
    this.cuentacheques.bancospeiItem = cuentacheques.bancospeiItem;
    this.cuentacheques.banco = cuentacheques.banco;
    this.cuentacheques.bancoItem = cuentacheques.bancoItem;
    this.cuentacheques.dombanco = cuentacheques.dombanco;
    this.cuentacheques.moneda = cuentacheques.moneda;
    this.cuentacheques.monedaItem = cuentacheques.monedaItem;
    this.cuentacheques.clavevostro = cuentacheques.clavevostro;
    this.cuentacheques.clavevostroItem = cuentacheques.clavevostroItem;
    this.cuentacheques.numcuenta = cuentacheques.numcuenta;
    this.cuentacheques.dombeneficiario = cuentacheques.dombeneficiario;
    this.cuentacheques.plazainternacional = cuentacheques.plazainternacional;
    this.cuentacheques.pais = cuentacheques.pais;
    this.cuentacheques.clavesiacinst = cuentacheques.clavesiacinst;
    this.cuentacheques.conveniociedie = cuentacheques.conveniociedie;
    this.cuentacheques.estatus = cuentacheques.estatus;
    this.cuentacheques.estatusItem = cuentacheques.estatusItem;
    this.cuentacheques.clabe = cuentacheques.clabe;
    this.cuentacheques.cuentachequera = cuentacheques.cuentachequera;
    this.cuentacheques.cuentachequeraItem = cuentacheques.cuentachequeraItem;
    this.cuentacheques.fechavence = cuentacheques.fechavence;
    this.cuentacheques.numabbasswift = cuentacheques.numabbasswift;
    this.cuentacheques.conceptosiac = cuentacheques.conceptosiac;
    this.cuentacheques.refciedie = cuentacheques.refciedie;
    this.cuentacheques.autorizacion = cuentacheques.autorizacion;
    this.cuentacheques.autorizacionItem = cuentacheques.autorizacionItem;
  }

  clear() {
    this.cuentacheques.fideicomisoId = null;
    this.cuentacheques.fideicomisoItem = null;
    this.cuentacheques.tipopersona = null;
    this.cuentacheques.tipopersonaItem = null;
    this.cuentacheques.fideicomitenteId = null;
    this.cuentacheques.fideicomitenteItem = null;
    this.cuentacheques.tipocuenta = null;
    this.cuentacheques.tipocuentaItem = null;
    this.cuentacheques.tipopago = null;
    this.cuentacheques.tipopagoItem = null;
    this.cuentacheques.bancospei = null;
    this.cuentacheques.bancospeiItem = null;
    this.cuentacheques.banco = null;
    this.cuentacheques.bancoItem = null;
    this.cuentacheques.dombanco = null;
    this.cuentacheques.moneda = null;
    this.cuentacheques.monedaItem = null;
    this.cuentacheques.clavevostro = null;
    this.cuentacheques.clavevostroItem = null;
    this.cuentacheques.numcuenta = null;
    this.cuentacheques.dombeneficiario = null;
    this.cuentacheques.plazainternacional = null;
    this.cuentacheques.pais = null;
    this.cuentacheques.clavesiacinst = null;
    this.cuentacheques.conveniociedie = null;
    this.cuentacheques.estatus = null;
    this.cuentacheques.estatusItem = null;
    this.cuentacheques.clabe = null;
    this.cuentacheques.cuentachequera = null;
    this.cuentacheques.cuentachequeraItem = null;
    this.cuentacheques.fechavence = null;
    this.cuentacheques.numabbasswift = null;
    this.cuentacheques.conceptosiac = null;
    this.cuentacheques.refciedie = null;
    this.cuentacheques.autorizacion = null;
    this.cuentacheques.autorizacionItem = null;
  }
}
