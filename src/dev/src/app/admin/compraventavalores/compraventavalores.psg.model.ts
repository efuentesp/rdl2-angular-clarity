/* PSG  Compraventavalores Model */
import { DecimalPipe } from '@angular/common';

export class Compraventavalores {
  fechaoperacion: number = null;
  fechaoperacionAux: Date = new Date();
  generooperacion: string = null;
  subfisoId: string = null;
  subfisoItem: string = null;
  contratoinversionId: string = null;
  contratoinversionItem: string = null;
  descripcionoperacion: string = null;
  operacion: string = null;
  operacionItem: string = null;
  montooperacion: string = null;
  intermediario: string = null;
  fideicomisoId: string = null;
  fideicomisoItem: string = null;
  descripcionfideicomiso: string = null;
  politicainversion: string = null;
  moneda: string = null;
  monedaItem: string = null;
  emergente: string = null;
  emergenteItem: string = null;
}
