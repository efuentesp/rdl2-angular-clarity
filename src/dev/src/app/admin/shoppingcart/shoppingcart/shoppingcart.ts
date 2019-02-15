/* PSG  Afiliado Administrar Ts */
import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

import { DireccionService } from '../../direccion/direccion.psg.service';
import { Direccion } from '../../direccion/direccion.psg.model';
import { TipopensionService } from '../../tipopension/tipopension.psg.service';
import { Tipopension } from '../../tipopension/tipopension.psg.model';
import { SolicitudpensionService } from '../../solicitudpension/solicitudpension.psg.service';
import { Solicitudpension } from '../../solicitudpension/solicitudpension.psg.model';
import { BeneficiarioService } from '../../beneficiario/beneficiario.psg.service';
import { Beneficiario } from '../../beneficiario/beneficiario.psg.model';

@Component({
  selector: 'clr-shoppingcart-demo-styles',
  styleUrls: ['../shoppingcart.psg.scss'],
  templateUrl: './shoppingcart.psg.html',
})
export class Shoppingcart {}
