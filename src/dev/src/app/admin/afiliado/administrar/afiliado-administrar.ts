import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Afiliado } from '../afiliado.demo.model';
import { AfiliadoService } from '../afiliado.demo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { style } from '@angular/animations';
import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';
import { BeneficiarioService } from '../../beneficiario/beneficiario.demo.service';

@Component({
  selector: 'clr-alert-demo-styles',
  styleUrls: ['../afiliado.demo.scss'],
  templateUrl: './afiliado-administrar.demo.html',
})
export class AfiliadoAdministrarDemo {
  afiliadosArray: Afiliado[];

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private afiliado_update: boolean = false;
  private afiliado_delete: boolean = false;
  private afiliado_create: boolean = false;
  private afiliado_read: boolean = false;

  // Child Entities
  private beneficiario_read: boolean = false;

  constructor(
    private afiliadoService: AfiliadoService,
    private router: Router,
    private route: ActivatedRoute,
    private beneficiarioService: BeneficiarioService
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();
    this.cargaAfiliados();
  }

  cargaAfiliados() {
    this.afiliadoService.getRecuperaAfiliados().subscribe(
      res => {
        if (res) {
          this.afiliadosArray = res;
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the afiliados.', 'error');
      }
    );
  }

  setClickedRowEditaAfiliado(index, afiliado) {
    console.log('Edita Afiliado:', afiliado);
    this.afiliadoService.setAfiliado(afiliado);
    this.router.navigate(['../editar'], { relativeTo: this.route });
  }

  setClickedRowEliminaAfiliado(index, afiliado) {
    console.log('Elimina Afiliado:', afiliado);
    this.afiliadoService.setAfiliado(afiliado);
    this.router.navigate(['../eliminar'], { relativeTo: this.route });
  }

  getAfiliado() {
    this.router.navigate(['../agregar'], { relativeTo: this.route });
  }

  setClickedRowConsultaBeneficiario(index, afiliado) {
    this.router.navigate(['../../beneficiario/administrar'], { relativeTo: this.route });
  }

  getUser() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['access_token'];
    this.permissions = obj['permissions'];
    this.user = obj['user'];
  }

  setButtons() {
    this.permissions.forEach(element => {
      if (element.code == 'AFILIADO:CREATE') {
        this.afiliado_create = true;
      }

      if (element.code == 'AFILIADO:UPDATE') {
        this.afiliado_update = true;
      }

      if (element.code == 'AFILIADO:DELETE') {
        this.afiliado_delete = true;
      }

      if (element.code == 'AFILIADO:READ') {
        this.afiliado_read = true;
      }

      if (element.code == 'AFILIADO:*') {
        this.afiliado_update = true;
        this.afiliado_create = true;
        this.afiliado_delete = true;
        this.afiliado_read = true;
      }

      // Child Entities
      if (element.code == 'BENEFICIARIO:READ') {
        this.beneficiario_read = true;
      }

      if (element.code == 'BENEFICIARIO:*') {
        this.beneficiario_read = true;
      }
    });
  }
}
