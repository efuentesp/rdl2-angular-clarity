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
import { Beneficiario } from '../../beneficiario/beneficiario.demo.model';

@Component({
  selector: 'clr-alert-demo-styles',
  styleUrls: ['../afiliado.demo.scss'],
  templateUrl: './beneficiario-details.demo.html',
})
export class BeneficiarioDetailsFormDemo {
  beneficiariosArray: Beneficiario[];
  afiliado = new Afiliado();

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private beneficiario_update: boolean = false;
  private beneficiario_delete: boolean = false;
  private beneficiario_create: boolean = false;
  private beneficiario_read: boolean = false;

  variableEntidad: string = '';

  constructor(
    private beneficiarioService: BeneficiarioService,
    private router: Router,
    private route: ActivatedRoute,
    private afiliadoService: AfiliadoService
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();

    this.afiliado = this.afiliadoService.getAfiliado();
    this.variableEntidad = this.afiliado.nss;
    this.cargaBeneficiariosPorAfiliado(this.afiliado.id);
  }

  cargaBeneficiariosPorAfiliado(id) {
    this.beneficiarioService.getRecuperaBeneficiariosPorAfiliado(id).subscribe(
      res => {
        if (res) {
          this.beneficiariosArray = res;

          this.beneficiariosArray.forEach(element => {
            this.afiliadoService.getRecuperaAfiliadoPorId(element.afiliado1Id).subscribe(result => {
              if (result) {
                this.afiliado = result;
                element.afiliado1Item = this.afiliado.nss;
              }
            });
          });
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the beneficiarios.', 'error');
      }
    );
  }

  setClickedRowEditaBeneficiario(index, beneficiario) {
    console.log('Edita Beneficiario:', beneficiario);
    this.beneficiarioService.setBeneficiario(beneficiario);
    this.router.navigate(['../../../beneficiario/editar'], { relativeTo: this.route });
  }

  setClickedRowEliminaBeneficiario(index, beneficiario) {
    console.log('Elimina Beneficiario:', beneficiario);
    this.beneficiarioService.setBeneficiario(beneficiario);
    this.router.navigate(['../../../beneficiario/eliminar'], { relativeTo: this.route });
  }

  getBeneficiario() {
    this.router.navigate(['../../../beneficiario/agregar'], { relativeTo: this.route });
  }

  getUser() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.token = obj['access_token'];
    this.permissions = obj['permissions'];
    this.user = obj['user'];
  }

  setButtons() {
    this.permissions.forEach(element => {
      if (element.code == 'BENEFICIARIO:CREATE') {
        this.beneficiario_create = true;
      }

      if (element.code == 'BENEFICIARIO:UPDATE') {
        this.beneficiario_update = true;
      }

      if (element.code == 'BENEFICIARIO:DELETE') {
        this.beneficiario_delete = true;
      }

      if (element.code == 'BENEFICIARIO:READ') {
        this.beneficiario_read = true;
      }

      if (element.code == 'BENEFICIARIO:*') {
        this.beneficiario_create = true;
        this.beneficiario_delete = true;
        this.beneficiario_read = true;
        this.beneficiario_update = true;
      }
    });
  }
}
