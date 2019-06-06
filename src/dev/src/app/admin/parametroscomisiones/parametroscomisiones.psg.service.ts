/* PSG  Parametroscomisiones Service */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Parametroscomisiones } from './parametroscomisiones.psg.model';
import { HttpModule, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ParametroscomisionesService {
  private env: any = environment;
  private token: string;
  parametroscomisiones = new Parametroscomisiones();

  constructor(private http: Http) {}

  postGuardaParametroscomisiones(parametroscomisiones) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/fiduciario/parametroscomisiones`, parametroscomisiones, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaParametroscomisiones() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones`, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaParametroscomisionesPorId(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  deleteParametroscomisiones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .delete(`${environment.apiUrl}/fiduciario/parametroscomisiones/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  updateEditaParametroscomisiones(parametroscomisiones, id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/fiduciario/parametroscomisiones/` + id, parametroscomisiones, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaParametroscomisionesPorFideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?fideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorFideicomitente(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?fideicomitenteId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorFideicomisario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?fideicomisarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorTercero(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?terceroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorComitetecnico(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?comitetecnicoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorSubfiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?subfisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorContratoinversion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?contratoinversionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorKyc(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?kycId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorCuentacheques(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?cuentachequesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorInstruccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?instruccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorMovimiento(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?movimientoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorTransaccion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?transaccionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorGuia(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?guiaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorCompraventavalores(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?compraventavaloresId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorVentadirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?ventadirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorCompradirecto(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?compradirectoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorDeclaracionsat(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?declaracionsatId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorHonorarioscontrato(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?honorarioscontratoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorCarteraadeudo(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?carteraadeudoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorAportacioninmueble(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?aportacioninmuebleId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorAsientoscontables(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?asientoscontablesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorCheckermonetario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?checkermonetarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorMonitoreochekermonerario(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?monitoreochekermonerarioId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorRetiro(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?retiroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorSaldoscuenta(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?saldoscuentaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorAgenda(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?agendaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorEvaluacionriesgos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?evaluacionriesgosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorDocumentosfideicomiso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?documentosfideicomisoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorHonorarioadministracion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?honorarioadministracionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorAccionista(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?accionistaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorFormasliquidacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?formasliquidacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorAutodeclaracioncrs(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?autodeclaracioncrsId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorAportaciones(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?aportacionesId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorPagos(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?pagosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorFideicomisospendientesliberar(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?fideicomisospendientesliberarId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaParametroscomisionesPorAplicacionpagoscontrolados(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/fiduciario/parametroscomisiones?aplicacionpagoscontroladosId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  resetParametroscomisiones(): Parametroscomisiones {
    this.clear();
    return this.parametroscomisiones;
  }

  getParametroscomisiones(): Parametroscomisiones {
    var parametroscomisiones: Parametroscomisiones = {
      fideicomisoId: this.parametroscomisiones.fideicomisoId,
      fideicomisoItem: this.parametroscomisiones.fideicomisoItem,
      tipocalculo: this.parametroscomisiones.tipocalculo,
      tipocalculoItem: this.parametroscomisiones.tipocalculoItem,
      aquiensecobra: this.parametroscomisiones.aquiensecobra,
      aquiensecobraItem: this.parametroscomisiones.aquiensecobraItem,
      montoaceptacion: this.parametroscomisiones.montoaceptacion,
      importeanualizado: this.parametroscomisiones.importeanualizado,
      periodicidad: this.parametroscomisiones.periodicidad,
      periodicidadItem: this.parametroscomisiones.periodicidadItem,
      calculoaldiaprimero: this.parametroscomisiones.calculoaldiaprimero,
      calculoaldiaprimeroItem: this.parametroscomisiones.calculoaldiaprimeroItem,
      reevaluacion: this.parametroscomisiones.reevaluacion,
      reevaluacionItem: this.parametroscomisiones.reevaluacionItem,
      fechaconstitucion: this.parametroscomisiones.fechaconstitucion,
      fechaconstitucionAux: this.parametroscomisiones.fechaconstitucionAux,
      fechapivote: this.parametroscomisiones.fechapivote,
      fechapivoteAux: this.parametroscomisiones.fechapivoteAux,
      fechaproxcalculo: this.parametroscomisiones.fechaproxcalculo,
      fechaproxcalculoAux: this.parametroscomisiones.fechaproxcalculoAux,
      metodopago: this.parametroscomisiones.metodopago,
      aquienfactura: this.parametroscomisiones.aquienfactura,
      nombre: this.parametroscomisiones.nombre,
      comentario: this.parametroscomisiones.comentario,
      estatus: this.parametroscomisiones.estatus,
      estatusItem: this.parametroscomisiones.estatusItem,
      penasconvencionales: this.parametroscomisiones.penasconvencionales,
      penasconvencionalesItem: this.parametroscomisiones.penasconvencionalesItem,
      moneda: this.parametroscomisiones.moneda,
      monedaItem: this.parametroscomisiones.monedaItem,
      interes: this.parametroscomisiones.interes,
      interesItem: this.parametroscomisiones.interesItem,
      tipoiva: this.parametroscomisiones.tipoiva,
      tipoivaItem: this.parametroscomisiones.tipoivaItem,
      diacorte: this.parametroscomisiones.diacorte,
      fechaprimercalculo: this.parametroscomisiones.fechaprimercalculo,
      fechaprimercalculoAux: this.parametroscomisiones.fechaprimercalculoAux,
      fechaultimocalculo: this.parametroscomisiones.fechaultimocalculo,
      fechaultimocalculoAux: this.parametroscomisiones.fechaultimocalculoAux,
      cuentapago: this.parametroscomisiones.cuentapago,
      numero: this.parametroscomisiones.numero,
      situacionmorosidad: this.parametroscomisiones.situacionmorosidad,
      situacionmorosidadItem: this.parametroscomisiones.situacionmorosidadItem,
    };
    return parametroscomisiones;
  }

  setParametroscomisiones(parametroscomisiones: Parametroscomisiones) {
    this.parametroscomisiones.fideicomisoId = parametroscomisiones.fideicomisoId;
    this.parametroscomisiones.fideicomisoItem = parametroscomisiones.fideicomisoItem;
    this.parametroscomisiones.tipocalculo = parametroscomisiones.tipocalculo;
    this.parametroscomisiones.tipocalculoItem = parametroscomisiones.tipocalculoItem;
    this.parametroscomisiones.aquiensecobra = parametroscomisiones.aquiensecobra;
    this.parametroscomisiones.aquiensecobraItem = parametroscomisiones.aquiensecobraItem;
    this.parametroscomisiones.montoaceptacion = parametroscomisiones.montoaceptacion;
    this.parametroscomisiones.importeanualizado = parametroscomisiones.importeanualizado;
    this.parametroscomisiones.periodicidad = parametroscomisiones.periodicidad;
    this.parametroscomisiones.periodicidadItem = parametroscomisiones.periodicidadItem;
    this.parametroscomisiones.calculoaldiaprimero = parametroscomisiones.calculoaldiaprimero;
    this.parametroscomisiones.calculoaldiaprimeroItem = parametroscomisiones.calculoaldiaprimeroItem;
    this.parametroscomisiones.reevaluacion = parametroscomisiones.reevaluacion;
    this.parametroscomisiones.reevaluacionItem = parametroscomisiones.reevaluacionItem;
    this.parametroscomisiones.fechaconstitucion = parametroscomisiones.fechaconstitucion;
    this.parametroscomisiones.fechaconstitucionAux = parametroscomisiones.fechaconstitucionAux;
    this.parametroscomisiones.fechapivote = parametroscomisiones.fechapivote;
    this.parametroscomisiones.fechapivoteAux = parametroscomisiones.fechapivoteAux;
    this.parametroscomisiones.fechaproxcalculo = parametroscomisiones.fechaproxcalculo;
    this.parametroscomisiones.fechaproxcalculoAux = parametroscomisiones.fechaproxcalculoAux;
    this.parametroscomisiones.metodopago = parametroscomisiones.metodopago;
    this.parametroscomisiones.aquienfactura = parametroscomisiones.aquienfactura;
    this.parametroscomisiones.nombre = parametroscomisiones.nombre;
    this.parametroscomisiones.comentario = parametroscomisiones.comentario;
    this.parametroscomisiones.estatus = parametroscomisiones.estatus;
    this.parametroscomisiones.estatusItem = parametroscomisiones.estatusItem;
    this.parametroscomisiones.penasconvencionales = parametroscomisiones.penasconvencionales;
    this.parametroscomisiones.penasconvencionalesItem = parametroscomisiones.penasconvencionalesItem;
    this.parametroscomisiones.moneda = parametroscomisiones.moneda;
    this.parametroscomisiones.monedaItem = parametroscomisiones.monedaItem;
    this.parametroscomisiones.interes = parametroscomisiones.interes;
    this.parametroscomisiones.interesItem = parametroscomisiones.interesItem;
    this.parametroscomisiones.tipoiva = parametroscomisiones.tipoiva;
    this.parametroscomisiones.tipoivaItem = parametroscomisiones.tipoivaItem;
    this.parametroscomisiones.diacorte = parametroscomisiones.diacorte;
    this.parametroscomisiones.fechaprimercalculo = parametroscomisiones.fechaprimercalculo;
    this.parametroscomisiones.fechaprimercalculoAux = parametroscomisiones.fechaprimercalculoAux;
    this.parametroscomisiones.fechaultimocalculo = parametroscomisiones.fechaultimocalculo;
    this.parametroscomisiones.fechaultimocalculoAux = parametroscomisiones.fechaultimocalculoAux;
    this.parametroscomisiones.cuentapago = parametroscomisiones.cuentapago;
    this.parametroscomisiones.numero = parametroscomisiones.numero;
    this.parametroscomisiones.situacionmorosidad = parametroscomisiones.situacionmorosidad;
    this.parametroscomisiones.situacionmorosidadItem = parametroscomisiones.situacionmorosidadItem;
  }

  clear() {
    this.parametroscomisiones.fideicomisoId = null;
    this.parametroscomisiones.fideicomisoItem = null;
    this.parametroscomisiones.tipocalculo = null;
    this.parametroscomisiones.tipocalculoItem = null;
    this.parametroscomisiones.aquiensecobra = null;
    this.parametroscomisiones.aquiensecobraItem = null;
    this.parametroscomisiones.montoaceptacion = null;
    this.parametroscomisiones.importeanualizado = null;
    this.parametroscomisiones.periodicidad = null;
    this.parametroscomisiones.periodicidadItem = null;
    this.parametroscomisiones.calculoaldiaprimero = null;
    this.parametroscomisiones.calculoaldiaprimeroItem = null;
    this.parametroscomisiones.reevaluacion = null;
    this.parametroscomisiones.reevaluacionItem = null;
    this.parametroscomisiones.fechaconstitucion = null;
    this.parametroscomisiones.fechaconstitucionAux = null;
    this.parametroscomisiones.fechapivote = null;
    this.parametroscomisiones.fechapivoteAux = null;
    this.parametroscomisiones.fechaproxcalculo = null;
    this.parametroscomisiones.fechaproxcalculoAux = null;
    this.parametroscomisiones.metodopago = null;
    this.parametroscomisiones.aquienfactura = null;
    this.parametroscomisiones.nombre = null;
    this.parametroscomisiones.comentario = null;
    this.parametroscomisiones.estatus = null;
    this.parametroscomisiones.estatusItem = null;
    this.parametroscomisiones.penasconvencionales = null;
    this.parametroscomisiones.penasconvencionalesItem = null;
    this.parametroscomisiones.moneda = null;
    this.parametroscomisiones.monedaItem = null;
    this.parametroscomisiones.interes = null;
    this.parametroscomisiones.interesItem = null;
    this.parametroscomisiones.tipoiva = null;
    this.parametroscomisiones.tipoivaItem = null;
    this.parametroscomisiones.diacorte = null;
    this.parametroscomisiones.fechaprimercalculo = null;
    this.parametroscomisiones.fechaprimercalculoAux = null;
    this.parametroscomisiones.fechaultimocalculo = null;
    this.parametroscomisiones.fechaultimocalculoAux = null;
    this.parametroscomisiones.cuentapago = null;
    this.parametroscomisiones.numero = null;
    this.parametroscomisiones.situacionmorosidad = null;
    this.parametroscomisiones.situacionmorosidadItem = null;
  }
}
