/* PSG Model Ts */
import { Component } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { Usuario } from "../models/usuario";
import { AuthService } from "../services/auth.service";

@Component({
  templateUrl: "admin.component.html",
  styleUrls: ["../app.component.scss"],
})
export class AdminComponent {
  token: string;
  valueName: string;
  user: Usuario;
  permissions: any[];
  collapse: boolean = false;

  // Menu
  private allfieldtypesentity_update: boolean = false;
  private allfieldtypesentity_delete: boolean = false;
  private allfieldtypesentity_create: boolean = false;
  private allfieldtypesentity_read: boolean = false;
  private frutas_update: boolean = false;
  private frutas_delete: boolean = false;
  private frutas_create: boolean = false;
  private frutas_read: boolean = false;
  private grupoalimento_update: boolean = false;
  private grupoalimento_delete: boolean = false;
  private grupoalimento_create: boolean = false;
  private grupoalimento_read: boolean = false;
  private fideicomiso_update: boolean = false;
  private fideicomiso_delete: boolean = false;
  private fideicomiso_create: boolean = false;
  private fideicomiso_read: boolean = false;
  private fideicomitente_update: boolean = false;
  private fideicomitente_delete: boolean = false;
  private fideicomitente_create: boolean = false;
  private fideicomitente_read: boolean = false;
  private fideicomisario_update: boolean = false;
  private fideicomisario_delete: boolean = false;
  private fideicomisario_create: boolean = false;
  private fideicomisario_read: boolean = false;
  private tercero_update: boolean = false;
  private tercero_delete: boolean = false;
  private tercero_create: boolean = false;
  private tercero_read: boolean = false;
  private comitetecnico_update: boolean = false;
  private comitetecnico_delete: boolean = false;
  private comitetecnico_create: boolean = false;
  private comitetecnico_read: boolean = false;
  private subfiso_update: boolean = false;
  private subfiso_delete: boolean = false;
  private subfiso_create: boolean = false;
  private subfiso_read: boolean = false;
  private parametroscomisiones_update: boolean = false;
  private parametroscomisiones_delete: boolean = false;
  private parametroscomisiones_create: boolean = false;
  private parametroscomisiones_read: boolean = false;
  private contratoinversion_update: boolean = false;
  private contratoinversion_delete: boolean = false;
  private contratoinversion_create: boolean = false;
  private contratoinversion_read: boolean = false;
  private kyc_update: boolean = false;
  private kyc_delete: boolean = false;
  private kyc_create: boolean = false;
  private kyc_read: boolean = false;
  private cuentacheques_update: boolean = false;
  private cuentacheques_delete: boolean = false;
  private cuentacheques_create: boolean = false;
  private cuentacheques_read: boolean = false;
  private instruccion_update: boolean = false;
  private instruccion_delete: boolean = false;
  private instruccion_create: boolean = false;
  private instruccion_read: boolean = false;
  private movimiento_update: boolean = false;
  private movimiento_delete: boolean = false;
  private movimiento_create: boolean = false;
  private movimiento_read: boolean = false;
  private transaccion_update: boolean = false;
  private transaccion_delete: boolean = false;
  private transaccion_create: boolean = false;
  private transaccion_read: boolean = false;
  private guia_update: boolean = false;
  private guia_delete: boolean = false;
  private guia_create: boolean = false;
  private guia_read: boolean = false;
  private compraventavalores_update: boolean = false;
  private compraventavalores_delete: boolean = false;
  private compraventavalores_create: boolean = false;
  private compraventavalores_read: boolean = false;
  private ventadirecto_update: boolean = false;
  private ventadirecto_delete: boolean = false;
  private ventadirecto_create: boolean = false;
  private ventadirecto_read: boolean = false;
  private compradirecto_update: boolean = false;
  private compradirecto_delete: boolean = false;
  private compradirecto_create: boolean = false;
  private compradirecto_read: boolean = false;
  private declaracionsat_update: boolean = false;
  private declaracionsat_delete: boolean = false;
  private declaracionsat_create: boolean = false;
  private declaracionsat_read: boolean = false;
  private honorarioscontrato_update: boolean = false;
  private honorarioscontrato_delete: boolean = false;
  private honorarioscontrato_create: boolean = false;
  private honorarioscontrato_read: boolean = false;
  private carteraadeudo_update: boolean = false;
  private carteraadeudo_delete: boolean = false;
  private carteraadeudo_create: boolean = false;
  private carteraadeudo_read: boolean = false;
  private aportacioninmueble_update: boolean = false;
  private aportacioninmueble_delete: boolean = false;
  private aportacioninmueble_create: boolean = false;
  private aportacioninmueble_read: boolean = false;
  private asientoscontables_update: boolean = false;
  private asientoscontables_delete: boolean = false;
  private asientoscontables_create: boolean = false;
  private asientoscontables_read: boolean = false;
  private checkermonetario_update: boolean = false;
  private checkermonetario_delete: boolean = false;
  private checkermonetario_create: boolean = false;
  private checkermonetario_read: boolean = false;
  private monitoreochekermonerario_update: boolean = false;
  private monitoreochekermonerario_delete: boolean = false;
  private monitoreochekermonerario_create: boolean = false;
  private monitoreochekermonerario_read: boolean = false;
  private retiro_update: boolean = false;
  private retiro_delete: boolean = false;
  private retiro_create: boolean = false;
  private retiro_read: boolean = false;
  private saldoscuenta_update: boolean = false;
  private saldoscuenta_delete: boolean = false;
  private saldoscuenta_create: boolean = false;
  private saldoscuenta_read: boolean = false;
  private agenda_update: boolean = false;
  private agenda_delete: boolean = false;
  private agenda_create: boolean = false;
  private agenda_read: boolean = false;
  private evaluacionriesgos_update: boolean = false;
  private evaluacionriesgos_delete: boolean = false;
  private evaluacionriesgos_create: boolean = false;
  private evaluacionriesgos_read: boolean = false;
  private documentosfideicomiso_update: boolean = false;
  private documentosfideicomiso_delete: boolean = false;
  private documentosfideicomiso_create: boolean = false;
  private documentosfideicomiso_read: boolean = false;
  private honorarioadministracion_update: boolean = false;
  private honorarioadministracion_delete: boolean = false;
  private honorarioadministracion_create: boolean = false;
  private honorarioadministracion_read: boolean = false;
  private accionista_update: boolean = false;
  private accionista_delete: boolean = false;
  private accionista_create: boolean = false;
  private accionista_read: boolean = false;
  private formasliquidacion_update: boolean = false;
  private formasliquidacion_delete: boolean = false;
  private formasliquidacion_create: boolean = false;
  private formasliquidacion_read: boolean = false;
  private autodeclaracioncrs_update: boolean = false;
  private autodeclaracioncrs_delete: boolean = false;
  private autodeclaracioncrs_create: boolean = false;
  private autodeclaracioncrs_read: boolean = false;
  private aportaciones_update: boolean = false;
  private aportaciones_delete: boolean = false;
  private aportaciones_create: boolean = false;
  private aportaciones_read: boolean = false;
  private pagos_update: boolean = false;
  private pagos_delete: boolean = false;
  private pagos_create: boolean = false;
  private pagos_read: boolean = false;
  private fideicomisospendientesliberar_update: boolean = false;
  private fideicomisospendientesliberar_delete: boolean = false;
  private fideicomisospendientesliberar_create: boolean = false;
  private fideicomisospendientesliberar_read: boolean = false;
  private aplicacionpagoscontrolados_update: boolean = false;
  private aplicacionpagoscontrolados_delete: boolean = false;
  private aplicacionpagoscontrolados_create: boolean = false;
  private aplicacionpagoscontrolados_read: boolean = false;

