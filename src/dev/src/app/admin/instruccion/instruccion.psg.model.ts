/* PSG  Instruccion Model */
import { DecimalPipe } from '@angular/common';

export class Instruccion {
  fechahoracaptura: string = null;
  fideicomisoId: string = null;
  fideicomisoItem: string = null;
  subfisoId: string = null;
  subfisoItem: string = null;
  folio: string = null;
  fechadocumeto: number = null;
  fechadocumetoAux: Date = new Date();
  clasificacion: string = null;
  clasificacionItem: string = null;
  personalidadsolicitante: string = null;
  personalidadsolicitanteItem: string = null;
  fechacambioestatus: number = null;
  fechacambioestatusAux: Date = new Date();
  subtipoinstruccion: string = null;
  subtipoinstruccionItem: string = null;
  importe: string = null;
  importeaplicado: string = null;
  nombrefideicomiso: string = null;
  nombresubfiso: string = null;
  titularfideicomiso: string = null;
  fechacompromiso: number = null;
  fechacompromisoAux: Date = new Date();
  formarecepcion: string = null;
  formarecepcionItem: string = null;
  estatusinstruccion: string = null;
  estatusinstruccionItem: string = null;
  tipoinstruccion: string = null;
  tipoinstruccionItem: string = null;
  moneda: string = null;
  monedaItem: string = null;
  noeventos: string = null;
  noefectuados: string = null;
  infocomplementaria: string = null;
}
