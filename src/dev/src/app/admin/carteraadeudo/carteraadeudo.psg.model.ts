/* PSG  Carteraadeudo Model */
import { DecimalPipe } from '@angular/common';

export class Carteraadeudo {
  honorarioscontratoId: string = null;
  honorarioscontratoItem: string = null;
  folioadeudo: string = null;
  calificacion: string = null;
  calificacionItem: string = null;
  fechacalculo: number = null;
  fechacalculoAux: Date = new Date();
  del: number = null;
  delAux: Date = new Date();
  al: number = null;
  alAux: Date = new Date();
  moneda: string = null;
  monedaItem: string = null;
  importe: string = null;
}
