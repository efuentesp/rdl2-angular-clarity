/* PSG  Monitoreochekermonerario Model */
import { DecimalPipe } from '@angular/common';

export class Monitoreochekermonerario {
  fideicomisoId: string = null;
  fideicomisoItem: string = null;
  subfisoId: string = null;
  subfisoItem: string = null;
  foliooperacion: string = null;
  importe: string = null;
  fechaoperacion: string = null;
  totalpagos: string = null;
  liquidados: number = null;
  contabilizados: number = null;
  pendientes: number = null;
  error: number = null;
  estatus: string = null;
  estatusItem: string = null;
}
