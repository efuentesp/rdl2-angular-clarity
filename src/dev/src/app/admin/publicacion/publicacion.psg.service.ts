/* PSG  Publicacion Service */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Publicacion } from './publicacion.psg.model';
import { HttpModule, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class PublicacionService {
  private env: any = environment;
  private token: string;
  publicacion = new Publicacion();

  constructor(private http: Http) {}

  postGuardaPublicacion(publicacion) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/admincontenido/publicacion`, publicacion, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaPublicacion() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/publicacion`, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaPublicacionPorId(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/publicacion/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  deletePublicacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .delete(`${environment.apiUrl}/admincontenido/publicacion/` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  updateEditaPublicacion(publicacion, id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/admincontenido/publicacion/` + id, publicacion, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  getRecuperaPublicacionPorOpcion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/publicacion?opcionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaPublicacionPorPregunta(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/publicacion?preguntaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaPublicacionPorExamen(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/publicacion?examenId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaPublicacionPorPrograma(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/publicacion?programaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaPublicacionPorGrupoa(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/publicacion?grupoaId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaPublicacionPorRecurso(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/publicacion?recursoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaPublicacionPorUnidad(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/publicacion?unidadId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaPublicacionPorCertificacion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/publicacion?certificacionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaPublicacionPorProfesor(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/publicacion?profesorId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaPublicacionPorEstudiante(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/publicacion?estudianteId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaPublicacionPorRegistro(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/publicacion?registroId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaPublicacionPorInstitucion(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/publicacion?institucionId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }
  getRecuperaPublicacionPorEvento(id) {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['token'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    let opts = new RequestOptions({ headers: headers });
    return this.http
      .get(`${environment.apiUrl}/admincontenido/publicacion?eventoId=` + id, opts)
      .pipe(map(res => res, catchError(error => error)));
  }

  resetPublicacion(): Publicacion {
    this.clear();
    return this.publicacion;
  }

  getPublicacion(): Publicacion {
    var publicacion: Publicacion = {
      nombreobra: this.publicacion.nombreobra,
      tiposubsistema: this.publicacion.tiposubsistema,
      tiposubsistemaItem: this.publicacion.tiposubsistemaItem,
      tiponivel: this.publicacion.tiponivel,
      tiponivelItem: this.publicacion.tiponivelItem,
      tipoarea: this.publicacion.tipoarea,
      tipoareaItem: this.publicacion.tipoareaItem,
      fechapublicacion: this.publicacion.fechapublicacion,
      fechapublicacionAux: this.publicacion.fechapublicacionAux,
      autor: this.publicacion.autor,
      familiarizaId: this.publicacion.familiarizaId,
      familiarizaItem: this.publicacion.familiarizaItem,
      comunicadoId: this.publicacion.comunicadoId,
      comunicadoItem: this.publicacion.comunicadoItem,
    };
    return publicacion;
  }

  setPublicacion(publicacion: Publicacion) {
    this.publicacion.nombreobra = publicacion.nombreobra;
    this.publicacion.tiposubsistema = publicacion.tiposubsistema;
    this.publicacion.tiposubsistemaItem = publicacion.tiposubsistemaItem;
    this.publicacion.tiponivel = publicacion.tiponivel;
    this.publicacion.tiponivelItem = publicacion.tiponivelItem;
    this.publicacion.tipoarea = publicacion.tipoarea;
    this.publicacion.tipoareaItem = publicacion.tipoareaItem;
    this.publicacion.fechapublicacion = publicacion.fechapublicacion;
    this.publicacion.fechapublicacionAux = publicacion.fechapublicacionAux;
    this.publicacion.autor = publicacion.autor;
    this.publicacion.familiarizaId = publicacion.familiarizaId;
    this.publicacion.familiarizaItem = publicacion.familiarizaItem;
    this.publicacion.comunicadoId = publicacion.comunicadoId;
    this.publicacion.comunicadoItem = publicacion.comunicadoItem;
  }

  clear() {
    this.publicacion.nombreobra = null;
    this.publicacion.tiposubsistema = null;
    this.publicacion.tiposubsistemaItem = null;
    this.publicacion.tiponivel = null;
    this.publicacion.tiponivelItem = null;
    this.publicacion.tipoarea = null;
    this.publicacion.tipoareaItem = null;
    this.publicacion.fechapublicacion = null;
    this.publicacion.fechapublicacionAux = null;
    this.publicacion.autor = null;
    this.publicacion.familiarizaId = null;
    this.publicacion.familiarizaItem = null;
    this.publicacion.comunicadoId = null;
    this.publicacion.comunicadoItem = null;
  }
}
