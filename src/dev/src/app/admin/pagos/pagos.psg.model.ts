/* PSG  Pagos Model */
import { DecimalPipe } from '@angular/common';

export class Pagos {
  instruccionId: string = null;
  instruccionItem: string = null;
  fideicomisoId: string = null;
  fideicomisoItem: string = null;
  importeinstruccion: string = null;
  movimientos: string = null;
  tipopersona: string = null;
  tipopersonaItem: string = null;
  conceptopago: string = null;
  conceptopagoItem: string = null;
  clave: string = null;
  nombre: string = null;
  formaliquidacion: string = null;
  tipopago: string = null;
  datosconcentradora: string = null;
  descripcioncomplementaria: string = null;
  subfisoId: string = null;
  subfisoItem: string = null;
  importetotal: string = null;
  estatusoperacion: string = null;
  estatusoperacionItem: string = null;
  importe: string = null;
  fechaliquidar: number = null;
  fechaliquidarAux: Date = new Date();
  estatus: string = null;
  estatusItem: string = null;
}
