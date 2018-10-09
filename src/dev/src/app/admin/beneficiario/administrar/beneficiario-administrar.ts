import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Beneficiario } from '../beneficiario.demo.model';
import { BeneficiarioService } from '../beneficiario.demo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { AfiliadoService } from '../../afiliado/afiliado.demo.service';
import { Afiliado } from '../../afiliado/afiliado.demo.model';
import { User } from '../../../_models';
import { Permission } from '../../../_models/permission';

@Component({
  selector: 'clr-alert-demo-styles',
  styleUrls: ['../beneficiario.demo.scss'],
  templateUrl: './beneficiario-administrar.demo.html',
})
export class BeneficiarioAdministrarDemo {
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

  fromAfiliado: boolean = false;

  constructor(
    private beneficiarioService: BeneficiarioService,
    private router: Router,
    private route: ActivatedRoute,
    private afiliadoService: AfiliadoService
  ) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();
    this.cargaBeneficiarios();

    //console.log ("Afiliado:", this.beneficiarioService.getAfiliado());
  }

  cargaBeneficiarios() {
    this.beneficiarioService.getRecuperaBeneficiarios().subscribe(
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
    this.router.navigate(['../editar'], { relativeTo: this.route });
  }

  setClickedRowEliminaBeneficiario(index, beneficiario) {
    console.log('Elimina Beneficiario:', beneficiario);
    this.beneficiarioService.setBeneficiario(beneficiario);
    this.router.navigate(['../eliminar'], { relativeTo: this.route });
  }

  getBeneficiario() {
    this.router.navigate(['../agregar'], { relativeTo: this.route });
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
