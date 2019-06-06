/* PSG  Parametroscomisiones Model */
import { DecimalPipe } from '@angular/common';

export class Parametroscomisiones {
  fideicomisoId: string = null;
  fideicomisoItem: string = null;
  tipocalculo: string = null;
  tipocalculoItem: string = null;
  aquiensecobra: string = null;
  aquiensecobraItem: string = null;
  montoaceptacion: number = null;
  importeanualizado: string = null;
  periodicidad: string = null;
  periodicidadItem: string = null;
  calculoaldiaprimero: string = null;
  calculoaldiaprimeroItem: string = null;
  reevaluacion: string = null;
  reevaluacionItem: string = null;
  fechaconstitucion: number = null;
  fechaconstitucionAux: Date = new Date();
  fechapivote: number = null;
  fechapivoteAux: Date = new Date();
  fechaproxcalculo: number = null;
  fechaproxcalculoAux: Date = new Date();
  metodopago: string = null;
  aquienfactura: string = null;
  nombre: string = null;
  comentario: string = null;
  estatus: string = null;
  estatusItem: string = null;
  penasconvencionales: string = null;
  penasconvencionalesItem: string = null;
  moneda: string = null;
  monedaItem: string = null;
  interes: string = null;
  interesItem: string = null;
  tipoiva: string = null;
  tipoivaItem: string = null;
  diacorte: number = null;
  fechaprimercalculo: number = null;
  fechaprimercalculoAux: Date = new Date();
  fechaultimocalculo: number = null;
  fechaultimocalculoAux: Date = new Date();
  cuentapago: string = null;
  numero: string = null;
  situacionmorosidad: string = null;
  situacionmorosidadItem: string = null;
}