  // Seguridad
  private users_update: boolean = false;
  private users_delete: boolean = false;
  private users_create: boolean = false;
  private users_read: boolean = false;

  private roles_update: boolean = false;
  private roles_delete: boolean = false;
  private roles_create: boolean = false;
  private roles_read: boolean = false;

  private permissions_update: boolean = false;
  private permissions_delete: boolean = false;
  private permissions_create: boolean = false;
  private permissions_read: boolean = false;

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit() {
    console.log("Admin component()");
    this.getUser();
  }

  enabledLinks(user) {}

  buildMenu() {
    this.permissions.forEach((element) => {
      if (element.code == "ALLFIELDTYPESENTITY:CREATE") {
        this.allfieldtypesentity_create = true;
      }

      if (element.code == "ALLFIELDTYPESENTITY:UPDATE") {
        this.allfieldtypesentity_update = true;
      }

      if (element.code == "ALLFIELDTYPESENTITY:DELETE") {
        this.allfieldtypesentity_delete = true;
      }

      if (element.code == "ALLFIELDTYPESENTITY:READ") {
        this.allfieldtypesentity_read = true;
      }

      if (element.code == "ALLFIELDTYPESENTITY:*") {
        this.allfieldtypesentity_update = true;
        this.allfieldtypesentity_create = true;
        this.allfieldtypesentity_delete = true;
        this.allfieldtypesentity_read = true;
      }

      if (element.code == "*:*") {
        this.allfieldtypesentity_update = true;
        this.allfieldtypesentity_create = true;
        this.allfieldtypesentity_delete = true;
        this.allfieldtypesentity_read = true;
      }
      if (element.code == "FRUTAS:CREATE") {
        this.frutas_create = true;
      }

      if (element.code == "FRUTAS:UPDATE") {
        this.frutas_update = true;
      }

      if (element.code == "FRUTAS:DELETE") {
        this.frutas_delete = true;
      }

      if (element.code == "FRUTAS:READ") {
        this.frutas_read = true;
      }

      if (element.code == "FRUTAS:*") {
        this.frutas_update = true;
        this.frutas_create = true;
        this.frutas_delete = true;
        this.frutas_read = true;
      }

      if (element.code == "*:*") {
        this.frutas_update = true;
        this.frutas_create = true;
        this.frutas_delete = true;
        this.frutas_read = true;
      }
      if (element.code == "GRUPOALIMENTO:CREATE") {
        this.grupoalimento_create = true;
      }

      if (element.code == "GRUPOALIMENTO:UPDATE") {
        this.grupoalimento_update = true;
      }

      if (element.code == "GRUPOALIMENTO:DELETE") {
        this.grupoalimento_delete = true;
      }

      if (element.code == "GRUPOALIMENTO:READ") {
        this.grupoalimento_read = true;
      }

      if (element.code == "GRUPOALIMENTO:*") {
        this.grupoalimento_update = true;
        this.grupoalimento_create = true;
        this.grupoalimento_delete = true;
        this.grupoalimento_read = true;
      }

      if (element.code == "*:*") {
        this.grupoalimento_update = true;
        this.grupoalimento_create = true;
        this.grupoalimento_delete = true;
        this.grupoalimento_read = true;
      }
      if (element.code == "FIDEICOMISO:CREATE") {
        this.fideicomiso_create = true;
      }

      if (element.code == "FIDEICOMISO:UPDATE") {
        this.fideicomiso_update = true;
      }

      if (element.code == "FIDEICOMISO:DELETE") {
        this.fideicomiso_delete = true;
      }

      if (element.code == "FIDEICOMISO:READ") {
        this.fideicomiso_read = true;
      }

      if (element.code == "FIDEICOMISO:*") {
        this.fideicomiso_update = true;
        this.fideicomiso_create = true;
        this.fideicomiso_delete = true;
        this.fideicomiso_read = true;
      }

      if (element.code == "*:*") {
        this.fideicomiso_update = true;
        this.fideicomiso_create = true;
        this.fideicomiso_delete = true;
        this.fideicomiso_read = true;
      }
      if (element.code == "FIDEICOMITENTE:CREATE") {
        this.fideicomitente_create = true;
      }

      if (element.code == "FIDEICOMITENTE:UPDATE") {
        this.fideicomitente_update = true;
      }

      if (element.code == "FIDEICOMITENTE:DELETE") {
        this.fideicomitente_delete = true;
      }

      if (element.code == "FIDEICOMITENTE:READ") {
        this.fideicomitente_read = true;
      }

      if (element.code == "FIDEICOMITENTE:*") {
        this.fideicomitente_update = true;
        this.fideicomitente_create = true;
        this.fideicomitente_delete = true;
        this.fideicomitente_read = true;
      }

      if (element.code == "*:*") {
        this.fideicomitente_update = true;
        this.fideicomitente_create = true;
        this.fideicomitente_delete = true;
        this.fideicomitente_read = true;
      }
      if (element.code == "FIDEICOMISARIO:CREATE") {
        this.fideicomisario_create = true;
      }

      if (element.code == "FIDEICOMISARIO:UPDATE") {
        this.fideicomisario_update = true;
      }

      if (element.code == "FIDEICOMISARIO:DELETE") {
        this.fideicomisario_delete = true;
      }

      if (element.code == "FIDEICOMISARIO:READ") {
        this.fideicomisario_read = true;
      }

      if (element.code == "FIDEICOMISARIO:*") {
        this.fideicomisario_update = true;
        this.fideicomisario_create = true;
        this.fideicomisario_delete = true;
        this.fideicomisario_read = true;
      }

      if (element.code == "*:*") {
        this.fideicomisario_update = true;
        this.fideicomisario_create = true;
        this.fideicomisario_delete = true;
        this.fideicomisario_read = true;
      }
      if (element.code == "TERCERO:CREATE") {
        this.tercero_create = true;
      }

      if (element.code == "TERCERO:UPDATE") {
        this.tercero_update = true;
      }

      if (element.code == "TERCERO:DELETE") {
        this.tercero_delete = true;
      }

      if (element.code == "TERCERO:READ") {
        this.tercero_read = true;
      }

      if (element.code == "TERCERO:*") {
        this.tercero_update = true;
        this.tercero_create = true;
        this.tercero_delete = true;
        this.tercero_read = true;
      }

      if (element.code == "*:*") {
        this.tercero_update = true;
        this.tercero_create = true;
        this.tercero_delete = true;
        this.tercero_read = true;
      }
      if (element.code == "COMITETECNICO:CREATE") {
        this.comitetecnico_create = true;
      }

      if (element.code == "COMITETECNICO:UPDATE") {
        this.comitetecnico_update = true;
      }

      if (element.code == "COMITETECNICO:DELETE") {
        this.comitetecnico_delete = true;
      }

      if (element.code == "COMITETECNICO:READ") {
        this.comitetecnico_read = true;
      }

      if (element.code == "COMITETECNICO:*") {
        this.comitetecnico_update = true;
        this.comitetecnico_create = true;
        this.comitetecnico_delete = true;
        this.comitetecnico_read = true;
      }

      if (element.code == "*:*") {
        this.comitetecnico_update = true;
        this.comitetecnico_create = true;
        this.comitetecnico_delete = true;
        this.comitetecnico_read = true;
      }
      if (element.code == "SUBFISO:CREATE") {
        this.subfiso_create = true;
      }

      if (element.code == "SUBFISO:UPDATE") {
        this.subfiso_update = true;
      }

      if (element.code == "SUBFISO:DELETE") {
        this.subfiso_delete = true;
      }

      if (element.code == "SUBFISO:READ") {
        this.subfiso_read = true;
      }

      if (element.code == "SUBFISO:*") {
        this.subfiso_update = true;
        this.subfiso_create = true;
        this.subfiso_delete = true;
        this.subfiso_read = true;
      }

      if (element.code == "*:*") {
        this.subfiso_update = true;
        this.subfiso_create = true;
        this.subfiso_delete = true;
        this.subfiso_read = true;
      }
      if (element.code == "PARAMETROSCOMISIONES:CREATE") {
        this.parametroscomisiones_create = true;
      }

      if (element.code == "PARAMETROSCOMISIONES:UPDATE") {
        this.parametroscomisiones_update = true;
      }

      if (element.code == "PARAMETROSCOMISIONES:DELETE") {
        this.parametroscomisiones_delete = true;
      }

      if (element.code == "PARAMETROSCOMISIONES:READ") {
        this.parametroscomisiones_read = true;
      }

      if (element.code == "PARAMETROSCOMISIONES:*") {
        this.parametroscomisiones_update = true;
        this.parametroscomisiones_create = true;
        this.parametroscomisiones_delete = true;
        this.parametroscomisiones_read = true;
      }

      if (element.code == "*:*") {
        this.parametroscomisiones_update = true;
        this.parametroscomisiones_create = true;
        this.parametroscomisiones_delete = true;
        this.parametroscomisiones_read = true;
      }
      if (element.code == "CONTRATOINVERSION:CREATE") {
        this.contratoinversion_create = true;
      }

      if (element.code == "CONTRATOINVERSION:UPDATE") {
        this.contratoinversion_update = true;
      }

      if (element.code == "CONTRATOINVERSION:DELETE") {
        this.contratoinversion_delete = true;
      }

      if (element.code == "CONTRATOINVERSION:READ") {
        this.contratoinversion_read = true;
      }

      if (element.code == "CONTRATOINVERSION:*") {
        this.contratoinversion_update = true;
        this.contratoinversion_create = true;
        this.contratoinversion_delete = true;
        this.contratoinversion_read = true;
      }

      if (element.code == "*:*") {
        this.contratoinversion_update = true;
        this.contratoinversion_create = true;
        this.contratoinversion_delete = true;
        this.contratoinversion_read = true;
      }
      if (element.code == "KYC:CREATE") {
        this.kyc_create = true;
      }

      if (element.code == "KYC:UPDATE") {
        this.kyc_update = true;
      }

      if (element.code == "KYC:DELETE") {
        this.kyc_delete = true;
      }

      if (element.code == "KYC:READ") {
        this.kyc_read = true;
      }

      if (element.code == "KYC:*") {
        this.kyc_update = true;
        this.kyc_create = true;
        this.kyc_delete = true;
        this.kyc_read = true;
      }

      if (element.code == "*:*") {
        this.kyc_update = true;
        this.kyc_create = true;
        this.kyc_delete = true;
        this.kyc_read = true;
      }
      if (element.code == "CUENTACHEQUES:CREATE") {
        this.cuentacheques_create = true;
      }

      if (element.code == "CUENTACHEQUES:UPDATE") {
        this.cuentacheques_update = true;
      }

      if (element.code == "CUENTACHEQUES:DELETE") {
        this.cuentacheques_delete = true;
      }

      if (element.code == "CUENTACHEQUES:READ") {
        this.cuentacheques_read = true;
      }

      if (element.code == "CUENTACHEQUES:*") {
        this.cuentacheques_update = true;
        this.cuentacheques_create = true;
        this.cuentacheques_delete = true;
        this.cuentacheques_read = true;
      }

      if (element.code == "*:*") {
        this.cuentacheques_update = true;
        this.cuentacheques_create = true;
        this.cuentacheques_delete = true;
        this.cuentacheques_read = true;
      }
      if (element.code == "INSTRUCCION:CREATE") {
        this.instruccion_create = true;
      }

      if (element.code == "INSTRUCCION:UPDATE") {
        this.instruccion_update = true;
      }

      if (element.code == "INSTRUCCION:DELETE") {
        this.instruccion_delete = true;
      }

      if (element.code == "INSTRUCCION:READ") {
        this.instruccion_read = true;
      }

      if (element.code == "INSTRUCCION:*") {
        this.instruccion_update = true;
        this.instruccion_create = true;
        this.instruccion_delete = true;
        this.instruccion_read = true;
      }

      if (element.code == "*:*") {
        this.instruccion_update = true;
        this.instruccion_create = true;
        this.instruccion_delete = true;
        this.instruccion_read = true;
      }
      if (element.code == "MOVIMIENTO:CREATE") {
        this.movimiento_create = true;
      }

      if (element.code == "MOVIMIENTO:UPDATE") {
        this.movimiento_update = true;
      }

      if (element.code == "MOVIMIENTO:DELETE") {
        this.movimiento_delete = true;
      }

      if (element.code == "MOVIMIENTO:READ") {
        this.movimiento_read = true;
      }

      if (element.code == "MOVIMIENTO:*") {
        this.movimiento_update = true;
        this.movimiento_create = true;
        this.movimiento_delete = true;
        this.movimiento_read = true;
      }

      if (element.code == "*:*") {
        this.movimiento_update = true;
        this.movimiento_create = true;
        this.movimiento_delete = true;
        this.movimiento_read = true;
      }
      if (element.code == "TRANSACCION:CREATE") {
        this.transaccion_create = true;
      }

      if (element.code == "TRANSACCION:UPDATE") {
        this.transaccion_update = true;
      }

      if (element.code == "TRANSACCION:DELETE") {
        this.transaccion_delete = true;
      }

      if (element.code == "TRANSACCION:READ") {
        this.transaccion_read = true;
      }

      if (element.code == "TRANSACCION:*") {
        this.transaccion_update = true;
        this.transaccion_create = true;
        this.transaccion_delete = true;
        this.transaccion_read = true;
      }

      if (element.code == "*:*") {
        this.transaccion_update = true;
        this.transaccion_create = true;
        this.transaccion_delete = true;
        this.transaccion_read = true;
      }
      if (element.code == "GUIA:CREATE") {
        this.guia_create = true;
      }

      if (element.code == "GUIA:UPDATE") {
        this.guia_update = true;
      }

      if (element.code == "GUIA:DELETE") {
        this.guia_delete = true;
      }

      if (element.code == "GUIA:READ") {
        this.guia_read = true;
      }

      if (element.code == "GUIA:*") {
        this.guia_update = true;
        this.guia_create = true;
        this.guia_delete = true;
        this.guia_read = true;
      }

      if (element.code == "*:*") {
        this.guia_update = true;
        this.guia_create = true;
        this.guia_delete = true;
        this.guia_read = true;
      }
      if (element.code == "COMPRAVENTAVALORES:CREATE") {
        this.compraventavalores_create = true;
      }

      if (element.code == "COMPRAVENTAVALORES:UPDATE") {
        this.compraventavalores_update = true;
      }

      if (element.code == "COMPRAVENTAVALORES:DELETE") {
        this.compraventavalores_delete = true;
      }

      if (element.code == "COMPRAVENTAVALORES:READ") {
        this.compraventavalores_read = true;
      }

      if (element.code == "COMPRAVENTAVALORES:*") {
        this.compraventavalores_update = true;
        this.compraventavalores_create = true;
        this.compraventavalores_delete = true;
        this.compraventavalores_read = true;
      }

      if (element.code == "*:*") {
        this.compraventavalores_update = true;
        this.compraventavalores_create = true;
        this.compraventavalores_delete = true;
        this.compraventavalores_read = true;
      }
      if (element.code == "VENTADIRECTO:CREATE") {
        this.ventadirecto_create = true;
      }

      if (element.code == "VENTADIRECTO:UPDATE") {
        this.ventadirecto_update = true;
      }

      if (element.code == "VENTADIRECTO:DELETE") {
        this.ventadirecto_delete = true;
      }

      if (element.code == "VENTADIRECTO:READ") {
        this.ventadirecto_read = true;
      }

      if (element.code == "VENTADIRECTO:*") {
        this.ventadirecto_update = true;
        this.ventadirecto_create = true;
        this.ventadirecto_delete = true;
        this.ventadirecto_read = true;
      }

      if (element.code == "*:*") {
        this.ventadirecto_update = true;
        this.ventadirecto_create = true;
        this.ventadirecto_delete = true;
        this.ventadirecto_read = true;
      }
      if (element.code == "COMPRADIRECTO:CREATE") {
        this.compradirecto_create = true;
      }

      if (element.code == "COMPRADIRECTO:UPDATE") {
        this.compradirecto_update = true;
      }

      if (element.code == "COMPRADIRECTO:DELETE") {
        this.compradirecto_delete = true;
      }

      if (element.code == "COMPRADIRECTO:READ") {
        this.compradirecto_read = true;
      }

      if (element.code == "COMPRADIRECTO:*") {
        this.compradirecto_update = true;
        this.compradirecto_create = true;
        this.compradirecto_delete = true;
        this.compradirecto_read = true;
      }

      if (element.code == "*:*") {
        this.compradirecto_update = true;
        this.compradirecto_create = true;
        this.compradirecto_delete = true;
        this.compradirecto_read = true;
      }
      if (element.code == "DECLARACIONSAT:CREATE") {
        this.declaracionsat_create = true;
      }

      if (element.code == "DECLARACIONSAT:UPDATE") {
        this.declaracionsat_update = true;
      }

      if (element.code == "DECLARACIONSAT:DELETE") {
        this.declaracionsat_delete = true;
      }

      if (element.code == "DECLARACIONSAT:READ") {
        this.declaracionsat_read = true;
      }

      if (element.code == "DECLARACIONSAT:*") {
        this.declaracionsat_update = true;
        this.declaracionsat_create = true;
        this.declaracionsat_delete = true;
        this.declaracionsat_read = true;
      }

      if (element.code == "*:*") {
        this.declaracionsat_update = true;
        this.declaracionsat_create = true;
        this.declaracionsat_delete = true;
        this.declaracionsat_read = true;
      }
      if (element.code == "HONORARIOSCONTRATO:CREATE") {
        this.honorarioscontrato_create = true;
      }

      if (element.code == "HONORARIOSCONTRATO:UPDATE") {
        this.honorarioscontrato_update = true;
      }

      if (element.code == "HONORARIOSCONTRATO:DELETE") {
        this.honorarioscontrato_delete = true;
      }

      if (element.code == "HONORARIOSCONTRATO:READ") {
        this.honorarioscontrato_read = true;
      }

      if (element.code == "HONORARIOSCONTRATO:*") {
        this.honorarioscontrato_update = true;
        this.honorarioscontrato_create = true;
        this.honorarioscontrato_delete = true;
        this.honorarioscontrato_read = true;
      }

      if (element.code == "*:*") {
        this.honorarioscontrato_update = true;
        this.honorarioscontrato_create = true;
        this.honorarioscontrato_delete = true;
        this.honorarioscontrato_read = true;
      }
      if (element.code == "CARTERAADEUDO:CREATE") {
        this.carteraadeudo_create = true;
      }

      if (element.code == "CARTERAADEUDO:UPDATE") {
        this.carteraadeudo_update = true;
      }

      if (element.code == "CARTERAADEUDO:DELETE") {
        this.carteraadeudo_delete = true;
      }

      if (element.code == "CARTERAADEUDO:READ") {
        this.carteraadeudo_read = true;
      }

      if (element.code == "CARTERAADEUDO:*") {
        this.carteraadeudo_update = true;
        this.carteraadeudo_create = true;
        this.carteraadeudo_delete = true;
        this.carteraadeudo_read = true;
      }

      if (element.code == "*:*") {
        this.carteraadeudo_update = true;
        this.carteraadeudo_create = true;
        this.carteraadeudo_delete = true;
        this.carteraadeudo_read = true;
      }
      if (element.code == "APORTACIONINMUEBLE:CREATE") {
        this.aportacioninmueble_create = true;
      }

      if (element.code == "APORTACIONINMUEBLE:UPDATE") {
        this.aportacioninmueble_update = true;
      }

      if (element.code == "APORTACIONINMUEBLE:DELETE") {
        this.aportacioninmueble_delete = true;
      }

      if (element.code == "APORTACIONINMUEBLE:READ") {
        this.aportacioninmueble_read = true;
      }

      if (element.code == "APORTACIONINMUEBLE:*") {
        this.aportacioninmueble_update = true;
        this.aportacioninmueble_create = true;
        this.aportacioninmueble_delete = true;
        this.aportacioninmueble_read = true;
      }

      if (element.code == "*:*") {
        this.aportacioninmueble_update = true;
        this.aportacioninmueble_create = true;
        this.aportacioninmueble_delete = true;
        this.aportacioninmueble_read = true;
      }
      if (element.code == "ASIENTOSCONTABLES:CREATE") {
        this.asientoscontables_create = true;
      }

      if (element.code == "ASIENTOSCONTABLES:UPDATE") {
        this.asientoscontables_update = true;
      }

      if (element.code == "ASIENTOSCONTABLES:DELETE") {
        this.asientoscontables_delete = true;
      }

      if (element.code == "ASIENTOSCONTABLES:READ") {
        this.asientoscontables_read = true;
      }

      if (element.code == "ASIENTOSCONTABLES:*") {
        this.asientoscontables_update = true;
        this.asientoscontables_create = true;
        this.asientoscontables_delete = true;
        this.asientoscontables_read = true;
      }

      if (element.code == "*:*") {
        this.asientoscontables_update = true;
        this.asientoscontables_create = true;
        this.asientoscontables_delete = true;
        this.asientoscontables_read = true;
      }
      if (element.code == "CHECKERMONETARIO:CREATE") {
        this.checkermonetario_create = true;
      }

      if (element.code == "CHECKERMONETARIO:UPDATE") {
        this.checkermonetario_update = true;
      }

      if (element.code == "CHECKERMONETARIO:DELETE") {
        this.checkermonetario_delete = true;
      }

      if (element.code == "CHECKERMONETARIO:READ") {
        this.checkermonetario_read = true;
      }

      if (element.code == "CHECKERMONETARIO:*") {
        this.checkermonetario_update = true;
        this.checkermonetario_create = true;
        this.checkermonetario_delete = true;
        this.checkermonetario_read = true;
      }

      if (element.code == "*:*") {
        this.checkermonetario_update = true;
        this.checkermonetario_create = true;
        this.checkermonetario_delete = true;
        this.checkermonetario_read = true;
      }
      if (element.code == "MONITOREOCHEKERMONERARIO:CREATE") {
        this.monitoreochekermonerario_create = true;
      }

      if (element.code == "MONITOREOCHEKERMONERARIO:UPDATE") {
        this.monitoreochekermonerario_update = true;
      }

      if (element.code == "MONITOREOCHEKERMONERARIO:DELETE") {
        this.monitoreochekermonerario_delete = true;
      }

      if (element.code == "MONITOREOCHEKERMONERARIO:READ") {
        this.monitoreochekermonerario_read = true;
      }

      if (element.code == "MONITOREOCHEKERMONERARIO:*") {
        this.monitoreochekermonerario_update = true;
        this.monitoreochekermonerario_create = true;
        this.monitoreochekermonerario_delete = true;
        this.monitoreochekermonerario_read = true;
      }

      if (element.code == "*:*") {
        this.monitoreochekermonerario_update = true;
        this.monitoreochekermonerario_create = true;
        this.monitoreochekermonerario_delete = true;
        this.monitoreochekermonerario_read = true;
      }
      if (element.code == "RETIRO:CREATE") {
        this.retiro_create = true;
      }

      if (element.code == "RETIRO:UPDATE") {
        this.retiro_update = true;
      }

      if (element.code == "RETIRO:DELETE") {
        this.retiro_delete = true;
      }

      if (element.code == "RETIRO:READ") {
        this.retiro_read = true;
      }

      if (element.code == "RETIRO:*") {
        this.retiro_update = true;
        this.retiro_create = true;
        this.retiro_delete = true;
        this.retiro_read = true;
      }

      if (element.code == "*:*") {
        this.retiro_update = true;
        this.retiro_create = true;
        this.retiro_delete = true;
        this.retiro_read = true;
      }
      if (element.code == "SALDOSCUENTA:CREATE") {
        this.saldoscuenta_create = true;
      }

      if (element.code == "SALDOSCUENTA:UPDATE") {
        this.saldoscuenta_update = true;
      }

      if (element.code == "SALDOSCUENTA:DELETE") {
        this.saldoscuenta_delete = true;
      }

      if (element.code == "SALDOSCUENTA:READ") {
        this.saldoscuenta_read = true;
      }

      if (element.code == "SALDOSCUENTA:*") {
        this.saldoscuenta_update = true;
        this.saldoscuenta_create = true;
        this.saldoscuenta_delete = true;
        this.saldoscuenta_read = true;
      }

      if (element.code == "*:*") {
        this.saldoscuenta_update = true;
        this.saldoscuenta_create = true;
        this.saldoscuenta_delete = true;
        this.saldoscuenta_read = true;
      }
      if (element.code == "AGENDA:CREATE") {
        this.agenda_create = true;
      }

      if (element.code == "AGENDA:UPDATE") {
        this.agenda_update = true;
      }

      if (element.code == "AGENDA:DELETE") {
        this.agenda_delete = true;
      }

      if (element.code == "AGENDA:READ") {
        this.agenda_read = true;
      }

      if (element.code == "AGENDA:*") {
        this.agenda_update = true;
        this.agenda_create = true;
        this.agenda_delete = true;
        this.agenda_read = true;
      }

      if (element.code == "*:*") {
        this.agenda_update = true;
        this.agenda_create = true;
        this.agenda_delete = true;
        this.agenda_read = true;
      }
      if (element.code == "EVALUACIONRIESGOS:CREATE") {
        this.evaluacionriesgos_create = true;
      }

      if (element.code == "EVALUACIONRIESGOS:UPDATE") {
        this.evaluacionriesgos_update = true;
      }

      if (element.code == "EVALUACIONRIESGOS:DELETE") {
        this.evaluacionriesgos_delete = true;
      }

      if (element.code == "EVALUACIONRIESGOS:READ") {
        this.evaluacionriesgos_read = true;
      }

      if (element.code == "EVALUACIONRIESGOS:*") {
        this.evaluacionriesgos_update = true;
        this.evaluacionriesgos_create = true;
        this.evaluacionriesgos_delete = true;
        this.evaluacionriesgos_read = true;
      }

      if (element.code == "*:*") {
        this.evaluacionriesgos_update = true;
        this.evaluacionriesgos_create = true;
        this.evaluacionriesgos_delete = true;
        this.evaluacionriesgos_read = true;
      }
      if (element.code == "DOCUMENTOSFIDEICOMISO:CREATE") {
        this.documentosfideicomiso_create = true;
      }

      if (element.code == "DOCUMENTOSFIDEICOMISO:UPDATE") {
        this.documentosfideicomiso_update = true;
      }

      if (element.code == "DOCUMENTOSFIDEICOMISO:DELETE") {
        this.documentosfideicomiso_delete = true;
      }

      if (element.code == "DOCUMENTOSFIDEICOMISO:READ") {
        this.documentosfideicomiso_read = true;
      }

      if (element.code == "DOCUMENTOSFIDEICOMISO:*") {
        this.documentosfideicomiso_update = true;
        this.documentosfideicomiso_create = true;
        this.documentosfideicomiso_delete = true;
        this.documentosfideicomiso_read = true;
      }

      if (element.code == "*:*") {
        this.documentosfideicomiso_update = true;
        this.documentosfideicomiso_create = true;
        this.documentosfideicomiso_delete = true;
        this.documentosfideicomiso_read = true;
      }
      if (element.code == "HONORARIOADMINISTRACION:CREATE") {
        this.honorarioadministracion_create = true;
      }

      if (element.code == "HONORARIOADMINISTRACION:UPDATE") {
        this.honorarioadministracion_update = true;
      }

      if (element.code == "HONORARIOADMINISTRACION:DELETE") {
        this.honorarioadministracion_delete = true;
      }

      if (element.code == "HONORARIOADMINISTRACION:READ") {
        this.honorarioadministracion_read = true;
      }

      if (element.code == "HONORARIOADMINISTRACION:*") {
        this.honorarioadministracion_update = true;
        this.honorarioadministracion_create = true;
        this.honorarioadministracion_delete = true;
        this.honorarioadministracion_read = true;
      }

      if (element.code == "*:*") {
        this.honorarioadministracion_update = true;
        this.honorarioadministracion_create = true;
        this.honorarioadministracion_delete = true;
        this.honorarioadministracion_read = true;
      }
      if (element.code == "ACCIONISTA:CREATE") {
        this.accionista_create = true;
      }

      if (element.code == "ACCIONISTA:UPDATE") {
        this.accionista_update = true;
      }

      if (element.code == "ACCIONISTA:DELETE") {
        this.accionista_delete = true;
      }

      if (element.code == "ACCIONISTA:READ") {
        this.accionista_read = true;
      }

      if (element.code == "ACCIONISTA:*") {
        this.accionista_update = true;
        this.accionista_create = true;
        this.accionista_delete = true;
        this.accionista_read = true;
      }

      if (element.code == "*:*") {
        this.accionista_update = true;
        this.accionista_create = true;
        this.accionista_delete = true;
        this.accionista_read = true;
      }
      if (element.code == "FORMASLIQUIDACION:CREATE") {
        this.formasliquidacion_create = true;
      }

      if (element.code == "FORMASLIQUIDACION:UPDATE") {
        this.formasliquidacion_update = true;
      }

      if (element.code == "FORMASLIQUIDACION:DELETE") {
        this.formasliquidacion_delete = true;
      }

      if (element.code == "FORMASLIQUIDACION:READ") {
        this.formasliquidacion_read = true;
      }

      if (element.code == "FORMASLIQUIDACION:*") {
        this.formasliquidacion_update = true;
        this.formasliquidacion_create = true;
        this.formasliquidacion_delete = true;
        this.formasliquidacion_read = true;
      }

      if (element.code == "*:*") {
        this.formasliquidacion_update = true;
        this.formasliquidacion_create = true;
        this.formasliquidacion_delete = true;
        this.formasliquidacion_read = true;
      }
      if (element.code == "AUTODECLARACIONCRS:CREATE") {
        this.autodeclaracioncrs_create = true;
      }

      if (element.code == "AUTODECLARACIONCRS:UPDATE") {
        this.autodeclaracioncrs_update = true;
      }

      if (element.code == "AUTODECLARACIONCRS:DELETE") {
        this.autodeclaracioncrs_delete = true;
      }

      if (element.code == "AUTODECLARACIONCRS:READ") {
        this.autodeclaracioncrs_read = true;
      }

      if (element.code == "AUTODECLARACIONCRS:*") {
        this.autodeclaracioncrs_update = true;
        this.autodeclaracioncrs_create = true;
        this.autodeclaracioncrs_delete = true;
        this.autodeclaracioncrs_read = true;
      }

      if (element.code == "*:*") {
        this.autodeclaracioncrs_update = true;
        this.autodeclaracioncrs_create = true;
        this.autodeclaracioncrs_delete = true;
        this.autodeclaracioncrs_read = true;
      }
      if (element.code == "APORTACIONES:CREATE") {
        this.aportaciones_create = true;
      }

      if (element.code == "APORTACIONES:UPDATE") {
        this.aportaciones_update = true;
      }

      if (element.code == "APORTACIONES:DELETE") {
        this.aportaciones_delete = true;
      }

      if (element.code == "APORTACIONES:READ") {
        this.aportaciones_read = true;
      }

      if (element.code == "APORTACIONES:*") {
        this.aportaciones_update = true;
        this.aportaciones_create = true;
        this.aportaciones_delete = true;
        this.aportaciones_read = true;
      }

      if (element.code == "*:*") {
        this.aportaciones_update = true;
        this.aportaciones_create = true;
        this.aportaciones_delete = true;
        this.aportaciones_read = true;
      }
      if (element.code == "PAGOS:CREATE") {
        this.pagos_create = true;
      }

      if (element.code == "PAGOS:UPDATE") {
        this.pagos_update = true;
      }

      if (element.code == "PAGOS:DELETE") {
        this.pagos_delete = true;
      }

      if (element.code == "PAGOS:READ") {
        this.pagos_read = true;
      }

      if (element.code == "PAGOS:*") {
        this.pagos_update = true;
        this.pagos_create = true;
        this.pagos_delete = true;
        this.pagos_read = true;
      }

      if (element.code == "*:*") {
        this.pagos_update = true;
        this.pagos_create = true;
        this.pagos_delete = true;
        this.pagos_read = true;
      }
      if (element.code == "FIDEICOMISOSPENDIENTESLIBERAR:CREATE") {
        this.fideicomisospendientesliberar_create = true;
      }

      if (element.code == "FIDEICOMISOSPENDIENTESLIBERAR:UPDATE") {
        this.fideicomisospendientesliberar_update = true;
      }

      if (element.code == "FIDEICOMISOSPENDIENTESLIBERAR:DELETE") {
        this.fideicomisospendientesliberar_delete = true;
      }

      if (element.code == "FIDEICOMISOSPENDIENTESLIBERAR:READ") {
        this.fideicomisospendientesliberar_read = true;
      }

      if (element.code == "FIDEICOMISOSPENDIENTESLIBERAR:*") {
        this.fideicomisospendientesliberar_update = true;
        this.fideicomisospendientesliberar_create = true;
        this.fideicomisospendientesliberar_delete = true;
        this.fideicomisospendientesliberar_read = true;
      }

      if (element.code == "*:*") {
        this.fideicomisospendientesliberar_update = true;
        this.fideicomisospendientesliberar_create = true;
        this.fideicomisospendientesliberar_delete = true;
        this.fideicomisospendientesliberar_read = true;
      }
      if (element.code == "APLICACIONPAGOSCONTROLADOS:CREATE") {
        this.aplicacionpagoscontrolados_create = true;
      }

      if (element.code == "APLICACIONPAGOSCONTROLADOS:UPDATE") {
        this.aplicacionpagoscontrolados_update = true;
      }

      if (element.code == "APLICACIONPAGOSCONTROLADOS:DELETE") {
        this.aplicacionpagoscontrolados_delete = true;
      }

      if (element.code == "APLICACIONPAGOSCONTROLADOS:READ") {
        this.aplicacionpagoscontrolados_read = true;
      }

      if (element.code == "APLICACIONPAGOSCONTROLADOS:*") {
        this.aplicacionpagoscontrolados_update = true;
        this.aplicacionpagoscontrolados_create = true;
        this.aplicacionpagoscontrolados_delete = true;
        this.aplicacionpagoscontrolados_read = true;
      }

      if (element.code == "*:*") {
        this.aplicacionpagoscontrolados_update = true;
        this.aplicacionpagoscontrolados_create = true;
        this.aplicacionpagoscontrolados_delete = true;
        this.aplicacionpagoscontrolados_read = true;
      }

      // Seguridad
      if (element.code == "USERS:CREATE") {
        this.users_create = true;
      }

      if (element.code == "USERS:UPDATE") {
        this.users_update = true;
      }

      if (element.code == "USERS:DELETE") {
        this.users_delete = true;
      }

      if (element.code == "USERS:READ") {
        this.users_read = true;
      }

      if (element.code == "USERS:*") {
        this.users_update = true;
        this.users_create = true;
        this.users_delete = true;
        this.users_read = true;
      }

      if (element.code == "*:*") {
        this.users_update = true;
        this.users_create = true;
        this.users_delete = true;
        this.users_read = true;
      }

      if (element.code == "ROLES:CREATE") {
        this.roles_create = true;
      }

      if (element.code == "ROLES:UPDATE") {
        this.roles_update = true;
      }

      if (element.code == "ROLES:DELETE") {
        this.roles_delete = true;
      }

      if (element.code == "ROLES:READ") {
        this.roles_read = true;
      }

      if (element.code == "ROLES:*") {
        this.roles_update = true;
        this.roles_create = true;
        this.roles_delete = true;
        this.roles_read = true;
      }

      if (element.code == "*:*") {
        this.roles_update = true;
        this.roles_create = true;
        this.roles_delete = true;
        this.roles_read = true;
      }

      if (element.code == "PERMISSIONS:CREATE") {
        this.permissions_create = true;
      }

      if (element.code == "PERMISSIONS:UPDATE") {
        this.permissions_update = true;
      }

      if (element.code == "PERMISSIONS:DELETE") {
        this.permissions_delete = true;
      }

      if (element.code == "PERMISSIONS:READ") {
        this.permissions_read = true;
      }

      if (element.code == "PERMISSIONS:*") {
        this.permissions_update = true;
        this.permissions_create = true;
        this.permissions_delete = true;
        this.permissions_read = true;
      }

      if (element.code == "*:*") {
        this.permissions_update = true;
        this.permissions_create = true;
        this.permissions_delete = true;
        this.permissions_read = true;
      }
    });
  }

  getUser() {
    var obj = JSON.parse(sessionStorage.getItem("usuario"));
    var token = sessionStorage.getItem("token");
    this.user = obj["username"];
    this.permissions = obj["permissions"];
    this.token = token;
    this.valueName = obj["display_name"];
    this.buildMenu();
  }

  logout(): void {
    this.authService.logout();
  }
}
