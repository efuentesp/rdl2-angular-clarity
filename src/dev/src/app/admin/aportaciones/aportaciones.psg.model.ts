/* PSG  Aportaciones Model */
import { DecimalPipe } from '@angular/common';

export class Aportaciones {
  instruccionId: string = null;
  instruccionItem: string = null;
  fideicomisoId: string = null;
  fideicomisoItem: string = null;
  subfisoId: string = null;
  subfisoItem: string = null;
  totalimporte: string = null;
  destinorecepcion: string = null;
  destinorecepcionItem: string = null;
  estatus: string = null;
  estatusItem: string = null;
  moneda: string = null;
  monedaItem: string = null;
  formarecepcion: string = null;
  formarecepcionItem: string = null;
  estatusoperacion: string = null;
  estatusoperacionItem: string = null;
  tipopersona: string = null;
  tipopersonaItem: string = null;
  fechacontabilizacion: number = null;
  fechacontabilizacionAux: Date = new Date();
  nombre: string = null;
  descripcioncomplementaria: string = null;
  nombrefideicomiso: string = null;
  eventos: string = null;
  totalaplicado: string = null;
  importerecepcion: string = null;
  origenrecursos: string = null;
  origenrecursosItem: string = null;
}
