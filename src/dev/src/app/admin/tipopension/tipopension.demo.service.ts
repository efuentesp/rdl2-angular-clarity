import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tipopension } from './tipopension.demo.model';
import { environment } from '../../../environments/environment';
import { HttpModule, Http } from '@angular/http';

@Injectable()
export class TipopensionService {
  private env: any = environment;
  private tipopension = new Tipopension();

  constructor(private http: Http) {}

  postGuardaTipopension(tipopension) {
    return this.http.post(this.env.api + '/tipopension', tipopension).pipe(map(res => res));
  }

  getRecuperaTipopensions() {
    return this.http.get(this.env.api + '/tipopension').pipe(map(res => res.json()));
  }

  deleteTipopension(tipopension) {
    return this.http.delete(this.env.api + '/tipopension/' + tipopension.id).pipe(map(res => res));
  }

  updateEditaTipopension(tipopension) {
    return this.http.put(this.env.api + '/tipopension/' + tipopension.id, tipopension).pipe(map(res => res));
  }

  resetTipopension(): Tipopension {
    this.clear();
    return this.tipopension;
  }

  getTipopension(): Tipopension {
    var tipopension: Tipopension = {
      id: this.tipopension.id,
      clave: this.tipopension.clave,
      nombre: this.tipopension.nombre,
    };
    return tipopension;
  }

  setTipopension(tipopension: Tipopension) {
    (this.tipopension.id = tipopension.id),
      (this.tipopension.clave = tipopension.clave),
      (this.tipopension.nombre = tipopension.nombre);
  }

  clear() {
    this.tipopension.id = null;
    this.tipopension.clave = null;
    this.tipopension.nombre = '';
  }
}
