import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Solicitudpension } from './solicitudpension.demo.model';
import { environment } from '../../../environments/environment';
import { HttpModule, Http } from '@angular/http';

@Injectable()
export class SolicitudpensionService {
  private env: any = environment;
  private solicitudpension = new Solicitudpension();

  constructor(private http: Http) {}

  postGuardaSolicitudpension(solicitudpension) {
    return this.http.post(this.env.api + '/solicitudpension', solicitudpension).pipe(map(res => res));
  }

  getRecuperaSolicitudpensions() {
    return this.http.get(this.env.api + '/solicitudpension').pipe(map(res => res.json()));
  }

  deleteSolicitudpension(solicitudpension) {
    return this.http.delete(this.env.api + '/solicitudpension/' + solicitudpension.id).pipe(map(res => res));
  }

  updateEditaSolicitudpension(solicitudpension) {
    return this.http
      .put(this.env.api + '/solicitudpension/' + solicitudpension.id, solicitudpension)
      .pipe(map(res => res));
  }

  resetSolicitudpension(): Solicitudpension {
    this.clear();
    return this.solicitudpension;
  }

  getSolicitudpension(): Solicitudpension {
    var solicitudpension: Solicitudpension = {
      id: this.solicitudpension.id,
      numero: this.solicitudpension.numero,
      afiliado1Id: this.solicitudpension.afiliado1Id,
      afiliado1Item: this.solicitudpension.afiliado1Item,
      tipopension1Id: this.solicitudpension.tipopension1Id,
      tipopension1Item: this.solicitudpension.tipopension1Item,
      fechasolicitud: this.solicitudpension.fechasolicitud,
      observaciones: this.solicitudpension.observaciones,
    };
    return solicitudpension;
  }

  setSolicitudpension(solicitudpension: Solicitudpension) {
    (this.solicitudpension.id = solicitudpension.id),
      (this.solicitudpension.numero = solicitudpension.numero),
      (this.solicitudpension.afiliado1Id = solicitudpension.afiliado1Id),
      (this.solicitudpension.afiliado1Item = solicitudpension.afiliado1Item),
      (this.solicitudpension.tipopension1Id = solicitudpension.tipopension1Id),
      (this.solicitudpension.tipopension1Item = solicitudpension.tipopension1Item),
      (this.solicitudpension.fechasolicitud = solicitudpension.fechasolicitud),
      (this.solicitudpension.observaciones = solicitudpension.observaciones);
  }

  clear() {
    this.solicitudpension.id = null;
    this.solicitudpension.numero = null;
    this.solicitudpension.observaciones = '';
    this.solicitudpension.afiliado1Id = '';
    this.solicitudpension.afiliado1Item = '';
    this.solicitudpension.tipopension1Id = '';
    this.solicitudpension.afiliado1Id = null;
    this.solicitudpension.afiliado1Item = '';
    this.solicitudpension.fechasolicitud = null;
    this.solicitudpension.observaciones = '';
  }
}
