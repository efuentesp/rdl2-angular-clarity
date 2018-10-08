import { Component } from '@angular/core';
import '@clr/icons/shapes/social-shapes';
import '@clr/icons/shapes/essential-shapes';
import { Tipopension } from '../tipopension.demo.model';
import { TipopensionService } from '../tipopension.demo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Permission } from '../../../_models/permission';
import { User } from '../../../_models';

@Component({
  selector: 'clr-alert-demo-styles',
  styleUrls: ['../tipopension.demo.scss'],
  templateUrl: './tipopension-administrar.demo.html',
})
export class TipopensionAdministrarDemo {
  tipopensionsArray: Tipopension[];

  // Permisos
  token: string;
  user: User;
  permissions: Permission[];

  private tipopension_update: boolean = false;
  private tipopension_delete: boolean = false;
  private tipopension_create: boolean = false;
  private tipopension_read: boolean = false;

  constructor(private tipopensionService: TipopensionService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getUser();
    this.setButtons();
    this.cargaTipopensions();
  }

  cargaTipopensions() {
    this.tipopensionService.getRecuperaTipopensions().subscribe(
      res => {
        if (res) {
          this.tipopensionsArray = res;
        }
      },
      error => {
        swal('Error...', 'An error occurred while calling the tipopensions.', 'error');
      }
    );
  }

  setClickedRowEditaTipopension(index, tipopension) {
    console.log('Edita Tipopension:', tipopension);
    this.tipopensionService.setTipopension(tipopension);
    this.router.navigate(['../editar'], { relativeTo: this.route });
  }

  setClickedRowEliminaTipopension(index, tipopension) {
    console.log('Elimina Tipopension:', tipopension);
    this.tipopensionService.setTipopension(tipopension);
    this.router.navigate(['../eliminar'], { relativeTo: this.route });
  }

  getTipopension() {
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
      if (element.code == 'TIPOPENSION:CREATE') {
        this.tipopension_create = true;
      }

      if (element.code == 'TIPOPENSION:UPDATE') {
        this.tipopension_update = true;
      }

      if (element.code == 'TIPOPENSION:DELETE') {
        this.tipopension_delete = true;
      }

      if (element.code == 'TIPOPENSION:READ') {
        this.tipopension_read = true;
      }

      if (element.code == 'TIPOPENSION:*') {
        this.tipopension_update = true;
        this.tipopension_create = true;
        this.tipopension_delete = true;
        this.tipopension_read = true;
      }
    });
  }
}
