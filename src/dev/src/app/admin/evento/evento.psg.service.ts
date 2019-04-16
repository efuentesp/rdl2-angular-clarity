/* PSG  Evento Service */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Evento } from './evento.psg.model';
import { HttpModule, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class EventoService {
  private env: any = environment;
  private token: string;
  evento = new Evento();

  constructor(private http: Http) {}

  postGuardaEvento(evento) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/admincontenido/evento`, evento, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaEvento() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/evento`, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaEventoPorId(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/evento/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  deleteEvento(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .delete(`${environment.apiUrl}/admincontenido/evento/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  updateEditaEvento(evento, id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/admincontenido/evento/` + id, evento, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaEventoPorOpcion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/evento?opcionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEventoPorPregunta(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/evento?preguntaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEventoPorExamen(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/evento?examenId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEventoPorPublicacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/evento?publicacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEventoPorPrograma(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/evento?programaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEventoPorGrupoa(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/evento?grupoaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEventoPorRecurso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/evento?recursoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEventoPorUnidad(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/evento?unidadId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEventoPorCertificacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/evento?certificacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEventoPorProfesor(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/evento?profesorId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEventoPorEstudiante(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/evento?estudianteId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEventoPorRegistro(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/evento?registroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaEventoPorInstitucion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/evento?institucionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  resetEvento(): Evento {
    this.clear();
    return this.evento;
  }

  getEvento(): Evento {
    var evento: Evento = {
      organizadoporId: this.evento.organizadoporId,
      organizadoporItem: this.evento.organizadoporItem,
      impartidoporId: this.evento.impartidoporId,
      impartidoporItem: this.evento.impartidoporItem,
      clave: this.evento.clave,
      fechaevento: this.evento.fechaevento,
      fechaeventoAux: this.evento.fechaeventoAux,
      titulo: this.evento.titulo,
      duracion: this.evento.duracion,
      lugar: this.evento.lugar,
      cartel: this.evento.cartel,
      tipoestatus: this.evento.tipoestatus,
      tipoestatusItem: this.evento.tipoestatusItem,
    };
    return evento;
  }

  setEvento(evento: Evento) {
    this.evento.organizadoporId = evento.organizadoporId;
    this.evento.organizadoporItem = evento.organizadoporItem;
    this.evento.impartidoporId = evento.impartidoporId;
    this.evento.impartidoporItem = evento.impartidoporItem;
    this.evento.clave = evento.clave;
    this.evento.fechaevento = evento.fechaevento;
    this.evento.fechaeventoAux = evento.fechaeventoAux;
    this.evento.titulo = evento.titulo;
    this.evento.duracion = evento.duracion;
    this.evento.lugar = evento.lugar;
    this.evento.cartel = evento.cartel;
    this.evento.tipoestatus = evento.tipoestatus;
    this.evento.tipoestatusItem = evento.tipoestatusItem;
  }

  clear() {
    this.evento.organizadoporId = null;
    this.evento.organizadoporItem = null;
    this.evento.impartidoporId = null;
    this.evento.impartidoporItem = null;
    this.evento.clave = null;
    this.evento.fechaevento = null;
    this.evento.fechaeventoAux = null;
    this.evento.titulo = null;
    this.evento.duracion = null;
    this.evento.lugar = null;
    this.evento.cartel = null;
    this.evento.tipoestatus = null;
    this.evento.tipoestatusItem = null;
  }
}
